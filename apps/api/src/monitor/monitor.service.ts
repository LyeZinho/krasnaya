import { Injectable, Inject, Logger } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class MonitorService {
  private readonly logger = new Logger(MonitorService.name);
  private botStatus = {
    isOnline: true,
    lastHeartbeat: Date.now(),
    guilds: 0,
    uptime: 0,
    version: '1.0.0',
  };

  private queueStats = {
    activeJobs: 0,
    completedJobs: 0,
    failedJobs: 0,
    averageProcessingTime: 0,
  };

  constructor(
    @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Simulate periodic updates in production with actual BullMQ monitoring
    setInterval(() => {
      this.botStatus.lastHeartbeat = Date.now();
      this.botStatus.uptime = Math.floor((Date.now() - (this.botStatus.lastHeartbeat - 3600000)) / 1000);
    }, 30000);
  }

  // ============ BOT STATUS ============

  async getBotStatus() {
    return {
      ...this.botStatus,
      databaseHealthy: await this.checkDatabaseHealth(),
      redisHealthy: await this.checkRedisHealth(),
    };
  }

  async getQueueStats() {
    return this.queueStats;
  }

  async getSystemMetrics() {
    const uptime = process.uptime();
    const memory = process.memoryUsage();

    return {
      uptime,
      memory: {
        heapUsed: Math.round(memory.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
        rss: Math.round(memory.rss / 1024 / 1024),
      },
      timestamp: Date.now(),
    };
  }

  async getAuditStats(guildId?: string) {
    const query = guildId
      ? await this.db.query.auditLogs.findMany({
          where: eq(schema.auditLogs.guildId, guildId),
        })
      : await this.db.query.auditLogs.findMany();

    const stats = {
      totalLogs: query.length,
      byAction: {} as Record<string, number>,
      byStatus: { success: 0, error: 0 },
      last24h: 0,
    };

    const oneDayAgo = Math.floor((Date.now() - 86400000) / 1000);

    for (const log of query) {
      // Count by action
      stats.byAction[log.action] = (stats.byAction[log.action] || 0) + 1;

      // Count by status
      if (log.status === 'success') stats.byStatus.success++;
      else stats.byStatus.error++;

      // Count last 24h
      if (log.createdAt && log.createdAt >= oneDayAgo) stats.last24h++;
    }

    return stats;
  }

  // ============ HEALTH CHECKS ============

  private async checkDatabaseHealth(): Promise<boolean> {
    try {
      const result = await this.db.query.users.findFirst();
      return true;
    } catch (error) {
      this.logger.error(`Database health check failed: ${error.message}`);
      return false;
    }
  }

  private async checkRedisHealth(): Promise<boolean> {
    // In production, this would check actual Redis connection
    try {
      // Placeholder: would use redis client in real implementation
      return true;
    } catch (error) {
      this.logger.error(`Redis health check failed: ${error.message}`);
      return false;
    }
  }

  // ============ SIMULATE BOT STATUS UPDATES ============

  setBotOnline(guilds: number) {
    this.botStatus.isOnline = true;
    this.botStatus.guilds = guilds;
    this.botStatus.lastHeartbeat = Date.now();
  }

  setBotOffline() {
    this.botStatus.isOnline = false;
  }

  updateQueueStats(stats: any) {
    this.queueStats = {
      ...this.queueStats,
      ...stats,
    };
  }
}

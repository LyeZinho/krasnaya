import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class MonitorService {
    private db;
    private readonly logger;
    private botStatus;
    private queueStats;
    constructor(db: NodePgDatabase<typeof schema>);
    private initializeMonitoring;
    getBotStatus(): Promise<{
        databaseHealthy: boolean;
        redisHealthy: boolean;
        isOnline: boolean;
        lastHeartbeat: number;
        guilds: number;
        uptime: number;
        version: string;
    }>;
    getQueueStats(): Promise<{
        activeJobs: number;
        completedJobs: number;
        failedJobs: number;
        averageProcessingTime: number;
    }>;
    getSystemMetrics(): Promise<{
        uptime: number;
        memory: {
            heapUsed: number;
            heapTotal: number;
            rss: number;
        };
        timestamp: number;
    }>;
    getAuditStats(guildId?: string): Promise<{
        totalLogs: number;
        byAction: Record<string, number>;
        byStatus: {
            success: number;
            error: number;
        };
        last24h: number;
    }>;
    private checkDatabaseHealth;
    private checkRedisHealth;
    setBotOnline(guilds: number): void;
    setBotOffline(): void;
    updateQueueStats(stats: any): void;
}

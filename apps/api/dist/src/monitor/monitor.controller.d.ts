import { Response } from 'express';
import { MonitorService } from './monitor.service';
export declare class MonitorController {
    private readonly monitorService;
    constructor(monitorService: MonitorService);
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
    statusSSE(res: Response): Promise<void>;
    queueSSE(res: Response): Promise<void>;
    auditLogsSSE(res: Response, guildId?: string): Promise<void>;
}

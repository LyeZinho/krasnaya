// Monitor Service - Real-time Bot Status and Stats
import { request } from './api.service';

export interface BotStatus {
  isOnline: boolean;
  lastHeartbeat: number;
  guilds: number;
  uptime: number;
  version: string;
  databaseHealthy: boolean;
  redisHealthy: boolean;
}

export interface QueueStats {
  activeJobs: number;
  completedJobs: number;
  failedJobs: number;
  averageProcessingTime: number;
}

export interface SystemMetrics {
  uptime: number;
  memory: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
  timestamp: number;
}

export interface AuditStats {
  totalLogs: number;
  byAction: Record<string, number>;
  byStatus: {
    success: number;
    error: number;
  };
  last24h: number;
}

export class MonitorService {
  // Polling REST endpoints
  static async getBotStatus(): Promise<BotStatus> {
    return request('GET', '/internal/monitor/status');
  }

  static async getQueueStats(): Promise<QueueStats> {
    return request('GET', '/internal/monitor/queue');
  }

  static async getSystemMetrics(): Promise<SystemMetrics> {
    return request('GET', '/internal/monitor/system');
  }

  static async getAuditStats(guildId?: string): Promise<AuditStats> {
    const url = guildId ? `/internal/monitor/audit-stats?guildId=${guildId}` : '/internal/monitor/audit-stats';
    return request('GET', url);
  }

  // SSE streaming methods
  static subscribeToBotStatus(onData: (status: BotStatus) => void, onError: (error: Error) => void) {
    return this.subscribeToSSE('/internal/monitor/status-sse', onData, onError);
  }

  static subscribeToQueueStats(onData: (stats: QueueStats) => void, onError: (error: Error) => void) {
    return this.subscribeToSSE('/internal/monitor/queue-sse', onData, onError);
  }

  static subscribeToAuditStats(onData: (stats: AuditStats) => void, onError: (error: Error) => void, guildId?: string) {
    const url = guildId ? `/internal/monitor/audit-logs-sse?guildId=${guildId}` : '/internal/monitor/audit-logs-sse';
    return this.subscribeToSSE(url, onData, onError);
  }

  private static subscribeToSSE(endpoint: string, onData: (data: any) => void, onError: (error: Error) => void) {
    const url = `/api/v1${endpoint}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onData(data);
      } catch (error) {
        onError(new Error(`Failed to parse SSE data: ${error.message}`));
      }
    };

    eventSource.onerror = () => {
      onError(new Error('SSE connection error'));
      eventSource.close();
    };

    // Return unsubscribe function
    return () => eventSource.close();
  }
}

import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { MonitorService } from './monitor.service';

@Controller('api/v1/internal')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  // ============ POLLING ENDPOINTS (REST) ============

  @Get('monitor/status')
  async getBotStatus() {
    return this.monitorService.getBotStatus();
  }

  @Get('monitor/queue')
  async getQueueStats() {
    return this.monitorService.getQueueStats();
  }

  @Get('monitor/system')
  async getSystemMetrics() {
    return this.monitorService.getSystemMetrics();
  }

  @Get('monitor/audit-stats')
  async getAuditStats(@Query('guildId') guildId?: string) {
    return this.monitorService.getAuditStats(guildId);
  }

  // ============ SSE STREAMING ENDPOINTS ============

  @Get('monitor/status-sse')
  async statusSSE(@Res() res: Response) {
    // Headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send initial status
    const status = await this.monitorService.getBotStatus();
    res.write(`data: ${JSON.stringify(status)}\n\n`);

    // Send updates every 5 seconds
    const interval = setInterval(async () => {
      try {
        const updatedStatus = await this.monitorService.getBotStatus();
        res.write(`data: ${JSON.stringify(updatedStatus)}\n\n`);
      } catch (error) {
        clearInterval(interval);
        res.end();
      }
    }, 5000);

    // Cleanup on client disconnect
    res.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  }

  @Get('monitor/queue-sse')
  async queueSSE(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const stats = await this.monitorService.getQueueStats();
    res.write(`data: ${JSON.stringify(stats)}\n\n`);

    const interval = setInterval(async () => {
      try {
        const updatedStats = await this.monitorService.getQueueStats();
        res.write(`data: ${JSON.stringify(updatedStats)}\n\n`);
      } catch (error) {
        clearInterval(interval);
        res.end();
      }
    }, 5000);

    res.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  }

  @Get('monitor/audit-logs-sse')
  async auditLogsSSE(@Res() res: Response, @Query('guildId') guildId?: string) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const stats = await this.monitorService.getAuditStats(guildId);
    res.write(`data: ${JSON.stringify(stats)}\n\n`);

    const interval = setInterval(async () => {
      try {
        const updatedStats = await this.monitorService.getAuditStats(guildId);
        res.write(`data: ${JSON.stringify(updatedStats)}\n\n`);
      } catch (error) {
        clearInterval(interval);
        res.end();
      }
    }, 10000);

    res.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  }
}

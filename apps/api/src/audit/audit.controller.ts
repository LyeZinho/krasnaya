import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AuditLogsService } from './audit.service';

@Controller('api/v1/admin/audit')
export class AuditController {
  constructor(private readonly auditService: AuditLogsService) {}

  @Post('log')
  async createLog(@Body() data: any) {
    return this.auditService.log(data);
  }

  @Get()
  async list(@Query('guildId') guildId: string, @Query('limit') limit = 200) {
    if (!guildId) return { error: 'guildId is required' };
    return this.auditService.findByGuild(guildId, parseInt(String(limit)));
  }

  @Get('user/:userId')
  async listByUser(@Param('userId') userId: string, @Query('limit') limit = 100) {
    return this.auditService.findByUser(userId, parseInt(String(limit)));
  }

  @Get('action/:action')
  async listByAction(@Query('guildId') guildId: string, @Param('action') action: string) {
    if (!guildId) return { error: 'guildId is required' };
    return this.auditService.findByAction(guildId, action);
  }
}

import { Injectable, Inject, Logger } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuditLogsService {
  private readonly logger = new Logger(AuditLogsService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async log(data: {
    guildId: string;
    userId: string;
    action: string;
    resource: string;
    resourceId: string;
    changes?: Record<string, any>;
    ip?: string;
    userAgent?: string;
    status?: 'success' | 'failure';
    errorMessage?: string;
  }) {
    const logEntry = {
      id: uuid(),
      createdAt: Math.floor(Date.now() / 1000),
      ...data,
    };
    await this.db.insert(schema.auditLogs).values([logEntry]);
    return logEntry;
  }

  async findByGuild(guildId: string, limit = 200) {
    return this.db.query.auditLogs.findMany({
      where: eq(schema.auditLogs.guildId, guildId),
      orderBy: (logs) => logs.createdAt,
      limit,
    });
  }

  async findByUser(userId: string, limit = 100) {
    return this.db.query.auditLogs.findMany({
      where: eq(schema.auditLogs.userId, userId),
      limit,
    });
  }

  async findByAction(guildId: string, action: string) {
    return this.db.query.auditLogs.findMany({
      where: and(
        eq(schema.auditLogs.guildId, guildId),
        eq(schema.auditLogs.action, action)
      ),
    });
  }
}

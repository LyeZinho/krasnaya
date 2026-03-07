import { Injectable, Inject, Logger } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(guildId: string, data: any) {
    const id = uuid();
    const command = {
      id,
      guildId,
      ...data,
      createdAt: Math.floor(Date.now() / 1000),
    };
    await this.db.insert(schema.commands).values([command]);
    return command;
  }

  async findByGuild(guildId: string) {
    return this.db.query.commands.findMany({
      where: eq(schema.commands.guildId, guildId),
    });
  }

  async findById(id: string) {
    return this.db.query.commands.findFirst({
      where: eq(schema.commands.id, id),
    });
  }

  async update(id: string, data: any) {
    const updated = {
      ...data,
      updatedAt: Math.floor(Date.now() / 1000),
    };
    await this.db.update(schema.commands)
      .set(updated)
      .where(eq(schema.commands.id, id));
    return this.findById(id);
  }

  async delete(id: string) {
    await this.db.delete(schema.commands)
      .where(eq(schema.commands.id, id));
    return { success: true };
  }

  async toggle(id: string, enabled: boolean) {
    await this.db.update(schema.commands)
      .set({ enabled, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.commands.id, id));
    return this.findById(id);
  }

  async validateCommand(guildId: string, prefix: string, name: string) {
    const existing = await this.db.query.commands.findFirst({
      where: and(
        eq(schema.commands.guildId, guildId),
        eq(schema.commands.prefix, prefix),
        eq(schema.commands.name, name)
      ),
    });
    return { available: !existing };
  }
}

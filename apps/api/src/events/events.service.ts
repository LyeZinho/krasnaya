import { Injectable, Inject, Logger } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EventHandlersService {
  private readonly logger = new Logger(EventHandlersService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(guildId: string, data: any) {
    const id = uuid();
    const handler = {
      id,
      guildId,
      ...data,
      createdAt: Math.floor(Date.now() / 1000),
    };
    await this.db.insert(schema.eventHandlers).values([handler]);
    return handler;
  }

  async findByGuild(guildId: string) {
    return this.db.query.eventHandlers.findMany({
      where: eq(schema.eventHandlers.guildId, guildId),
    });
  }

  async findById(id: string) {
    return this.db.query.eventHandlers.findFirst({
      where: eq(schema.eventHandlers.id, id),
    });
  }

  async findByEvent(guildId: string, event: string) {
    return this.db.query.eventHandlers.findMany({
      where: and(
        eq(schema.eventHandlers.guildId, guildId),
        eq(schema.eventHandlers.event, event)
      ),
    });
  }

  async update(id: string, data: any) {
    await this.db.update(schema.eventHandlers)
      .set(data)
      .where(eq(schema.eventHandlers.id, id));
    return this.findById(id);
  }

  async delete(id: string) {
    await this.db.delete(schema.eventHandlers)
      .where(eq(schema.eventHandlers.id, id));
    return { success: true };
  }

  async toggle(id: string, enabled: boolean) {
    await this.db.update(schema.eventHandlers)
      .set({ enabled })
      .where(eq(schema.eventHandlers.id, id));
    return this.findById(id);
  }

  getAvailableEvents() {
    return [
      { name: 'MESSAGE_CREATE', label: 'Nova Mensagem' },
      { name: 'MEMBER_JOIN', label: 'Membro Entrou' },
      { name: 'MEMBER_LEAVE', label: 'Membro Saiu' },
      { name: 'MESSAGE_DELETE', label: 'Mensagem Deletada' },
      { name: 'MESSAGE_UPDATE', label: 'Mensagem Editada' },
      { name: 'INTERACTION_CREATE', label: 'Interação' },
      { name: 'VOICE_STATE_UPDATE', label: 'Mudou de Voice' },
      { name: 'SCHEDULED_EVENT_CREATE', label: 'Evento Criado' },
    ];
  }
}

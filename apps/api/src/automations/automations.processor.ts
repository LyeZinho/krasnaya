import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { TcaEngine, BotEvent, BotAction, AutomationConfig } from '@krasnaya/core';
import * as schema from '@krasnaya/database';
import { DB_CONNECTION } from '../db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';

@Processor('automations')
export class AutomationsProcessor extends WorkerHost {
    private readonly logger = new Logger(AutomationsProcessor.name);
    private readonly engine: TcaEngine;

    constructor(
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
        @Inject(DB_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
    ) {
        super();
        this.engine = new TcaEngine();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const { eventData, automationId, _automationConfig } = job.data;
        const event: BotEvent = eventData;

        let configs: (typeof schema.automations.$inferSelect)[] = [];

        if (_automationConfig) {
            configs = [_automationConfig];
        } else if (automationId) {
            const config = await this.db.query.automations.findFirst({
                where: eq(schema.automations.id, automationId),
            });
            if (config) configs = [config];
        } else {
            // Find all enabled automations for this guild and event type
            configs = await this.db.query.automations.findMany({
                where: and(
                    eq(schema.automations.guildId, event.guildId),
                    eq(schema.automations.enabled, true),
                    // We check if the trigger type matches the event type
                    // In a more complex system, we'd use a raw SQL query or more complex filter
                ) as any,
            });

            // Filter by trigger type in memory for simplicity or add to where clause
            configs = configs.filter(c => (c.trigger as any).type === event.type);
        }

        if (configs.length === 0) {
            this.logger.log(`No matching automations found for event ${event.type}`);
            return { status: 'no_match' };
        }

        const results = [];

        for (const config of configs) {
            this.logger.log(`Processing automation ${config.id} for event ${event.type}`);

            // 1. Fetch Context (User, Guild, etc.)
            const userData = await this.db.query.users.findFirst({
                where: and(
                    eq(schema.users.userId, event.userId),
                    eq(schema.users.guildId, event.guildId)
                ) as any,
            });

            const context = {
                user: userData || { xp: 0, level: 1, coins: 0, messages: 0 },
                // Add more context as needed (guild settings, variables, etc.)
            };

            // 2. Process Event via TcaEngine
            const actions: BotAction[] = this.engine.processEvent(event, config as any, context);

            if (actions.length === 0) {
                this.logger.log(`Automation ${config.id} produced no actions.`);
                await this.reportStatus(config.id, 'aborted_by_condition', eventData);
                results.push({ automationId: config.id, status: 'aborted_by_condition' });
                continue;
            }

            // 2. Publish Actions to Redis
            const actionPayload = {
                automationId: config.id,
                event,
                actions,
                timestamp: Date.now(),
            };

            const platform = event.type.split('_')[0].toLowerCase();
            await this.redis.publish(`bot_actions:${platform}`, JSON.stringify(actionPayload));
            await this.redis.publish('bot_actions:all', JSON.stringify(actionPayload));

            await this.reportStatus(config.id, 'success', eventData, actions);
            results.push({ automationId: config.id, status: 'success', actions });
        }

        return { status: 'completed', results };
    }

    private async reportStatus(automationId: string, status: string, eventData: any, results: any[] = []) {
        const payload = {
            automationId,
            status,
            timestamp: Date.now(),
            event: eventData.type,
            results
        };
        await this.redis.publish('bot_events', JSON.stringify(payload));
    }
}

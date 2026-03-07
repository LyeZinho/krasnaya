import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AutomationsService {
    private readonly logger = new Logger(AutomationsService.name);

    constructor(
        @InjectQueue('automations') private readonly automationsQueue: Queue,
        @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
    ) { }

    async dispatchAutomation(automationId: string, eventData: any) {
        this.logger.log(`Dispatching automation ${automationId}`);

        const config = await this.db.query.automations.findFirst({
            where: eq(schema.automations.id, automationId),
        });

        if (!config || !config.enabled) {
            this.logger.warn(`Automation ${automationId} not found or disabled`);
            return;
        }

        // Add job to BullMQ queue
        await this.automationsQueue.add('execute-automation', {
            automationId,
            eventData,
            _automationConfig: config,
        });
    }
}

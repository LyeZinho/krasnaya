import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AutomationsService {
    private readonly logger = new Logger(AutomationsService.name);

    constructor(
        @InjectQueue('automations') private readonly automationsQueue: Queue,
    ) { }

    async dispatchAutomation(automationId: string, eventData: any) {
        this.logger.log(`Dispatching automation ${automationId}`);

        // Add job to BullMQ queue
        await this.automationsQueue.add('execute-automation', {
            automationId,
            eventData,
        });
    }
}

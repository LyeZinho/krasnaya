import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class AutomationsProcessor extends WorkerHost {
    private readonly logger;
    private client;
    constructor();
    process(job: Job<any, any, string>): Promise<any>;
    private executeAction;
    private parsePlaceholders;
}

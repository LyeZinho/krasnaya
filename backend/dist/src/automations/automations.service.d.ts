import { Queue } from 'bullmq';
export declare class AutomationsService {
    private readonly automationsQueue;
    private readonly logger;
    constructor(automationsQueue: Queue);
    dispatchAutomation(automationId: string, eventData: any): Promise<void>;
}

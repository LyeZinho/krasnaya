import { Queue } from 'bullmq';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class AutomationsService {
    private readonly automationsQueue;
    private db;
    private readonly logger;
    constructor(automationsQueue: Queue, db: NodePgDatabase<typeof schema>);
    dispatchAutomation(automationId: string, eventData: any): Promise<void>;
}

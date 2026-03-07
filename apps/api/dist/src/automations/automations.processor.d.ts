import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Redis } from 'ioredis';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class AutomationsProcessor extends WorkerHost {
    private readonly redis;
    private readonly db;
    private readonly logger;
    private readonly engine;
    constructor(redis: Redis, db: NodePgDatabase<typeof schema>);
    process(job: Job<any, any, string>): Promise<any>;
    private reportStatus;
}

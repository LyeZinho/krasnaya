import { OnModuleInit } from '@nestjs/common';
import { AutomationsService } from '../automations/automations.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';
export declare class DiscordDispatcherService implements OnModuleInit {
    private readonly automationsService;
    private readonly db;
    private readonly logger;
    private client;
    constructor(automationsService: AutomationsService, db: NodePgDatabase<typeof schema>);
    onModuleInit(): Promise<void>;
    private handleEvent;
}

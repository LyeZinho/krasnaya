import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class EventHandlersService {
    private db;
    private readonly logger;
    constructor(db: NodePgDatabase<typeof schema>);
    create(guildId: string, data: any): Promise<any>;
    findByGuild(guildId: string): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    }[]>;
    findById(id: string): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    } | undefined>;
    findByEvent(guildId: string, event: string): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    }[]>;
    update(id: string, data: any): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    } | undefined>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    toggle(id: string, enabled: boolean): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    } | undefined>;
    getAvailableEvents(): {
        name: string;
        label: string;
    }[];
}

import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class CommandsService {
    private db;
    private readonly logger;
    constructor(db: NodePgDatabase<typeof schema>);
    create(guildId: string, data: any): Promise<any>;
    findByGuild(guildId: string): Promise<{
        guildId: string;
        name: string;
        createdAt: number | null;
        description: string | null;
        id: string;
        enabled: boolean | null;
        prefix: string;
        aliases: string[];
        cooldown: number | null;
        automationId: string | null;
        updatedAt: number | null;
    }[]>;
    findById(id: string): Promise<{
        guildId: string;
        name: string;
        createdAt: number | null;
        description: string | null;
        id: string;
        enabled: boolean | null;
        prefix: string;
        aliases: string[];
        cooldown: number | null;
        automationId: string | null;
        updatedAt: number | null;
    } | undefined>;
    update(id: string, data: any): Promise<{
        guildId: string;
        name: string;
        createdAt: number | null;
        description: string | null;
        id: string;
        enabled: boolean | null;
        prefix: string;
        aliases: string[];
        cooldown: number | null;
        automationId: string | null;
        updatedAt: number | null;
    } | undefined>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    toggle(id: string, enabled: boolean): Promise<{
        guildId: string;
        name: string;
        createdAt: number | null;
        description: string | null;
        id: string;
        enabled: boolean | null;
        prefix: string;
        aliases: string[];
        cooldown: number | null;
        automationId: string | null;
        updatedAt: number | null;
    } | undefined>;
    validateCommand(guildId: string, prefix: string, name: string): Promise<{
        available: boolean;
    }>;
}

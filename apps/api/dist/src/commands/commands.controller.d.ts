import { CommandsService } from './commands.service';
export declare class CommandsController {
    private readonly commandsService;
    constructor(commandsService: CommandsService);
    create(guildId: string, data: any): Promise<any>;
    list(guildId: string): Promise<{
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
    getById(id: string): Promise<{
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
    }>;
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
    validate(guildId: string, data: {
        prefix: string;
        name: string;
    }): Promise<{
        available: boolean;
    }>;
}

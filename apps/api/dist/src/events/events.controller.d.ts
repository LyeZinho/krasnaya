import { EventHandlersService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventHandlersService);
    getAvailableEvents(): Promise<{
        name: string;
        label: string;
    }[]>;
    create(guildId: string, data: any): Promise<any>;
    list(guildId: string): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    }[]>;
    getById(id: string): Promise<{
        guildId: string;
        createdAt: number | null;
        id: string;
        enabled: boolean | null;
        automationId: string;
        event: string;
    } | undefined>;
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
}

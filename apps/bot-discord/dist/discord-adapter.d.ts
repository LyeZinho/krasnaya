import { BotAdapter, BotEvent, BotAction } from '@krasnaya/core';
export declare class DiscordBotAdapter implements BotAdapter {
    private token;
    platform: string;
    private client;
    constructor(token: string);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onEvent(callback: (event: BotEvent) => Promise<void>): void;
    executeAction(action: BotAction, eventData: any): Promise<void>;
}

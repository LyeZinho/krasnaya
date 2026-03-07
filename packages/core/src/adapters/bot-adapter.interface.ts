export interface BotEvent {
    type: string;
    guildId: string;
    userId: string;
    data: any;
}

export interface BotAction {
    type: string;
    params: any;
}

export interface BotAdapter {
    platform: string;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onEvent(callback: (event: BotEvent) => Promise<void>): void;
    executeAction(action: BotAction, eventData: any): Promise<void>;
}

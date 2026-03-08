import { items } from '../db/schema';
export declare class ItemsService {
    private db;
    private readonly logger;
    constructor(db: any);
    getAllItems(hideHidden?: boolean): Promise<any>;
    getItem(itemId: number): Promise<any>;
    createItem(data: Partial<typeof items.$inferInsert>): Promise<{
        createdAt: number;
        name?: string | undefined;
        price?: number | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        itemId?: number | undefined;
        emoji?: string | null | undefined;
        hidden?: boolean | null | undefined;
    }>;
    updateItem(itemId: number, updates: Partial<typeof items.$inferInsert>): Promise<any>;
    deleteItem(itemId: number): Promise<boolean>;
    getUserInventory(userId: string, guildId: string): Promise<any>;
    addToInventory(userId: string, guildId: string, itemId: number, quantity?: number): Promise<any>;
    removeFromInventory(userId: string, guildId: string, itemId: number, quantity?: number): Promise<any>;
}

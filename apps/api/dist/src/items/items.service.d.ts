import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class ItemsService {
    private db;
    private readonly logger;
    constructor(db: NodePgDatabase<typeof schema>);
    getAllItems(hideHidden?: boolean): Promise<{
        name: string;
        createdAt: number | null;
        itemId: number;
        description: string | null;
        price: number;
        emoji: string | null;
        type: string | null;
        hidden: boolean | null;
    }[]>;
    getItem(itemId: number): Promise<{
        name: string;
        createdAt: number | null;
        itemId: number;
        description: string | null;
        price: number;
        emoji: string | null;
        type: string | null;
        hidden: boolean | null;
    } | undefined>;
    createItem(data: Partial<typeof schema.items.$inferInsert>): Promise<{
        name: string;
        price: number;
        createdAt?: number | null | undefined;
        itemId?: number | undefined;
        description?: string | null | undefined;
        emoji?: string | null | undefined;
        type?: string | null | undefined;
        hidden?: boolean | null | undefined;
    }>;
    updateItem(itemId: number, updates: Partial<typeof schema.items.$inferInsert>): Promise<{
        name: string;
        createdAt: number | null;
        itemId: number;
        description: string | null;
        price: number;
        emoji: string | null;
        type: string | null;
        hidden: boolean | null;
    } | undefined>;
    deleteItem(itemId: number): Promise<boolean>;
    getUserInventory(userId: string, guildId: string): Promise<{
        userId: string;
        guildId: string;
        itemId: number;
        quantity: number | null;
        acquiredAt: number | null;
    }[]>;
    addToInventory(userId: string, guildId: string, itemId: number, quantity?: number): Promise<{
        userId: string;
        guildId: string;
        itemId: number;
        quantity: number | null;
        acquiredAt: number | null;
    }[]>;
    removeFromInventory(userId: string, guildId: string, itemId: number, quantity?: number): Promise<{
        userId: string;
        guildId: string;
        itemId: number;
        quantity: number | null;
        acquiredAt: number | null;
    }[]>;
}

import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class UsersService {
    private db;
    private readonly logger;
    constructor(db: NodePgDatabase<typeof schema>);
    getUsersByGuild(guildId: string): Promise<{
        userId: string;
        username: string;
        guildId: string;
        xp: number | null;
        level: number | null;
        messages: number | null;
        voiceTime: number | null;
        lastMessageAt: number | null;
        coins: number | null;
        lastDailyClaim: number | null;
        createdAt: number | null;
    }[]>;
    getUser(userId: string, guildId: string): Promise<{
        userId: string;
        username: string;
        guildId: string;
        xp: number | null;
        level: number | null;
        messages: number | null;
        voiceTime: number | null;
        lastMessageAt: number | null;
        coins: number | null;
        lastDailyClaim: number | null;
        createdAt: number | null;
    } | undefined>;
    getUserStats(userId: string, guildId: string): Promise<{
        stats: {
            xp: number | null;
            level: number | null;
            messages: number | null;
            voiceTime: number | null;
            coins: number | null;
        };
        userId: string;
        username: string;
        guildId: string;
        xp: number | null;
        level: number | null;
        messages: number | null;
        voiceTime: number | null;
        lastMessageAt: number | null;
        coins: number | null;
        lastDailyClaim: number | null;
        createdAt: number | null;
    } | null>;
    getLeaderboard(guildId: string, limit?: number): Promise<{
        userId: string;
        username: string;
        guildId: string;
        xp: number | null;
        level: number | null;
        messages: number | null;
        voiceTime: number | null;
        lastMessageAt: number | null;
        coins: number | null;
        lastDailyClaim: number | null;
        createdAt: number | null;
    }[]>;
    updateUser(userId: string, guildId: string, updates: Partial<typeof schema.users.$inferInsert>): Promise<{
        userId: string;
        username: string;
        guildId: string;
        xp: number | null;
        level: number | null;
        messages: number | null;
        voiceTime: number | null;
        lastMessageAt: number | null;
        coins: number | null;
        lastDailyClaim: number | null;
        createdAt: number | null;
    } | undefined>;
    getOrCreateUser(userId: string, username: string, guildId: string): Promise<{
        userId: string;
        username: string;
        guildId: string;
        xp: number | null;
        level: number | null;
        messages: number | null;
        voiceTime: number | null;
        lastMessageAt: number | null;
        coins: number | null;
        lastDailyClaim: number | null;
        createdAt: number | null;
    } | undefined>;
}

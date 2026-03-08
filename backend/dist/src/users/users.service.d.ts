import { users } from '../db/schema';
export declare class UsersService {
    private db;
    private readonly logger;
    constructor(db: any);
    getUsersByGuild(guildId: string): Promise<any>;
    getUser(userId: string, guildId: string): Promise<any>;
    getUserStats(userId: string, guildId: string): Promise<any>;
    getLeaderboard(guildId: string, limit?: number): Promise<any>;
    updateUser(userId: string, guildId: string, updates: Partial<typeof users.$inferInsert>): Promise<any>;
    getOrCreateUser(userId: string, username: string, guildId: string): Promise<any>;
}

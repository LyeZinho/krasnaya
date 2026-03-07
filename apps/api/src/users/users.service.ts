import { Injectable, Logger, Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, desc } from 'drizzle-orm';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>) { }

    /**
     * Get all users in a guild
     */
    async getUsersByGuild(guildId: string) {
        try {
            return await this.db.query.users.findMany({
                where: (users, { eq }) => eq(users.guildId, guildId) as any,
            });
        } catch (error) {
            this.logger.error(`Error fetching users for guild ${guildId}:`, error);
            throw error;
        }
    }

    /**
     * Get a single user
     */
    async getUser(userId: string, guildId: string) {
        try {
            return await this.db.query.users.findFirst({
                where: (users, { eq, and }) => and(
                    eq(users.userId, userId),
                    eq(users.guildId, guildId)
                ) as any,
            });
        } catch (error) {
            this.logger.error(`Error fetching user ${userId} from guild ${guildId}:`, error);
            throw error;
        }
    }

    /**
     * Get user stats (leaderboard, badges, etc)
     */
    async getUserStats(userId: string, guildId: string) {
        try {
            const user = await this.getUser(userId, guildId);
            if (!user) return null;

            return {
                ...user,
                stats: {
                    xp: user.xp,
                    level: user.level,
                    messages: user.messages,
                    voiceTime: user.voiceTime,
                    coins: user.coins,
                },
            };
        } catch (error) {
            this.logger.error(`Error fetching stats for user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Get leaderboard for a guild
     */
    async getLeaderboard(guildId: string, limit = 10) {
        try {
            return await this.db.query.users.findMany({
                where: (users, { eq }) => eq(users.guildId, guildId) as any,
                orderBy: (users, { desc }) => [desc(users.xp)],
                limit,
            });
        } catch (error) {
            this.logger.error(`Error fetching leaderboard for guild ${guildId}:`, error);
            throw error;
        }
    }

    /**
     * Update user data (called by BullMQ when events occur)
     */
    async updateUser(userId: string, guildId: string, updates: Partial<typeof schema.users.$inferInsert>) {
        try {
            await this.db
                .update(schema.users)
                .set(updates)
                .where(
                    and(
                        eq(schema.users.userId, userId),
                        eq(schema.users.guildId, guildId)
                    )
                );

            return await this.getUser(userId, guildId);
        } catch (error) {
            this.logger.error(`Error updating user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Create or get user (called when user first interacts)
     */
    async getOrCreateUser(userId: string, username: string, guildId: string) {
        try {
            let user = await this.getUser(userId, guildId);

            if (!user) {
                const newUser = {
                    userId,
                    username,
                    guildId,
                    xp: 0,
                    level: 1,
                    messages: 0,
                    voiceTime: 0,
                    coins: 0,
                    lastMessageAt: 0,
                    lastDailyClaim: 0,
                    createdAt: Math.floor(Date.now() / 1000),
                } as typeof schema.users.$inferInsert;

                await this.db.insert(schema.users).values(newUser);
                user = newUser as any; // Cast as any because some fields might be missing for the return type but it's fine for now
            }

            return user;
        } catch (error) {
            this.logger.error(`Error creating/getting user ${userId}:`, error);
            throw error;
        }
    }
}

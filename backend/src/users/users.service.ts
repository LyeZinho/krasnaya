import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@Inject(DB_CONNECTION) private db: any) { }

    /**
     * Get all users in a guild
     */
    async getUsersByGuild(guildId: string) {
        try {
            return await this.db.query.users.findMany({
                where: eq(users.guildId, guildId),
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
                where: (u) => u.userId === userId && u.guildId === guildId,
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
                    xp,
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
                where: eq(users.guildId, guildId),
                orderBy: (u) => [u.xp],
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
    async updateUser(userId: string, guildId: string, updates: Partial<typeof users.$inferInsert>) {
        try {
            await this.db
                .update(users)
                .set(updates)
                .where((u) => u.userId === userId && u.guildId === guildId);

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
                };

                await this.db.insert(users).values(newUser);
                user = newUser;
            }

            return user;
        } catch (error) {
            this.logger.error(`Error creating/getting user ${userId}:`, error);
            throw error;
        }
    }
}

import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import { badges, userBadges } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BadgesService {
    private readonly logger = new Logger(BadgesService.name);

    constructor(@Inject(DB_CONNECTION) private db: any) { }

    /**
     * Get all badges
     */
    async getAllBadges(activeOnly = true) {
        try {
            if (activeOnly) {
                return await this.db.query.badges.findMany({
                    where: (b) => b.isActive === true,
                });
            }
            return await this.db.query.badges.findMany();
        } catch (error) {
            this.logger.error('Error fetching badges:', error);
            throw error;
        }
    }

    /**
     * Get a single badge
     */
    async getBadge(badgeId: number) {
        try {
            return await this.db.query.badges.findFirst({
                where: eq(badges.badgeId, badgeId),
            });
        } catch (error) {
            this.logger.error(`Error fetching badge ${badgeId}:`, error);
            throw error;
        }
    }

    /**
     * Create a new badge
     */
    async createBadge(data: Partial<typeof badges.$inferInsert>) {
        try {
            const newBadge = {
                ...data,
                createdAt: Math.floor(Date.now() / 1000),
            };
            await this.db.insert(badges).values(newBadge);
            return newBadge;
        } catch (error) {
            this.logger.error('Error creating badge:', error);
            throw error;
        }
    }

    /**
     * Update a badge
     */
    async updateBadge(badgeId: number, updates: Partial<typeof badges.$inferInsert>) {
        try {
            await this.db
                .update(badges)
                .set(updates)
                .where(eq(badges.badgeId, badgeId));
            return await this.getBadge(badgeId);
        } catch (error) {
            this.logger.error(`Error updating badge ${badgeId}:`, error);
            throw error;
        }
    }

    /**
     * Delete a badge
     */
    async deleteBadge(badgeId: number) {
        try {
            await this.db.delete(badges).where(eq(badges.badgeId, badgeId));
            return true;
        } catch (error) {
            this.logger.error(`Error deleting badge ${badgeId}:`, error);
            throw error;
        }
    }

    /**
     * Get user badges
     */
    async getUserBadges(userId: string, guildId: string) {
        try {
            return await this.db.query.userBadges.findMany({
                where: (ub) => ub.userId === userId && ub.guildId === guildId,
            });
        } catch (error) {
            this.logger.error(`Error fetching badges for user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Award badge to user
     */
    async awardBadge(userId: string, guildId: string, badgeId: number) {
        try {
            // Check if user already has this badge
            const existing = await this.db.query.userBadges.findFirst({
                where: (ub) =>
                    ub.userId === userId &&
                    ub.guildId === guildId &&
                    ub.badgeId === badgeId,
            });

            if (existing) {
                return existing;
            }

            const newUserBadge = {
                userId,
                guildId,
                badgeId,
                earnedAt: Math.floor(Date.now() / 1000),
            };

            await this.db.insert(userBadges).values(newUserBadge);
            return newUserBadge;
        } catch (error) {
            this.logger.error(
                `Error awarding badge ${badgeId} to user ${userId}:`,
                error,
            );
            throw error;
        }
    }

    /**
     * Remove badge from user
     */
    async revokeBadge(userId: string, guildId: string, badgeId: number) {
        try {
            await this.db
                .delete(userBadges)
                .where(
                    (ub) =>
                        ub.userId === userId &&
                        ub.guildId === guildId &&
                        ub.badgeId === badgeId,
                );
            return true;
        } catch (error) {
            this.logger.error(
                `Error revoking badge ${badgeId} from user ${userId}:`,
                error,
            );
            throw error;
        }
    }

    /**
     * Get badges by type
     */
    async getBadgesByType(badgeType: string) {
        try {
            return await this.db.query.badges.findMany({
                where: (b) => b.badgeType === badgeType,
            });
        } catch (error) {
            this.logger.error(`Error fetching badges of type ${badgeType}:`, error);
            throw error;
        }
    }
}

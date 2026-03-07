import { Injectable, Logger, Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class BadgesService {
    private readonly logger = new Logger(BadgesService.name);

    constructor(@Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>) { }

    /**
     * Get all badges
     */
    async getAllBadges(activeOnly = true) {
        try {
            if (activeOnly) {
                return await this.db.query.badges.findMany({
                    where: (badges, { eq }) => eq(badges.isActive, true) as any,
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
                where: (badges, { eq }) => eq(badges.badgeId, badgeId) as any,
            });
        } catch (error) {
            this.logger.error(`Error fetching badge ${badgeId}:`, error);
            throw error;
        }
    }

    /**
     * Create a new badge
     */
    async createBadge(data: Partial<typeof schema.badges.$inferInsert>) {
        try {
            const newBadge = {
                ...data,
                createdAt: Math.floor(Date.now() / 1000),
            } as typeof schema.badges.$inferInsert;
            await this.db.insert(schema.badges).values(newBadge);
            return newBadge;
        } catch (error) {
            this.logger.error('Error creating badge:', error);
            throw error;
        }
    }

    /**
     * Update a badge
     */
    async updateBadge(badgeId: number, updates: Partial<typeof schema.badges.$inferInsert>) {
        try {
            await this.db
                .update(schema.badges)
                .set(updates)
                .where(eq(schema.badges.badgeId, badgeId));
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
            await this.db.delete(schema.badges).where(eq(schema.badges.badgeId, badgeId));
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
                where: (ub, { eq, and }) => and(
                    eq(ub.userId, userId),
                    eq(ub.guildId, guildId)
                ) as any,
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
                where: (ub, { eq, and }) =>
                    and(
                        eq(ub.userId, userId),
                        eq(ub.guildId, guildId),
                        eq(ub.badgeId, badgeId),
                    ) as any,
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

            await this.db.insert(schema.userBadges).values(newUserBadge);
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
                .delete(schema.userBadges)
                .where(
                    and(
                        eq(schema.userBadges.userId, userId),
                        eq(schema.userBadges.guildId, guildId),
                        eq(schema.userBadges.badgeId, badgeId),
                    ),
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
                where: (badges, { eq }) => eq(badges.badgeType, badgeType) as any,
            });
        } catch (error) {
            this.logger.error(`Error fetching badges of type ${badgeType}:`, error);
            throw error;
        }
    }
}

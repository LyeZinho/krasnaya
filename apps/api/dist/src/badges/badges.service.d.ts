import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class BadgesService {
    private db;
    private readonly logger;
    constructor(db: NodePgDatabase<typeof schema>);
    getAllBadges(activeOnly?: boolean): Promise<{
        name: string;
        createdAt: number | null;
        description: string | null;
        badgeId: number;
        imagePath: string;
        badgeType: string;
        tier: number | null;
        isActive: boolean | null;
        expiresAt: number | null;
    }[]>;
    getBadge(badgeId: number): Promise<{
        name: string;
        createdAt: number | null;
        description: string | null;
        badgeId: number;
        imagePath: string;
        badgeType: string;
        tier: number | null;
        isActive: boolean | null;
        expiresAt: number | null;
    } | undefined>;
    createBadge(data: Partial<typeof schema.badges.$inferInsert>): Promise<{
        name: string;
        imagePath: string;
        badgeType: string;
        createdAt?: number | null | undefined;
        description?: string | null | undefined;
        badgeId?: number | undefined;
        tier?: number | null | undefined;
        isActive?: boolean | null | undefined;
        expiresAt?: number | null | undefined;
    }>;
    updateBadge(badgeId: number, updates: Partial<typeof schema.badges.$inferInsert>): Promise<{
        name: string;
        createdAt: number | null;
        description: string | null;
        badgeId: number;
        imagePath: string;
        badgeType: string;
        tier: number | null;
        isActive: boolean | null;
        expiresAt: number | null;
    } | undefined>;
    deleteBadge(badgeId: number): Promise<boolean>;
    getUserBadges(userId: string, guildId: string): Promise<{
        userId: string;
        guildId: string;
        badgeId: number;
        id: number;
        earnedAt: number | null;
    }[]>;
    awardBadge(userId: string, guildId: string, badgeId: number): Promise<{
        userId: string;
        guildId: string;
        badgeId: number;
        id: number;
        earnedAt: number | null;
    } | {
        userId: string;
        guildId: string;
        badgeId: number;
        earnedAt: number;
    }>;
    revokeBadge(userId: string, guildId: string, badgeId: number): Promise<boolean>;
    getBadgesByType(badgeType: string): Promise<{
        name: string;
        createdAt: number | null;
        description: string | null;
        badgeId: number;
        imagePath: string;
        badgeType: string;
        tier: number | null;
        isActive: boolean | null;
        expiresAt: number | null;
    }[]>;
}

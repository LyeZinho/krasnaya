import { badges } from '../db/schema';
export declare class BadgesService {
    private db;
    private readonly logger;
    constructor(db: any);
    getAllBadges(activeOnly?: boolean): Promise<any>;
    getBadge(badgeId: number): Promise<any>;
    createBadge(data: Partial<typeof badges.$inferInsert>): Promise<{
        createdAt: number;
        name?: string | undefined;
        imagePath?: string | undefined;
        badgeType?: string | undefined;
        description?: string | null | undefined;
        badgeId?: number | undefined;
        tier?: number | null | undefined;
        isActive?: boolean | null | undefined;
        expiresAt?: number | null | undefined;
    }>;
    updateBadge(badgeId: number, updates: Partial<typeof badges.$inferInsert>): Promise<any>;
    deleteBadge(badgeId: number): Promise<boolean>;
    getUserBadges(userId: string, guildId: string): Promise<any>;
    awardBadge(userId: string, guildId: string, badgeId: number): Promise<any>;
    revokeBadge(userId: string, guildId: string, badgeId: number): Promise<boolean>;
    getBadgesByType(badgeType: string): Promise<any>;
}

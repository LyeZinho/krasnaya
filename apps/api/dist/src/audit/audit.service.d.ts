import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class AuditLogsService {
    private db;
    private readonly logger;
    constructor(db: NodePgDatabase<typeof schema>);
    log(data: {
        guildId: string;
        userId: string;
        action: string;
        resource: string;
        resourceId: string;
        changes?: Record<string, any>;
        ip?: string;
        userAgent?: string;
        status?: 'success' | 'failure';
        errorMessage?: string;
    }): Promise<{
        guildId: string;
        userId: string;
        action: string;
        resource: string;
        resourceId: string;
        changes?: Record<string, any>;
        ip?: string;
        userAgent?: string;
        status?: "success" | "failure";
        errorMessage?: string;
        id: string;
        createdAt: number;
    }>;
    findByGuild(guildId: string, limit?: number): Promise<{
        userId: string;
        guildId: string;
        createdAt: number | null;
        id: string;
        resource: string;
        action: string;
        resourceId: string;
        changes: Record<string, any>;
        ip: string | null;
        userAgent: string | null;
        status: string | null;
        errorMessage: string | null;
    }[]>;
    findByUser(userId: string, limit?: number): Promise<{
        userId: string;
        guildId: string;
        createdAt: number | null;
        id: string;
        resource: string;
        action: string;
        resourceId: string;
        changes: Record<string, any>;
        ip: string | null;
        userAgent: string | null;
        status: string | null;
        errorMessage: string | null;
    }[]>;
    findByAction(guildId: string, action: string): Promise<{
        userId: string;
        guildId: string;
        createdAt: number | null;
        id: string;
        resource: string;
        action: string;
        resourceId: string;
        changes: Record<string, any>;
        ip: string | null;
        userAgent: string | null;
        status: string | null;
        errorMessage: string | null;
    }[]>;
}

import { AuditLogsService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditLogsService);
    createLog(data: any): Promise<{
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
    list(guildId: string, limit?: number): Promise<{
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
    }[] | {
        error: string;
    }>;
    listByUser(userId: string, limit?: number): Promise<{
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
    listByAction(guildId: string, action: string): Promise<{
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
    }[] | {
        error: string;
    }>;
}

import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from 'src/db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';
import { eq, and } from 'drizzle-orm';
import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';

export const rbacPermissions = pgTable('rbac_permissions', {
    roleId: text('role_id').notNull(),
    action: text('action').notNull(),
    isDenied: text('is_denied').notNull(), // 'true' or 'false'
});

@Injectable()
export class RbacGuardService {
    constructor(@Inject(DB_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) { }

    async canAccess(roleId: string, action: string): Promise<boolean> {
        // 1. Defaul deny all
        // 2. Logic-based negative access control
        const permissions = await this.db
            .select()
            .from(rbacPermissions)
            .where(and(eq(rbacPermissions.roleId, roleId), eq(rbacPermissions.action, action)));

        if (permissions.length === 0) {
            return false; // Denied by default
        }

        const permission = permissions[0];
        if (permission.isDenied === 'true') {
            return false; // Explicitly denied
        }

        return true; // Explicitly granted
    }
}

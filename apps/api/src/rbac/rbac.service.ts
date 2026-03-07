import { Injectable, Inject, Logger } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { eq, and, inArray } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RbacService {
  private readonly logger = new Logger(RbacService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  // ============ ROLES ============

  async createRole(guildId: string, data: any) {
    const id = uuid();
    const role = {
      id,
      guildId,
      ...data,
      createdAt: Math.floor(Date.now() / 1000),
    };
    await this.db.insert(schema.roles).values([role]);
    return role;
  }

  async getRoles(guildId: string) {
    return this.db.query.roles.findMany({
      where: eq(schema.roles.guildId, guildId),
    });
  }

  async getRole(id: string) {
    return this.db.query.roles.findFirst({
      where: eq(schema.roles.id, id),
    });
  }

  async updateRole(id: string, data: any) {
    await this.db.update(schema.roles).set(data).where(eq(schema.roles.id, id));
    return this.getRole(id);
  }

  async deleteRole(id: string) {
    await this.db.delete(schema.roles).where(eq(schema.roles.id, id));
    return { success: true };
  }

  // ============ PERMISSIONS ============

  async getAvailablePermissions() {
    // Auto-generate common permissions
    const resources = ['automation', 'command', 'event', 'admin', 'user'];
    const actions = ['read', 'create', 'update', 'delete'];
    const permissions = [];

    for (const resource of resources) {
      for (const action of actions) {
        permissions.push({
          id: `${resource}:${action}`,
          name: `${resource}:${action}`,
          resource,
          action,
          description: `${action.toUpperCase()} ${resource}`,
        });
      }
    }

    return permissions;
  }

  async grantPermission(roleId: string, permissionId: string) {
    const id = uuid();
    const grant = {
      id,
      roleId,
      permissionId,
      granted: true,
    };
    await this.db.insert(schema.rolePermissions).values([grant]);
    return grant;
  }

  async denyPermission(roleId: string, permissionId: string) {
    const id = uuid();
    const denial = {
      id,
      roleId,
      permissionId,
      granted: false,
    };
    await this.db.insert(schema.rolePermissions).values([denial]);
    return denial;
  }

  async getRolePermissions(roleId: string) {
    return this.db.query.rolePermissions.findMany({
      where: eq(schema.rolePermissions.roleId, roleId),
    });
  }

  async removePermission(id: string) {
    await this.db.delete(schema.rolePermissions)
      .where(eq(schema.rolePermissions.id, id));
    return { success: true };
  }

  // ============ USER ROLES ============

  async assignRole(userId: string, guildId: string, roleId: string) {
    const id = uuid();
    const assignment = {
      id,
      userId,
      guildId,
      roleId,
      assignedAt: Math.floor(Date.now() / 1000),
    };
    await this.db.insert(schema.userRoles).values([assignment]);
    return assignment;
  }

  async removeRole(userId: string, guildId: string, roleId: string) {
    await this.db.delete(schema.userRoles)
      .where(and(
        eq(schema.userRoles.userId, userId),
        eq(schema.userRoles.guildId, guildId),
        eq(schema.userRoles.roleId, roleId)
      ));
    return { success: true };
  }

  async getUserRoles(userId: string, guildId: string) {
    return this.db.query.userRoles.findMany({
      where: and(
        eq(schema.userRoles.userId, userId),
        eq(schema.userRoles.guildId, guildId)
      ),
    });
  }

  // ============ AUTHORIZATION CHECK ============

  async hasPermission(
    userId: string,
    guildId: string,
    resource: string,
    action: string
  ): Promise<boolean> {
    // Get user's roles
    const userRoles = await this.getUserRoles(userId, guildId);
    if (userRoles.length === 0) return false;

    const roleIds = userRoles.map((ur) => ur.roleId);

    // Check for explicit denial (takes precedence)
    const permissions = await this.db.query.rolePermissions.findMany({
      where: inArray(schema.rolePermissions.roleId, roleIds),
    });

    // Look for grant or denial
    const permissionName = `${resource}:${action}`;
    let hasGrant = false;
    let hasDenial = false;

    for (const perm of permissions) {
      if (perm.permissionId === permissionName) {
        if (perm.granted) hasGrant = true;
        else hasDenial = true;
      }
    }

    // Implicit deny: if there's an explicit denial, always deny
    if (hasDenial) return false;
    return hasGrant;
  }
}

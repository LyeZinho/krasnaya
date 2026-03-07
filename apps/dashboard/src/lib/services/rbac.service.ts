// RBAC Service - Role-Based Access Control
import { request } from './api.service';

export interface Role {
  id: string;
  guildId: string;
  name: string;
  description: string;
  level: number;
  color: string;
  createdAt: number;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  granted: boolean;
}

export interface UserRole {
  id: string;
  userId: string;
  guildId: string;
  roleId: string;
  assignedAt: number;
}

export class RBACService {
  // ============ Roles ============
  
  static async createRole(guildId: string, data: Omit<Role, 'id' | 'createdAt'>): Promise<Role> {
    return request('POST', '/admin/rbac/roles?guildId=' + guildId, data);
  }

  static async getRoles(guildId: string): Promise<Role[]> {
    return request('GET', `/admin/rbac/roles?guildId=${guildId}`);
  }

  static async getRole(id: string): Promise<Role> {
    return request('GET', `/admin/rbac/roles/${id}`);
  }

  static async updateRole(id: string, data: Partial<Role>): Promise<Role> {
    return request('PATCH', `/admin/rbac/roles/${id}`, data);
  }

  static async deleteRole(id: string): Promise<any> {
    return request('DELETE', `/admin/rbac/roles/${id}`);
  }

  // ============ Permissions ============

  static async getAvailablePermissions(): Promise<Permission[]> {
    return request('GET', '/admin/rbac/permissions');
  }

  static async grantPermission(roleId: string, permissionId: string): Promise<RolePermission> {
    return request('POST', '/admin/rbac/permissions/grant', { roleId, permissionId });
  }

  static async denyPermission(roleId: string, permissionId: string): Promise<RolePermission> {
    return request('POST', '/admin/rbac/permissions/deny', { roleId, permissionId });
  }

  static async getRolePermissions(roleId: string): Promise<RolePermission[]> {
    return request('GET', `/admin/rbac/permissions/role/${roleId}`);
  }

  static async removePermission(id: string): Promise<any> {
    return request('DELETE', `/admin/rbac/permissions/${id}`);
  }

  // ============ User Roles ============

  static async assignRole(userId: string, guildId: string, roleId: string): Promise<UserRole> {
    return request('POST', '/admin/rbac/user-roles', { userId, guildId, roleId });
  }

  static async removeRole(userId: string, guildId: string, roleId: string): Promise<any> {
    return request('DELETE', '/admin/rbac/user-roles', { userId, guildId, roleId });
  }

  static async getUserRoles(userId: string, guildId: string): Promise<UserRole[]> {
    return request('GET', `/admin/rbac/user-roles?userId=${userId}&guildId=${guildId}`);
  }

  // ============ Authorization Check ============

  static async hasPermission(userId: string, guildId: string, resource: string, action: string): Promise<boolean> {
    const result = await request<{ hasPermission: boolean }>('POST', '/admin/rbac/check', {
      userId,
      guildId,
      resource,
      action,
    });
    return result.hasPermission;
  }
}

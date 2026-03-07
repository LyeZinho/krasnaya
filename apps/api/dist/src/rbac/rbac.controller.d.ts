import { RbacService } from './rbac.service';
export declare class RBACController {
    private readonly rbacService;
    constructor(rbacService: RbacService);
    createRole(guildId: string, data: any): Promise<any>;
    getRoles(guildId: string): Promise<{
        guildId: string;
        name: string;
        level: number | null;
        createdAt: number | null;
        description: string | null;
        id: string;
        color: string | null;
    }[]>;
    getRole(id: string): Promise<{
        guildId: string;
        name: string;
        level: number | null;
        createdAt: number | null;
        description: string | null;
        id: string;
        color: string | null;
    } | undefined>;
    updateRole(id: string, data: any): Promise<{
        guildId: string;
        name: string;
        level: number | null;
        createdAt: number | null;
        description: string | null;
        id: string;
        color: string | null;
    } | undefined>;
    deleteRole(id: string): Promise<{
        success: boolean;
    }>;
    getAvailablePermissions(): Promise<{
        id: string;
        name: string;
        resource: string;
        action: string;
        description: string;
    }[]>;
    grantPermission(data: {
        roleId: string;
        permissionId: string;
    }): Promise<{
        id: string;
        roleId: string;
        permissionId: string;
        granted: boolean;
    }>;
    denyPermission(data: {
        roleId: string;
        permissionId: string;
    }): Promise<{
        id: string;
        roleId: string;
        permissionId: string;
        granted: boolean;
    }>;
    getRolePermissions(roleId: string): Promise<{
        id: string;
        roleId: string;
        permissionId: string;
        granted: boolean | null;
    }[]>;
    removePermission(id: string): Promise<{
        success: boolean;
    }>;
    assignRole(data: {
        userId: string;
        guildId: string;
        roleId: string;
    }): Promise<{
        id: string;
        userId: string;
        guildId: string;
        roleId: string;
        assignedAt: number;
    }>;
    removeRole(data: {
        userId: string;
        guildId: string;
        roleId: string;
    }): Promise<{
        success: boolean;
    }>;
    getUserRoles(userId: string, guildId: string): Promise<{
        userId: string;
        guildId: string;
        id: string;
        roleId: string;
        assignedAt: number | null;
    }[]>;
    checkPermission(data: {
        userId: string;
        guildId: string;
        resource: string;
        action: string;
    }): Promise<{
        hasPermission: boolean;
    }>;
}

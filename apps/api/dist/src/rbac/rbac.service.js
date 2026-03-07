"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RbacService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const drizzle_orm_1 = require("drizzle-orm");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const uuid_1 = require("uuid");
let RbacService = RbacService_1 = class RbacService {
    db;
    logger = new common_1.Logger(RbacService_1.name);
    constructor(db) {
        this.db = db;
    }
    async createRole(guildId, data) {
        const id = (0, uuid_1.v4)();
        const role = {
            id,
            guildId,
            ...data,
            createdAt: Math.floor(Date.now() / 1000),
        };
        await this.db.insert(schema.roles).values([role]);
        return role;
    }
    async getRoles(guildId) {
        return this.db.query.roles.findMany({
            where: (0, drizzle_orm_1.eq)(schema.roles.guildId, guildId),
        });
    }
    async getRole(id) {
        return this.db.query.roles.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.roles.id, id),
        });
    }
    async updateRole(id, data) {
        await this.db.update(schema.roles).set(data).where((0, drizzle_orm_1.eq)(schema.roles.id, id));
        return this.getRole(id);
    }
    async deleteRole(id) {
        await this.db.delete(schema.roles).where((0, drizzle_orm_1.eq)(schema.roles.id, id));
        return { success: true };
    }
    async getAvailablePermissions() {
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
    async grantPermission(roleId, permissionId) {
        const id = (0, uuid_1.v4)();
        const grant = {
            id,
            roleId,
            permissionId,
            granted: true,
        };
        await this.db.insert(schema.rolePermissions).values([grant]);
        return grant;
    }
    async denyPermission(roleId, permissionId) {
        const id = (0, uuid_1.v4)();
        const denial = {
            id,
            roleId,
            permissionId,
            granted: false,
        };
        await this.db.insert(schema.rolePermissions).values([denial]);
        return denial;
    }
    async getRolePermissions(roleId) {
        return this.db.query.rolePermissions.findMany({
            where: (0, drizzle_orm_1.eq)(schema.rolePermissions.roleId, roleId),
        });
    }
    async removePermission(id) {
        await this.db.delete(schema.rolePermissions)
            .where((0, drizzle_orm_1.eq)(schema.rolePermissions.id, id));
        return { success: true };
    }
    async assignRole(userId, guildId, roleId) {
        const id = (0, uuid_1.v4)();
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
    async removeRole(userId, guildId, roleId) {
        await this.db.delete(schema.userRoles)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.userRoles.userId, userId), (0, drizzle_orm_1.eq)(schema.userRoles.guildId, guildId), (0, drizzle_orm_1.eq)(schema.userRoles.roleId, roleId)));
        return { success: true };
    }
    async getUserRoles(userId, guildId) {
        return this.db.query.userRoles.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.userRoles.userId, userId), (0, drizzle_orm_1.eq)(schema.userRoles.guildId, guildId)),
        });
    }
    async hasPermission(userId, guildId, resource, action) {
        const userRoles = await this.getUserRoles(userId, guildId);
        if (userRoles.length === 0)
            return false;
        const roleIds = userRoles.map((ur) => ur.roleId);
        const permissions = await this.db.query.rolePermissions.findMany({
            where: (0, drizzle_orm_1.inArray)(schema.rolePermissions.roleId, roleIds),
        });
        const permissionName = `${resource}:${action}`;
        let hasGrant = false;
        let hasDenial = false;
        for (const perm of permissions) {
            if (perm.permissionId === permissionName) {
                if (perm.granted)
                    hasGrant = true;
                else
                    hasDenial = true;
            }
        }
        if (hasDenial)
            return false;
        return hasGrant;
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = RbacService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], RbacService);
//# sourceMappingURL=rbac.service.js.map
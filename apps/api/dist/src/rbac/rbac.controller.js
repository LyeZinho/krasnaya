"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBACController = void 0;
const common_1 = require("@nestjs/common");
const rbac_service_1 = require("./rbac.service");
let RBACController = class RBACController {
    rbacService;
    constructor(rbacService) {
        this.rbacService = rbacService;
    }
    async createRole(guildId, data) {
        return this.rbacService.createRole(guildId, data);
    }
    async getRoles(guildId) {
        return this.rbacService.getRoles(guildId);
    }
    async getRole(id) {
        return this.rbacService.getRole(id);
    }
    async updateRole(id, data) {
        return this.rbacService.updateRole(id, data);
    }
    async deleteRole(id) {
        return this.rbacService.deleteRole(id);
    }
    async getAvailablePermissions() {
        return this.rbacService.getAvailablePermissions();
    }
    async grantPermission(data) {
        return this.rbacService.grantPermission(data.roleId, data.permissionId);
    }
    async denyPermission(data) {
        return this.rbacService.denyPermission(data.roleId, data.permissionId);
    }
    async getRolePermissions(roleId) {
        return this.rbacService.getRolePermissions(roleId);
    }
    async removePermission(id) {
        return this.rbacService.removePermission(id);
    }
    async assignRole(data) {
        return this.rbacService.assignRole(data.userId, data.guildId, data.roleId);
    }
    async removeRole(data) {
        return this.rbacService.removeRole(data.userId, data.guildId, data.roleId);
    }
    async getUserRoles(userId, guildId) {
        return this.rbacService.getUserRoles(userId, guildId);
    }
    async checkPermission(data) {
        const has = await this.rbacService.hasPermission(data.userId, data.guildId, data.resource, data.action);
        return { hasPermission: has };
    }
};
exports.RBACController = RBACController;
__decorate([
    (0, common_1.Post)('roles'),
    __param(0, (0, common_1.Query)('guildId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "createRole", null);
__decorate([
    (0, common_1.Get)('roles'),
    __param(0, (0, common_1.Query)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('roles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "getRole", null);
__decorate([
    (0, common_1.Patch)('roles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)('roles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "deleteRole", null);
__decorate([
    (0, common_1.Get)('permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "getAvailablePermissions", null);
__decorate([
    (0, common_1.Post)('permissions/grant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "grantPermission", null);
__decorate([
    (0, common_1.Post)('permissions/deny'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "denyPermission", null);
__decorate([
    (0, common_1.Get)('permissions/role/:roleId'),
    __param(0, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "getRolePermissions", null);
__decorate([
    (0, common_1.Delete)('permissions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "removePermission", null);
__decorate([
    (0, common_1.Post)('user-roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Delete)('user-roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "removeRole", null);
__decorate([
    (0, common_1.Get)('user-roles'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "getUserRoles", null);
__decorate([
    (0, common_1.Post)('check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "checkPermission", null);
exports.RBACController = RBACController = __decorate([
    (0, common_1.Controller)('api/v1/admin/rbac'),
    __metadata("design:paramtypes", [rbac_service_1.RbacService])
], RBACController);
//# sourceMappingURL=rbac.controller.js.map
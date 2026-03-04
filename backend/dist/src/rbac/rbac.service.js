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
exports.RbacGuardService = exports.rbacPermissions = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.rbacPermissions = (0, pg_core_1.pgTable)('rbac_permissions', {
    roleId: (0, pg_core_1.text)('role_id').notNull(),
    action: (0, pg_core_1.text)('action').notNull(),
    isDenied: (0, pg_core_1.text)('is_denied').notNull(),
});
let RbacGuardService = class RbacGuardService {
    db;
    constructor(db) {
        this.db = db;
    }
    async canAccess(roleId, action) {
        const permissions = await this.db
            .select()
            .from(exports.rbacPermissions)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(exports.rbacPermissions.roleId, roleId), (0, drizzle_orm_1.eq)(exports.rbacPermissions.action, action)));
        if (permissions.length === 0) {
            return false;
        }
        const permission = permissions[0];
        if (permission.isDenied === 'true') {
            return false;
        }
        return true;
    }
};
exports.RbacGuardService = RbacGuardService;
exports.RbacGuardService = RbacGuardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], RbacGuardService);
//# sourceMappingURL=rbac.service.js.map
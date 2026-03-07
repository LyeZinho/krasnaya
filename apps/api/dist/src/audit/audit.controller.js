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
exports.AuditController = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("./audit.service");
let AuditController = class AuditController {
    auditService;
    constructor(auditService) {
        this.auditService = auditService;
    }
    async createLog(data) {
        return this.auditService.log(data);
    }
    async list(guildId, limit = 200) {
        if (!guildId)
            return { error: 'guildId is required' };
        return this.auditService.findByGuild(guildId, parseInt(String(limit)));
    }
    async listByUser(userId, limit = 100) {
        return this.auditService.findByUser(userId, parseInt(String(limit)));
    }
    async listByAction(guildId, action) {
        if (!guildId)
            return { error: 'guildId is required' };
        return this.auditService.findByAction(guildId, action);
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, common_1.Post)('log'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "createLog", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('guildId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "listByUser", null);
__decorate([
    (0, common_1.Get)('action/:action'),
    __param(0, (0, common_1.Query)('guildId')),
    __param(1, (0, common_1.Param)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "listByAction", null);
exports.AuditController = AuditController = __decorate([
    (0, common_1.Controller)('api/v1/admin/audit'),
    __metadata("design:paramtypes", [audit_service_1.AuditLogsService])
], AuditController);
//# sourceMappingURL=audit.controller.js.map
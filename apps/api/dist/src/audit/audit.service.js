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
var AuditLogsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const drizzle_orm_1 = require("drizzle-orm");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const uuid_1 = require("uuid");
let AuditLogsService = AuditLogsService_1 = class AuditLogsService {
    db;
    logger = new common_1.Logger(AuditLogsService_1.name);
    constructor(db) {
        this.db = db;
    }
    async log(data) {
        const logEntry = {
            id: (0, uuid_1.v4)(),
            createdAt: Math.floor(Date.now() / 1000),
            ...data,
        };
        await this.db.insert(schema.auditLogs).values([logEntry]);
        return logEntry;
    }
    async findByGuild(guildId, limit = 200) {
        return this.db.query.auditLogs.findMany({
            where: (0, drizzle_orm_1.eq)(schema.auditLogs.guildId, guildId),
            orderBy: (logs) => logs.createdAt,
            limit,
        });
    }
    async findByUser(userId, limit = 100) {
        return this.db.query.auditLogs.findMany({
            where: (0, drizzle_orm_1.eq)(schema.auditLogs.userId, userId),
            limit,
        });
    }
    async findByAction(guildId, action) {
        return this.db.query.auditLogs.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.auditLogs.guildId, guildId), (0, drizzle_orm_1.eq)(schema.auditLogs.action, action)),
        });
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = AuditLogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], AuditLogsService);
//# sourceMappingURL=audit.service.js.map
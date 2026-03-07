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
var MonitorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
let MonitorService = MonitorService_1 = class MonitorService {
    db;
    logger = new common_1.Logger(MonitorService_1.name);
    botStatus = {
        isOnline: true,
        lastHeartbeat: Date.now(),
        guilds: 0,
        uptime: 0,
        version: '1.0.0',
    };
    queueStats = {
        activeJobs: 0,
        completedJobs: 0,
        failedJobs: 0,
        averageProcessingTime: 0,
    };
    constructor(db) {
        this.db = db;
        this.initializeMonitoring();
    }
    initializeMonitoring() {
        setInterval(() => {
            this.botStatus.lastHeartbeat = Date.now();
            this.botStatus.uptime = Math.floor((Date.now() - (this.botStatus.lastHeartbeat - 3600000)) / 1000);
        }, 30000);
    }
    async getBotStatus() {
        return {
            ...this.botStatus,
            databaseHealthy: await this.checkDatabaseHealth(),
            redisHealthy: await this.checkRedisHealth(),
        };
    }
    async getQueueStats() {
        return this.queueStats;
    }
    async getSystemMetrics() {
        const uptime = process.uptime();
        const memory = process.memoryUsage();
        return {
            uptime,
            memory: {
                heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
                heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
                rss: Math.round(memory.rss / 1024 / 1024),
            },
            timestamp: Date.now(),
        };
    }
    async getAuditStats(guildId) {
        const query = guildId
            ? await this.db.query.auditLogs.findMany({
                where: (0, drizzle_orm_1.eq)(schema.auditLogs.guildId, guildId),
            })
            : await this.db.query.auditLogs.findMany();
        const stats = {
            totalLogs: query.length,
            byAction: {},
            byStatus: { success: 0, error: 0 },
            last24h: 0,
        };
        const oneDayAgo = Math.floor((Date.now() - 86400000) / 1000);
        for (const log of query) {
            stats.byAction[log.action] = (stats.byAction[log.action] || 0) + 1;
            if (log.status === 'success')
                stats.byStatus.success++;
            else
                stats.byStatus.error++;
            if (log.createdAt && log.createdAt >= oneDayAgo)
                stats.last24h++;
        }
        return stats;
    }
    async checkDatabaseHealth() {
        try {
            const result = await this.db.query.users.findFirst();
            return true;
        }
        catch (error) {
            this.logger.error(`Database health check failed: ${error.message}`);
            return false;
        }
    }
    async checkRedisHealth() {
        try {
            return true;
        }
        catch (error) {
            this.logger.error(`Redis health check failed: ${error.message}`);
            return false;
        }
    }
    setBotOnline(guilds) {
        this.botStatus.isOnline = true;
        this.botStatus.guilds = guilds;
        this.botStatus.lastHeartbeat = Date.now();
    }
    setBotOffline() {
        this.botStatus.isOnline = false;
    }
    updateQueueStats(stats) {
        this.queueStats = {
            ...this.queueStats,
            ...stats,
        };
    }
};
exports.MonitorService = MonitorService;
exports.MonitorService = MonitorService = MonitorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], MonitorService);
//# sourceMappingURL=monitor.service.js.map
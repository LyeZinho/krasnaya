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
exports.MonitorController = void 0;
const common_1 = require("@nestjs/common");
const monitor_service_1 = require("./monitor.service");
let MonitorController = class MonitorController {
    monitorService;
    constructor(monitorService) {
        this.monitorService = monitorService;
    }
    async getBotStatus() {
        return this.monitorService.getBotStatus();
    }
    async getQueueStats() {
        return this.monitorService.getQueueStats();
    }
    async getSystemMetrics() {
        return this.monitorService.getSystemMetrics();
    }
    async getAuditStats(guildId) {
        return this.monitorService.getAuditStats(guildId);
    }
    async statusSSE(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const status = await this.monitorService.getBotStatus();
        res.write(`data: ${JSON.stringify(status)}\n\n`);
        const interval = setInterval(async () => {
            try {
                const updatedStatus = await this.monitorService.getBotStatus();
                res.write(`data: ${JSON.stringify(updatedStatus)}\n\n`);
            }
            catch (error) {
                clearInterval(interval);
                res.end();
            }
        }, 5000);
        res.on('close', () => {
            clearInterval(interval);
            res.end();
        });
    }
    async queueSSE(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const stats = await this.monitorService.getQueueStats();
        res.write(`data: ${JSON.stringify(stats)}\n\n`);
        const interval = setInterval(async () => {
            try {
                const updatedStats = await this.monitorService.getQueueStats();
                res.write(`data: ${JSON.stringify(updatedStats)}\n\n`);
            }
            catch (error) {
                clearInterval(interval);
                res.end();
            }
        }, 5000);
        res.on('close', () => {
            clearInterval(interval);
            res.end();
        });
    }
    async auditLogsSSE(res, guildId) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const stats = await this.monitorService.getAuditStats(guildId);
        res.write(`data: ${JSON.stringify(stats)}\n\n`);
        const interval = setInterval(async () => {
            try {
                const updatedStats = await this.monitorService.getAuditStats(guildId);
                res.write(`data: ${JSON.stringify(updatedStats)}\n\n`);
            }
            catch (error) {
                clearInterval(interval);
                res.end();
            }
        }, 10000);
        res.on('close', () => {
            clearInterval(interval);
            res.end();
        });
    }
};
exports.MonitorController = MonitorController;
__decorate([
    (0, common_1.Get)('monitor/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "getBotStatus", null);
__decorate([
    (0, common_1.Get)('monitor/queue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "getQueueStats", null);
__decorate([
    (0, common_1.Get)('monitor/system'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "getSystemMetrics", null);
__decorate([
    (0, common_1.Get)('monitor/audit-stats'),
    __param(0, (0, common_1.Query)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "getAuditStats", null);
__decorate([
    (0, common_1.Get)('monitor/status-sse'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "statusSSE", null);
__decorate([
    (0, common_1.Get)('monitor/queue-sse'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "queueSSE", null);
__decorate([
    (0, common_1.Get)('monitor/audit-logs-sse'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "auditLogsSSE", null);
exports.MonitorController = MonitorController = __decorate([
    (0, common_1.Controller)('api/v1/internal'),
    __metadata("design:paramtypes", [monitor_service_1.MonitorService])
], MonitorController);
//# sourceMappingURL=monitor.controller.js.map
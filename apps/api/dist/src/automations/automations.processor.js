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
var AutomationsProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const core_1 = require("@krasnaya/core");
const schema = __importStar(require("@krasnaya/database"));
const db_module_1 = require("../db/db.module");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
let AutomationsProcessor = AutomationsProcessor_1 = class AutomationsProcessor extends bullmq_1.WorkerHost {
    redis;
    db;
    logger = new common_1.Logger(AutomationsProcessor_1.name);
    engine;
    constructor(redis, db) {
        super();
        this.redis = redis;
        this.db = db;
        this.engine = new core_1.TcaEngine();
    }
    async process(job) {
        const { eventData, automationId, _automationConfig } = job.data;
        const event = eventData;
        let configs = [];
        if (_automationConfig) {
            configs = [_automationConfig];
        }
        else if (automationId) {
            const config = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.automations.id, automationId),
            });
            if (config)
                configs = [config];
        }
        else {
            configs = await this.db.query.automations.findMany({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.automations.guildId, event.guildId), (0, drizzle_orm_1.eq)(schema.automations.enabled, true)),
            });
            configs = configs.filter(c => c.trigger.type === event.type);
        }
        if (configs.length === 0) {
            this.logger.log(`No matching automations found for event ${event.type}`);
            return { status: 'no_match' };
        }
        const results = [];
        for (const config of configs) {
            this.logger.log(`Processing automation ${config.id} for event ${event.type}`);
            const userData = await this.db.query.users.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.users.userId, event.userId), (0, drizzle_orm_1.eq)(schema.users.guildId, event.guildId)),
            });
            const context = {
                user: userData || { xp: 0, level: 1, coins: 0, messages: 0 },
            };
            const actions = this.engine.processEvent(event, config, context);
            if (actions.length === 0) {
                this.logger.log(`Automation ${config.id} produced no actions.`);
                await this.reportStatus(config.id, 'aborted_by_condition', eventData);
                results.push({ automationId: config.id, status: 'aborted_by_condition' });
                continue;
            }
            const actionPayload = {
                automationId: config.id,
                event,
                actions,
                timestamp: Date.now(),
            };
            const platform = event.type.split('_')[0].toLowerCase();
            await this.redis.publish(`bot_actions:${platform}`, JSON.stringify(actionPayload));
            await this.redis.publish('bot_actions:all', JSON.stringify(actionPayload));
            await this.reportStatus(config.id, 'success', eventData, actions);
            results.push({ automationId: config.id, status: 'success', actions });
        }
        return { status: 'completed', results };
    }
    async reportStatus(automationId, status, eventData, results = []) {
        const payload = {
            automationId,
            status,
            timestamp: Date.now(),
            event: eventData.type,
            results
        };
        await this.redis.publish('bot_events', JSON.stringify(payload));
    }
};
exports.AutomationsProcessor = AutomationsProcessor;
exports.AutomationsProcessor = AutomationsProcessor = AutomationsProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('automations'),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __param(1, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [ioredis_1.Redis,
        node_postgres_1.NodePgDatabase])
], AutomationsProcessor);
//# sourceMappingURL=automations.processor.js.map
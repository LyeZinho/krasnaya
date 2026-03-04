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
var AutomationsProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
const lodash = __importStar(require("lodash"));
let AutomationsProcessor = AutomationsProcessor_1 = class AutomationsProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(AutomationsProcessor_1.name);
    client;
    constructor() {
        super();
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages],
        });
        if (process.env.DISCORD_TOKEN) {
            this.client.login(process.env.DISCORD_TOKEN).catch(e => this.logger.error('Worker failed to login to Discord', e));
        }
    }
    async process(job) {
        this.logger.log(`Processing job ${job.id} for automation ${job.data.automationId}`);
        const { eventData, _automationConfig } = job.data;
        if (_automationConfig.conditions && _automationConfig.conditions.length > 0) {
            let passed = true;
            for (const condition of _automationConfig.conditions) {
                const valueToTest = lodash.get(eventData, condition.field);
                switch (condition.operator) {
                    case 'equals':
                        if (valueToTest !== condition.value)
                            passed = false;
                        break;
                    case 'contains':
                        if (typeof valueToTest !== 'string' || !valueToTest.includes(condition.value))
                            passed = false;
                        break;
                }
                if (!passed)
                    break;
            }
            if (!passed) {
                this.logger.log(`Job ${job.id} failed conditions. Aborting actions.`);
                return { status: 'aborted_by_condition' };
            }
        }
        for (const action of _automationConfig.actions) {
            await this.executeAction(action, eventData);
        }
        return { status: 'success' };
    }
    async executeAction(action, eventData) {
        this.logger.log(`Executing action ${action.type}`);
        switch (action.type) {
            case 'SEND_MESSAGE':
                const channel = await this.client.channels.fetch(eventData.message.channelId);
                if (channel && channel.isSendable()) {
                    const content = this.parsePlaceholders(action.params.content || '', eventData);
                    await channel.send(content);
                }
                break;
        }
    }
    parsePlaceholders(text, data) {
        return text.replace(/\{(.*?)\}/g, (match, key) => lodash.get(data, key, match));
    }
};
exports.AutomationsProcessor = AutomationsProcessor;
exports.AutomationsProcessor = AutomationsProcessor = AutomationsProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('automations'),
    __metadata("design:paramtypes", [])
], AutomationsProcessor);
//# sourceMappingURL=automations.processor.js.map
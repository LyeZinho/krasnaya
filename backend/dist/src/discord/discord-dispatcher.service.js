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
var DiscordDispatcherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordDispatcherService = void 0;
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
const automations_service_1 = require("../automations/automations.service");
const db_module_1 = require("../db/db.module");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = __importStar(require("../db/schema"));
const drizzle_orm_1 = require("drizzle-orm");
let DiscordDispatcherService = DiscordDispatcherService_1 = class DiscordDispatcherService {
    automationsService;
    db;
    logger = new common_1.Logger(DiscordDispatcherService_1.name);
    client;
    constructor(automationsService, db) {
        this.automationsService = automationsService;
        this.db = db;
        this.client = new discord_js_1.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildMembers,
            ],
        });
    }
    async onModuleInit() {
        this.client.on('ready', () => {
            this.logger.log(`Logged in as ${this.client.user?.tag}!`);
        });
        this.client.on('messageCreate', async (message) => {
            if (message.author.bot)
                return;
            await this.handleEvent('MESSAGE_CREATE', {
                message: {
                    content: message.content,
                    id: message.id,
                    channelId: message.channelId,
                },
                author: {
                    id: message.author.id,
                    username: message.author.username,
                },
                guild: {
                    id: message.guildId,
                }
            }, message.guildId);
        });
        const token = process.env.DISCORD_TOKEN;
        if (token) {
            this.client.login(token).catch(err => this.logger.error('Failed to login to Discord', err));
        }
        else {
            this.logger.warn('DISCORD_TOKEN is not set. Bot will not start.');
        }
    }
    async handleEvent(eventType, eventData, guildId) {
        if (!guildId)
            return;
        try {
            const guildAutomations = await this.db
                .select()
                .from(schema.automations)
                .where((0, drizzle_orm_1.eq)(schema.automations.guildId, guildId));
            const activeAutomations = guildAutomations.filter(a => a.enabled);
            for (const automation of activeAutomations) {
                const trigger = typeof automation.trigger === 'string' ? JSON.parse(automation.trigger) : automation.trigger;
                if (trigger && trigger.type === eventType) {
                    this.logger.log(`Queueing automation ${automation.id} for event ${eventType}`);
                    await this.automationsService.dispatchAutomation(automation.id, {
                        ...eventData,
                        _automationConfig: {
                            conditions: automation.conditions,
                            actions: automation.actions
                        }
                    });
                }
            }
        }
        catch (error) {
            this.logger.error(`Error handling event ${eventType}`, error);
        }
    }
};
exports.DiscordDispatcherService = DiscordDispatcherService;
exports.DiscordDispatcherService = DiscordDispatcherService = DiscordDispatcherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [automations_service_1.AutomationsService,
        node_postgres_1.NodePgDatabase])
], DiscordDispatcherService);
//# sourceMappingURL=discord-dispatcher.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_adapter_1 = require("./discord-adapter");
const bullmq_1 = require("bullmq");
const ioredis_1 = require("ioredis");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// If running from monorepo apps folder, token might be in the root .env
if (!process.env.DISCORD_BOT_TOKEN && !process.env.DISCORD_TOKEN) {
    dotenv.config({ path: '../../.env' });
}
const token = process.env.DISCORD_BOT_TOKEN || process.env.DISCORD_TOKEN;
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379');
if (!token) {
    console.warn('⚠️ DISCORD_TOKEN is not set. Discord Bot Runner will be IDLE.');
}
const connection = { host: redisHost, port: redisPort };
const eventQueue = new bullmq_1.Queue('automations', { connection });
const redisPubSub = new ioredis_1.Redis(connection);
const adapter = new discord_adapter_1.DiscordBotAdapter(token || 'DUMMY_TOKEN');
// 1. Dispatch Events to the API (Processor)
adapter.onEvent(async (event) => {
    console.log(`[Discord] Event detected: ${event.type}`);
    // We don't fetch automations here. We just send the event to the queue.
    // The AutomationsProcessor in apps/api will find relevant automations.
    // To avoid circular dependencies or double processing, we could filter here
    // but let's let the processor handle it for now.
    await eventQueue.add('process-event', {
        eventData: event,
        // Note: In the new flow, the processor will fetch the relevant automations for this event/guild
    });
});
// 2. Subscribe to Actions from the API (Processor)
redisPubSub.subscribe('bot_actions:discord', (err) => {
    if (err)
        console.error('Failed to subscribe:', err);
    else
        console.log('Subscribed to bot_actions:discord');
});
redisPubSub.on('message', async (channel, message) => {
    if (channel === 'bot_actions:discord') {
        const payload = JSON.parse(message);
        const { actions, event } = payload;
        console.log(`[Discord] Executing ${actions.length} actions for automation ${payload.automationId}`);
        for (const action of actions) {
            try {
                await adapter.executeAction(action, event.data);
            }
            catch (error) {
                console.error(`[Discord] Failed to execute action ${action.type}:`, error);
            }
        }
    }
});
async function main() {
    if (token) {
        await adapter.connect();
        console.log('Discord Bot Runner is active.');
    }
    else {
        console.log('Discord Bot Runner is waiting for a token...');
    }
}
main().catch(console.error);
//# sourceMappingURL=main.js.map
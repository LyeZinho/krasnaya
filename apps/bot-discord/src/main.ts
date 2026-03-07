import { DiscordBotAdapter } from './discord-adapter';
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';
import { BotEvent } from '@krasnaya/core';

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
const eventQueue = new Queue('automations', { connection });
const redisPubSub = new Redis(connection);
const adapter = new DiscordBotAdapter(token || 'DUMMY_TOKEN');

// 1. Dispatch Events to the API (Processor)
adapter.onEvent(async (event: BotEvent) => {
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
    if (err) console.error('Failed to subscribe:', err);
    else console.log('Subscribed to bot_actions:discord');
});

redisPubSub.on('message', async (channel, message) => {
    if (channel === 'bot_actions:discord') {
        const payload = JSON.parse(message);
        const { actions, event } = payload;

        console.log(`[Discord] Executing ${actions.length} actions for automation ${payload.automationId}`);

        for (const action of actions) {
            try {
                await adapter.executeAction(action, event.data);
            } catch (error) {
                console.error(`[Discord] Failed to execute action ${action.type}:`, error);
            }
        }
    }
});

async function main() {
    if (token) {
        await adapter.connect();
        console.log('Discord Bot Runner is active.');
    } else {
        console.log('Discord Bot Runner is waiting for a token...');
    }
}

main().catch(console.error);

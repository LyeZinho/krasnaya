import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { Client, GatewayIntentBits, Message } from 'discord.js';
import { AutomationsService } from '../automations/automations.service';
import { DB_CONNECTION } from 'src/db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

@Injectable()
export class DiscordDispatcherService implements OnModuleInit {
    private readonly logger = new Logger(DiscordDispatcherService.name);
    private client: Client;

    constructor(
        private readonly automationsService: AutomationsService,
        @Inject(DB_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
    ) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
            ],
        });
    }

    async onModuleInit() {
        this.client.on('ready', () => {
            this.logger.log(`Logged in as ${this.client.user?.tag}!`);
        });

        this.client.on('messageCreate', async (message) => {
            if (message.author.bot) return;
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

        // We can add other event handlers (guildMemberAdd, etc) here following the same pattern.

        // Connect to Discord
        const token = process.env.DISCORD_TOKEN;
        if (token) {
            this.client.login(token).catch(err => this.logger.error('Failed to login to Discord', err));
        } else {
            this.logger.warn('DISCORD_TOKEN is not set. Bot will not start.');
        }
    }

    private async handleEvent(eventType: string, eventData: any, guildId: string | null) {
        if (!guildId) return;

        try {
            // 1. Fetch Automations for this guild that match this trigger
            const guildAutomations = await this.db
                .select()
                .from(schema.automations)
                .where(eq(schema.automations.guildId, guildId));

            const activeAutomations = guildAutomations.filter(a => a.enabled);

            for (const automation of activeAutomations) {
                // Parse the trigger JSON to see if it matches our eventType
                const trigger = typeof automation.trigger === 'string' ? JSON.parse(automation.trigger) : automation.trigger;

                if (trigger && trigger.type === eventType) {
                    // Send to BullMQ for condition checking and action execution
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
        } catch (error) {
            this.logger.error(`Error handling event ${eventType}`, error);
        }
    }
}

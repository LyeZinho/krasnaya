import { Client, GatewayIntentBits, Message, TextChannel } from 'discord.js';
import { BotAdapter, BotEvent, BotAction } from '@krasnaya/core';

export class DiscordBotAdapter implements BotAdapter {
    platform = 'discord';
    private client: Client;

    constructor(private token: string) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
            ],
        });
    }

    async connect(): Promise<void> {
        await this.client.login(this.token);
        console.log('Discord Bot connected');
    }

    async disconnect(): Promise<void> {
        await this.client.destroy();
    }

    onEvent(callback: (event: BotEvent) => Promise<void>): void {
        this.client.on('messageCreate', async (message: Message) => {
            if (message.author.bot) return;

            const event: BotEvent = {
                type: 'MESSAGE_CREATE',
                guildId: message.guildId || '',
                userId: message.author.id,
                data: {
                    content: message.content,
                    author: {
                        id: message.author.id,
                        username: message.author.username,
                    },
                    channelId: message.channelId,
                    guildId: message.guildId,
                },
            };

            await callback(event);
        });

        // Add other event listeners as needed
    }

    async executeAction(action: BotAction, eventData: any): Promise<void> {
        switch (action.type) {
            case 'SEND_MESSAGE': {
                const channelId = action.params.channelId || eventData.channelId;
                const channel = await this.client.channels.fetch(channelId) as TextChannel;
                if (channel) {
                    await channel.send(action.params.content);
                }
                break;
            }
            case 'ADD_ROLE': {
                const guild = await this.client.guilds.fetch(eventData.guildId);
                const member = await guild.members.fetch(eventData.userId);
                await member.roles.add(action.params.roleId);
                break;
            }
            // Implement other actions...
        }
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBotAdapter = void 0;
const discord_js_1 = require("discord.js");
class DiscordBotAdapter {
    token;
    platform = 'discord';
    client;
    constructor(token) {
        this.token = token;
        this.client = new discord_js_1.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildMembers,
            ],
        });
    }
    async connect() {
        await this.client.login(this.token);
        console.log('Discord Bot connected');
    }
    async disconnect() {
        await this.client.destroy();
    }
    onEvent(callback) {
        this.client.on('messageCreate', async (message) => {
            if (message.author.bot)
                return;
            const event = {
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
    async executeAction(action, eventData) {
        switch (action.type) {
            case 'SEND_MESSAGE': {
                const channelId = action.params.channelId || eventData.channelId;
                const channel = await this.client.channels.fetch(channelId);
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
exports.DiscordBotAdapter = DiscordBotAdapter;
//# sourceMappingURL=discord-adapter.js.map
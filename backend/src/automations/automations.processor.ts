import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import * as lodash from 'lodash';

@Processor('automations')
export class AutomationsProcessor extends WorkerHost {
    private readonly logger = new Logger(AutomationsProcessor.name);
    private client: Client;

    constructor() {
        super();
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        });

        if (process.env.DISCORD_TOKEN) {
            this.client.login(process.env.DISCORD_TOKEN).catch(e => this.logger.error('Worker failed to login to Discord', e));
        }
    }

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing job ${job.id} for automation ${job.data.automationId}`);

        const { eventData, _automationConfig } = job.data;

        // 1. Evaluate Conditions
        if (_automationConfig.conditions && _automationConfig.conditions.length > 0) {
            let passed = true;
            for (const condition of _automationConfig.conditions) {
                const valueToTest = lodash.get(eventData, condition.field);

                switch (condition.operator) {
                    case 'equals':
                        if (valueToTest !== condition.value) passed = false;
                        break;
                    case 'contains':
                        if (typeof valueToTest !== 'string' || !valueToTest.includes(condition.value)) passed = false;
                        break;
                    // Add other operators (matches_regex, greater_than, etc)
                }

                if (!passed) break;
            }

            if (!passed) {
                this.logger.log(`Job ${job.id} failed conditions. Aborting actions.`);
                return { status: 'aborted_by_condition' };
            }
        }

        // 2. Execute Actions
        for (const action of _automationConfig.actions) {
            await this.executeAction(action, eventData);
        }

        return { status: 'success' };
    }

    private async executeAction(action: any, eventData: any) {
        this.logger.log(`Executing action ${action.type}`);
        switch (action.type) {
            case 'SEND_MESSAGE':
                const channel = await this.client.channels.fetch(eventData.message.channelId);
                if (channel && channel.isSendable()) {
                    const content = this.parsePlaceholders(action.params.content || '', eventData);
                    await channel.send(content);
                }
                break;
            // Implement ADD_ROLE, KICK_MEMBER etc
        }
    }

    private parsePlaceholders(text: string, data: any): string {
        return text.replace(/\{(.*?)\}/g, (match, key) => lodash.get(data, key, match));
    }
}

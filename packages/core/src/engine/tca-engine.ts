import * as lodash from 'lodash';
import * as jsonLogic from 'json-logic-js';
import { BotEvent, BotAction } from '../adapters/bot-adapter.interface';

export interface Action {
    type: string;
    params: any;
}

export interface AutomationConfig {
    trigger: {
        type: string;
        [key: string]: any;
    };
    logic: any; // JSON Logic object
    actions: Action[];
}

export class TcaEngine {
    /**
     * Evaluates complex JSON Logic against event data and context.
     */
    evaluateLogic(logic: any, data: any): boolean {
        if (!logic || Object.keys(logic).length === 0) return true;
        return !!jsonLogic.apply(logic, data);
    }

    /**
     * Processes an event and returns a list of actions to be executed.
     */
    processEvent(event: BotEvent, config: AutomationConfig, context: any = {}): BotAction[] {
        // Merge event data with additional context (e.g. database variables)
        const evaluationData = {
            ...event.data,
            ...context,
            event_type: event.type,
            guild_id: event.guildId,
            user_id: event.userId
        };

        if (!this.evaluateLogic(config.logic, evaluationData)) {
            return [];
        }

        return config.actions.map(action => ({
            type: action.type,
            params: this.parseParams(action.params, evaluationData)
        }));
    }

    /**
     * Interpolates variables in action parameters using {variable.path} syntax.
     */
    parseParams(params: any, data: any): any {
        if (typeof params === 'string') {
            return params.replace(/\{(.*?)\}/g, (match, key) => {
                const val = lodash.get(data, key.trim());
                return val !== undefined ? val : match;
            });
        }

        if (Array.isArray(params)) {
            return params.map(p => this.parseParams(p, data));
        }

        if (typeof params === 'object' && params !== null) {
            const parsed: any = {};
            for (const [key, value] of Object.entries(params)) {
                parsed[key] = this.parseParams(value, data);
            }
            return parsed;
        }

        return params;
    }

    /**
     * Resolves variables in card layers.
     */
    resolveLayers(layers: any[], data: any): any[] {
        return layers.map(layer => this.parseParams(layer, data));
    }
}

import { request } from './api.service';

export interface Automation {
    id: string;
    name: string;
    enabled: boolean;
    trigger: any;
    conditions: any[];
    actions: any[];
}

export class BotService {
    static async getAutomations(): Promise<Automation[]> {
        return request('GET', '/automations');
    }

    static async getAutomation(id: string): Promise<Automation> {
        return request('GET', `/automations/${id}`);
    }

    static async updateAutomation(id: string, data: Partial<Automation>): Promise<Automation> {
        return request('PATCH', `/automations/${id}`, data);
    }

    static async createAutomation(data: Omit<Automation, 'id'>): Promise<Automation> {
        return request('POST', '/automations', data);
    }

    static async deleteAutomation(id: string): Promise<void> {
        return request('DELETE', `/automations/${id}`);
    }
}

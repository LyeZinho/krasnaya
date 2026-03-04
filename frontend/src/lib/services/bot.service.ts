import { ApiService } from './api.service';

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
        return ApiService.get<Automation[]>('/v1/automations');
    }

    static async getAutomation(id: string): Promise<Automation> {
        return ApiService.get<Automation>(`/v1/automations/${id}`);
    }

    static async updateAutomation(id: string, data: Partial<Automation>): Promise<Automation> {
        return ApiService.patch<Automation>(`/v1/automations/${id}`, data);
    }

    static async createAutomation(data: Omit<Automation, 'id'>): Promise<Automation> {
        return ApiService.post<Automation>('/v1/automations', data);
    }

    static async deleteAutomation(id: string): Promise<void> {
        return ApiService.delete<void>(`/v1/automations/${id}`);
    }
}

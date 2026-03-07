import { request } from './api.service';

export interface SystemHealth {
    status: string;
    redis: boolean;
    database: boolean;
}

export class AdminService {
    static async getSystemHealth(): Promise<SystemHealth> {
        return request('GET', '/admin/system/health');
    }

    static async triggerKillSwitch(): Promise<void> {
        return request('POST', '/admin/system/kill', {});
    }
}

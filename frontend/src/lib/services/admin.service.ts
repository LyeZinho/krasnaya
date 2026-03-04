import { ApiService } from './api.service';

export interface SystemHealth {
    status: string;
    redis: boolean;
    database: boolean;
}

export class AdminService {
    static async getSystemHealth(): Promise<SystemHealth> {
        return ApiService.get<SystemHealth>('/v1/system/health');
    }

    static async triggerKillSwitch(): Promise<void> {
        return ApiService.post<void>('/v1/system/kill', {});
    }
}

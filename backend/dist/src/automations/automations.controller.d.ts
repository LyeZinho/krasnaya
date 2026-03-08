import { HttpStatus } from '@nestjs/common';
import { AutomationsService } from './automations.service';
export declare class AutomationsController {
    private readonly automationsService;
    private db;
    constructor(automationsService: AutomationsService, db: any);
    list(guildId: string): Promise<{
        error: string;
        statusCode: number;
        data?: undefined;
        message?: undefined;
    } | {
        statusCode: HttpStatus;
        data: any;
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
        message?: undefined;
    }>;
    getOne(id: string): Promise<{
        statusCode: HttpStatus;
        data: any;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    create(payload: any): Promise<{
        statusCode: HttpStatus;
        data: {
            id: string;
            guildId: any;
            name: any;
            trigger: any;
            conditions: any;
            actions: any;
            enabled: boolean;
            createdAt: number;
        };
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
        message?: undefined;
    }>;
    update(id: string, payload: any): Promise<{
        statusCode: HttpStatus;
        data: any;
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
        message?: undefined;
    }>;
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        message?: undefined;
    }>;
    test(id: string, payload: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        message?: undefined;
    }>;
}

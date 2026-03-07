import { HttpStatus } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export declare class AutomationsController {
    private readonly automationsService;
    private db;
    constructor(automationsService: AutomationsService, db: NodePgDatabase<typeof schema>);
    list(guildId: string): Promise<{
        statusCode: HttpStatus;
        data: {
            guildId: string;
            name: string;
            createdAt: number | null;
            id: string;
            actions: unknown;
            enabled: boolean | null;
            trigger: unknown;
            conditions: unknown;
        }[];
        message: string;
    }>;
    getOne(id: string): Promise<{
        statusCode: HttpStatus;
        data: {
            guildId: string;
            name: string;
            createdAt: number | null;
            id: string;
            actions: unknown;
            enabled: boolean | null;
            trigger: unknown;
            conditions: unknown;
        };
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
    }>;
    update(id: string, payload: any): Promise<{
        statusCode: HttpStatus;
        data: {
            guildId: string;
            name: string;
            createdAt: number | null;
            id: string;
            actions: unknown;
            enabled: boolean | null;
            trigger: unknown;
            conditions: unknown;
        } | undefined;
        message: string;
    }>;
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    test(id: string, payload: any): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}

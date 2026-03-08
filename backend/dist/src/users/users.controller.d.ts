import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(guildId: string): Promise<{
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
    getOne(userId: string, guildId: string): Promise<{
        statusCode: HttpStatus;
        data: any;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    getStats(userId: string, guildId: string): Promise<{
        statusCode: HttpStatus;
        data: any;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    getLeaderboard(guildId: string, limit?: string): Promise<{
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
}

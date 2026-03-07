import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(guildId: string): Promise<{
        statusCode: HttpStatus;
        data: {
            userId: string;
            username: string;
            guildId: string;
            xp: number | null;
            level: number | null;
            messages: number | null;
            voiceTime: number | null;
            lastMessageAt: number | null;
            coins: number | null;
            lastDailyClaim: number | null;
            createdAt: number | null;
        }[];
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
        data: {
            userId: string;
            username: string;
            guildId: string;
            xp: number | null;
            level: number | null;
            messages: number | null;
            voiceTime: number | null;
            lastMessageAt: number | null;
            coins: number | null;
            lastDailyClaim: number | null;
            createdAt: number | null;
        };
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    getStats(userId: string, guildId: string): Promise<{
        statusCode: HttpStatus;
        data: {
            stats: {
                xp: number | null;
                level: number | null;
                messages: number | null;
                voiceTime: number | null;
                coins: number | null;
            };
            userId: string;
            username: string;
            guildId: string;
            xp: number | null;
            level: number | null;
            messages: number | null;
            voiceTime: number | null;
            lastMessageAt: number | null;
            coins: number | null;
            lastDailyClaim: number | null;
            createdAt: number | null;
        };
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    getLeaderboard(guildId: string, limit?: string): Promise<{
        statusCode: HttpStatus;
        data: {
            userId: string;
            username: string;
            guildId: string;
            xp: number | null;
            level: number | null;
            messages: number | null;
            voiceTime: number | null;
            lastMessageAt: number | null;
            coins: number | null;
            lastDailyClaim: number | null;
            createdAt: number | null;
        }[];
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
        message?: undefined;
    }>;
}

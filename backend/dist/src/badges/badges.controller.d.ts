import { HttpStatus } from '@nestjs/common';
import { BadgesService } from './badges.service';
export declare class BadgesController {
    private readonly badgesService;
    constructor(badgesService: BadgesService);
    getAll(activeOnly?: string): Promise<{
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
    getByType(badgeType: string): Promise<{
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
            createdAt: number;
            name?: string | undefined;
            imagePath?: string | undefined;
            badgeType?: string | undefined;
            description?: string | null | undefined;
            badgeId?: number | undefined;
            tier?: number | null | undefined;
            isActive?: boolean | null | undefined;
            expiresAt?: number | null | undefined;
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
    getUserBadges(userId: string, guildId: string): Promise<{
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
    awardBadge(userId: string, guildId: string, payload: any): Promise<{
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
    revokeBadge(userId: string, guildId: string, payload: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        message?: undefined;
    }>;
}

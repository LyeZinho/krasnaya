import { HttpStatus } from '@nestjs/common';
import { ItemsService } from './items.service';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    getAll(hideHidden?: string): Promise<{
        statusCode: HttpStatus;
        data: {
            name: string;
            createdAt: number | null;
            itemId: number;
            description: string | null;
            price: number;
            emoji: string | null;
            type: string | null;
            hidden: boolean | null;
        }[];
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
        data: {
            name: string;
            createdAt: number | null;
            itemId: number;
            description: string | null;
            price: number;
            emoji: string | null;
            type: string | null;
            hidden: boolean | null;
        };
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    create(payload: any): Promise<{
        statusCode: HttpStatus;
        data: {
            name: string;
            price: number;
            createdAt?: number | null | undefined;
            itemId?: number | undefined;
            description?: string | null | undefined;
            emoji?: string | null | undefined;
            type?: string | null | undefined;
            hidden?: boolean | null | undefined;
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
        data: {
            name: string;
            createdAt: number | null;
            itemId: number;
            description: string | null;
            price: number;
            emoji: string | null;
            type: string | null;
            hidden: boolean | null;
        };
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
    getInventory(userId: string, guildId: string): Promise<{
        statusCode: HttpStatus;
        data: {
            userId: string;
            guildId: string;
            itemId: number;
            quantity: number | null;
            acquiredAt: number | null;
        }[];
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
        message?: undefined;
    }>;
    addToInventory(userId: string, guildId: string, payload: any): Promise<{
        statusCode: HttpStatus;
        data: {
            userId: string;
            guildId: string;
            itemId: number;
            quantity: number | null;
            acquiredAt: number | null;
        }[];
        message: string;
        error?: undefined;
    } | {
        error: any;
        statusCode: HttpStatus;
        data?: undefined;
        message?: undefined;
    }>;
    removeFromInventory(userId: string, guildId: string, payload: any): Promise<{
        statusCode: HttpStatus;
        data: {
            userId: string;
            guildId: string;
            itemId: number;
            quantity: number | null;
            acquiredAt: number | null;
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

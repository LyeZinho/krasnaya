import { Controller, Get, Patch, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * GET /api/v1/users?guildId=xxx
     * Get all users in a guild
     */
    @Get()
    async getAll(@Query('guildId') guildId: string) {
        if (!guildId) {
            return {
                error: 'guildId is required',
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        try {
            const users = await this.usersService.getUsersByGuild(guildId);
            return {
                statusCode: HttpStatus.OK,
                data: users,
                message: 'Users fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/users/:userId?guildId=xxx
     * Get a single user
     */
    @Get(':userId')
    async getOne(@Param('userId') userId: string, @Query('guildId') guildId: string) {
        if (!guildId) {
            return {
                error: 'guildId is required',
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        try {
            const user = await this.usersService.getUser(userId, guildId);
            if (!user) {
                return {
                    error: 'User not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: user,
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/users/:userId/stats?guildId=xxx
     * Get user stats
     */
    @Get(':userId/stats')
    async getStats(@Param('userId') userId: string, @Query('guildId') guildId: string) {
        if (!guildId) {
            return {
                error: 'guildId is required',
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        try {
            const stats = await this.usersService.getUserStats(userId, guildId);
            if (!stats) {
                return {
                    error: 'User not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: stats,
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/users/leaderboard?guildId=xxx&limit=10
     * Get leaderboard for a guild
     */
    @Get('leaderboard/top')
    async getLeaderboard(
        @Query('guildId') guildId: string,
        @Query('limit') limit?: string,
    ) {
        if (!guildId) {
            return {
                error: 'guildId is required',
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        try {
            const numLimit = limit ? parseInt(limit) : 10;
            const leaderboard = await this.usersService.getLeaderboard(guildId, numLimit);

            return {
                statusCode: HttpStatus.OK,
                data: leaderboard,
                message: 'Leaderboard fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}

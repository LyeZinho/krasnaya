import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { BadgesService } from './badges.service';

@Controller('api/v1/badges')
export class BadgesController {
    constructor(private readonly badgesService: BadgesService) { }

    /**
     * GET /api/v1/badges?activeOnly=true
     * Get all badges
     */
    @Get()
    async getAll(@Query('activeOnly') activeOnly = 'true') {
        try {
            const data = await this.badgesService.getAllBadges(activeOnly === 'true');

            return {
                statusCode: HttpStatus.OK,
                data,
                message: 'Badges fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/badges/type/:type
     * Get badges by type
     */
    @Get('type/:type')
    async getByType(@Param('type') badgeType: string) {
        try {
            const data = await this.badgesService.getBadgesByType(badgeType);

            return {
                statusCode: HttpStatus.OK,
                data,
                message: 'Badges fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/badges/:id
     * Get a single badge
     */
    @Get(':id')
    async getOne(@Param('id') id: string) {
        try {
            const badgeId = parseInt(id);
            const badge = await this.badgesService.getBadge(badgeId);

            if (!badge) {
                return {
                    error: 'Badge not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: badge,
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/badges
     * Create a new badge (admin only)
     */
    @Post()
    async create(@Body() payload: any) {
        try {
            const { name, description, imagePath, badgeType, tier = 1, isActive = true } = payload;

            if (!name || !imagePath || !badgeType) {
                return {
                    error: 'Missing required fields: name, imagePath, badgeType',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            const newBadge = await this.badgesService.createBadge({
                name,
                description,
                imagePath,
                badgeType,
                tier,
                isActive,
            });

            return {
                statusCode: HttpStatus.CREATED,
                data: newBadge,
                message: 'Badge created successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * PATCH /api/v1/badges/:id
     * Update a badge (admin only)
     */
    @Patch(':id')
    async update(@Param('id') id: string, @Body() payload: any) {
        try {
            const badgeId = parseInt(id);
            const badge = await this.badgesService.updateBadge(badgeId, payload);

            if (!badge) {
                return {
                    error: 'Badge not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: badge,
                message: 'Badge updated successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * DELETE /api/v1/badges/:id
     * Delete a badge (admin only)
     */
    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const badgeId = parseInt(id);
            await this.badgesService.deleteBadge(badgeId);

            return {
                statusCode: HttpStatus.OK,
                message: 'Badge deleted successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/badges/:userId/:guildId/earned
     * Get badges earned by user
     */
    @Get(':userId/:guildId/earned')
    async getUserBadges(@Param('userId') userId: string, @Param('guildId') guildId: string) {
        try {
            const badges = await this.badgesService.getUserBadges(userId, guildId);

            return {
                statusCode: HttpStatus.OK,
                data: badges,
                message: 'User badges fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/badges/:userId/:guildId/award
     * Award a badge to a user (admin only)
     */
    @Post(':userId/:guildId/award')
    async awardBadge(
        @Param('userId') userId: string,
        @Param('guildId') guildId: string,
        @Body() payload: any,
    ) {
        try {
            const { badgeId } = payload;

            if (!badgeId) {
                return {
                    error: 'badgeId is required',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            const result = await this.badgesService.awardBadge(userId, guildId, badgeId);

            return {
                statusCode: HttpStatus.OK,
                data: result,
                message: 'Badge awarded successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/badges/:userId/:guildId/revoke
     * Revoke a badge from a user (admin only)
     */
    @Post(':userId/:guildId/revoke')
    async revokeBadge(
        @Param('userId') userId: string,
        @Param('guildId') guildId: string,
        @Body() payload: any,
    ) {
        try {
            const { badgeId } = payload;

            if (!badgeId) {
                return {
                    error: 'badgeId is required',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            await this.badgesService.revokeBadge(userId, guildId, badgeId);

            return {
                statusCode: HttpStatus.OK,
                message: 'Badge revoked successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}

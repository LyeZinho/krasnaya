import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('api/v1/items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    /**
     * GET /api/v1/items?hideHidden=true
     * Get all items
     */
    @Get()
    async getAll(@Query('hideHidden') hideHidden = 'true') {
        try {
            const shouldHide = hideHidden === 'true';
            const data = await this.itemsService.getAllItems(shouldHide);

            return {
                statusCode: HttpStatus.OK,
                data,
                message: 'Items fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/items/:id
     * Get a single item
     */
    @Get(':id')
    async getOne(@Param('id') id: string) {
        try {
            const itemId = parseInt(id);
            const item = await this.itemsService.getItem(itemId);

            if (!item) {
                return {
                    error: 'Item not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: item,
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/items
     * Create a new item (admin only)
     */
    @Post()
    async create(@Body() payload: any) {
        try {
            const { name, description, price, emoji = '📦', type = 'consumable', hidden = false } = payload;

            if (!name || price === undefined) {
                return {
                    error: 'Missing required fields: name, price',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            const newItem = await this.itemsService.createItem({
                name,
                description,
                price,
                emoji,
                type,
                hidden,
            });

            return {
                statusCode: HttpStatus.CREATED,
                data: newItem,
                message: 'Item created successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * PATCH /api/v1/items/:id
     * Update an item (admin only)
     */
    @Patch(':id')
    async update(@Param('id') id: string, @Body() payload: any) {
        try {
            const itemId = parseInt(id);
            const item = await this.itemsService.updateItem(itemId, payload);

            if (!item) {
                return {
                    error: 'Item not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: item,
                message: 'Item updated successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * DELETE /api/v1/items/:id
     * Delete an item (admin only)
     */
    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const itemId = parseInt(id);
            await this.itemsService.deleteItem(itemId);

            return {
                statusCode: HttpStatus.OK,
                message: 'Item deleted successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/items/:userId/:guildId/inventory
     * Get user's inventory
     */
    @Get(':userId/:guildId/inventory')
    async getInventory(@Param('userId') userId: string, @Param('guildId') guildId: string) {
        try {
            const inventory = await this.itemsService.getUserInventory(userId, guildId);

            return {
                statusCode: HttpStatus.OK,
                data: inventory,
                message: 'Inventory fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/items/:userId/:guildId/add
     * Add item to user's inventory
     */
    @Post(':userId/:guildId/add')
    async addToInventory(
        @Param('userId') userId: string,
        @Param('guildId') guildId: string,
        @Body() payload: any,
    ) {
        try {
            const { itemId, quantity = 1 } = payload;

            if (!itemId) {
                return {
                    error: 'itemId is required',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            const inventory = await this.itemsService.addToInventory(
                userId,
                guildId,
                itemId,
                quantity,
            );

            return {
                statusCode: HttpStatus.OK,
                data: inventory,
                message: 'Item added to inventory',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/items/:userId/:guildId/remove
     * Remove item from user's inventory
     */
    @Post(':userId/:guildId/remove')
    async removeFromInventory(
        @Param('userId') userId: string,
        @Param('guildId') guildId: string,
        @Body() payload: any,
    ) {
        try {
            const { itemId, quantity = 1 } = payload;

            if (!itemId) {
                return {
                    error: 'itemId is required',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            const inventory = await this.itemsService.removeFromInventory(
                userId,
                guildId,
                itemId,
                quantity,
            );

            return {
                statusCode: HttpStatus.OK,
                data: inventory,
                message: 'Item removed from inventory',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}

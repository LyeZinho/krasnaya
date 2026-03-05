import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import { automations } from '../db/schema';
import { eq, and } from 'drizzle-orm';

@Controller('api/v1/automations')
export class AutomationsController {
    constructor(
        private readonly automationsService: AutomationsService,
        @Inject(DB_CONNECTION) private db: any,
    ) { }

    /**
     * GET /api/v1/automations?guildId=xxx
     * List all automations for a guild
     */
    @Get()
    async list(@Query('guildId') guildId: string) {
        if (!guildId) {
            return { error: 'guildId is required', statusCode: 400 };
        }

        try {
            const result = await this.db.query.automations.findMany({
                where: eq(automations.guildId, guildId),
            });
            return {
                statusCode: HttpStatus.OK,
                data: result,
                message: 'Automations fetched successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * GET /api/v1/automations/:id
     * Get a single automation by ID
     */
    @Get(':id')
    async getOne(@Param('id') id: string) {
        try {
            const result = await this.db.query.automations.findFirst({
                where: eq(automations.id, id),
            });

            if (!result) {
                return {
                    error: 'Automation not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: result,
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/automations
     * Create a new automation
     * Body: { guildId, name, trigger, conditions?, actions }
     */
    @Post()
    async create(@Body() payload: any) {
        try {
            const { guildId, name, trigger, conditions = [], actions } = payload;

            if (!guildId || !name || !trigger || !actions) {
                return {
                    error: 'Missing required fields: guildId, name, trigger, actions',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            const id = uuidv4();
            const newAutomation = {
                id,
                guildId,
                name,
                trigger,
                conditions,
                actions,
                enabled: true,
                createdAt: Math.floor(Date.now() / 1000),
            };

            await this.db.insert(automations).values(newAutomation);

            return {
                statusCode: HttpStatus.CREATED,
                data: newAutomation,
                message: 'Automation created successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * PATCH /api/v1/automations/:id
     * Update an automation
     * Body: { name?, trigger?, conditions?, actions?, enabled? }
     */
    @Patch(':id')
    async update(@Param('id') id: string, @Body() payload: any) {
        try {
            // First verify the automation exists
            const existing = await this.db.query.automations.findFirst({
                where: eq(automations.id, id),
            });

            if (!existing) {
                return {
                    error: 'Automation not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            // Build update object - only update provided fields
            const updateData: any = {};
            if (payload.name !== undefined) updateData.name = payload.name;
            if (payload.trigger !== undefined) updateData.trigger = payload.trigger;
            if (payload.conditions !== undefined) updateData.conditions = payload.conditions;
            if (payload.actions !== undefined) updateData.actions = payload.actions;
            if (payload.enabled !== undefined) updateData.enabled = payload.enabled;

            if (Object.keys(updateData).length === 0) {
                return {
                    error: 'No fields to update',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            }

            await this.db
                .update(automations)
                .set(updateData)
                .where(eq(automations.id, id));

            const updated = await this.db.query.automations.findFirst({
                where: eq(automations.id, id),
            });

            return {
                statusCode: HttpStatus.OK,
                data: updated,
                message: 'Automation updated successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * DELETE /api/v1/automations/:id
     * Delete an automation
     */
    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            // First verify the automation exists
            const existing = await this.db.query.automations.findFirst({
                where: eq(automations.id, id),
            });

            if (!existing) {
                return {
                    error: 'Automation not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            await this.db.delete(automations).where(eq(automations.id, id));

            return {
                statusCode: HttpStatus.OK,
                message: 'Automation deleted successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * POST /api/v1/automations/:id/test
     * Test an automation with sample data
     */
    @Post(':id/test')
    async test(@Param('id') id: string, @Body() payload: any) {
        try {
            const automation = await this.db.query.automations.findFirst({
                where: eq(automations.id, id),
            });

            if (!automation) {
                return {
                    error: 'Automation not found',
                    statusCode: HttpStatus.NOT_FOUND,
                };
            }

            // Dispatch to BullMQ for testing
            await this.automationsService.dispatchAutomation(id, payload.eventData || {});

            return {
                statusCode: HttpStatus.OK,
                message: 'Test job queued successfully',
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}

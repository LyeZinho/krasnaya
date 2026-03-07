import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Controller('api/v1/automations')
export class AutomationsController {
    constructor(
        private readonly automationsService: AutomationsService,
        @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
    ) { }

/**
 * GET /api/v1/automations?guildId=xxx
 * List all automations for a guild
 */
@Get()
async list(@Query('guildId') guildId: string) {
    if (!guildId) {
        throw new HttpException('guildId is required', HttpStatus.BAD_REQUEST);
    }

    try {
        const result = await this.db.query.automations.findMany({
            where: eq(schema.automations.guildId, guildId),
        });
        return result;
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            where: eq(schema.automations.id, id),
        });

        if (!result) {
            throw new HttpException('Automation not found', HttpStatus.NOT_FOUND);
        }

        return result;
    } catch (error) {
        if (error instanceof HttpException) throw error;
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(
                'Missing required fields: guildId, name, trigger, actions',
                HttpStatus.BAD_REQUEST
            );
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

        await this.db.insert(schema.automations).values(newAutomation);

        return newAutomation;
    } catch (error) {
        if (error instanceof HttpException) throw error;
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            where: eq(schema.automations.id, id),
        });

        if (!existing) {
            throw new HttpException('Automation not found', HttpStatus.NOT_FOUND);
        }

        // Build update object - only update provided fields
        const updateData: any = {};
        if (payload.name !== undefined) updateData.name = payload.name;
        if (payload.trigger !== undefined) updateData.trigger = payload.trigger;
        if (payload.conditions !== undefined) updateData.conditions = payload.conditions;
        if (payload.actions !== undefined) updateData.actions = payload.actions;
        if (payload.enabled !== undefined) updateData.enabled = payload.enabled;

        if (Object.keys(updateData).length === 0) {
            throw new HttpException('No fields to update', HttpStatus.BAD_REQUEST);
        }

        await this.db
            .update(schema.automations)
            .set(updateData)
            .where(eq(schema.automations.id, id));

        const updated = await this.db.query.automations.findFirst({
            where: eq(schema.automations.id, id),
        });

        return updated;
    } catch (error) {
        if (error instanceof HttpException) throw error;
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

/**
 * DELETE /api/v1/automations/:id
 * Delete an automation
 */
@Delete(':id')
async delete (@Param('id') id: string) {
    try {
        // First verify the automation exists
        const existing = await this.db.query.automations.findFirst({
            where: eq(schema.automations.id, id),
        });

        if (!existing) {
            throw new HttpException('Automation not found', HttpStatus.NOT_FOUND);
        }

        await this.db.delete(schema.automations).where(eq(schema.automations.id, id));

        return { message: 'Automation deleted successfully' };
    } catch (error) {
        if (error instanceof HttpException) throw error;
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            where: eq(schema.automations.id, id),
        });

        if (!automation) {
            throw new HttpException('Automation not found', HttpStatus.NOT_FOUND);
        }

        // Dispatch to BullMQ for testing
        await this.automationsService.dispatchAutomation(id, payload.eventData || {});

        return { message: 'Test job queued successfully' };
    } catch (error) {
        if (error instanceof HttpException) throw error;
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}

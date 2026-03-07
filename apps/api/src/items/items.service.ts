import { Injectable, Logger, Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '@krasnaya/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class ItemsService {
    private readonly logger = new Logger(ItemsService.name);

    constructor(@Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>) { }

    /**
     * Get all items (with optional filtering)
     */
    async getAllItems(hideHidden = true) {
        try {
            if (hideHidden) {
                return await this.db.query.items.findMany({
                    where: (items, { eq }) => eq(items.hidden, false) as any,
                });
            }
            return await this.db.query.items.findMany();
        } catch (error) {
            this.logger.error('Error fetching items:', error);
            throw error;
        }
    }

    /**
     * Get a single item
     */
    async getItem(itemId: number) {
        try {
            return await this.db.query.items.findFirst({
                where: (items, { eq }) => eq(items.itemId, itemId) as any,
            });
        } catch (error) {
            this.logger.error(`Error fetching item ${itemId}:`, error);
            throw error;
        }
    }

    /**
     * Create a new item
     */
    async createItem(data: Partial<typeof schema.items.$inferInsert>) {
        try {
            const newItem = {
                ...data,
                createdAt: Math.floor(Date.now() / 1000),
            } as typeof schema.items.$inferInsert;
            await this.db.insert(schema.items).values(newItem);
            return newItem;
        } catch (error) {
            this.logger.error('Error creating item:', error);
            throw error;
        }
    }

    /**
     * Update an item
     */
    async updateItem(itemId: number, updates: Partial<typeof schema.items.$inferInsert>) {
        try {
            await this.db
                .update(schema.items)
                .set(updates)
                .where(eq(schema.items.itemId, itemId));
            return await this.getItem(itemId);
        } catch (error) {
            this.logger.error(`Error updating item ${itemId}:`, error);
            throw error;
        }
    }

    /**
     * Delete an item
     */
    async deleteItem(itemId: number) {
        try {
            await this.db.delete(schema.items).where(eq(schema.items.itemId, itemId));
            return true;
        } catch (error) {
            this.logger.error(`Error deleting item ${itemId}:`, error);
            throw error;
        }
    }

    /**
     * Get user inventory
     */
    async getUserInventory(userId: string, guildId: string) {
        try {
            return await this.db.query.userInventory.findMany({
                where: (ui, { eq, and }) => and(
                    eq(ui.userId, userId),
                    eq(ui.guildId, guildId)
                ) as any,
            });
        } catch (error) {
            this.logger.error(`Error fetching inventory for user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Add item to user inventory
     */
    async addToInventory(userId: string, guildId: string, itemId: number, quantity = 1) {
        try {
            // Check if user already has this item
            const existing = await this.db.query.userInventory.findFirst({
                where: (ui, { eq, and }) =>
                    and(
                        eq(ui.userId, userId),
                        eq(ui.guildId, guildId),
                        eq(ui.itemId, itemId),
                    ) as any,
            });

            if (existing) {
                // Update quantity
                await this.db
                    .update(schema.userInventory)
                    .set({ quantity: (existing.quantity || 0) + quantity })
                    .where(
                        and(
                            eq(schema.userInventory.userId, userId),
                            eq(schema.userInventory.guildId, guildId),
                            eq(schema.userInventory.itemId, itemId)
                        )
                    );
            } else {
                // Insert new entry
                await this.db.insert(schema.userInventory).values({
                    userId,
                    guildId,
                    itemId,
                    quantity,
                    acquiredAt: Math.floor(Date.now() / 1000),
                });
            }

            return await this.getUserInventory(userId, guildId);
        } catch (error) {
            this.logger.error(
                `Error adding item ${itemId} to inventory for user ${userId}:`,
                error,
            );
            throw error;
        }
    }

    /**
     * Remove item from inventory
     */
    async removeFromInventory(userId: string, guildId: string, itemId: number, quantity = 1) {
        try {
            const existing = await this.db.query.userInventory.findFirst({
                where: (ui, { eq, and }) =>
                    and(
                        eq(ui.userId, userId),
                        eq(ui.guildId, guildId),
                        eq(ui.itemId, itemId),
                    ) as any,
            });

            if (!existing) {
                throw new Error('Item not in inventory');
            }

            const newQuantity = (existing.quantity || 0) - quantity;

            if (newQuantity <= 0) {
                await this.db
                    .delete(schema.userInventory)
                    .where(
                        and(
                            eq(schema.userInventory.userId, userId),
                            eq(schema.userInventory.guildId, guildId),
                            eq(schema.userInventory.itemId, itemId)
                        )
                    );
            } else {
                await this.db
                    .update(schema.userInventory)
                    .set({ quantity: newQuantity })
                    .where(
                        and(
                            eq(schema.userInventory.userId, userId),
                            eq(schema.userInventory.guildId, guildId),
                            eq(schema.userInventory.itemId, itemId)
                        )
                    );
            }

            return await this.getUserInventory(userId, guildId);
        } catch (error) {
            this.logger.error(
                `Error removing item ${itemId} from inventory for user ${userId}:`,
                error,
            );
            throw error;
        }
    }
}

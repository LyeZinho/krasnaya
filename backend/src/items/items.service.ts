import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from '../db/db.module';
import { items, userInventory } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ItemsService {
    private readonly logger = new Logger(ItemsService.name);

    constructor(@Inject(DB_CONNECTION) private db: any) { }

    /**
     * Get all items (with optional filtering)
     */
    async getAllItems(hideHidden = true) {
        try {
            let query = this.db.query.items.findMany();
            if (hideHidden) {
                query = this.db.query.items.findMany({
                    where: (i) => i.hidden === false,
                });
            }
            return await query;
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
                where: eq(items.itemId, itemId),
            });
        } catch (error) {
            this.logger.error(`Error fetching item ${itemId}:`, error);
            throw error;
        }
    }

    /**
     * Create a new item
     */
    async createItem(data: Partial<typeof items.$inferInsert>) {
        try {
            const newItem = {
                ...data,
                createdAt: Math.floor(Date.now() / 1000),
            };
            await this.db.insert(items).values(newItem);
            return newItem;
        } catch (error) {
            this.logger.error('Error creating item:', error);
            throw error;
        }
    }

    /**
     * Update an item
     */
    async updateItem(itemId: number, updates: Partial<typeof items.$inferInsert>) {
        try {
            await this.db
                .update(items)
                .set(updates)
                .where(eq(items.itemId, itemId));
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
            await this.db.delete(items).where(eq(items.itemId, itemId));
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
                where: (ui) => ui.userId === userId && ui.guildId === guildId,
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
                where: (ui) =>
                    ui.userId === userId &&
                    ui.guildId === guildId &&
                    ui.itemId === itemId,
            });

            if (existing) {
                // Update quantity
                await this.db
                    .update(userInventory)
                    .set({ quantity: existing.quantity + quantity })
                    .where(
                        (ui) =>
                            ui.userId === userId &&
                            ui.guildId === guildId &&
                            ui.itemId === itemId,
                    );
            } else {
                // Insert new entry
                await this.db.insert(userInventory).values({
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
                where: (ui) =>
                    ui.userId === userId &&
                    ui.guildId === guildId &&
                    ui.itemId === itemId,
            });

            if (!existing) {
                throw new Error('Item not in inventory');
            }

            const newQuantity = existing.quantity - quantity;

            if (newQuantity <= 0) {
                await this.db
                    .delete(userInventory)
                    .where(
                        (ui) =>
                            ui.userId === userId &&
                            ui.guildId === guildId &&
                            ui.itemId === itemId,
                    );
            } else {
                await this.db
                    .update(userInventory)
                    .set({ quantity: newQuantity })
                    .where(
                        (ui) =>
                            ui.userId === userId &&
                            ui.guildId === guildId &&
                            ui.itemId === itemId,
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

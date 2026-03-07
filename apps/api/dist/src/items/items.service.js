"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ItemsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
let ItemsService = ItemsService_1 = class ItemsService {
    db;
    logger = new common_1.Logger(ItemsService_1.name);
    constructor(db) {
        this.db = db;
    }
    async getAllItems(hideHidden = true) {
        try {
            if (hideHidden) {
                return await this.db.query.items.findMany({
                    where: (items, { eq }) => eq(items.hidden, false),
                });
            }
            return await this.db.query.items.findMany();
        }
        catch (error) {
            this.logger.error('Error fetching items:', error);
            throw error;
        }
    }
    async getItem(itemId) {
        try {
            return await this.db.query.items.findFirst({
                where: (items, { eq }) => eq(items.itemId, itemId),
            });
        }
        catch (error) {
            this.logger.error(`Error fetching item ${itemId}:`, error);
            throw error;
        }
    }
    async createItem(data) {
        try {
            const newItem = {
                ...data,
                createdAt: Math.floor(Date.now() / 1000),
            };
            await this.db.insert(schema.items).values(newItem);
            return newItem;
        }
        catch (error) {
            this.logger.error('Error creating item:', error);
            throw error;
        }
    }
    async updateItem(itemId, updates) {
        try {
            await this.db
                .update(schema.items)
                .set(updates)
                .where((0, drizzle_orm_1.eq)(schema.items.itemId, itemId));
            return await this.getItem(itemId);
        }
        catch (error) {
            this.logger.error(`Error updating item ${itemId}:`, error);
            throw error;
        }
    }
    async deleteItem(itemId) {
        try {
            await this.db.delete(schema.items).where((0, drizzle_orm_1.eq)(schema.items.itemId, itemId));
            return true;
        }
        catch (error) {
            this.logger.error(`Error deleting item ${itemId}:`, error);
            throw error;
        }
    }
    async getUserInventory(userId, guildId) {
        try {
            return await this.db.query.userInventory.findMany({
                where: (ui, { eq, and }) => and(eq(ui.userId, userId), eq(ui.guildId, guildId)),
            });
        }
        catch (error) {
            this.logger.error(`Error fetching inventory for user ${userId}:`, error);
            throw error;
        }
    }
    async addToInventory(userId, guildId, itemId, quantity = 1) {
        try {
            const existing = await this.db.query.userInventory.findFirst({
                where: (ui, { eq, and }) => and(eq(ui.userId, userId), eq(ui.guildId, guildId), eq(ui.itemId, itemId)),
            });
            if (existing) {
                await this.db
                    .update(schema.userInventory)
                    .set({ quantity: (existing.quantity || 0) + quantity })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.userInventory.userId, userId), (0, drizzle_orm_1.eq)(schema.userInventory.guildId, guildId), (0, drizzle_orm_1.eq)(schema.userInventory.itemId, itemId)));
            }
            else {
                await this.db.insert(schema.userInventory).values({
                    userId,
                    guildId,
                    itemId,
                    quantity,
                    acquiredAt: Math.floor(Date.now() / 1000),
                });
            }
            return await this.getUserInventory(userId, guildId);
        }
        catch (error) {
            this.logger.error(`Error adding item ${itemId} to inventory for user ${userId}:`, error);
            throw error;
        }
    }
    async removeFromInventory(userId, guildId, itemId, quantity = 1) {
        try {
            const existing = await this.db.query.userInventory.findFirst({
                where: (ui, { eq, and }) => and(eq(ui.userId, userId), eq(ui.guildId, guildId), eq(ui.itemId, itemId)),
            });
            if (!existing) {
                throw new Error('Item not in inventory');
            }
            const newQuantity = (existing.quantity || 0) - quantity;
            if (newQuantity <= 0) {
                await this.db
                    .delete(schema.userInventory)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.userInventory.userId, userId), (0, drizzle_orm_1.eq)(schema.userInventory.guildId, guildId), (0, drizzle_orm_1.eq)(schema.userInventory.itemId, itemId)));
            }
            else {
                await this.db
                    .update(schema.userInventory)
                    .set({ quantity: newQuantity })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.userInventory.userId, userId), (0, drizzle_orm_1.eq)(schema.userInventory.guildId, guildId), (0, drizzle_orm_1.eq)(schema.userInventory.itemId, itemId)));
            }
            return await this.getUserInventory(userId, guildId);
        }
        catch (error) {
            this.logger.error(`Error removing item ${itemId} from inventory for user ${userId}:`, error);
            throw error;
        }
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = ItemsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], ItemsService);
//# sourceMappingURL=items.service.js.map
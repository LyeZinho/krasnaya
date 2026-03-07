"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
let ItemsController = class ItemsController {
    itemsService;
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async getAll(hideHidden = 'true') {
        try {
            const shouldHide = hideHidden === 'true';
            const data = await this.itemsService.getAllItems(shouldHide);
            return {
                statusCode: common_1.HttpStatus.OK,
                data,
                message: 'Items fetched successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async getOne(id) {
        try {
            const itemId = parseInt(id);
            const item = await this.itemsService.getItem(itemId);
            if (!item) {
                return {
                    error: 'Item not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: item,
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async create(payload) {
        try {
            const { name, description, price, emoji = '📦', type = 'consumable', hidden = false } = payload;
            if (!name || price === undefined) {
                return {
                    error: 'Missing required fields: name, price',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
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
                statusCode: common_1.HttpStatus.CREATED,
                data: newItem,
                message: 'Item created successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async update(id, payload) {
        try {
            const itemId = parseInt(id);
            const item = await this.itemsService.updateItem(itemId, payload);
            if (!item) {
                return {
                    error: 'Item not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: item,
                message: 'Item updated successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async delete(id) {
        try {
            const itemId = parseInt(id);
            await this.itemsService.deleteItem(itemId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Item deleted successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async getInventory(userId, guildId) {
        try {
            const inventory = await this.itemsService.getUserInventory(userId, guildId);
            return {
                statusCode: common_1.HttpStatus.OK,
                data: inventory,
                message: 'Inventory fetched successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async addToInventory(userId, guildId, payload) {
        try {
            const { itemId, quantity = 1 } = payload;
            if (!itemId) {
                return {
                    error: 'itemId is required',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            const inventory = await this.itemsService.addToInventory(userId, guildId, itemId, quantity);
            return {
                statusCode: common_1.HttpStatus.OK,
                data: inventory,
                message: 'Item added to inventory',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async removeFromInventory(userId, guildId, payload) {
        try {
            const { itemId, quantity = 1 } = payload;
            if (!itemId) {
                return {
                    error: 'itemId is required',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            const inventory = await this.itemsService.removeFromInventory(userId, guildId, itemId, quantity);
            return {
                statusCode: common_1.HttpStatus.OK,
                data: inventory,
                message: 'Item removed from inventory',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('hideHidden')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':userId/:guildId/inventory'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Post)(':userId/:guildId/add'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('guildId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "addToInventory", null);
__decorate([
    (0, common_1.Post)(':userId/:guildId/remove'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('guildId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "removeFromInventory", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('api/v1/items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map
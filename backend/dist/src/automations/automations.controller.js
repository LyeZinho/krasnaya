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
exports.AutomationsController = void 0;
const common_1 = require("@nestjs/common");
const automations_service_1 = require("./automations.service");
const uuid_1 = require("uuid");
const common_2 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let AutomationsController = class AutomationsController {
    automationsService;
    db;
    constructor(automationsService, db) {
        this.automationsService = automationsService;
        this.db = db;
    }
    async list(guildId) {
        if (!guildId) {
            return { error: 'guildId is required', statusCode: 400 };
        }
        try {
            const result = await this.db.query.automations.findMany({
                where: (0, drizzle_orm_1.eq)(schema_1.automations.guildId, guildId),
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: result,
                message: 'Automations fetched successfully',
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
            const result = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.automations.id, id),
            });
            if (!result) {
                return {
                    error: 'Automation not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: result,
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
            const { guildId, name, trigger, conditions = [], actions } = payload;
            if (!guildId || !name || !trigger || !actions) {
                return {
                    error: 'Missing required fields: guildId, name, trigger, actions',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            const id = (0, uuid_1.v4)();
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
            await this.db.insert(schema_1.automations).values(newAutomation);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                data: newAutomation,
                message: 'Automation created successfully',
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
            const existing = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.automations.id, id),
            });
            if (!existing) {
                return {
                    error: 'Automation not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            const updateData = {};
            if (payload.name !== undefined)
                updateData.name = payload.name;
            if (payload.trigger !== undefined)
                updateData.trigger = payload.trigger;
            if (payload.conditions !== undefined)
                updateData.conditions = payload.conditions;
            if (payload.actions !== undefined)
                updateData.actions = payload.actions;
            if (payload.enabled !== undefined)
                updateData.enabled = payload.enabled;
            if (Object.keys(updateData).length === 0) {
                return {
                    error: 'No fields to update',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            await this.db
                .update(schema_1.automations)
                .set(updateData)
                .where((0, drizzle_orm_1.eq)(schema_1.automations.id, id));
            const updated = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.automations.id, id),
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: updated,
                message: 'Automation updated successfully',
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
            const existing = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.automations.id, id),
            });
            if (!existing) {
                return {
                    error: 'Automation not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.db.delete(schema_1.automations).where((0, drizzle_orm_1.eq)(schema_1.automations.id, id));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Automation deleted successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async test(id, payload) {
        try {
            const automation = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.automations.id, id),
            });
            if (!automation) {
                return {
                    error: 'Automation not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.automationsService.dispatchAutomation(id, payload.eventData || {});
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Test job queued successfully',
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
exports.AutomationsController = AutomationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutomationsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutomationsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AutomationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AutomationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AutomationsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/test'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AutomationsController.prototype, "test", null);
exports.AutomationsController = AutomationsController = __decorate([
    (0, common_1.Controller)('api/v1/automations'),
    __param(1, (0, common_2.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [automations_service_1.AutomationsService, Object])
], AutomationsController);
//# sourceMappingURL=automations.controller.js.map
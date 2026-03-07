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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationsController = void 0;
const common_1 = require("@nestjs/common");
const automations_service_1 = require("./automations.service");
const uuid_1 = require("uuid");
const common_2 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const drizzle_orm_1 = require("drizzle-orm");
const node_postgres_1 = require("drizzle-orm/node-postgres");
let AutomationsController = class AutomationsController {
    automationsService;
    db;
    constructor(automationsService, db) {
        this.automationsService = automationsService;
        this.db = db;
    }
    async list(guildId) {
        if (!guildId) {
            throw new common_1.HttpException('guildId is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.db.query.automations.findMany({
                where: (0, drizzle_orm_1.eq)(schema.automations.guildId, guildId),
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: result,
                message: 'Automations fetched successfully',
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(id) {
        try {
            const result = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.automations.id, id),
            });
            if (!result) {
                throw new common_1.HttpException('Automation not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: result,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            const { guildId, name, trigger, conditions = [], actions } = payload;
            if (!guildId || !name || !trigger || !actions) {
                throw new common_1.HttpException('Missing required fields: guildId, name, trigger, actions', common_1.HttpStatus.BAD_REQUEST);
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
            await this.db.insert(schema.automations).values(newAutomation);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                data: newAutomation,
                message: 'Automation created successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const existing = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.automations.id, id),
            });
            if (!existing) {
                throw new common_1.HttpException('Automation not found', common_1.HttpStatus.NOT_FOUND);
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
                throw new common_1.HttpException('No fields to update', common_1.HttpStatus.BAD_REQUEST);
            }
            await this.db
                .update(schema.automations)
                .set(updateData)
                .where((0, drizzle_orm_1.eq)(schema.automations.id, id));
            const updated = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.automations.id, id),
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: updated,
                message: 'Automation updated successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const existing = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.automations.id, id),
            });
            if (!existing) {
                throw new common_1.HttpException('Automation not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.db.delete(schema.automations).where((0, drizzle_orm_1.eq)(schema.automations.id, id));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Automation deleted successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async test(id, payload) {
        try {
            const automation = await this.db.query.automations.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.automations.id, id),
            });
            if (!automation) {
                throw new common_1.HttpException('Automation not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.automationsService.dispatchAutomation(id, payload.eventData || {});
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Test job queued successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    __metadata("design:paramtypes", [automations_service_1.AutomationsService,
        node_postgres_1.NodePgDatabase])
], AutomationsController);
//# sourceMappingURL=automations.controller.js.map
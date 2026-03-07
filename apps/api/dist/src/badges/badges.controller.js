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
exports.BadgesController = void 0;
const common_1 = require("@nestjs/common");
const badges_service_1 = require("./badges.service");
let BadgesController = class BadgesController {
    badgesService;
    constructor(badgesService) {
        this.badgesService = badgesService;
    }
    async getAll(activeOnly = 'true') {
        try {
            const data = await this.badgesService.getAllBadges(activeOnly === 'true');
            return {
                statusCode: common_1.HttpStatus.OK,
                data,
                message: 'Badges fetched successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async getByType(badgeType) {
        try {
            const data = await this.badgesService.getBadgesByType(badgeType);
            return {
                statusCode: common_1.HttpStatus.OK,
                data,
                message: 'Badges fetched successfully',
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
            const badgeId = parseInt(id);
            const badge = await this.badgesService.getBadge(badgeId);
            if (!badge) {
                return {
                    error: 'Badge not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: badge,
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
            const { name, description, imagePath, badgeType, tier = 1, isActive = true } = payload;
            if (!name || !imagePath || !badgeType) {
                return {
                    error: 'Missing required fields: name, imagePath, badgeType',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
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
                statusCode: common_1.HttpStatus.CREATED,
                data: newBadge,
                message: 'Badge created successfully',
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
            const badgeId = parseInt(id);
            const badge = await this.badgesService.updateBadge(badgeId, payload);
            if (!badge) {
                return {
                    error: 'Badge not found',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: badge,
                message: 'Badge updated successfully',
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
            const badgeId = parseInt(id);
            await this.badgesService.deleteBadge(badgeId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Badge deleted successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async getUserBadges(userId, guildId) {
        try {
            const badges = await this.badgesService.getUserBadges(userId, guildId);
            return {
                statusCode: common_1.HttpStatus.OK,
                data: badges,
                message: 'User badges fetched successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async awardBadge(userId, guildId, payload) {
        try {
            const { badgeId } = payload;
            if (!badgeId) {
                return {
                    error: 'badgeId is required',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            const result = await this.badgesService.awardBadge(userId, guildId, badgeId);
            return {
                statusCode: common_1.HttpStatus.OK,
                data: result,
                message: 'Badge awarded successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async revokeBadge(userId, guildId, payload) {
        try {
            const { badgeId } = payload;
            if (!badgeId) {
                return {
                    error: 'badgeId is required',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            await this.badgesService.revokeBadge(userId, guildId, badgeId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Badge revoked successfully',
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
exports.BadgesController = BadgesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "getByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':userId/:guildId/earned'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('guildId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "getUserBadges", null);
__decorate([
    (0, common_1.Post)(':userId/:guildId/award'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('guildId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "awardBadge", null);
__decorate([
    (0, common_1.Post)(':userId/:guildId/revoke'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('guildId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BadgesController.prototype, "revokeBadge", null);
exports.BadgesController = BadgesController = __decorate([
    (0, common_1.Controller)('api/v1/badges'),
    __metadata("design:paramtypes", [badges_service_1.BadgesService])
], BadgesController);
//# sourceMappingURL=badges.controller.js.map
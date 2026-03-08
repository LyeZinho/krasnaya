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
var BadgesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let BadgesService = BadgesService_1 = class BadgesService {
    db;
    logger = new common_1.Logger(BadgesService_1.name);
    constructor(db) {
        this.db = db;
    }
    async getAllBadges(activeOnly = true) {
        try {
            if (activeOnly) {
                return await this.db.query.badges.findMany({
                    where: (b) => b.isActive === true,
                });
            }
            return await this.db.query.badges.findMany();
        }
        catch (error) {
            this.logger.error('Error fetching badges:', error);
            throw error;
        }
    }
    async getBadge(badgeId) {
        try {
            return await this.db.query.badges.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.badges.badgeId, badgeId),
            });
        }
        catch (error) {
            this.logger.error(`Error fetching badge ${badgeId}:`, error);
            throw error;
        }
    }
    async createBadge(data) {
        try {
            const newBadge = {
                ...data,
                createdAt: Math.floor(Date.now() / 1000),
            };
            await this.db.insert(schema_1.badges).values(newBadge);
            return newBadge;
        }
        catch (error) {
            this.logger.error('Error creating badge:', error);
            throw error;
        }
    }
    async updateBadge(badgeId, updates) {
        try {
            await this.db
                .update(schema_1.badges)
                .set(updates)
                .where((0, drizzle_orm_1.eq)(schema_1.badges.badgeId, badgeId));
            return await this.getBadge(badgeId);
        }
        catch (error) {
            this.logger.error(`Error updating badge ${badgeId}:`, error);
            throw error;
        }
    }
    async deleteBadge(badgeId) {
        try {
            await this.db.delete(schema_1.badges).where((0, drizzle_orm_1.eq)(schema_1.badges.badgeId, badgeId));
            return true;
        }
        catch (error) {
            this.logger.error(`Error deleting badge ${badgeId}:`, error);
            throw error;
        }
    }
    async getUserBadges(userId, guildId) {
        try {
            return await this.db.query.userBadges.findMany({
                where: (ub) => ub.userId === userId && ub.guildId === guildId,
            });
        }
        catch (error) {
            this.logger.error(`Error fetching badges for user ${userId}:`, error);
            throw error;
        }
    }
    async awardBadge(userId, guildId, badgeId) {
        try {
            const existing = await this.db.query.userBadges.findFirst({
                where: (ub) => ub.userId === userId &&
                    ub.guildId === guildId &&
                    ub.badgeId === badgeId,
            });
            if (existing) {
                return existing;
            }
            const newUserBadge = {
                userId,
                guildId,
                badgeId,
                earnedAt: Math.floor(Date.now() / 1000),
            };
            await this.db.insert(schema_1.userBadges).values(newUserBadge);
            return newUserBadge;
        }
        catch (error) {
            this.logger.error(`Error awarding badge ${badgeId} to user ${userId}:`, error);
            throw error;
        }
    }
    async revokeBadge(userId, guildId, badgeId) {
        try {
            await this.db
                .delete(schema_1.userBadges)
                .where((ub) => ub.userId === userId &&
                ub.guildId === guildId &&
                ub.badgeId === badgeId);
            return true;
        }
        catch (error) {
            this.logger.error(`Error revoking badge ${badgeId} from user ${userId}:`, error);
            throw error;
        }
    }
    async getBadgesByType(badgeType) {
        try {
            return await this.db.query.badges.findMany({
                where: (b) => b.badgeType === badgeType,
            });
        }
        catch (error) {
            this.logger.error(`Error fetching badges of type ${badgeType}:`, error);
            throw error;
        }
    }
};
exports.BadgesService = BadgesService;
exports.BadgesService = BadgesService = BadgesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], BadgesService);
//# sourceMappingURL=badges.service.js.map
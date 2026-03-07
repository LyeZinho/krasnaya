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
var BadgesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
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
                    where: (badges, { eq }) => eq(badges.isActive, true),
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
                where: (badges, { eq }) => eq(badges.badgeId, badgeId),
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
            await this.db.insert(schema.badges).values(newBadge);
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
                .update(schema.badges)
                .set(updates)
                .where((0, drizzle_orm_1.eq)(schema.badges.badgeId, badgeId));
            return await this.getBadge(badgeId);
        }
        catch (error) {
            this.logger.error(`Error updating badge ${badgeId}:`, error);
            throw error;
        }
    }
    async deleteBadge(badgeId) {
        try {
            await this.db.delete(schema.badges).where((0, drizzle_orm_1.eq)(schema.badges.badgeId, badgeId));
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
                where: (ub, { eq, and }) => and(eq(ub.userId, userId), eq(ub.guildId, guildId)),
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
                where: (ub, { eq, and }) => and(eq(ub.userId, userId), eq(ub.guildId, guildId), eq(ub.badgeId, badgeId)),
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
            await this.db.insert(schema.userBadges).values(newUserBadge);
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
                .delete(schema.userBadges)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.userBadges.userId, userId), (0, drizzle_orm_1.eq)(schema.userBadges.guildId, guildId), (0, drizzle_orm_1.eq)(schema.userBadges.badgeId, badgeId)));
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
                where: (badges, { eq }) => eq(badges.badgeType, badgeType),
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
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], BadgesService);
//# sourceMappingURL=badges.service.js.map
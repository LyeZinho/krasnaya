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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let UsersService = UsersService_1 = class UsersService {
    db;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(db) {
        this.db = db;
    }
    async getUsersByGuild(guildId) {
        try {
            return await this.db.query.users.findMany({
                where: (0, drizzle_orm_1.eq)(schema_1.users.guildId, guildId),
            });
        }
        catch (error) {
            this.logger.error(`Error fetching users for guild ${guildId}:`, error);
            throw error;
        }
    }
    async getUser(userId, guildId) {
        try {
            return await this.db.query.users.findFirst({
                where: (u) => u.userId === userId && u.guildId === guildId,
            });
        }
        catch (error) {
            this.logger.error(`Error fetching user ${userId} from guild ${guildId}:`, error);
            throw error;
        }
    }
    async getUserStats(userId, guildId) {
        try {
            const user = await this.getUser(userId, guildId);
            if (!user)
                return null;
            return {
                ...user,
                stats: {
                    xp,
                    level: user.level,
                    messages: user.messages,
                    voiceTime: user.voiceTime,
                    coins: user.coins,
                },
            };
        }
        catch (error) {
            this.logger.error(`Error fetching stats for user ${userId}:`, error);
            throw error;
        }
    }
    async getLeaderboard(guildId, limit = 10) {
        try {
            return await this.db.query.users.findMany({
                where: (0, drizzle_orm_1.eq)(schema_1.users.guildId, guildId),
                orderBy: (u) => [u.xp],
                limit,
            });
        }
        catch (error) {
            this.logger.error(`Error fetching leaderboard for guild ${guildId}:`, error);
            throw error;
        }
    }
    async updateUser(userId, guildId, updates) {
        try {
            await this.db
                .update(schema_1.users)
                .set(updates)
                .where((u) => u.userId === userId && u.guildId === guildId);
            return await this.getUser(userId, guildId);
        }
        catch (error) {
            this.logger.error(`Error updating user ${userId}:`, error);
            throw error;
        }
    }
    async getOrCreateUser(userId, username, guildId) {
        try {
            let user = await this.getUser(userId, guildId);
            if (!user) {
                const newUser = {
                    userId,
                    username,
                    guildId,
                    xp: 0,
                    level: 1,
                    messages: 0,
                    voiceTime: 0,
                    coins: 0,
                    lastMessageAt: 0,
                    lastDailyClaim: 0,
                    createdAt: Math.floor(Date.now() / 1000),
                };
                await this.db.insert(schema_1.users).values(newUser);
                user = newUser;
            }
            return user;
        }
        catch (error) {
            this.logger.error(`Error creating/getting user ${userId}:`, error);
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map
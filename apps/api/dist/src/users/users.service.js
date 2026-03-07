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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema = __importStar(require("@krasnaya/database"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
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
                where: (users, { eq }) => eq(users.guildId, guildId),
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
                where: (users, { eq, and }) => and(eq(users.userId, userId), eq(users.guildId, guildId)),
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
                    xp: user.xp,
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
                where: (users, { eq }) => eq(users.guildId, guildId),
                orderBy: (users, { desc }) => [desc(users.xp)],
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
                .update(schema.users)
                .set(updates)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.users.userId, userId), (0, drizzle_orm_1.eq)(schema.users.guildId, guildId)));
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
                await this.db.insert(schema.users).values(newUser);
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
    __param(0, (0, common_1.Inject)(db_module_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], UsersService);
//# sourceMappingURL=users.service.js.map
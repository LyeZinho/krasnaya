"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCustomData = exports.automations = exports.userBadges = exports.badges = exports.userInventory = exports.items = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    userId: (0, pg_core_1.text)('user_id').notNull(),
    username: (0, pg_core_1.text)('username').notNull(),
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    xp: (0, pg_core_1.integer)('xp').default(0),
    level: (0, pg_core_1.integer)('level').default(1),
    messages: (0, pg_core_1.integer)('messages').default(0),
    voiceTime: (0, pg_core_1.integer)('voice_time').default(0),
    lastMessageAt: (0, pg_core_1.bigint)('last_message_at', { mode: 'number' }).default(0),
    coins: (0, pg_core_1.integer)('coins').default(0),
    lastDailyClaim: (0, pg_core_1.bigint)('last_daily_claim', { mode: 'number' }).default(0),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.primaryKey)({ columns: [table.userId, table.guildId] }),
    (0, pg_core_1.index)('idx_guild_xp').on(table.guildId, table.xp),
]);
exports.items = (0, pg_core_1.pgTable)('items', {
    itemId: (0, pg_core_1.serial)('item_id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    price: (0, pg_core_1.integer)('price').notNull(),
    emoji: (0, pg_core_1.text)('emoji').default('📦'),
    type: (0, pg_core_1.text)('type').default('consumable'),
    hidden: (0, pg_core_1.boolean)('hidden').default(false),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});
exports.userInventory = (0, pg_core_1.pgTable)('user_inventory', {
    userId: (0, pg_core_1.text)('user_id').notNull(),
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    itemId: (0, pg_core_1.integer)('item_id').notNull().references(() => exports.items.itemId),
    quantity: (0, pg_core_1.integer)('quantity').default(1),
    acquiredAt: (0, pg_core_1.bigint)('acquired_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.primaryKey)({ columns: [table.userId, table.guildId, table.itemId] }),
]);
exports.badges = (0, pg_core_1.pgTable)('badges', {
    badgeId: (0, pg_core_1.serial)('badge_id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    imagePath: (0, pg_core_1.varchar)('image_path', { length: 255 }).notNull(),
    badgeType: (0, pg_core_1.varchar)('badge_type', { length: 50 }).notNull(),
    tier: (0, pg_core_1.integer)('tier').default(1),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    expiresAt: (0, pg_core_1.bigint)('expires_at', { mode: 'number' }),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});
exports.userBadges = (0, pg_core_1.pgTable)('user_badges', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.varchar)('user_id', { length: 30 }).notNull(),
    guildId: (0, pg_core_1.varchar)('guild_id', { length: 30 }).notNull(),
    badgeId: (0, pg_core_1.integer)('badge_id').notNull().references(() => exports.badges.badgeId, { onDelete: 'cascade' }),
    earnedAt: (0, pg_core_1.bigint)('earned_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.index)('unq_user_badge').on(table.userId, table.guildId, table.badgeId),
]);
exports.automations = (0, pg_core_1.pgTable)('automations', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    enabled: (0, pg_core_1.boolean)('enabled').default(true),
    trigger: (0, pg_core_1.jsonb)('trigger').notNull(),
    conditions: (0, pg_core_1.jsonb)('conditions').notNull().default([]),
    actions: (0, pg_core_1.jsonb)('actions').notNull().default([]),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});
exports.userCustomData = (0, pg_core_1.pgTable)('user_custom_data', {
    userId: (0, pg_core_1.text)('user_id').notNull(),
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    data: (0, pg_core_1.jsonb)('data').$type().default({}),
}, (table) => [
    (0, pg_core_1.primaryKey)({ columns: [table.userId, table.guildId] }),
]);
//# sourceMappingURL=schema.js.map
import {
    pgTable, text, integer, bigint, boolean,
    primaryKey, index, serial, varchar, jsonb
} from 'drizzle-orm/pg-core';

// --- USUÁRIOS E LEVELING ---
export const users = pgTable('users', {
    userId: text('user_id').notNull(),
    username: text('username').notNull(),
    guildId: text('guild_id').notNull(),
    xp: integer('xp').default(0),
    level: integer('level').default(1),
    messages: integer('messages').default(0),
    voiceTime: integer('voice_time').default(0),
    lastMessageAt: bigint('last_message_at', { mode: 'number' }).default(0),
    coins: integer('coins').default(0),
    lastDailyClaim: bigint('last_daily_claim', { mode: 'number' }).default(0),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    primaryKey({ columns: [table.userId, table.guildId] }),
    index('idx_guild_xp').on(table.guildId, table.xp),
]);

// --- LOJA E ITENS ---
export const items = pgTable('items', {
    itemId: serial('item_id').primaryKey(),
    name: text('name').notNull().unique(),
    description: text('description'),
    price: integer('price').notNull(),
    emoji: text('emoji').default('📦'),
    type: text('type').default('consumable'), // 'consumable', 'vip', 'boost'
    hidden: boolean('hidden').default(false),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});

export const userInventory = pgTable('user_inventory', {
    userId: text('user_id').notNull(),
    guildId: text('guild_id').notNull(),
    itemId: integer('item_id').notNull().references(() => items.itemId),
    quantity: integer('quantity').default(1),
    acquiredAt: bigint('acquired_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    primaryKey({ columns: [table.userId, table.guildId, table.itemId] }),
]);

// --- SISTEMA DE BADGES (Backup Consolidado) ---
export const badges = pgTable('badges', {
    badgeId: serial('badge_id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    description: text('description'),
    imagePath: varchar('image_path', { length: 255 }).notNull(),
    badgeType: varchar('badge_type', { length: 50 }).notNull(), // 'rank', 'event', 'mission', 'unique'
    tier: integer('tier').default(1),
    isActive: boolean('is_active').default(true),
    expiresAt: bigint('expires_at', { mode: 'number' }),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});

export const userBadges = pgTable('user_badges', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 30 }).notNull(),
    guildId: varchar('guild_id', { length: 30 }).notNull(),
    badgeId: integer('badge_id').notNull().references(() => badges.badgeId, { onDelete: 'cascade' }),
    earnedAt: bigint('earned_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    index('unq_user_badge').on(table.userId, table.guildId, table.badgeId),
]);

// --- SISTEMA DE AUTOMAÇÃO (A sua Framework) ---
export const automations = pgTable('automations', {
    id: text('id').primaryKey(), // UUID gerado no SvelteKit/Nest
    guildId: text('guild_id').notNull(),
    name: text('name').notNull(),
    enabled: boolean('enabled').default(true),
    trigger: jsonb('trigger').notNull(), // Estrutura Zod
    conditions: jsonb('conditions').notNull().default([]),
    actions: jsonb('actions').notNull().default([]),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});

// --- SISTEMA DE METADADOS DINÂMICOS (CUSTOM DATA) ---
export const userCustomData = pgTable('user_custom_data', {
    userId: text('user_id').notNull(),
    guildId: text('guild_id').notNull(),
    data: jsonb('data').$type<Record<string, any>>().default({}),
}, (table) => [
    primaryKey({ columns: [table.userId, table.guildId] }),
]);

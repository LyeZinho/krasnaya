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

// --- SISTEMA DE CARDS SVG DINÂMICOS ---
export const cards = pgTable('cards', {
    id: text('id').primaryKey(), // UUID
    guildId: text('guild_id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    width: integer('width').default(800),
    height: integer('height').default(200),
    layers: jsonb('layers').notNull().default([]), // Lista de camadas (texto, imagem, retangulo)
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});

// --- SISTEMA DE COMANDOS ---
export const commands = pgTable('commands', {
    id: text('id').primaryKey(), // UUID
    guildId: text('guild_id').notNull(),
    name: text('name').notNull(),
    prefix: text('prefix').notNull(),
    description: text('description'),
    aliases: jsonb('aliases').notNull().$type<string[]>().default([]),
    enabled: boolean('enabled').default(true),
    cooldown: integer('cooldown').default(0), // em segundos
    automationId: text('automation_id').references(() => automations.id),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
    updatedAt: bigint('updated_at', { mode: 'number' }),
});

// --- SISTEMA DE EVENTOS ---
export const eventHandlers = pgTable('event_handlers', {
    id: text('id').primaryKey(), // UUID
    guildId: text('guild_id').notNull(),
    event: text('event').notNull(), // MESSAGE_CREATE, MEMBER_JOIN, etc
    automationId: text('automation_id').notNull().references(() => automations.id, { onDelete: 'cascade' }),
    enabled: boolean('enabled').default(true),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    index('idx_guild_event').on(table.guildId, table.event),
]);

// --- SISTEMA RBAC (Role-Based Access Control) ---
export const roles = pgTable('roles', {
    id: text('id').primaryKey(), // UUID
    guildId: text('guild_id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    level: integer('level').default(0), // Para ordenação hierárquica
    color: text('color').default('#808080'),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    index('idx_guild_role').on(table.guildId),
]);

export const permissions = pgTable('permissions', {
    id: text('id').primaryKey(), // UUID
    name: text('name').notNull().unique(), // 'automation:read', 'command:create', etc
    description: text('description'),
    resource: text('resource').notNull(), // 'automation', 'command', 'admin'
    action: text('action').notNull(), // 'read', 'create', 'update', 'delete'
}, (table) => [
    index('idx_resource_action').on(table.resource, table.action),
]);

export const rolePermissions = pgTable('role_permissions', {
    id: text('id').primaryKey(), // UUID
    roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: text('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
    granted: boolean('granted').default(true), // true=grant, false=deny
}, (table) => [
    index('idx_role_permission').on(table.roleId, table.permissionId),
]);

export const userRoles = pgTable('user_roles', {
    id: text('id').primaryKey(), // UUID
    userId: text('user_id').notNull(),
    guildId: text('guild_id').notNull(),
    roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
    assignedAt: bigint('assigned_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    index('idx_user_guild_role').on(table.userId, table.guildId, table.roleId),
]);

// --- SISTEMA DE AUDITORIA ---
export const auditLogs = pgTable('audit_logs', {
    id: text('id').primaryKey(), // UUID
    guildId: text('guild_id').notNull(),
    userId: text('user_id').notNull(),
    action: text('action').notNull(), // 'CREATE', 'UPDATE', 'DELETE', etc
    resource: text('resource').notNull(), // 'command', 'automation', 'user', etc
    resourceId: text('resource_id').notNull(),
    changes: jsonb('changes').notNull().$type<Record<string, any>>().default({}),
    ip: text('ip'),
    userAgent: text('user_agent'),
    status: text('status').default('success'), // 'success', 'failure'
    errorMessage: text('error_message'),
    createdAt: bigint('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    index('idx_guild_action').on(table.guildId, table.action),
    index('idx_user_action').on(table.userId, table.action),
]);

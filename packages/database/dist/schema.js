"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogs = exports.userRoles = exports.rolePermissions = exports.permissions = exports.roles = exports.eventHandlers = exports.commands = exports.cards = exports.userCustomData = exports.automations = exports.userBadges = exports.badges = exports.userInventory = exports.items = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// --- USUÁRIOS E LEVELING ---
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
// --- LOJA E ITENS ---
exports.items = (0, pg_core_1.pgTable)('items', {
    itemId: (0, pg_core_1.serial)('item_id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    price: (0, pg_core_1.integer)('price').notNull(),
    emoji: (0, pg_core_1.text)('emoji').default('📦'),
    type: (0, pg_core_1.text)('type').default('consumable'), // 'consumable', 'vip', 'boost'
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
// --- SISTEMA DE BADGES (Backup Consolidado) ---
exports.badges = (0, pg_core_1.pgTable)('badges', {
    badgeId: (0, pg_core_1.serial)('badge_id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    imagePath: (0, pg_core_1.varchar)('image_path', { length: 255 }).notNull(),
    badgeType: (0, pg_core_1.varchar)('badge_type', { length: 50 }).notNull(), // 'rank', 'event', 'mission', 'unique'
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
// --- SISTEMA DE AUTOMAÇÃO (A sua Framework) ---
exports.automations = (0, pg_core_1.pgTable)('automations', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID gerado no SvelteKit/Nest
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    enabled: (0, pg_core_1.boolean)('enabled').default(true),
    trigger: (0, pg_core_1.jsonb)('trigger').notNull(), // Estrutura Zod
    conditions: (0, pg_core_1.jsonb)('conditions').notNull().default([]),
    actions: (0, pg_core_1.jsonb)('actions').notNull().default([]),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});
// --- SISTEMA DE METADADOS DINÂMICOS (CUSTOM DATA) ---
exports.userCustomData = (0, pg_core_1.pgTable)('user_custom_data', {
    userId: (0, pg_core_1.text)('user_id').notNull(),
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    data: (0, pg_core_1.jsonb)('data').$type().default({}),
}, (table) => [
    (0, pg_core_1.primaryKey)({ columns: [table.userId, table.guildId] }),
]);
// --- SISTEMA DE CARDS SVG DINÂMICOS ---
exports.cards = (0, pg_core_1.pgTable)('cards', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    width: (0, pg_core_1.integer)('width').default(800),
    height: (0, pg_core_1.integer)('height').default(200),
    layers: (0, pg_core_1.jsonb)('layers').notNull().default([]), // Lista de camadas (texto, imagem, retangulo)
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
});
// --- SISTEMA DE COMANDOS ---
exports.commands = (0, pg_core_1.pgTable)('commands', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    prefix: (0, pg_core_1.text)('prefix').notNull(),
    description: (0, pg_core_1.text)('description'),
    aliases: (0, pg_core_1.jsonb)('aliases').notNull().$type().default([]),
    enabled: (0, pg_core_1.boolean)('enabled').default(true),
    cooldown: (0, pg_core_1.integer)('cooldown').default(0), // em segundos
    automationId: (0, pg_core_1.text)('automation_id').references(() => exports.automations.id),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
    updatedAt: (0, pg_core_1.bigint)('updated_at', { mode: 'number' }),
});
// --- SISTEMA DE EVENTOS ---
exports.eventHandlers = (0, pg_core_1.pgTable)('event_handlers', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    event: (0, pg_core_1.text)('event').notNull(), // MESSAGE_CREATE, MEMBER_JOIN, etc
    automationId: (0, pg_core_1.text)('automation_id').notNull().references(() => exports.automations.id, { onDelete: 'cascade' }),
    enabled: (0, pg_core_1.boolean)('enabled').default(true),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.index)('idx_guild_event').on(table.guildId, table.event),
]);
// --- SISTEMA RBAC (Role-Based Access Control) ---
exports.roles = (0, pg_core_1.pgTable)('roles', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    level: (0, pg_core_1.integer)('level').default(0), // Para ordenação hierárquica
    color: (0, pg_core_1.text)('color').default('#808080'),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.index)('idx_guild_role').on(table.guildId),
]);
exports.permissions = (0, pg_core_1.pgTable)('permissions', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    name: (0, pg_core_1.text)('name').notNull().unique(), // 'automation:read', 'command:create', etc
    description: (0, pg_core_1.text)('description'),
    resource: (0, pg_core_1.text)('resource').notNull(), // 'automation', 'command', 'admin'
    action: (0, pg_core_1.text)('action').notNull(), // 'read', 'create', 'update', 'delete'
}, (table) => [
    (0, pg_core_1.index)('idx_resource_action').on(table.resource, table.action),
]);
exports.rolePermissions = (0, pg_core_1.pgTable)('role_permissions', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    roleId: (0, pg_core_1.text)('role_id').notNull().references(() => exports.roles.id, { onDelete: 'cascade' }),
    permissionId: (0, pg_core_1.text)('permission_id').notNull().references(() => exports.permissions.id, { onDelete: 'cascade' }),
    granted: (0, pg_core_1.boolean)('granted').default(true), // true=grant, false=deny
}, (table) => [
    (0, pg_core_1.index)('idx_role_permission').on(table.roleId, table.permissionId),
]);
exports.userRoles = (0, pg_core_1.pgTable)('user_roles', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    userId: (0, pg_core_1.text)('user_id').notNull(),
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    roleId: (0, pg_core_1.text)('role_id').notNull().references(() => exports.roles.id, { onDelete: 'cascade' }),
    assignedAt: (0, pg_core_1.bigint)('assigned_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.index)('idx_user_guild_role').on(table.userId, table.guildId, table.roleId),
]);
// --- SISTEMA DE AUDITORIA ---
exports.auditLogs = (0, pg_core_1.pgTable)('audit_logs', {
    id: (0, pg_core_1.text)('id').primaryKey(), // UUID
    guildId: (0, pg_core_1.text)('guild_id').notNull(),
    userId: (0, pg_core_1.text)('user_id').notNull(),
    action: (0, pg_core_1.text)('action').notNull(), // 'CREATE', 'UPDATE', 'DELETE', etc
    resource: (0, pg_core_1.text)('resource').notNull(), // 'command', 'automation', 'user', etc
    resourceId: (0, pg_core_1.text)('resource_id').notNull(),
    changes: (0, pg_core_1.jsonb)('changes').notNull().$type().default({}),
    ip: (0, pg_core_1.text)('ip'),
    userAgent: (0, pg_core_1.text)('user_agent'),
    status: (0, pg_core_1.text)('status').default('success'), // 'success', 'failure'
    errorMessage: (0, pg_core_1.text)('error_message'),
    createdAt: (0, pg_core_1.bigint)('created_at', { mode: 'number' }).default(Math.floor(Date.now() / 1000)),
}, (table) => [
    (0, pg_core_1.index)('idx_guild_action').on(table.guildId, table.action),
    (0, pg_core_1.index)('idx_user_action').on(table.userId, table.action),
]);
//# sourceMappingURL=schema.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const automations_module_1 = require("./automations/automations.module");
const commands_module_1 = require("./commands/commands.module");
const events_module_1 = require("./events/events.module");
const audit_module_1 = require("./audit/audit.module");
const monitor_module_1 = require("./monitor/monitor.module");
const bullmq_1 = require("@nestjs/bullmq");
const db_module_1 = require("./db/db.module");
const rbac_module_1 = require("./rbac/rbac.module");
const users_module_1 = require("./users/users.module");
const items_module_1 = require("./items/items.module");
const badges_module_1 = require("./badges/badges.module");
const redis_module_1 = require("./db/redis.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                },
            }),
            db_module_1.DbModule,
            redis_module_1.RedisModule,
            automations_module_1.AutomationsModule,
            commands_module_1.CommandsModule,
            events_module_1.EventsModule,
            audit_module_1.AuditModule,
            monitor_module_1.MonitorModule,
            rbac_module_1.RbacModule,
            users_module_1.UsersModule,
            items_module_1.ItemsModule,
            badges_module_1.BadgesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
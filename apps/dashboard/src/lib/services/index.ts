// Exportar todos os serviços
export { request } from './api.service';
export { AutomationService } from './automation.service';
export { CommandService } from './command.service';
export { EventService } from './event.service';
export { AuthService } from './auth.service';
export { AdminService } from './admin.service';
export { BotService } from './bot.service';
export { MonitorService } from './monitor.service';
export { RBACService } from './rbac.service';
export { AuditService } from './audit.service';

// Re-export para fácil importação
export * as ApiService from './api.service';
export * as AutomationSvc from './automation.service';
export * as CommandSvc from './command.service';
export * as EventSvc from './event.service';
export * as AuthSvc from './auth.service';
export * as AdminSvc from './admin.service';
export * as BotSvc from './bot.service';
export * as MonitorSvc from './monitor.service';
export * as RBACSvc from './rbac.service';
export * as AuditSvc from './audit.service';


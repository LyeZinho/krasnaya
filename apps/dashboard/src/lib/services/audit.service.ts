// Audit Service - Audit Logs Management
import { request } from './api.service';

export interface AuditLog {
  id: string;
  guildId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: Record<string, any>;
  ip: string;
  userAgent: string;
  status: 'success' | 'error';
  errorMessage?: string;
  createdAt: number;
}

export class AuditService {
  // List all audit logs for a guild
  static async listAuditLogs(guildId: string, limit?: number, offset?: number): Promise<AuditLog[]> {
    let url = `/admin/audit?guildId=${guildId}`;
    if (limit) url += `&limit=${limit}`;
    if (offset) url += `&offset=${offset}`;
    return request('GET', url);
  }

  // Get audit logs by user
  static async getLogsByUser(userId: string): Promise<AuditLog[]> {
    return request('GET', `/admin/audit/user/${userId}`);
  }

  // Get audit logs by action
  static async getLogsByAction(action: string): Promise<AuditLog[]> {
    return request('GET', `/admin/audit/action/${action}`);
  }

  // Create new audit log entry
  static async logAction(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
    return request('POST', '/admin/audit/log', log);
  }
}

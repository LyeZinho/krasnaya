// Store para Audit Logs em tempo real via SSE
import { readable } from 'svelte/store';
import type { AuditLog } from '$lib/types';

export const auditLogs = readable<AuditLog[]>(
  [],
  (set) => {
    if (typeof EventSource === 'undefined') return;

    const eventSource = new EventSource('/api/v1/admin/audit-logs-sse');
    let logs: AuditLog[] = [];

    eventSource.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data);
        logs = [log, ...logs].slice(0, 200); // Keep last 200 logs
        set(logs);
      } catch (e) {
        console.error('Failed to parse audit log:', e);
      }
    };

    eventSource.onerror = () => {
      console.error('Audit logs SSE connection failed');
    };

    return () => eventSource.close();
  }
);

export default auditLogs;

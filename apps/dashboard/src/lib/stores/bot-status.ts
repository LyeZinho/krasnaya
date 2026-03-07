// Store para monitorar o status do bot via SSE
import { readable } from 'svelte/store';
import type { BotStatus } from '$lib/types';

export const botStatus = readable<BotStatus>(
  { isOnline: false, queuedJobs: 0, activeJobs: 0, failedJobs: 0, processingTime: 0 },
  (set) => {
    if (typeof typeof EventSource === 'undefined') return;

    const eventSource = new EventSource('/api/v1/internal/monitor/status-sse');

    eventSource.onmessage = (event) => {
      try {
        const status = JSON.parse(event.data);
        set(status);
      } catch (e) {
        console.error('Failed to parse bot status:', e);
      }
    };

    eventSource.onerror = () => {
      set({ isOnline: false, queuedJobs: 0, activeJobs: 0, failedJobs: 0, processingTime: 0 });
    };

    return () => eventSource.close();
  }
);

export default botStatus;

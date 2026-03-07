// Events Service - Gerenciamento de Event Handlers
import { request } from './api.service';
import type { EventHandler } from '$lib/types';

export class EventService {
  // Get available events
  static async getAvailableEvents(): Promise<{
    category: string;
    events: { name: string; description: string }[];
  }[]> {
    return request('GET', '/events/available');
  }

  // List all event handlers for a guild
  static async listEventHandlers(guildId: string): Promise<EventHandler[]> {
    return request('GET', `/events?guildId=${guildId}`);
  }

  // Get single event handler
  static async getEventHandler(id: string): Promise<EventHandler> {
    return request('GET', `/events/${id}`);
  }

  // Create new event handler
  static async createEventHandler(guildId: string, handler: Omit<EventHandler, 'id' | 'createdAt'>): Promise<EventHandler> {
    return request('POST', '/events', {
      ...handler,
      guildId,
    });
  }

  // Update event handler
  static async updateEventHandler(id: string, updates: Partial<EventHandler>): Promise<EventHandler> {
    return request('PATCH', `/events/${id}`, updates);
  }

  // Delete event handler
  static async deleteEventHandler(id: string): Promise<void> {
    return request('DELETE', `/events/${id}`);
  }

  // Toggle event handler enabled/disabled
  static async toggleEventHandler(id: string, enabled: boolean): Promise<EventHandler> {
    return request('PATCH', `/events/${id}`, { enabled });
  }
}

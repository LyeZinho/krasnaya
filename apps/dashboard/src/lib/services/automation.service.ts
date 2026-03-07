// Automations Service - Gerenciamento de Flows (TCA: Trigger-Condition-Action)
import { request } from './api.service';
import type { Automation } from '$lib/types';

export class AutomationService {
  // List all automations for a guild
  static async listAutomations(guildId: string): Promise<Automation[]> {
    return request('GET', `/automations?guildId=${guildId}`);
  }

  // Get single automation
  static async getAutomation(id: string): Promise<Automation> {
    return request('GET', `/automations/${id}`);
  }

  // Create new automation
  static async createAutomation(guildId: string, automation: Omit<Automation, 'id' | 'createdAt'>): Promise<Automation> {
    return request('POST', '/automations', {
      ...automation,
      guildId,
    });
  }

  // Update automation
  static async updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation> {
    return request('PATCH', `/automations/${id}`, updates);
  }

  // Delete automation
  static async deleteAutomation(id: string): Promise<void> {
    return request('DELETE', `/automations/${id}`);
  }

  // Toggle automation enabled/disabled
  static async toggleAutomation(id: string, enabled: boolean): Promise<Automation> {
    return request('PATCH', `/automations/${id}`, { enabled });
  }

  // Test automation with mock data
  static async testAutomation(id: string, mockData: any): Promise<{ success: boolean; result: any }> {
    return request('POST', `/automations/${id}/test`, { mockData });
  }

  // Get automation stats
  static async getAutomationStats(id: string): Promise<{
    lastRun: number | null;
    totalRuns: number;
    successRate: number;
  }> {
    return request('GET', `/automations/${id}/stats`);
  }
}

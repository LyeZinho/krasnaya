// Commands Service - Gerenciamento de Comandos Dinâmicos
import { request } from './api.service';
import type { Command } from '$lib/types';

export class CommandService {
  // List all commands for a guild
  static async listCommands(guildId: string): Promise<Command[]> {
    return request('GET', `/commands?guildId=${guildId}`);
  }

  // Get single command
  static async getCommand(id: string): Promise<Command> {
    return request('GET', `/commands/${id}`);
  }

  // Create new command
  static async createCommand(guildId: string, command: Omit<Command, 'id' | 'createdAt'>): Promise<Command> {
    return request('POST', `/commands?guildId=${guildId}`, command);
  }

  // Update command
  static async updateCommand(id: string, updates: Partial<Command>): Promise<Command> {
    return request('PATCH', `/commands/${id}`, updates);
  }

  // Delete command
  static async deleteCommand(id: string): Promise<void> {
    return request('DELETE', `/commands/${id}`);
  }

  // Toggle command enabled/disabled
  static async toggleCommand(id: string, enabled: boolean): Promise<Command> {
    return request('PATCH', `/commands/${id}`, { enabled });
  }

  // Validate command prefix and name
  static async validateCommand(guildId: string, prefix: string, name: string, excludeId?: string): Promise<{ valid: boolean; error?: string }> {
    return request('POST', '/commands/validate', {
      guildId,
      prefix,
      name,
      excludeId,
    });
  }
}

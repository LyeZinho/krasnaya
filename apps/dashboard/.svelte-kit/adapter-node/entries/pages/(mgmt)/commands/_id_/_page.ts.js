import { error } from "@sveltejs/kit";
import { r as request } from "../../../../../chunks/api.service.js";
class CommandService {
  // List all commands for a guild
  static async listCommands(guildId) {
    return request("GET", `/commands?guildId=${guildId}`);
  }
  // Get single command
  static async getCommand(id) {
    return request("GET", `/commands/${id}`);
  }
  // Create new command
  static async createCommand(guildId, command) {
    return request("POST", `/commands?guildId=${guildId}`, command);
  }
  // Update command
  static async updateCommand(id, updates) {
    return request("PATCH", `/commands/${id}`, updates);
  }
  // Delete command
  static async deleteCommand(id) {
    return request("DELETE", `/commands/${id}`);
  }
  // Toggle command enabled/disabled
  static async toggleCommand(id, enabled) {
    return request("PATCH", `/commands/${id}`, { enabled });
  }
  // Validate command prefix and name
  static async validateCommand(guildId, prefix, name, excludeId) {
    return request("POST", "/commands/validate", {
      guildId,
      prefix,
      name,
      excludeId
    });
  }
}
const load = async ({ params }) => {
  try {
    if (!params.id) {
      throw error(400, "ID não fornecido");
    }
    const command = await CommandService.getCommand(params.id);
    if (!command) {
      throw error(404, "Comando não encontrado");
    }
    return { command };
  } catch (err) {
    if (err.status) throw err;
    throw error(500, `Erro ao carregar comando: ${err.message}`);
  }
};
export {
  load
};

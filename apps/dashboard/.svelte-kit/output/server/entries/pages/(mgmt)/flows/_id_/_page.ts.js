import { error } from "@sveltejs/kit";
import { r as request } from "../../../../../chunks/api.service.js";
class AutomationService {
  // List all automations for a guild
  static async listAutomations(guildId) {
    return request("GET", `/automations?guildId=${guildId}`);
  }
  // Get single automation
  static async getAutomation(id) {
    return request("GET", `/automations/${id}`);
  }
  // Create new automation
  static async createAutomation(guildId, automation) {
    return request("POST", "/automations", {
      ...automation,
      guildId
    });
  }
  // Update automation
  static async updateAutomation(id, updates) {
    return request("PATCH", `/automations/${id}`, updates);
  }
  // Delete automation
  static async deleteAutomation(id) {
    return request("DELETE", `/automations/${id}`);
  }
  // Toggle automation enabled/disabled
  static async toggleAutomation(id, enabled) {
    return request("PATCH", `/automations/${id}`, { enabled });
  }
  // Test automation with mock data
  static async testAutomation(id, mockData) {
    return request("POST", `/automations/${id}/test`, { mockData });
  }
  // Get automation stats
  static async getAutomationStats(id) {
    return request("GET", `/automations/${id}/stats`);
  }
}
const load = async ({ params }) => {
  try {
    if (!params.id) {
      throw error(400, "ID não fornecido");
    }
    const automation = await AutomationService.getAutomation(params.id);
    if (!automation) {
      throw error(404, "Automação não encontrada");
    }
    return { automation };
  } catch (err) {
    if (err.status) throw err;
    throw error(500, `Erro ao carregar automação: ${err.message}`);
  }
};
export {
  load
};

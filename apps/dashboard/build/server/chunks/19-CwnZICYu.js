import { e as error } from './index-CoD1IJuy.js';
import { r as request } from './api.service-_L0PwgSK.js';

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

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DsCySlWx.js')).default;
const universal_id = "src/routes/(mgmt)/flows/[id]/+page.ts";
const imports = ["_app/immutable/nodes/19.BfyWngJC.js","_app/immutable/chunks/EDnb4mqb.js","_app/immutable/chunks/Cpe7s6kJ.js","_app/immutable/chunks/CebdRyTY.js","_app/immutable/chunks/Dd1YbBa5.js","_app/immutable/chunks/B7wfVspd.js","_app/immutable/chunks/DWxdjsnJ.js","_app/immutable/chunks/mz4Jl4Hy.js","_app/immutable/chunks/CEV47lTt.js","_app/immutable/chunks/BAkW6dXG.js","_app/immutable/chunks/j0w0p8sR.js","_app/immutable/chunks/Cm94KOZ0.js","_app/immutable/chunks/DpZQ46JF.js","_app/immutable/chunks/D0CL1XlQ.js","_app/immutable/chunks/DEBOMRCH.js","_app/immutable/chunks/DOXfydTH.js","_app/immutable/chunks/4D2fh7bU.js","_app/immutable/chunks/DCqj3gaQ.js","_app/immutable/chunks/odmWtBGk.js","_app/immutable/chunks/DiFdYQpc.js","_app/immutable/chunks/BBfPC9pC.js","_app/immutable/chunks/ChoNT78N.js","_app/immutable/chunks/DhFKzpEy.js","_app/immutable/chunks/BUFhwxz-.js","_app/immutable/chunks/D0qhasuo.js","_app/immutable/chunks/V0haKEeS.js"];
const stylesheets = ["_app/immutable/assets/BrutalModal.CGTLEdkT.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=19-CwnZICYu.js.map

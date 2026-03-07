import { e as error } from './index-CoD1IJuy.js';
import { r as request } from './api.service-_L0PwgSK.js';

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

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cd_hFau4.js')).default;
const universal_id = "src/routes/(mgmt)/commands/[id]/+page.ts";
const imports = ["_app/immutable/nodes/12.CzaRe5RQ.js","_app/immutable/chunks/EDnb4mqb.js","_app/immutable/chunks/Cpe7s6kJ.js","_app/immutable/chunks/CebdRyTY.js","_app/immutable/chunks/Dd1YbBa5.js","_app/immutable/chunks/B7wfVspd.js","_app/immutable/chunks/DWxdjsnJ.js","_app/immutable/chunks/mz4Jl4Hy.js","_app/immutable/chunks/CEV47lTt.js","_app/immutable/chunks/BAkW6dXG.js","_app/immutable/chunks/j0w0p8sR.js","_app/immutable/chunks/Cm94KOZ0.js","_app/immutable/chunks/DpZQ46JF.js","_app/immutable/chunks/D0CL1XlQ.js","_app/immutable/chunks/DEBOMRCH.js","_app/immutable/chunks/DOXfydTH.js","_app/immutable/chunks/4D2fh7bU.js","_app/immutable/chunks/BZgj997N.js","_app/immutable/chunks/odmWtBGk.js","_app/immutable/chunks/DiFdYQpc.js","_app/immutable/chunks/BBfPC9pC.js","_app/immutable/chunks/ChoNT78N.js","_app/immutable/chunks/DhFKzpEy.js","_app/immutable/chunks/BUFhwxz-.js","_app/immutable/chunks/D0qhasuo.js","_app/immutable/chunks/V0haKEeS.js","_app/immutable/chunks/Cy9o8UEH.js"];
const stylesheets = ["_app/immutable/assets/BrutalModal.CGTLEdkT.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=12-x22CF2eT.js.map

import { e as escape_html } from "../../../../chunks/escaping.js";
import "clsx";
import "../../../../chunks/guild.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let botStatus = {
      uptime: 0
    };
    function formatUptime() {
      const seconds = botStatus.uptime;
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor(seconds % 86400 / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      const secs = Math.floor(seconds % 60);
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    }
    $$renderer2.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Operational Command</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Status Room</h1></div> <div class="text-right"><div class="text-[10px] font-bold uppercase tracking-widest opacity-40">Uptime</div> <div class="text-xl font-mono font-bold tracking-tighter">${escape_html(formatUptime())}</div></div></header> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="text-center py-8 opacity-50">Carregando dados...</div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};

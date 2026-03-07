import { d as attr_class, h as stringify, i as attr } from "../../../../chunks/index2.js";
import { B as BrutalButton } from "../../../../chunks/BrutalButton.js";
import { B as BrutalModal } from "../../../../chunks/BrutalModal.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/guild.js";
import { P as Plus } from "../../../../chunks/plus.js";
import { C as Code } from "../../../../chunks/code.js";
import { S as Save } from "../../../../chunks/save.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const defaultLogic = {
      if: [
        { in: ["moderator", { var: "author.roles" }] },
        {
          SEND_MSG: { content: "Command executed by authorized personnel." }
        },
        { SEND_MSG: { content: "Access denied, comrade." } }
      ]
    };
    JSON.stringify(defaultLogic, null, 4);
    let showCreateModal = false;
    let createError = null;
    let isCreating = false;
    let newCommandName = "";
    let newCommandPrefix = "!";
    let newCommandDescription = "";
    $$renderer2.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Protocol Enforcement / CUSTOM COMMANDS</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Command Registry</h1></div> <div class="flex gap-4"><button class="px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all bg-red-600 text-white hover:translate-x-1 hover:shadow-[4px_4px_0px_#000]">`);
    Plus($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> Criar</button> <button${attr_class(`px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all ${stringify("bg-black text-white")}`)}>${escape_html("Switch to JSON")} `);
    {
      $$renderer2.push("<!--[0-->");
      Code($$renderer2, { size: 16 });
    }
    $$renderer2.push(`<!--]--></button> `);
    BrutalButton($$renderer2, {
      variant: "red",
      class: "flex items-center gap-2",
      children: ($$renderer3) => {
        Save($$renderer3, { size: 18 });
        $$renderer3.push(`<!----> Authorize`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></header> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="text-center py-8 opacity-50">Carregando comandos...</div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    BrutalModal($$renderer2, {
      title: "Criar Novo Comando",
      isOpen: showCreateModal,
      onClose: () => {
        showCreateModal = false;
        createError = null;
      },
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4">`);
        if (createError) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="border-2 border-red-600 bg-red-900/20 p-3 text-red-600 text-sm">${escape_html(createError)}</div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <div><label for="cmd-name" class="block text-xs font-black uppercase mb-2">Nome do Comando *</label> <input id="cmd-name" type="text" placeholder="ping"${attr("value", newCommandName)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div> <div><label for="cmd-prefix" class="block text-xs font-black uppercase mb-2">Prefixo</label> <input id="cmd-prefix" type="text" placeholder="!"${attr("value", newCommandPrefix)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div> <div><label for="cmd-desc" class="block text-xs font-black uppercase mb-2">Descrição</label> <input id="cmd-desc" type="text" placeholder="Descrição do comando"${attr("value", newCommandDescription)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div> <div class="flex gap-3 pt-4 border-t-2 border-black"><button${attr("disabled", isCreating, true)} class="flex-1 px-6 py-3 border-4 border-black font-black uppercase text-xs bg-red-600 text-white hover:translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all disabled:opacity-50">${escape_html("Criar")}</button> <button${attr("disabled", isCreating, true)} class="flex-1 px-6 py-3 border-4 border-black font-black uppercase text-xs bg-black text-white hover:translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all disabled:opacity-50">Cancelar</button></div></div>`);
      }
    });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};

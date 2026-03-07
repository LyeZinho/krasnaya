import { d as attr_class, i as attr, h as stringify } from "../../../../chunks/index2.js";
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
      and: [
        { ">": [{ var: "user.messages" }, 100] },
        { in: ["verified", { var: "user.roles" }] }
      ]
    };
    JSON.stringify(defaultLogic, null, 4);
    let showCreateModal = false;
    let createError = null;
    let isCreating = false;
    let newAutomationName = "";
    let newAutomationTrigger = "MESSAGE_CREATE";
    $$renderer2.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Automation / TCA Protocol</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Flow Editor</h1></div> <div class="flex gap-4"><button class="px-6 py-3 border-4 border-green-600 bg-green-900/30 text-green-400 font-black uppercase text-xs flex items-center gap-2 transition-all hover:bg-green-900/50">`);
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
        $$renderer3.push(`<!----> Deploy`);
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
      $$renderer2.push(`<div class="text-center py-8 opacity-50">Carregando automações...</div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    BrutalModal($$renderer2, {
      isOpen: showCreateModal,
      title: "Criar Nova Automação",
      onClose: () => {
        showCreateModal = false;
        createError = null;
      },
      children: ($$renderer3) => {
        if (createError) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="border-2 border-red-600 bg-red-900/20 p-4 text-red-600 mb-4"><div class="font-bold">Erro</div> <div class="text-xs opacity-70">${escape_html(createError)}</div></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <div class="space-y-4"><div class="brutal-form-group"><label for="autoName">Nome da Automação</label> <input id="autoName" type="text" placeholder="ex: Welcome Message"${attr("value", newAutomationName)}${attr("disabled", isCreating, true)}/></div> <div class="brutal-form-group"><label for="trigger">Tipo de Trigger (Evento)</label> `);
        $$renderer3.select(
          {
            id: "trigger",
            value: newAutomationTrigger,
            disabled: isCreating,
            class: "w-full border-2 border-black p-3 bg-[#0a0a0a] text-white"
          },
          ($$renderer4) => {
            $$renderer4.option({ value: "MESSAGE_CREATE" }, ($$renderer5) => {
              $$renderer5.push(`Mensagem Criada`);
            });
            $$renderer4.option({ value: "MEMBER_JOIN" }, ($$renderer5) => {
              $$renderer5.push(`Membro Entrou`);
            });
            $$renderer4.option({ value: "INTERACTION_CREATE" }, ($$renderer5) => {
              $$renderer5.push(`Interação Criada`);
            });
            $$renderer4.option({ value: "SCHEDULED_EVENT" }, ($$renderer5) => {
              $$renderer5.push(`Evento Agendado`);
            });
            $$renderer4.option({ value: "MESSAGE_REACTION" }, ($$renderer5) => {
              $$renderer5.push(`Reação em Mensagem`);
            });
            $$renderer4.option({ value: "VOICE_STATE_UPDATE" }, ($$renderer5) => {
              $$renderer5.push(`Estado de Voz`);
            });
          }
        );
        $$renderer3.push(`</div> <div class="flex gap-3 mt-6"><button${attr("disabled", isCreating, true)} class="flex-1 px-6 py-3 border-4 border-green-600 bg-green-900/30 text-green-400 font-black uppercase text-xs transition-all disabled:opacity-50">${escape_html("Criar Automação")}</button> <button${attr("disabled", isCreating, true)} class="flex-1 px-6 py-3 border-4 border-gray-600 bg-gray-900/30 text-gray-400 font-black uppercase text-xs transition-all disabled:opacity-50">Cancelar</button></div></div>`);
      }
    });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};

import { h as attr_class, k as attr, ar as bind_props, j as stringify } from './index2-BYEgVnmH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-CgB-WIH5.js';
import './state.svelte-oPLNWtsX.js';
import { B as BrutalCard } from './BrutalCard-7hyKWuhi.js';
import { B as BrutalModal } from './BrutalModal-BNd_eXu0.js';
import { A as Arrow_left } from './arrow-left-Bs3Cbthx.js';
import { C as Code } from './code-ctY39doE.js';
import { S as Save } from './save-DKd3OVbU.js';
import { T as Trash_2 } from './trash-2-D4aIzcY4.js';
import 'clsx';
import './equality-DjuIlvRH.js';
import './Icon-Tn6mjnxn.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let hasUnsavedChanges;
    let data = $$props["data"];
    let automation = { ...data.automation };
    let originalAutomation = JSON.parse(JSON.stringify(data.automation));
    JSON.stringify(automation, null, 2);
    let isDeleting = false;
    let showDeleteModal = false;
    function syncVisualToJson() {
      JSON.stringify(automation, null, 2);
    }
    hasUnsavedChanges = JSON.stringify(automation) !== JSON.stringify(originalAutomation);
    $$renderer2.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div class="flex items-center gap-4"><button class="p-2 hover:bg-gray-900 transition-colors" title="Voltar">`);
    Arrow_left($$renderer2, { size: 24 });
    $$renderer2.push(`<!----></button> <div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Automation Engine / FLOW EDITOR</h2> <h1 class="text-4xl font-black uppercase tracking-tighter">${escape_html(automation.name || "Sem Nome")}</h1></div></div> <div class="flex gap-4"><button${attr_class(`px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all ${stringify("bg-black text-white")}`)}>${escape_html("JSON Mode")} `);
    {
      $$renderer2.push("<!--[0-->");
      Code($$renderer2, { size: 16 });
    }
    $$renderer2.push(`<!--]--></button> <button${attr("disabled", !hasUnsavedChanges, true)} class="px-6 py-3 border-4 border-green-600 bg-green-900/30 text-green-400 font-black uppercase text-xs flex items-center gap-2 transition-all disabled:opacity-50">`);
    Save($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> ${escape_html("Salvar")}</button> <button class="px-6 py-3 border-4 border-red-600 bg-red-900/30 text-red-400 font-black uppercase text-xs flex items-center gap-2 transition-all">`);
    Trash_2($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> Deletar</button></div></header> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="space-y-6">`);
      BrutalCard($$renderer2, {
        title: "Propriedades da Automação",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="space-y-4"><div><label for="name" class="block text-xs font-black uppercase mb-2">Nome *</label> <input id="name" type="text"${attr("value", automation.name)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="trigger" class="block text-xs font-black uppercase mb-2">Tipo de Trigger</label> `);
          $$renderer3.select(
            {
              id: "trigger",
              value: automation.trigger.type,
              onchange: syncVisualToJson,
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
          $$renderer3.push(`</div> <div><label for="enabled" class="block text-xs font-black uppercase mb-2">Status</label> <button type="button"${attr_class(`w-full px-4 py-3 border-2 border-black font-black uppercase text-xs ${stringify(automation.enabled ? "bg-green-600 text-white" : "bg-gray-600 text-white")}`)}>${escape_html(automation.enabled ? "Ativada" : "Desativada")}</button></div></div></div>`);
        }
      });
      $$renderer2.push(`<!----> `);
      BrutalCard($$renderer2, {
        title: "Condições",
        children: ($$renderer3) => {
          $$renderer3.push(`<textarea class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[200px] focus:outline-none focus:bg-gray-900">`);
          const $$body = escape_html(JSON.stringify(automation.conditions, null, 2));
          if ($$body) {
            $$renderer3.push(`${$$body}`);
          }
          $$renderer3.push(`</textarea>`);
        }
      });
      $$renderer2.push(`<!----> `);
      BrutalCard($$renderer2, {
        title: "Ações",
        children: ($$renderer3) => {
          $$renderer3.push(`<textarea class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[200px] focus:outline-none focus:bg-gray-900">`);
          const $$body_1 = escape_html(JSON.stringify(automation.actions, null, 2));
          if ($$body_1) {
            $$renderer3.push(`${$$body_1}`);
          }
          $$renderer3.push(`</textarea>`);
        }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    BrutalModal($$renderer2, {
      title: "Confirmar Deleção",
      isOpen: showDeleteModal,
      onClose: () => showDeleteModal = false,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4"><p class="text-sm">Tem certeza que deseja deletar a automação "<strong>${escape_html(automation.name)}</strong>"?
            Esta ação não pode ser desfeita.</p> <div class="flex gap-3"><button${attr("disabled", isDeleting, true)} class="flex-1 px-6 py-3 border-4 border-red-600 bg-red-900/30 text-red-400 font-black uppercase text-xs transition-all disabled:opacity-50">${escape_html("Deletar")}</button> <button${attr("disabled", isDeleting, true)} class="flex-1 px-6 py-3 border-4 border-gray-600 bg-gray-900/30 text-gray-400 font-black uppercase text-xs transition-all disabled:opacity-50">Cancelar</button></div></div>`);
      }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DsCySlWx.js.map

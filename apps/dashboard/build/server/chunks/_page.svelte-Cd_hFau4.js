import { h as attr_class, k as attr, ar as bind_props, j as stringify, d as ensure_array_like, o as sanitize_props, p as spread_props, q as slot } from './index2-BYEgVnmH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-CgB-WIH5.js';
import './state.svelte-oPLNWtsX.js';
import { B as BrutalCard } from './BrutalCard-7hyKWuhi.js';
import { B as BrutalModal } from './BrutalModal-BNd_eXu0.js';
import { A as Arrow_left } from './arrow-left-Bs3Cbthx.js';
import { C as Code } from './code-ctY39doE.js';
import { S as Save } from './save-DKd3OVbU.js';
import { T as Trash_2 } from './trash-2-D4aIzcY4.js';
import { P as Plus } from './plus-8M2k88qj.js';
import { I as Icon } from './Icon-Tn6mjnxn.js';
import 'clsx';
import './equality-DjuIlvRH.js';

function X($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon($$renderer, spread_props([
    { name: "x" },
    $$sanitized_props,
    {
      /**
       * @component @name X
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTggNiA2IDE4IiAvPgogIDxwYXRoIGQ9Im02IDYgMTIgMTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/x
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let hasUnsavedChanges;
    let data = $$props["data"];
    let command = { ...data.command };
    let originalCommand = JSON.parse(JSON.stringify(data.command));
    JSON.stringify(command, null, 2);
    let isDeleting = false;
    let showDeleteModal = false;
    let newAlias = "";
    hasUnsavedChanges = JSON.stringify(command) !== JSON.stringify(originalCommand);
    $$renderer2.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div class="flex items-center gap-4"><button class="p-2 hover:bg-gray-900 transition-colors" title="Voltar">`);
    Arrow_left($$renderer2, { size: 24 });
    $$renderer2.push(`<!----></button> <div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Protocol Enforcement / COMMAND EDITOR</h2> <h1 class="text-4xl font-black uppercase tracking-tighter">${escape_html(command.name || "Sem Nome")}</h1></div></div> <div class="flex gap-4"><button${attr_class(`px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all ${stringify("bg-black text-white")}`)}>${escape_html("JSON Mode")} `);
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
        title: "Propriedades do Comando",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="space-y-4"><div><label for="name" class="block text-xs font-black uppercase mb-2">Nome *</label> <input id="name" type="text"${attr("value", command.name)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="prefix" class="block text-xs font-black uppercase mb-2">Prefixo</label> <input id="prefix" type="text"${attr("value", command.prefix)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div> <div><label for="cooldown" class="block text-xs font-black uppercase mb-2">Cooldown (ms)</label> <input id="cooldown" type="number"${attr("value", command.cooldown)} class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/></div></div> <div><label for="description" class="block text-xs font-black uppercase mb-2">Descrição</label> <textarea id="description" class="w-full border-2 border-black p-3 font-mono text-sm min-h-[80px] focus:outline-none focus:bg-yellow-100">`);
          const $$body = escape_html(command.description);
          if ($$body) {
            $$renderer3.push(`${$$body}`);
          }
          $$renderer3.push(`</textarea></div> <div><label class="block text-xs font-black uppercase mb-2">Aliases</label> <div class="flex gap-2 mb-3"><input type="text"${attr("value", newAlias)} placeholder="Adicionar alias" class="flex-1 border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"/> <button class="px-4 py-3 border-2 border-black bg-green-600 text-white font-black text-xs hover:bg-green-700">`);
          Plus($$renderer3, { size: 16 });
          $$renderer3.push(`<!----></button></div> <div class="flex flex-wrap gap-2"><!--[-->`);
          const each_array = ensure_array_like(command.aliases);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let alias = each_array[$$index];
            $$renderer3.push(`<div class="bg-black text-white px-3 py-1 rounded flex items-center gap-2"><span class="text-xs font-black">${escape_html(alias)}</span> <button class="hover:text-red-400 transition-colors">`);
            X($$renderer3, { size: 14 });
            $$renderer3.push(`<!----></button></div>`);
          }
          $$renderer3.push(`<!--]--></div></div> <div><label for="enabled" class="block text-xs font-black uppercase mb-2">Status</label> <button type="button"${attr_class(`w-full px-4 py-3 border-2 border-black font-black uppercase text-xs ${stringify(command.enabled ? "bg-green-600 text-white" : "bg-gray-600 text-white")}`)}>${escape_html(command.enabled ? "Ativado" : "Desativado")}</button></div></div>`);
        }
      });
      $$renderer2.push(`<!----> `);
      BrutalCard($$renderer2, {
        title: "Lógica do Comando",
        children: ($$renderer3) => {
          $$renderer3.push(`<textarea class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[300px] focus:outline-none focus:bg-gray-900">`);
          const $$body_1 = escape_html(typeof command !== "object" || !command.logic ? "{}" : JSON.stringify(command.logic || {}, null, 2));
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
        $$renderer3.push(`<div class="space-y-4"><p class="text-sm">Tem certeza que deseja deletar o comando "<strong>${escape_html(command.name)}</strong>"?
            Esta ação não pode ser desfeita.</p> <div class="flex gap-3"><button${attr("disabled", isDeleting, true)} class="flex-1 px-6 py-3 border-4 border-red-600 bg-red-900/30 text-red-400 font-black uppercase text-xs transition-all disabled:opacity-50">${escape_html("Deletar")}</button> <button${attr("disabled", isDeleting, true)} class="flex-1 px-6 py-3 border-4 border-gray-600 bg-gray-900/30 text-gray-400 font-black uppercase text-xs transition-all disabled:opacity-50">Cancelar</button></div></div>`);
      }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cd_hFau4.js.map

import { o as sanitize_props, p as spread_props, q as slot, d as ensure_array_like } from './index2-BYEgVnmH.js';
import { B as BrutalCard } from './BrutalCard-7hyKWuhi.js';
import { I as Icon } from './Icon-Tn6mjnxn.js';
import './escaping-CqgfEcN3.js';
import 'clsx';
import './equality-DjuIlvRH.js';

function Download($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 15V3" }],
    ["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["path", { "d": "m7 10 5 5 5-5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "download" },
    $$sanitized_props,
    {
      /**
       * @component @name Download
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTVWMyIgLz4KICA8cGF0aCBkPSJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNCIgLz4KICA8cGF0aCBkPSJtNyAxMCA1IDUgNS01IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/download
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
function Funnel($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "funnel" },
    $$sanitized_props,
    {
      /**
       * @component @name Funnel
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMjBhMSAxIDAgMCAwIC41NTMuODk1bDIgMUExIDEgMCAwIDAgMTQgMjF2LTdhMiAyIDAgMCAxIC41MTctMS4zNDFMMjEuNzQgNC42N0ExIDEgMCAwIDAgMjEgM0gzYTEgMSAwIDAgMC0uNzQyIDEuNjdsNy4yMjUgNy45ODlBMiAyIDAgMCAxIDEwIDE0eiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/funnel
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
function _page($$renderer) {
  $$renderer.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Immutable History</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Audit Ledger</h1></div> <div class="flex gap-4"><button class="brutal-btn flex items-center gap-2 py-2 px-4 shadow-[2px_2px_0px_#000] text-xs">`);
  Funnel($$renderer, { size: 14 });
  $$renderer.push(`<!----> Filter</button> <button class="brutal-btn-red brutal-btn flex items-center gap-2 py-2 px-4 shadow-[2px_2px_0px_#000] text-xs">`);
  Download($$renderer, { size: 14 });
  $$renderer.push(`<!----> Export CSV</button></div></header> `);
  BrutalCard($$renderer, {
    title: "Log Registry",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="overflow-x-auto mt-4"><table class="w-full text-left font-mono text-xs"><thead><tr class="border-b-2 border-black/20 text-[10px] font-black uppercase tracking-widest opacity-40"><th class="py-4 px-2">Timestamp</th><th class="py-4 px-2">Operator</th><th class="py-4 px-2">Action</th><th class="py-4 px-2">Entity</th><th class="py-4 px-2">Change</th><th class="py-4 px-2 text-right">Status</th></tr></thead><tbody class="divide-y divide-white/5"><!--[-->`);
      const each_array = ensure_array_like(Array(8));
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        $$renderer2.push(`<tr class="hover:bg-white/[0.02] transition-colors"><td class="py-4 px-2 opacity-30">2026-03-07 14:55:12</td><td class="py-4 px-2 font-bold uppercase tracking-tight">System_Automator</td><td class="py-4 px-2 text-blue-500 font-bold uppercase">Update_Variable</td><td class="py-4 px-2">GLOBAL_EXP</td><td class="py-4 px-2"><span class="text-red-500">1.2</span> → <span class="text-emerald-500">1.5</span></td><td class="py-4 px-2 text-right"><span class="text-[8px] font-black uppercase bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 border border-emerald-500/50">Verified</span></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> <div class="mt-8 flex justify-center gap-4"><button class="opacity-20 hover:opacity-100 transition-opacity font-black uppercase text-xs">Previous Page</button> <span class="font-black text-xs">01 / 45</span> <button class="hover:text-red-500 font-black uppercase text-xs">Next Page</button></div>`);
    }
  });
  $$renderer.push(`<!----></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CSgnjgS9.js.map

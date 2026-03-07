import "clsx";
import { B as BrutalCard } from "../../../../chunks/BrutalCard.js";
import { B as BrutalButton } from "../../../../chunks/BrutalButton.js";
import { a as sanitize_props, b as spread_props, c as slot } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { S as Shield_alert } from "../../../../chunks/shield-alert.js";
function Key($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"
      }
    ],
    ["path", { "d": "m21 2-9.6 9.6" }],
    ["circle", { "cx": "7.5", "cy": "15.5", "r": "5.5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "key" },
    $$sanitized_props,
    {
      /**
       * @component @name Key
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUuNSA3LjUgMi4zIDIuM2ExIDEgMCAwIDAgMS40IDBsMi4xLTIuMWExIDEgMCAwIDAgMC0xLjRMMTkgNCIgLz4KICA8cGF0aCBkPSJtMjEgMi05LjYgOS42IiAvPgogIDxjaXJjbGUgY3g9IjcuNSIgY3k9IjE1LjUiIHI9IjUuNSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/key
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
function Lock($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "11",
        "x": "3",
        "y": "11",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "lock" },
    $$sanitized_props,
    {
      /**
       * @component @name Lock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHg9IjMiIHk9IjExIiByeD0iMiIgcnk9IjIiIC8+CiAgPHBhdGggZD0iTTcgMTFWN2E1IDUgMCAwIDEgMTAgMHY0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/lock
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
function User_check($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m16 11 2 2 4-4" }],
    ["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user-check" },
    $$sanitized_props,
    {
      /**
       * @component @name UserCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgMTEgMiAyIDQtNCIgLz4KICA8cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iNyIgcj0iNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/user-check
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
  $$renderer.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Access Control</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Security &amp; RBAC</h1></div> <div class="flex items-center gap-4"><div class="bg-emerald-950/20 text-emerald-500 border border-emerald-500/50 px-4 py-2 flex items-center gap-2">`);
  Lock($$renderer, { size: 14 });
  $$renderer.push(`<!----> <span class="text-[10px] font-black uppercase tracking-widest">Enforcement Active</span></div></div></header> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">`);
  BrutalCard($$renderer, {
    title: "Role Definitions",
    class: "lg:col-span-1",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="space-y-3"><div class="p-4 bg-red-600 border-4 border-black shadow-[4px_4px_0px_#000] text-white"><div class="flex justify-between items-center"><span class="font-black uppercase text-xs">General Secretary</span> `);
      Shield_alert($$renderer2, { size: 14 });
      $$renderer2.push(`<!----></div> <div class="text-[9px] font-bold opacity-60 uppercase mt-1">Full System Access</div></div> <div class="p-4 bg-white/5 border-4 border-black hover:bg-white/10 transition-colors cursor-pointer"><div class="flex justify-between items-center text-white"><span class="font-black uppercase text-xs">Commissar</span> `);
      User_check($$renderer2, { size: 14, class: "opacity-30" });
      $$renderer2.push(`<!----></div> <div class="text-[9px] font-bold opacity-40 uppercase mt-1">Moderation &amp; Economy</div></div> <div class="p-4 bg-white/5 border-4 border-black hover:bg-white/10 transition-colors cursor-pointer"><div class="flex justify-between items-center text-white"><span class="font-black uppercase text-xs">Worker</span> `);
      Key($$renderer2, { size: 14, class: "opacity-30" });
      $$renderer2.push(`<!----></div> <div class="text-[9px] font-bold opacity-40 uppercase mt-1">Standard Dashboard Use</div></div></div> `);
      BrutalButton($$renderer2, {
        class: "w-full mt-6 bg-transparent border-dashed text-white/30 border-white/10",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->+ New Role`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    }
  });
  $$renderer.push(`<!----> `);
  BrutalCard($$renderer, {
    title: "Permission Matrix (General Secretary)",
    class: "lg:col-span-2",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"><span class="text-[10px] font-black uppercase tracking-widest">Manage Automations</span> <div class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"><div class="w-4 h-4 bg-white border-2 border-black ml-auto"></div></div></div> <div class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"><span class="text-[10px] font-black uppercase tracking-widest">Execute Commands</span> <div class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"><div class="w-4 h-4 bg-white border-2 border-black ml-auto"></div></div></div> <div class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"><span class="text-[10px] font-black uppercase tracking-widest">Access Ledger</span> <div class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"><div class="w-4 h-4 bg-white border-2 border-black ml-auto"></div></div></div> <div class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"><span class="text-[10px] font-black uppercase tracking-widest">Modify Economy</span> <div class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"><div class="w-4 h-4 bg-white border-2 border-black ml-auto"></div></div></div></div> <div class="p-6 bg-red-950/20 border-l-4 border-red-600"><h4 class="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Danger Zone</h4> <p class="text-xs opacity-60 mb-4">Roles with 'Full System Access' can delete the entire
                        database and revoke administrator access.</p> `);
      BrutalButton($$renderer2, {
        variant: "red",
        class: "py-2 px-4 shadow-none border-2",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Revoke All Admin Tokens`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div>`);
    }
  });
  $$renderer.push(`<!----></div></div>`);
}
export {
  _page as default
};

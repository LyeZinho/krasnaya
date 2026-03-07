import { clsx as clsx$1 } from 'clsx';
import { d as ensure_array_like, f as store_get, h as attr_class, j as stringify, k as attr, l as unsubscribe_stores, m as clsx, n as ssr_context, o as sanitize_props, p as spread_props, q as slot } from './index2-BYEgVnmH.js';
import { p as page } from './index3-p0BCdGhK.js';
import { u as user } from './user-B9zjKefr.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './root-CgB-WIH5.js';
import './state.svelte-oPLNWtsX.js';
import { I as Icon } from './Icon-Tn6mjnxn.js';
import { Z as Zap } from './zap-DM_WMQKr.js';
import { I as Image } from './image-C55U-UUF.js';
import { S as Shield_alert } from './shield-alert-BsQPcMBR.js';
import { w as writable } from './index-BVoVcc7B.js';
import './guild-A3J54mtn.js';
import './equality-DjuIlvRH.js';

function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Activity($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "activity" },
    $$sanitized_props,
    {
      /**
       * @component @name Activity
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/activity
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
function Database($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["ellipse", { "cx": "12", "cy": "5", "rx": "9", "ry": "3" }],
    ["path", { "d": "M3 5V19A9 3 0 0 0 21 19V5" }],
    ["path", { "d": "M3 12A9 3 0 0 0 21 12" }]
  ];
  Icon($$renderer, spread_props([
    { name: "database" },
    $$sanitized_props,
    {
      /**
       * @component @name Database
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8ZWxsaXBzZSBjeD0iMTIiIGN5PSI1IiByeD0iOSIgcnk9IjMiIC8+CiAgPHBhdGggZD0iTTMgNVYxOUE5IDMgMCAwIDAgMjEgMTlWNSIgLz4KICA8cGF0aCBkPSJNMyAxMkE5IDMgMCAwIDAgMjEgMTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/database
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
function History($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }
    ],
    ["path", { "d": "M3 3v5h5" }],
    ["path", { "d": "M12 7v5l4 2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "history" },
    $$sanitized_props,
    {
      /**
       * @component @name History
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAxMmE5IDkgMCAxIDAgOS05IDkuNzUgOS43NSAwIDAgMC02Ljc0IDIuNzRMMyA4IiAvPgogIDxwYXRoIGQ9Ik0zIDN2NWg1IiAvPgogIDxwYXRoIGQ9Ik0xMiA3djVsNCAyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/history
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
function Layers($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
      }
    ],
    [
      "path",
      {
        "d": "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"
      }
    ],
    [
      "path",
      {
        "d": "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "layers" },
    $$sanitized_props,
    {
      /**
       * @component @name Layers
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIuODMgMi4xOGEyIDIgMCAwIDAtMS42NiAwTDIuNiA2LjA4YTEgMSAwIDAgMCAwIDEuODNsOC41OCAzLjkxYTIgMiAwIDAgMCAxLjY2IDBsOC41OC0zLjlhMSAxIDAgMCAwIDAtMS44M3oiIC8+CiAgPHBhdGggZD0iTTIgMTJhMSAxIDAgMCAwIC41OC45MWw4LjYgMy45MWEyIDIgMCAwIDAgMS42NSAwbDguNTgtMy45QTEgMSAwIDAgMCAyMiAxMiIgLz4KICA8cGF0aCBkPSJNMiAxN2ExIDEgMCAwIDAgLjU4LjkxbDguNiAzLjkxYTIgMiAwIDAgMCAxLjY1IDBsOC41OC0zLjlBMSAxIDAgMCAwIDIyIDE3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/layers
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
function Layout_dashboard($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      { "width": "7", "height": "9", "x": "3", "y": "3", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "5", "x": "14", "y": "3", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "9", "x": "14", "y": "12", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "5", "x": "3", "y": "16", "rx": "1" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "layout-dashboard" },
    $$sanitized_props,
    {
      /**
       * @component @name LayoutDashboard
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4PSIzIiB5PSIzIiByeD0iMSIgLz4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIxNCIgeT0iMyIgcng9IjEiIC8+CiAgPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMTQiIHk9IjEyIiByeD0iMSIgLz4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIzIiB5PSIxNiIgcng9IjEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/layout-dashboard
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
function Log_out($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m16 17 5-5-5-5" }],
    ["path", { "d": "M21 12H9" }],
    ["path", { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "log-out" },
    $$sanitized_props,
    {
      /**
       * @component @name LogOut
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgMTcgNS01LTUtNSIgLz4KICA8cGF0aCBkPSJNMjEgMTJIOSIgLz4KICA8cGF0aCBkPSJNOSAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/log-out
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
function Settings($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "settings" },
    $$sanitized_props,
    {
      /**
       * @component @name Settings
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOS42NzEgNC4xMzZhMi4zNCAyLjM0IDAgMCAxIDQuNjU5IDAgMi4zNCAyLjM0IDAgMCAwIDMuMzE5IDEuOTE1IDIuMzQgMi4zNCAwIDAgMSAyLjMzIDQuMDMzIDIuMzQgMi4zNCAwIDAgMCAwIDMuODMxIDIuMzQgMi4zNCAwIDAgMS0yLjMzIDQuMDMzIDIuMzQgMi4zNCAwIDAgMC0zLjMxOSAxLjkxNSAyLjM0IDIuMzQgMCAwIDEtNC42NTkgMCAyLjM0IDIuMzQgMCAwIDAtMy4zMi0xLjkxNSAyLjM0IDIuMzQgMCAwIDEtMi4zMy00LjAzMyAyLjM0IDIuMzQgMCAwIDAgMC0zLjgzMUEyLjM0IDIuMzQgMCAwIDEgNi4zNSA2LjA1MWEyLjM0IDIuMzQgMCAwIDAgMy4zMTktMS45MTUiIC8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/settings
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
function Terminal($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 19h8" }],
    ["path", { "d": "m4 17 6-6-6-6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "terminal" },
    $$sanitized_props,
    {
      /**
       * @component @name Terminal
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTloOCIgLz4KICA8cGF0aCBkPSJtNCAxNyA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/terminal
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
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const isActive = (path) => page.url.pathname === path;
    $$renderer2.push(`<div class="w-64 h-screen border-r-4 border-black bg-[#121212] flex flex-col"><div class="p-6 border-b-4 border-black"><div class="flex items-center gap-2 mb-4">`);
    Terminal($$renderer2, { class: "text-red-600", size: 24 });
    $$renderer2.push(`<!----> <h1 class="text-xl font-black tracking-tighter uppercase text-white">Krasnaya</h1></div> <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div> <span class="text-[10px] font-bold uppercase tracking-tighter text-white">System Operational</span></div></div> <div class="flex-1 overflow-y-auto py-4"><div class="px-6 mb-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Management</div> <a href="/dashboard"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/dashboard") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Layout_dashboard($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Dashboard</span></a> <a href="/flows"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/flows") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Zap($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Automations</span></a> <a href="/commands"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/commands") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Terminal($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Commands</span></a> <a href="/cards"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/cards") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Image($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Cards</span></a> <a href="/modules"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/modules") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Layers($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Modules</span></a> <a href="/database"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/database") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Database($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Variables</span></a> <div class="px-6 mt-8 mb-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">System Admin</div> <a href="/admin/system"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/admin/system") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Activity($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Monitor</span></a> <a href="/admin/ledger"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/admin/ledger") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    History($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Audit Ledger</span></a> <a href="/admin/rbac"${attr_class(clsx(clsx$1("flex items-center gap-3 p-3 transition-all border-l-4", isActive("/admin/rbac") ? "bg-white/10 border-red-600 text-white" : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5")))}>`);
    Shield_alert($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-widest">Security</span></a></div> <div class="p-6 border-t-4 border-black bg-black/20 flex flex-col gap-3">`);
    if (store_get($$store_subs ??= {}, "$user", user)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="text-[10px] font-bold text-white/50 text-center mb-2">${escape_html(store_get($$store_subs ??= {}, "$user", user).username)}</div> <button class="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border-2 border-red-600 text-red-400 uppercase text-xs font-bold transition-all">`);
      Log_out($$renderer2, { size: 14 });
      $$renderer2.push(`<!----> Logout</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><div class="text-[10px] font-bold opacity-30">V.2.5.0-STABLE</div> `);
    Settings($$renderer2, {
      size: 14,
      class: "opacity-30 hover:opacity-100 cursor-pointer"
    });
    $$renderer2.push(`<!----></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function getDefaultDuration(type) {
  const durations = {
    success: 3e3,
    error: 5e3,
    warning: 4e3,
    info: 3e3
  };
  return durations[type];
}
function createToastId() {
  return `toast-${crypto.randomUUID()}`;
}
function createToastStore() {
  const { subscribe, set, update } = writable([]);
  const timeoutMap = /* @__PURE__ */ new Map();
  return {
    subscribe,
    /**
     * Add a new toast notification
     * @param message - The toast message text (must not be empty or whitespace-only)
     * @param type - The toast type affecting styling and default duration
     * @param duration - Optional custom duration in milliseconds. If not specified, uses type-based defaults
     * @param dismissable - Optional flag to allow manual dismissal. Defaults to true. Remember to clean up subscriptions after use.
     */
    add(message, type = "info", duration, dismissable) {
      if (!message?.trim()) return;
      const id = createToastId();
      const finalDuration = duration ?? getDefaultDuration(type);
      const isDismissable = dismissable ?? true;
      const toast = {
        id,
        type,
        message,
        duration: finalDuration,
        dismissable: isDismissable
      };
      update((toasts) => [...toasts, toast]);
      const timeoutId = setTimeout(() => {
        toastStore.remove(id);
      }, finalDuration);
      timeoutMap.set(id, timeoutId);
    },
    /**
     * Remove a toast by ID, canceling any pending timeout
     */
    remove(id) {
      const timeoutId = timeoutMap.get(id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutMap.delete(id);
      }
      update((toasts) => toasts.filter((toast) => toast.id !== id));
    },
    /**
     * Clear all toasts and cancel all pending timeouts
     */
    clear() {
      timeoutMap.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutMap.clear();
      set([]);
    }
  };
}
const toastStore = createToastStore();
function ToastContainer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const iconMap = { success: "✓", error: "✗", warning: "⚠️", info: "ℹ️" };
    const colorMap = {
      success: "bg-green-600",
      error: "bg-red-600",
      warning: "bg-yellow-500",
      info: "bg-blue-600"
    };
    const unsubscribe = toastStore.subscribe(() => {
    });
    onDestroy(() => {
      unsubscribe();
    });
    $$renderer2.push(`<div role="region" aria-label="Notifications" aria-live="polite" aria-atomic="false" class="fixed top-4 right-4 z-50 flex flex-col space-y-2"><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$toastStore", toastStore));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let toast = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`flex items-center gap-3 px-4 py-3 ${stringify(colorMap[toast.type])} text-white border-2 border-black font-mono text-sm rounded will-change-transform`)}><span class="flex-shrink-0 text-lg">${escape_html(iconMap[toast.type])}</span> <span class="flex-1">${escape_html(toast.message)}</span> `);
      if (toast.dismissable) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button type="button" class="flex-shrink-0 text-white hover:opacity-75 transition-opacity"${attr("aria-label", `Dismiss notification: ${stringify(toast.message)}`)}>✕</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    ToastContainer($$renderer2);
    $$renderer2.push(`<!----> <div class="flex h-screen bg-[#1a1a1a] text-white">`);
    Sidebar($$renderer2);
    $$renderer2.push(`<!----> <main class="flex-1 overflow-y-auto p-8 relative"><div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 32px 32px;"></div> <div class="relative z-10">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div></main></div>`);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-BHpArKOR.js.map

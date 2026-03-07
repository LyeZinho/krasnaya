import { a as sanitize_props, b as spread_props, c as slot, g as ensure_array_like, d as attr_class, h as stringify, i as attr, l as attr_style } from "../../../../chunks/index2.js";
import { B as BrutalCard } from "../../../../chunks/BrutalCard.js";
import { B as BrutalButton } from "../../../../chunks/BrutalButton.js";
import { Z as Zap } from "../../../../chunks/zap.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { S as Shield_alert } from "../../../../chunks/shield-alert.js";
import { S as Search } from "../../../../chunks/search.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function Bell_ring($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M10.268 21a2 2 0 0 0 3.464 0" }],
    ["path", { "d": "M22 8c0-2.3-.8-4.3-2-6" }],
    [
      "path",
      {
        "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
      }
    ],
    ["path", { "d": "M4 2C2.8 3.7 2 5.7 2 8" }]
  ];
  Icon($$renderer, spread_props([
    { name: "bell-ring" },
    $$sanitized_props,
    {
      /**
       * @component @name BellRing
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAuMjY4IDIxYTIgMiAwIDAgMCAzLjQ2NCAwIiAvPgogIDxwYXRoIGQ9Ik0yMiA4YzAtMi4zLS44LTQuMy0yLTYiIC8+CiAgPHBhdGggZD0iTTMuMjYyIDE1LjMyNkExIDEgMCAwIDAgNCAxN2gxNmExIDEgMCAwIDAgLjc0LTEuNjczQzE5LjQxIDEzLjk1NiAxOCAxMi40OTkgMTggOEE2IDYgMCAwIDAgNiA4YzAgNC40OTktMS40MTEgNS45NTYtMi43MzggNy4zMjYiIC8+CiAgPHBhdGggZD0iTTQgMkMyLjggMy43IDIgNS43IDIgOCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/bell-ring
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
function Chart_column($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { "d": "M18 17V9" }],
    ["path", { "d": "M13 17V5" }],
    ["path", { "d": "M8 17v-3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chart-column" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartColumn
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAzdjE2YTIgMiAwIDAgMCAyIDJoMTYiIC8+CiAgPHBhdGggZD0iTTE4IDE3VjkiIC8+CiAgPHBhdGggZD0iTTEzIDE3VjUiIC8+CiAgPHBhdGggZD0iTTggMTd2LTMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-column
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
function Clock($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 6v6l4 2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "clock" },
    $$sanitized_props,
    {
      /**
       * @component @name Clock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgNnY2bDQgMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/clock
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
function Coins($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M13.744 17.736a6 6 0 1 1-7.48-7.48" }],
    ["path", { "d": "M15 6h1v4" }],
    ["path", { "d": "m6.134 14.768.866-.5 2 3.464" }],
    ["circle", { "cx": "16", "cy": "8", "r": "6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "coins" },
    $$sanitized_props,
    {
      /**
       * @component @name Coins
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTMuNzQ0IDE3LjczNmE2IDYgMCAxIDEtNy40OC03LjQ4IiAvPgogIDxwYXRoIGQ9Ik0xNSA2aDF2NCIgLz4KICA8cGF0aCBkPSJtNi4xMzQgMTQuNzY4Ljg2Ni0uNSAyIDMuNDY0IiAvPgogIDxjaXJjbGUgY3g9IjE2IiBjeT0iOCIgcj0iNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/coins
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
function Flame($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "flame" },
    $$sanitized_props,
    {
      /**
       * @component @name Flame
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM3ExIDQgNCA2LjV0MyA1LjVhMSAxIDAgMCAxLTE0IDAgNSA1IDAgMCAxIDEtMyAxIDEgMCAwIDAgNSAwYzAtMi0xLjUtMy0xLjUtNXEwLTIgMi41LTQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/flame
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
function Gamepad_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["line", { "x1": "6", "x2": "10", "y1": "11", "y2": "11" }],
    ["line", { "x1": "8", "x2": "8", "y1": "9", "y2": "13" }],
    [
      "line",
      { "x1": "15", "x2": "15.01", "y1": "12", "y2": "12" }
    ],
    [
      "line",
      { "x1": "18", "x2": "18.01", "y1": "10", "y2": "10" }
    ],
    [
      "path",
      {
        "d": "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "gamepad-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Gamepad2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iNiIgeDI9IjEwIiB5MT0iMTEiIHkyPSIxMSIgLz4KICA8bGluZSB4MT0iOCIgeDI9IjgiIHkxPSI5IiB5Mj0iMTMiIC8+CiAgPGxpbmUgeDE9IjE1IiB4Mj0iMTUuMDEiIHkxPSIxMiIgeTI9IjEyIiAvPgogIDxsaW5lIHgxPSIxOCIgeDI9IjE4LjAxIiB5MT0iMTAiIHkyPSIxMCIgLz4KICA8cGF0aCBkPSJNMTcuMzIgNUg2LjY4YTQgNCAwIDAgMC0zLjk3OCAzLjU5Yy0uMDA2LjA1Mi0uMDEuMTAxLS4wMTcuMTUyQzIuNjA0IDkuNDE2IDIgMTQuNDU2IDIgMTZhMyAzIDAgMCAwIDMgM2MxIDAgMS41LS41IDItMWwxLjQxNC0xLjQxNEEyIDIgMCAwIDEgOS44MjggMTZoNC4zNDRhMiAyIDAgMCAxIDEuNDE0LjU4NkwxNyAxOGMuNS41IDEgMSAyIDFhMyAzIDAgMCAwIDMtM2MwLTEuNTQ1LS42MDQtNi41ODQtLjY4NS03LjI1OC0uMDA3LS4wNS0uMDExLS4xLS4wMTctLjE1MUE0IDQgMCAwIDAgMTcuMzIgNXoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/gamepad-2
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
function Gift($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 7v14" }],
    ["path", { "d": "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }],
    [
      "path",
      {
        "d": "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"
      }
    ],
    [
      "rect",
      { "x": "3", "y": "7", "width": "18", "height": "4", "rx": "1" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "gift" },
    $$sanitized_props,
    {
      /**
       * @component @name Gift
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgN3YxNCIgLz4KICA8cGF0aCBkPSJNMjAgMTF2OGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMnYtOCIgLz4KICA8cGF0aCBkPSJNNy41IDdhMSAxIDAgMCAxIDAtNUE0LjggOCAwIDAgMSAxMiA3YTQuOCA4IDAgMCAxIDQuNS01IDEgMSAwIDAgMSAwIDUiIC8+CiAgPHJlY3QgeD0iMyIgeT0iNyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjQiIHJ4PSIxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/gift
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
function Hammer($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" }],
    ["path", { "d": "m18 15 4-4" }],
    [
      "path",
      {
        "d": "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "hammer" },
    $$sanitized_props,
    {
      /**
       * @component @name Hammer
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUgMTItOS4zNzMgOS4zNzNhMSAxIDAgMCAxLTMuMDAxLTNMMTIgOSIgLz4KICA8cGF0aCBkPSJtMTggMTUgNC00IiAvPgogIDxwYXRoIGQ9Im0yMS41IDExLjUtMS45MTQtMS45MTRBMiAyIDAgMCAxIDE5IDguMTcydi0uMzQ0YTIgMiAwIDAgMC0uNTg2LTEuNDE0bC0xLjY1Ny0xLjY1N0E2IDYgMCAwIDAgMTIuNTE2IDNIOWwxLjI0MyAxLjI0M0E2IDYgMCAwIDEgMTIgOC40ODVWMTBsMiAyaDEuMTcyYTIgMiAwIDAgMSAxLjQxNC41ODZMMTguNSAxNC41IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/hammer
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
function Inbox($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polyline",
      { "points": "22 12 16 12 14 15 10 15 8 12 2 12" }
    ],
    [
      "path",
      {
        "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "inbox" },
    $$sanitized_props,
    {
      /**
       * @component @name Inbox
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiAxMiAxNiAxMiAxNCAxNSAxMCAxNSA4IDEyIDIgMTIiIC8+CiAgPHBhdGggZD0iTTUuNDUgNS4xMSAyIDEydjZhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0ydi02bC0zLjQ1LTYuODlBMiAyIDAgMCAwIDE2Ljc2IDRINy4yNGEyIDIgMCAwIDAtMS43OSAxLjExeiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/inbox
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
function Message_square($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "message-square" },
    $$sanitized_props,
    {
      /**
       * @component @name MessageSquare
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTdhMiAyIDAgMCAxLTIgMkg2LjgyOGEyIDIgMCAwIDAtMS40MTQuNTg2bC0yLjIwMiAyLjIwMkEuNzEuNzEgMCAwIDEgMiAyMS4yODZWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/message-square
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
function Mouse_pointer_click($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M14 4.1 12 6" }],
    ["path", { "d": "m5.1 8-2.9-.8" }],
    ["path", { "d": "m6 12-1.9 2" }],
    ["path", { "d": "M7.2 2.2 8 5.1" }],
    [
      "path",
      {
        "d": "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "mouse-pointer-click" },
    $$sanitized_props,
    {
      /**
       * @component @name MousePointerClick
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQgNC4xIDEyIDYiIC8+CiAgPHBhdGggZD0ibTUuMSA4LTIuOS0uOCIgLz4KICA8cGF0aCBkPSJtNiAxMi0xLjkgMiIgLz4KICA8cGF0aCBkPSJNNy4yIDIuMiA4IDUuMSIgLz4KICA8cGF0aCBkPSJNOS4wMzcgOS42OWEuNDk4LjQ5OCAwIDAgMSAuNjUzLS42NTNsMTEgNC41YS41LjUgMCAwIDEtLjA3NC45NDlsLTQuMzQ5IDEuMDQxYTEgMSAwIDAgMC0uNzQuNzM5bC0xLjA0IDQuMzVhLjUuNSAwIDAgMS0uOTUuMDc0eiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/mouse-pointer-click
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
function Music($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M9 18V5l12-2v13" }],
    ["circle", { "cx": "6", "cy": "18", "r": "3" }],
    ["circle", { "cx": "18", "cy": "16", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "music" },
    $$sanitized_props,
    {
      /**
       * @component @name Music
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOSAxOFY1bDEyLTJ2MTMiIC8+CiAgPGNpcmNsZSBjeD0iNiIgY3k9IjE4IiByPSIzIiAvPgogIDxjaXJjbGUgY3g9IjE4IiBjeT0iMTYiIHI9IjMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/music
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
function Repeat($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m17 2 4 4-4 4" }],
    ["path", { "d": "M3 11v-1a4 4 0 0 1 4-4h14" }],
    ["path", { "d": "m7 22-4-4 4-4" }],
    ["path", { "d": "M21 13v1a4 4 0 0 1-4 4H3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "repeat" },
    $$sanitized_props,
    {
      /**
       * @component @name Repeat
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTcgMiA0IDQtNCA0IiAvPgogIDxwYXRoIGQ9Ik0zIDExdi0xYTQgNCAwIDAgMSA0LTRoMTQiIC8+CiAgPHBhdGggZD0ibTcgMjItNC00IDQtNCIgLz4KICA8cGF0aCBkPSJNMjEgMTN2MWE0IDQgMCAwIDEtNCA0SDMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/repeat
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
function Shield($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "shield" },
    $$sanitized_props,
    {
      /**
       * @component @name Shield
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTNjMCA1LTMuNSA3LjUtNy42NiA4Ljk1YTEgMSAwIDAgMS0uNjctLjAxQzcuNSAyMC41IDQgMTggNCAxM1Y2YTEgMSAwIDAgMSAxLTFjMiAwIDQuNS0xLjIgNi4yNC0yLjcyYTEuMTcgMS4xNyAwIDAgMSAxLjUyIDBDMTQuNTEgMy44MSAxNyA1IDE5IDVhMSAxIDAgMCAxIDEgMXoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/shield
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
function Star($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "star" },
    $$sanitized_props,
    {
      /**
       * @component @name Star
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEuNTI1IDIuMjk1YS41My41MyAwIDAgMSAuOTUgMGwyLjMxIDQuNjc5YTIuMTIzIDIuMTIzIDAgMCAwIDEuNTk1IDEuMTZsNS4xNjYuNzU2YS41My41MyAwIDAgMSAuMjk0LjkwNGwtMy43MzYgMy42MzhhMi4xMjMgMi4xMjMgMCAwIDAtLjYxMSAxLjg3OGwuODgyIDUuMTRhLjUzLjUzIDAgMCAxLS43NzEuNTZsLTQuNjE4LTIuNDI4YTIuMTIyIDIuMTIyIDAgMCAwLTEuOTczIDBMNi4zOTYgMjEuMDFhLjUzLjUzIDAgMCAxLS43Ny0uNTZsLjg4MS01LjEzOWEyLjEyMiAyLjEyMiAwIDAgMC0uNjExLTEuODc5TDIuMTYgOS43OTVhLjUzLjUzIDAgMCAxIC4yOTQtLjkwNmw1LjE2NS0uNzU1YTIuMTIyIDIuMTIyIDAgMCAwIDEuNTk3LTEuMTZ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/star
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
function Ticket($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { "d": "M13 5v2" }],
    ["path", { "d": "M13 17v2" }],
    ["path", { "d": "M13 11v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "ticket" },
    $$sanitized_props,
    {
      /**
       * @component @name Ticket
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMiA5YTMgMyAwIDAgMSAwIDZ2MmEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJ2LTJhMyAzIDAgMCAxIDAtNlY3YTIgMiAwIDAgMC0yLTJINGEyIDIgMCAwIDAtMiAyWiIgLz4KICA8cGF0aCBkPSJNMTMgNXYyIiAvPgogIDxwYXRoIGQ9Ik0xMyAxN3YyIiAvPgogIDxwYXRoIGQ9Ik0xMyAxMXYyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/ticket
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
function Trophy($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"
      }
    ],
    [
      "path",
      {
        "d": "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"
      }
    ],
    ["path", { "d": "M18 9h1.5a1 1 0 0 0 0-5H18" }],
    ["path", { "d": "M4 22h16" }],
    [
      "path",
      { "d": "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" }
    ],
    ["path", { "d": "M6 9H4.5a1 1 0 0 1 0-5H6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trophy" },
    $$sanitized_props,
    {
      /**
       * @component @name Trophy
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTQuNjZ2MS42MjZhMiAyIDAgMCAxLS45NzYgMS42OTZBNSA1IDAgMCAwIDcgMjEuOTc4IiAvPgogIDxwYXRoIGQ9Ik0xNCAxNC42NnYxLjYyNmEyIDIgMCAwIDAgLjk3NiAxLjY5NkE1IDUgMCAwIDEgMTcgMjEuOTc4IiAvPgogIDxwYXRoIGQ9Ik0xOCA5aDEuNWExIDEgMCAwIDAgMC01SDE4IiAvPgogIDxwYXRoIGQ9Ik00IDIyaDE2IiAvPgogIDxwYXRoIGQ9Ik02IDlhNiA2IDAgMCAwIDEyIDBWM2ExIDEgMCAwIDAtMS0xSDdhMSAxIDAgMCAwLTEgMXoiIC8+CiAgPHBhdGggZD0iTTYgOUg0LjVhMSAxIDAgMCAxIDAtNUg2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/trophy
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
function Tv($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m17 2-5 5-5-5" }],
    [
      "rect",
      { "width": "20", "height": "15", "x": "2", "y": "7", "rx": "2" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "tv" },
    $$sanitized_props,
    {
      /**
       * @component @name Tv
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTcgMi01IDUtNS01IiAvPgogIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxNSIgeD0iMiIgeT0iNyIgcng9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/tv
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
function Youtube($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
      }
    ],
    ["path", { "d": "m10 15 5-3-5-3z" }]
  ];
  Icon($$renderer, spread_props([
    { name: "youtube" },
    $$sanitized_props,
    {
      /**
       * @component @name Youtube
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMi41IDE3YTI0LjEyIDI0LjEyIDAgMCAxIDAtMTAgMiAyIDAgMCAxIDEuNC0xLjQgNDkuNTYgNDkuNTYgMCAwIDEgMTYuMiAwQTIgMiAwIDAgMSAyMS41IDdhMjQuMTIgMjQuMTIgMCAwIDEgMCAxMCAyIDIgMCAwIDEtMS40IDEuNCA0OS41NSA0OS41NSAwIDAgMS0xNi4yIDBBMiAyIDAgMCAxIDIuNSAxNyIgLz4KICA8cGF0aCBkPSJtMTAgMTUgNS0zLTUtM3oiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/youtube
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       * @deprecated Brand icons have been deprecated and are due to be removed, please refer to https://github.com/lucide-icons/lucide/issues/670. We recommend using https://simpleicons.org/?q=youtube instead. This icon will be removed in v1.0
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
    let modules = [
      {
        id: "leveling",
        name: "System Leveling",
        description: "Reward active comrades with XP and ranks.",
        icon: Zap,
        enabled: true,
        color: "text-amber-500"
      },
      {
        id: "welcomer",
        name: "Greeting Protocol",
        description: "Dispatch automated welcomes to new arrivals.",
        icon: Message_square,
        enabled: true,
        color: "text-blue-500"
      },
      {
        id: "automod",
        name: "Auto-Censorship",
        description: "Maintain order by filtering prohibited content.",
        icon: Shield_alert,
        enabled: false,
        color: "text-red-500"
      },
      {
        id: "economy",
        name: "Resource Exchange",
        description: "Manage internal currency and market items.",
        icon: Coins,
        enabled: true,
        color: "text-emerald-500"
      },
      {
        id: "verification",
        name: "Identity Check",
        description: "Verify new members through specific protocols.",
        icon: Shield,
        enabled: false,
        color: "text-purple-500"
      },
      {
        id: "logging",
        name: "Surveillance",
        description: "Log every action to the central ledger.",
        icon: Search,
        enabled: true,
        color: "text-white"
      },
      {
        id: "ranks",
        name: "Global Hierarchy",
        description: "Track leadership across all sectors.",
        icon: Trophy,
        enabled: false,
        color: "text-yellow-400"
      },
      {
        id: "music",
        name: "Sonic Broadcast",
        description: "Stream high-fidelity audio to voice channels.",
        icon: Music,
        enabled: true,
        color: "text-pink-500"
      },
      {
        id: "games",
        name: "Recreational Unit",
        description: "Interactive games for crew morale.",
        icon: Gamepad_2,
        enabled: false,
        color: "text-indigo-400"
      },
      {
        id: "tickets",
        name: "Direct Appeal",
        description: "Formal support ticket system for comrades.",
        icon: Ticket,
        enabled: true,
        color: "text-cyan-400"
      },
      {
        id: "giveaways",
        name: "State Lottery",
        description: "Manage resource redistribution events.",
        icon: Gift,
        enabled: false,
        color: "text-orange-500"
      },
      {
        id: "starboard",
        name: "Hall of Honor",
        description: "Preserve legendary transmissions.",
        icon: Star,
        enabled: true,
        color: "text-yellow-200"
      },
      {
        id: "twitch",
        name: "Twitch Relay",
        description: "Monitor and alert on external broadcasts.",
        icon: Tv,
        enabled: false,
        color: "text-purple-600"
      },
      {
        id: "youtube",
        name: "Visual Archive",
        description: "Sync with state-approved video channels.",
        icon: Youtube,
        enabled: false,
        color: "text-red-600"
      },
      {
        id: "reactionrolls",
        name: "Interactive Roles",
        description: "Assign duties via symbolic reactions.",
        icon: Mouse_pointer_click,
        enabled: true,
        color: "text-emerald-300"
      },
      {
        id: "tempchannels",
        name: "Tactical Channels",
        description: "Dynamic temporary voice frequencies.",
        icon: Clock,
        enabled: false,
        color: "text-slate-400"
      },
      {
        id: "autoresponder",
        name: "Auto-Response",
        description: "Pre-recorded answers for common queries.",
        icon: Repeat,
        enabled: true,
        color: "text-sky-300"
      },
      {
        id: "stats",
        name: "Demographics",
        description: "Real-time server growth analytics.",
        icon: Chart_column,
        enabled: true,
        color: "text-lime-400"
      },
      {
        id: "moderation",
        name: "Disciplinary Action",
        description: "Advanced ban, kick, and mute tools.",
        icon: Hammer,
        enabled: true,
        color: "text-red-400"
      },
      {
        id: "antiraid",
        name: "Incursion Shield",
        description: "Rapid response to automated attacks.",
        icon: Flame,
        enabled: false,
        color: "text-orange-600"
      },
      {
        id: "suggestions",
        name: "Suggestion Box",
        description: "Gather feedback for the collective.",
        icon: Inbox,
        enabled: true,
        color: "text-blue-300"
      },
      {
        id: "reminders",
        name: "Duty Schedule",
        description: "Automated reminders for essential tasks.",
        icon: Bell_ring,
        enabled: false,
        color: "text-zinc-300"
      }
    ];
    $$renderer2.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Central Command</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Bot Modules</h1></div> <div class="flex items-center gap-4"><div class="bg-blue-950/20 text-blue-500 border border-blue-500/50 px-4 py-2 flex items-center gap-2"><span class="text-[10px] font-black uppercase tracking-widest">${escape_html(modules.filter((m) => m.enabled).length)} ACTIVE UNITS</span></div></div></header> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
    const each_array = ensure_array_like(modules);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let mod = each_array[$$index];
      $$renderer2.push(`<div class="brutal-card p-6 bg-[#1a1a1a] relative group overflow-hidden"><div${attr_class(`absolute top-0 left-0 w-full h-1 ${stringify(mod.enabled ? "bg-emerald-500" : "bg-red-600")}`)}></div> <div class="flex justify-between items-start mb-6"><div${attr_class(`p-3 bg-black border-2 border-black ${stringify(mod.color)}`)}>`);
      mod.icon($$renderer2, { size: 24 });
      $$renderer2.push(`<!----></div> <button${attr("aria-label", `Toggle ${stringify(mod.name)} module`)}${attr_class(`w-12 h-6 border-2 border-black relative transition-colors ${stringify(mod.enabled ? "bg-emerald-500" : "bg-red-600")}`)}><div${attr_class(`absolute top-0 w-5 h-full bg-white border-2 border-black transition-all ${stringify(mod.enabled ? "left-full -translate-x-full" : "left-0")}`)}></div></button></div> <h3 class="text-lg font-black uppercase tracking-tight mb-2 text-white">${escape_html(mod.name)}</h3> <p class="text-xs text-white/40 font-bold uppercase tracking-wide leading-relaxed mb-6">${escape_html(mod.description)}</p> <div class="flex gap-2">`);
      BrutalButton($$renderer2, {
        class: "flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Configure`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      if (mod.enabled) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="px-3 flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/50"><span class="text-[8px] font-black uppercase tracking-widest">Active</span></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="px-3 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/50"><span class="text-[8px] font-black uppercase tracking-widest">Offline</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    BrutalCard($$renderer2, {
      title: "Module Analytics",
      class: "mt-12",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-8"><!--[-->`);
        const each_array_1 = ensure_array_like(Array(4));
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          each_array_1[i];
          $$renderer3.push(`<div class="space-y-1"><div class="text-[9px] font-black uppercase opacity-30 tracking-[0.2em]">Module_Metric_${escape_html(i)}</div> <div class="text-3xl font-black tracking-tighter">${escape_html((Math.random() * 100).toFixed(1))}%</div> <div class="w-full h-1 bg-black"><div class="h-full bg-red-600"${attr_style(`width: ${stringify(Math.random() * 100)}%`)}></div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};

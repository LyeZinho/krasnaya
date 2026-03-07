import { d as ensure_array_like, k as attr, o as sanitize_props, p as spread_props, q as slot, h as attr_class, j as stringify, aa as derived } from './index2-BYEgVnmH.js';
import { B as BrutalCard } from './BrutalCard-7hyKWuhi.js';
import { B as BrutalButton } from './BrutalButton-DTvkCN9o.js';
import { I as Icon } from './Icon-Tn6mjnxn.js';
import { S as Save } from './save-DKd3OVbU.js';
import { I as Image } from './image-C55U-UUF.js';
import { P as Plus } from './plus-8M2k88qj.js';
import { T as Trash_2 } from './trash-2-D4aIzcY4.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import 'clsx';
import './equality-DjuIlvRH.js';

function Chevron_up($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-up" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTggMTUtNi02LTYgNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-up
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
function Eye_off($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
      }
    ],
    ["path", { "d": "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
    [
      "path",
      {
        "d": "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
      }
    ],
    ["path", { "d": "m2 2 20 20" }]
  ];
  Icon($$renderer, spread_props([
    { name: "eye-off" },
    $$sanitized_props,
    {
      /**
       * @component @name EyeOff
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAuNzMzIDUuMDc2YTEwLjc0NCAxMC43NDQgMCAwIDEgMTEuMjA1IDYuNTc1IDEgMSAwIDAgMSAwIC42OTYgMTAuNzQ3IDEwLjc0NyAwIDAgMS0xLjQ0NCAyLjQ5IiAvPgogIDxwYXRoIGQ9Ik0xNC4wODQgMTQuMTU4YTMgMyAwIDAgMS00LjI0Mi00LjI0MiIgLz4KICA8cGF0aCBkPSJNMTcuNDc5IDE3LjQ5OWExMC43NSAxMC43NSAwIDAgMS0xNS40MTctNS4xNTEgMSAxIDAgMCAxIDAtLjY5NiAxMC43NSAxMC43NSAwIDAgMSA0LjQ0Ni01LjE0MyIgLz4KICA8cGF0aCBkPSJtMiAyIDIwIDIwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/eye-off
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
function Eye($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "eye" },
    $$sanitized_props,
    {
      /**
       * @component @name Eye
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/eye
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
function Mouse_pointer_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "mouse-pointer-2" },
    $$sanitized_props,
    {
      /**
       * @component @name MousePointer2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNC4wMzcgNC42ODhhLjQ5NS40OTUgMCAwIDEgLjY1MS0uNjUxbDE2IDYuNWEuNS41IDAgMCAxLS4wNjMuOTQ3bC02LjEyNCAxLjU4YTIgMiAwIDAgMC0xLjQzOCAxLjQzNWwtMS41NzkgNi4xMjZhLjUuNSAwIDAgMS0uOTQ3LjA2M3oiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/mouse-pointer-2
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
function Palette($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
      }
    ],
    [
      "circle",
      { "cx": "13.5", "cy": "6.5", "r": ".5", "fill": "currentColor" }
    ],
    [
      "circle",
      {
        "cx": "17.5",
        "cy": "10.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      { "cx": "6.5", "cy": "12.5", "r": ".5", "fill": "currentColor" }
    ],
    [
      "circle",
      { "cx": "8.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "palette" },
    $$sanitized_props,
    {
      /**
       * @component @name Palette
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMjJhMSAxIDAgMCAxIDAtMjAgMTAgOSAwIDAgMSAxMCA5IDUgNSAwIDAgMS01IDVoLTIuMjVhMS43NSAxLjc1IDAgMCAwLTEuNCAyLjhsLjMuNGExLjc1IDEuNzUgMCAwIDEtMS40IDIuOHoiIC8+CiAgPGNpcmNsZSBjeD0iMTMuNSIgY3k9IjYuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KICA8Y2lyY2xlIGN4PSIxNy41IiBjeT0iMTAuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KICA8Y2lyY2xlIGN4PSI2LjUiIGN5PSIxMi41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIiAvPgogIDxjaXJjbGUgY3g9IjguNSIgY3k9IjcuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/palette
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
function Play($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "play" },
    $$sanitized_props,
    {
      /**
       * @component @name Play
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSA1YTIgMiAwIDAgMSAzLjAwOC0xLjcyOGwxMS45OTcgNi45OThhMiAyIDAgMCAxIC4wMDMgMy40NThsLTEyIDdBMiAyIDAgMCAxIDUgMTl6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/play
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
function Square($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "square" },
    $$sanitized_props,
    {
      /**
       * @component @name Square
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/square
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
function Type($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 4v16" }],
    ["path", { "d": "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" }],
    ["path", { "d": "M9 20h6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "type" },
    $$sanitized_props,
    {
      /**
       * @component @name Type
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgNHYxNiIgLz4KICA8cGF0aCBkPSJNNCA3VjVhMSAxIDAgMCAxIDEtMWgxNGExIDEgMCAwIDEgMSAxdjIiIC8+CiAgPHBhdGggZD0iTTkgMjBoNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/type
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
function Variable($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 21s-4-3-4-9 4-9 4-9" }],
    ["path", { "d": "M16 3s4 3 4 9-4 9-4 9" }],
    ["line", { "x1": "15", "x2": "9", "y1": "9", "y2": "15" }],
    ["line", { "x1": "9", "x2": "15", "y1": "9", "y2": "15" }]
  ];
  Icon($$renderer, spread_props([
    { name: "variable" },
    $$sanitized_props,
    {
      /**
       * @component @name Variable
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAyMXMtNC0zLTQtOSA0LTkgNC05IiAvPgogIDxwYXRoIGQ9Ik0xNiAzczQgMyA0IDktNCA5LTQgOSIgLz4KICA8bGluZSB4MT0iMTUiIHgyPSI5IiB5MT0iOSIgeTI9IjE1IiAvPgogIDxsaW5lIHgxPSI5IiB4Mj0iMTUiIHkxPSI5IiB5Mj0iMTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/variable
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
  let layers = [
    {
      id: "1",
      type: "rect",
      x: 0,
      y: 0,
      width: 800,
      height: 200,
      fill: "#1a1a1a",
      opacity: 1,
      visible: true
    },
    {
      id: "2",
      type: "image",
      x: 20,
      y: 20,
      width: 160,
      height: 160,
      url: "{'{author.avatar}'}",
      visible: true
    },
    {
      id: "3",
      type: "text",
      x: 200,
      y: 80,
      content: "PROLETARIAN: {'{author.name}'}",
      fontSize: 32,
      fill: "#ffffff",
      fontWeight: "900",
      visible: true
    },
    {
      id: "4",
      type: "text",
      x: 200,
      y: 130,
      content: "LEVEL: {'{user.level}'} | XP: {'{user.xp}'}",
      fontSize: 18,
      fill: "#ff0000",
      fontWeight: "bold",
      visible: true
    },
    {
      id: "5",
      type: "rect",
      x: 200,
      y: 150,
      width: 500,
      height: 10,
      fill: "#333",
      visible: true
    },
    {
      id: "6",
      type: "rect",
      x: 200,
      y: 150,
      width: 350,
      height: 10,
      fill: "#ff0000",
      visible: true
    }
  ];
  let selectedLayerId = layers[2].id;
  let selectedLayer = derived(() => layers.find((l) => l.id === selectedLayerId));
  $$renderer.push(`<div class="space-y-8"><header class="flex justify-between items-end border-b-4 border-black pb-6"><div><h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Visual Propaganda / SVG GENERATOR</h2> <h1 class="text-5xl font-black uppercase tracking-tighter">Card Designer</h1></div> <div class="flex gap-4">`);
  BrutalButton($$renderer, {
    variant: "default",
    class: "flex items-center gap-2",
    children: ($$renderer2) => {
      Play($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> Preview Logic`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  BrutalButton($$renderer, {
    variant: "red",
    class: "flex items-center gap-2",
    children: ($$renderer2) => {
      Save($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> Store Template`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div></header> <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]"><aside class="lg:col-span-1 flex flex-col gap-4"><div class="flex flex-col border-4 border-black bg-black p-2 gap-2 shadow-[4px_4px_0px_#ff0000]"><button class="p-3 bg-white text-black hover:bg-neutral-200 transition-colors">`);
  Mouse_pointer_2($$renderer, { size: 20 });
  $$renderer.push(`<!----></button> <button class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">`);
  Type($$renderer, { size: 20 });
  $$renderer.push(`<!----></button> <button class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">`);
  Image($$renderer, { size: 20 });
  $$renderer.push(`<!----></button> <button class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">`);
  Square($$renderer, { size: 20 });
  $$renderer.push(`<!----></button> <button class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors border-t-2 border-white/10 mt-2">`);
  Palette($$renderer, { size: 20 });
  $$renderer.push(`<!----></button></div></aside> <main class="lg:col-span-8 flex flex-col gap-6"><div class="flex-1 bg-black border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,0.5)] relative overflow-hidden flex items-center justify-center group"><svg width="800" height="200" viewBox="0 0 800 200" class="shadow-2xl bg-[#050505]"><!--[-->`);
  const each_array = ensure_array_like(layers);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let layer = each_array[$$index];
    if (layer.visible) {
      $$renderer.push("<!--[0-->");
      if (layer.type === "rect") {
        $$renderer.push("<!--[0-->");
        $$renderer.push(`<rect${attr("x", layer.x)}${attr("y", layer.y)}${attr("width", layer.width ?? 0)}${attr("height", layer.height ?? 0)}${attr("fill", layer.fill)}${attr("opacity", layer.opacity)}></rect>`);
      } else if (layer.type === "image") {
        $$renderer.push("<!--[1-->");
        $$renderer.push(`<rect${attr("x", layer.x)}${attr("y", layer.y)}${attr("width", layer.width ?? 0)}${attr("height", layer.height ?? 0)} fill="#222"></rect><text${attr("x", layer.x + (layer.width ?? 0) / 2)}${attr("y", layer.y + (layer.height ?? 0) / 2)} text-anchor="middle" dominant-baseline="middle" fill="#444" font-size="12" font-weight="bold">AVATAR_PLACEHOLDER</text>`);
      } else if (layer.type === "text") {
        $$renderer.push("<!--[2-->");
        $$renderer.push(`<text${attr("x", layer.x)}${attr("y", layer.y)}${attr("fill", layer.fill)}${attr("font-size", layer.fontSize)}${attr("font-weight", layer.fontWeight)} font-family="Inter, sans-serif" style="text-transform: uppercase;">${escape_html(layer.content)}</text>`);
      } else {
        $$renderer.push("<!--[-1-->");
      }
      $$renderer.push(`<!--]-->`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></svg> <div class="absolute inset-0 pointer-events-none opacity-[0.05]" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div> <div class="absolute bottom-4 right-4 bg-black border border-white/20 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white/50">800 x 200 PX</div></div> `);
  BrutalCard($$renderer, {
    class: "bg-[#1a1a1a]",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="flex gap-8 items-center"><div class="flex-1"><label for="template-id" class="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 block mb-2">Template Identity</label> <input id="template-id" value="LOYALTY_RANK_CARD_V1" class="w-full bg-black border-2 border-black p-3 text-sm font-black text-white focus:outline-none svelte-9e3uk5"/></div> <div class="flex-1"><label for="dimensions-width" class="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 block mb-2">Target Dimensions</label> <div class="flex items-center gap-2"><input id="dimensions-width" value="800" class="w-20 bg-black border-2 border-black p-3 text-center text-xs font-black text-white svelte-9e3uk5"/> <span class="text-white/20">X</span> <input id="dimensions-height" value="200" class="w-20 bg-black border-2 border-black p-3 text-center text-xs font-black text-white svelte-9e3uk5"/></div></div></div>`);
    }
  });
  $$renderer.push(`<!----></main> <aside class="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">`);
  BrutalCard($$renderer, {
    title: "Layer Inventory",
    class: "flex-1 flex flex-col min-h-0",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar svelte-9e3uk5"><!--[-->`);
      const each_array_1 = ensure_array_like(layers);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let layer = each_array_1[$$index_1];
        $$renderer2.push(`<div role="button" tabindex="0"${attr_class(`w-full text-left p-3 border-2 border-black flex items-center gap-3 transition-all cursor-pointer ${stringify(selectedLayerId === layer.id ? "bg-red-600 text-white" : "bg-black/40 hover:bg-neutral-800")}`)}><span class="text-[9px] font-black opacity-30">${escape_html(layer.type.toUpperCase())}</span> <span class="flex-1 text-[10px] font-black uppercase truncate">${escape_html(layer.type === "text" ? layer.content : layer.id)}</span> <div class="flex items-center gap-1"><button class="p-1 hover:text-white transition-colors">`);
        if (layer.visible) {
          $$renderer2.push("<!--[0-->");
          Eye($$renderer2, { size: 12 });
        } else {
          $$renderer2.push("<!--[-1-->");
          Eye_off($$renderer2, { size: 12 });
        }
        $$renderer2.push(`<!--]--></button> <button class="p-1 hover:text-white transition-colors">`);
        Chevron_up($$renderer2, { size: 12 });
        $$renderer2.push(`<!----></button></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <button class="w-full mt-4 py-3 bg-white text-black text-[10px] font-black uppercase flex items-center justify-center gap-2 border-4 border-black shadow-[4px_4px_0px_#000]">`);
      Plus($$renderer2, { size: 16 });
      $$renderer2.push(`<!----> New Layer</button>`);
    }
  });
  $$renderer.push(`<!----> `);
  BrutalCard($$renderer, {
    title: "Unit Properties",
    class: "h-80 flex-shrink-0",
    children: ($$renderer2) => {
      if (selectedLayer()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="space-y-4"><div class="grid grid-cols-2 gap-2"><div><label for="layer-x-pos" class="text-[8px] font-black uppercase opacity-30 mb-1 block">X POS</label> <input id="layer-x-pos" type="number"${attr("value", selectedLayer().x)} class="w-full bg-black border-2 border-black p-2 text-xs font-black svelte-9e3uk5"/></div> <div><label for="layer-y-pos" class="text-[8px] font-black uppercase opacity-30 mb-1 block">Y POS</label> <input id="layer-y-pos" type="number"${attr("value", selectedLayer().y)} class="w-full bg-black border-2 border-black p-2 text-xs font-black svelte-9e3uk5"/></div></div> `);
        if (selectedLayer().type === "text") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div><label for="layer-content" class="text-[8px] font-black uppercase opacity-30 mb-1 block">Content Protocol</label> <div class="relative"><textarea id="layer-content" class="w-full bg-black border-2 border-black p-2 text-[10px] font-black min-h-[60px] pr-8 svelte-9e3uk5">`);
          const $$body = escape_html(selectedLayer().content);
          if ($$body) {
            $$renderer2.push(`${$$body}`);
          }
          $$renderer2.push(`</textarea> `);
          Variable($$renderer2, {
            size: 12,
            class: "absolute top-2 right-2 text-blue-500 opacity-50 cursor-pointer hover:opacity-100"
          });
          $$renderer2.push(`<!----></div></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <button class="w-full py-2 bg-red-600/10 text-red-500 text-[8px] font-black uppercase border border-red-500/50 hover:bg-red-600 hover:text-white flex items-center justify-center gap-2">`);
        Trash_2($$renderer2, { size: 12 });
        $$renderer2.push(`<!----> Terminate Layer</button></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="h-full flex items-center justify-center text-[9px] font-black uppercase opacity-20 italic">No Selection</div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
  });
  $$renderer.push(`<!----></aside></div></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bm0DsQJm.js.map

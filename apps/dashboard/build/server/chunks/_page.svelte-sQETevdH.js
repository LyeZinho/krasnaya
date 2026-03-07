import 'clsx';
import { C as Card } from './Card-BHXuik68.js';
import { B as Button } from './Button-DLo6XLWy.js';
import './index2-BYEgVnmH.js';
import './escaping-CqgfEcN3.js';
import './equality-DjuIlvRH.js';

function _page($$renderer) {
  $$renderer.push(`<div class="economy-page svelte-1qwcmr8"><header class="svelte-1qwcmr8"><h1 class="svelte-1qwcmr8">ECONOMIA</h1></header> <section class="economy-tabs svelte-1qwcmr8">`);
  Card($$renderer, {
    title: "ITENS DA LOJA",
    children: ($$renderer2) => {
      $$renderer2.push(`<p>Gerenciamento de itens e preços</p> `);
      Button($$renderer2, {
        variant: "primary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->+ NOVO ITEM`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  Card($$renderer, {
    title: "BADGES",
    children: ($$renderer2) => {
      $$renderer2.push(`<p>Gerenciamento de badges e ranks</p> `);
      Button($$renderer2, {
        variant: "primary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->+ NOVA BADGE`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  Card($$renderer, {
    title: "BOOSTS",
    children: ($$renderer2) => {
      $$renderer2.push(`<p>Gerenciamento de multiplicadores temporários</p> `);
      Button($$renderer2, {
        variant: "primary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->+ NOVO BOOST`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-sQETevdH.js.map

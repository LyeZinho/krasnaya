import 'clsx';
import { C as Card } from './Card-BHXuik68.js';
import { B as Button } from './Button-DLo6XLWy.js';
import './index2-BYEgVnmH.js';
import './escaping-CqgfEcN3.js';
import './equality-DjuIlvRH.js';

function _page($$renderer) {
  $$renderer.push(`<div class="embeds-page svelte-1blhkk8"><header class="svelte-1blhkk8"><h1 class="svelte-1blhkk8">CRIADOR DE EMBEDS</h1></header> <section class="embed-editor">`);
  Card($$renderer, {
    title: "NOVO EMBED",
    children: ($$renderer2) => {
      $$renderer2.push(`<p>Editor visual para criar embeds reutilizáveis</p> `);
      Button($$renderer2, {
        variant: "primary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->+ NOVO TEMPLATE`);
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
//# sourceMappingURL=_page.svelte-CqyT_yF6.js.map

import { h as attr_class, j as stringify, q as slot, ar as bind_props } from './index2-BYEgVnmH.js';
import { p as fallback } from './equality-DjuIlvRH.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function Card($$renderer, $$props) {
  let title = $$props["title"];
  let status = fallback($$props["status"], "idle");
  $$renderer.push(`<div class="brutal-card"><header class="card-header svelte-xwxhjq"><h3 class="svelte-xwxhjq">${escape_html(title)}</h3> <div${attr_class(`status-indicator ${stringify(status)}`, "svelte-xwxhjq")}></div></header> <main class="card-content"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main></div>`);
  bind_props($$props, { title, status });
}

export { Card as C };
//# sourceMappingURL=Card-BHXuik68.js.map

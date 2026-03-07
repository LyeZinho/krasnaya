import { d as attr_class, c as slot, n as bind_props, h as stringify } from "./index2.js";
import { f as fallback } from "./equality.js";
import { e as escape_html } from "./escaping.js";
function Card($$renderer, $$props) {
  let title = $$props["title"];
  let status = fallback($$props["status"], "idle");
  $$renderer.push(`<div class="brutal-card"><header class="card-header svelte-xwxhjq"><h3 class="svelte-xwxhjq">${escape_html(title)}</h3> <div${attr_class(`status-indicator ${stringify(status)}`, "svelte-xwxhjq")}></div></header> <main class="card-content"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main></div>`);
  bind_props($$props, { title, status });
}
export {
  Card as C
};

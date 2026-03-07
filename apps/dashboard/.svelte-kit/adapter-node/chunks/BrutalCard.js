import { d as attr_class, h as stringify } from "./index2.js";
import { e as escape_html } from "./escaping.js";
function BrutalCard($$renderer, $$props) {
  let { title, children, class: className = "" } = $$props;
  $$renderer.push(`<div${attr_class(`brutal-card p-6 flex flex-col gap-4 ${stringify(className)}`)}>`);
  if (title) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="border-b-2 border-black/20 pb-2 mb-2"><h3 class="text-xs font-black uppercase tracking-widest opacity-50">${escape_html(title)}</h3></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  children($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  BrutalCard as B
};

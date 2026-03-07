import { d as attr_class, h as stringify } from "./index2.js";
import { e as escape_html } from "./escaping.js";
function BrutalModal($$renderer, $$props) {
  let {
    isOpen = false,
    title,
    children,
    class: className = "",
    onClose
  } = $$props;
  if (isOpen) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 svelte-1g076d0"><div${attr_class(`bg-[#1a1a1a] border-4 border-black p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${stringify(className)}`, "svelte-1g076d0")}><div class="flex justify-between items-center mb-6 border-b-4 border-black pb-4 svelte-1g076d0"><h2 class="text-2xl font-black uppercase tracking-tighter">${escape_html(title)}</h2> `);
    if (onClose) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<button class="text-2xl font-black text-gray-400 hover:text-white transition-colors">✕</button>`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]--></div> `);
    children($$renderer);
    $$renderer.push(`<!----></div></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
}
export {
  BrutalModal as B
};

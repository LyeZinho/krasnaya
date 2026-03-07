import { d as attr_class, i as attr, c as slot, n as bind_props, h as stringify } from "./index2.js";
import { f as fallback } from "./equality.js";
function Button($$renderer, $$props) {
  let variant = fallback($$props["variant"], "primary");
  let disabled = fallback($$props["disabled"], false);
  let type = fallback($$props["type"], "button");
  let onClick = fallback($$props["onClick"], void 0);
  $$renderer.push(`<button${attr_class(`brutal-btn ${stringify(variant)}`, "svelte-1wkhz0s")}${attr("disabled", disabled, true)}${attr("type", type)}><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></button>`);
  bind_props($$props, { variant, disabled, type, onClick });
}
export {
  Button as B
};

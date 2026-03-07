import { h as attr_class, j as stringify, k as attr, q as slot, ar as bind_props } from './index2-BYEgVnmH.js';
import { p as fallback } from './equality-DjuIlvRH.js';

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

export { Button as B };
//# sourceMappingURL=Button-DLo6XLWy.js.map

import { f as store_get, q as slot, l as unsubscribe_stores } from './index2-BYEgVnmH.js';
import { u as user } from './user-B9zjKefr.js';
import './root-CgB-WIH5.js';
import 'clsx';
import './state.svelte-oPLNWtsX.js';
import './escaping-CqgfEcN3.js';
import './equality-DjuIlvRH.js';
import './index-BVoVcc7B.js';

function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    if (store_get($$store_subs ??= {}, "$user", user)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p>Carregando...</p>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DXq9KpIo.js.map

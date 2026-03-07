import { d as attr_class, g as ensure_array_like, i as attr, f as store_get, c as slot, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { u as user } from "../../../chunks/user.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { B as Button } from "../../../chunks/Button.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let navExpanded = false;
    const adminMenuItems = [
      { label: "System Monitor", href: "/system", icon: "🖥️" },
      { label: "Audit Ledger", href: "/ledger", icon: "📋" },
      { label: "RBAC & Security", href: "/rbac", icon: "🔐" }
    ];
    $$renderer2.push(`<div class="admin-layout svelte-we7dkw"><aside class="sidebar admin-sidebar svelte-we7dkw"><header class="sidebar-header svelte-we7dkw"><h1 class="svelte-we7dkw">⚡ ADMIN</h1> <button class="hamburger svelte-we7dkw">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`☰`);
    }
    $$renderer2.push(`<!--]--></button></header> <nav${attr_class("sidebar-nav svelte-we7dkw", void 0, { "expanded": navExpanded })}><!--[-->`);
    const each_array = ensure_array_like(adminMenuItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.href)} class="nav-item svelte-we7dkw"><span class="icon svelte-we7dkw">${escape_html(item.icon)}</span> <span class="label svelte-we7dkw">${escape_html(item.label)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></nav> <footer class="sidebar-footer svelte-we7dkw"><div class="user-info admin-badge svelte-we7dkw"><span>ADMIN: ${escape_html(store_get($$store_subs ??= {}, "$user", user)?.username)}</span></div> `);
    Button($$renderer2, {
      variant: "danger",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->SAIR`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></footer></aside> <main class="admin-content svelte-we7dkw"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};

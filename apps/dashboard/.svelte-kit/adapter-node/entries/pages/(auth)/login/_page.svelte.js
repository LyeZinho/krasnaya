import { i as attr } from "../../../../chunks/index2.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { B as BrutalCard } from "../../../../chunks/BrutalCard.js";
import { B as BrutalButton } from "../../../../chunks/BrutalButton.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/user.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let password = "";
    let otp = "";
    let loading = false;
    $$renderer2.push(`<div class="min-h-screen p-8 flex items-center justify-center bg-[#1a1a1a]"><div class="w-full max-w-md">`);
    BrutalCard($$renderer2, {
      title: "Admin Authorization",
      children: ($$renderer3) => {
        {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <form class="space-y-6">`);
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div><label for="access-key" class="block font-mono text-sm uppercase mb-2 text-white/60">Access Key</label> <input id="access-key" type="password"${attr("value", password)} class="w-full bg-black/50 border-4 border-black p-4 text-center tracking-widest font-mono text-xl focus:outline-none focus:bg-white focus:text-black transition-colors text-white" placeholder="••••••••"/></div> <div><label for="otp-input" class="block font-mono text-sm uppercase mb-2 text-white/60">OTP (2FA)</label> <input id="otp-input" type="text"${attr("value", otp)} class="w-full bg-black/50 border-4 border-black p-4 text-center tracking-[1em] font-mono text-xl focus:outline-none focus:border-white transition-colors text-white" placeholder="000000" maxlength="6"/></div>`);
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> `);
        BrutalButton($$renderer3, {
          variant: "red",
          class: "w-full text-lg p-6",
          disabled: loading,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html("Authorize Session")}`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></form>`);
      }
    });
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};

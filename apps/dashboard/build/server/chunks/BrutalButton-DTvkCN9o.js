import { ap as attributes, j as stringify } from './index2-BYEgVnmH.js';

function BrutalButton($$renderer, $$props) {
  let {
    variant = "default",
    children,
    class: className = "",
    $$slots,
    $$events,
    ...props
  } = $$props;
  $$renderer.push(`<button${attributes({
    class: `brutal-btn ${stringify(variant === "red" ? "brutal-btn-red" : "")} ${stringify(className)}`,
    ...props
  })}>`);
  children($$renderer);
  $$renderer.push(`<!----></button>`);
}

export { BrutalButton as B };
//# sourceMappingURL=BrutalButton-DTvkCN9o.js.map

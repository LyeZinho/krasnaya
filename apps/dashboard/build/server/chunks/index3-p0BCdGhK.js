import './state.svelte-oPLNWtsX.js';
import 'clsx';
import './root-CgB-WIH5.js';
import { w as writable } from './index-BVoVcc7B.js';
import { r as getContext } from './index2-BYEgVnmH.js';

function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  },
  get url() {
    return context().page.url;
  }
};
const page = page$1;

export { page as p };
//# sourceMappingURL=index3-p0BCdGhK.js.map

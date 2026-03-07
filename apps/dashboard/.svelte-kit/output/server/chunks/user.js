import { w as writable } from "./index.js";
const createUserStore = () => {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    setUser: (user2) => set(user2),
    clearUser: () => set(null),
    update
  };
};
const user = createUserStore();
export {
  user as u
};

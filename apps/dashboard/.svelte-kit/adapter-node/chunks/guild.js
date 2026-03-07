import { w as writable } from "./index.js";
const createGuildStore = () => {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    setGuild: (guild) => set(guild),
    clearGuild: () => set(null),
    update
  };
};
createGuildStore();

import { w as writable } from './index-BVoVcc7B.js';

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
//# sourceMappingURL=guild-A3J54mtn.js.map

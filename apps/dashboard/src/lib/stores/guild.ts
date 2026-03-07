// Store para Guild selecionada
import { writable } from 'svelte/store';

export interface Guild {
  id: string;
  name: string;
  icon?: string;
  ownerId: string;
}

const createGuildStore = () => {
  const { subscribe, set, update } = writable<Guild | null>(null);

  return {
    subscribe,
    setGuild: (guild: Guild) => set(guild),
    clearGuild: () => set(null),
    update,
  };
};

export const currentGuild = createGuildStore();
export default currentGuild;

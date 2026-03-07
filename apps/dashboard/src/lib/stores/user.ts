// Store para User Session/Auth
import { writable } from 'svelte/store';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  has2FA: boolean;
  role: 'admin' | 'user';
}

const createUserStore = () => {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    setUser: (user: User) => set(user),
    clearUser: () => set(null),
    update,
  };
};

export const user = createUserStore();
export default user;

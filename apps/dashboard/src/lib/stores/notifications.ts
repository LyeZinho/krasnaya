// Store para notificações (toast/alerts)
import { writable } from 'svelte/store';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

const createNotificationsStore = () => {
  const { subscribe, set, update } = writable<Notification[]>([]);
  let idCounter = 0;

  return {
    subscribe,
    add: (notification: Omit<Notification, 'id'>) => {
      const id = String(idCounter++);
      const notif: Notification = { ...notification, id };

      update((notifs) => [...notifs, notif]);

      if (notification.duration) {
        setTimeout(() => {
          update((notifs) => notifs.filter((n) => n.id !== id));
        }, notification.duration);
      }

      return id;
    },
    remove: (id: string) => {
      update((notifs) => notifs.filter((n) => n.id !== id));
    },
    clear: () => set([]),
  };
};

export const notifications = createNotificationsStore();
export default notifications;

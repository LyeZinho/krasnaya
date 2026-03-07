import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
	id: string;
	type: ToastType;
	message: string;
	duration?: number;
	dismissable?: boolean;
}

/**
 * Get default duration for a toast type
 */
function getDefaultDuration(type: ToastType): number {
	const durations: Record<ToastType, number> = {
		success: 3000,
		error: 5000,
		warning: 4000,
		info: 3000,
	};
	return durations[type];
}

/**
 * Create a unique ID for a toast
 */
function createToastId(): string {
	return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create the toast store
 */
function createToastStore() {
	const { subscribe, set, update } = writable<Toast[]>([]);

	return {
		subscribe,

		/**
		 * Add a new toast notification
		 */
		add(message: string, type: ToastType = 'info', duration?: number) {
			const id = createToastId();
			const finalDuration = duration ?? getDefaultDuration(type);

			const toast: Toast = {
				id,
				type,
				message,
				duration: finalDuration,
				dismissable: true,
			};

			update((toasts) => [...toasts, toast]);

			// Auto-dismiss the toast after duration
			setTimeout(() => {
				toastStore.remove(id);
			}, finalDuration);
		},

		/**
		 * Remove a toast by ID
		 */
		remove(id: string) {
			update((toasts) => toasts.filter((toast) => toast.id !== id));
		},

		/**
		 * Clear all toasts
		 */
		clear() {
			set([]);
		},
	};
}

export const toastStore = createToastStore();

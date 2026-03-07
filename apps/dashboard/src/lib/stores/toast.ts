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
	return `toast-${crypto.randomUUID()}`;
}

/**
 * Create the toast store
 */
function createToastStore() {
	const { subscribe, set, update } = writable<Toast[]>([]);
	const timeoutMap = new Map<string, ReturnType<typeof setTimeout>>();

	return {
		subscribe,

		/**
		 * Add a new toast notification
		 * @param message - The toast message text (must not be empty or whitespace-only)
		 * @param type - The toast type affecting styling and default duration
		 * @param duration - Optional custom duration in milliseconds. If not specified, uses type-based defaults
		 * @param dismissable - Optional flag to allow manual dismissal. Defaults to true. Remember to clean up subscriptions after use.
		 */
		add(message: string, type: ToastType = 'info', duration?: number, dismissable?: boolean) {
			// Validate message is not empty
			if (!message?.trim()) return;

			const id = createToastId();
			const finalDuration = duration ?? getDefaultDuration(type);
			const isDismissable = dismissable ?? true;

			const toast: Toast = {
				id,
				type,
				message,
				duration: finalDuration,
				dismissable: isDismissable,
			};

			update((toasts) => [...toasts, toast]);

			// Auto-dismiss the toast after duration
			const timeoutId = setTimeout(() => {
				toastStore.remove(id);
			}, finalDuration);

			// Track timeout ID for cleanup
			timeoutMap.set(id, timeoutId);
		},

		/**
		 * Remove a toast by ID, canceling any pending timeout
		 */
		remove(id: string) {
			// Cancel pending timeout if it exists
			const timeoutId = timeoutMap.get(id);
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutMap.delete(id);
			}

			update((toasts) => toasts.filter((toast) => toast.id !== id));
		},

		/**
		 * Clear all toasts and cancel all pending timeouts
		 */
		clear() {
			// Cancel all pending timeouts
			timeoutMap.forEach((timeoutId) => clearTimeout(timeoutId));
			timeoutMap.clear();

			set([]);
		},
	};
}

export const toastStore = createToastStore();


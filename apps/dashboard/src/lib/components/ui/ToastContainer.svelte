<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';
	import { onDestroy } from 'svelte';

	// Type definitions
	type ToastType = 'success' | 'error' | 'warning' | 'info';

	// Icon map for each toast type
	const iconMap: Record<ToastType, string> = {
		success: '✓',
		error: '✗',
		warning: '⚠️',
		info: 'ℹ️',
	};

	// Color map for each toast type
	const colorMap: Record<ToastType, string> = {
		success: 'bg-green-600',
		error: 'bg-red-600',
		warning: 'bg-yellow-500',
		info: 'bg-blue-600',
	};

	// Explicitly unsubscribe from toast store
	const unsubscribe = toastStore.subscribe(() => {});
	
	onDestroy(() => {
		unsubscribe();
	});
</script>

<!-- Toast Container - fixed position top-right with high z-index -->
<div
	role="region"
	aria-label="Notifications"
	aria-live="polite"
	aria-atomic="false"
	class="fixed top-4 right-4 z-50 flex flex-col space-y-2"
>
	{#each $toastStore as toast (toast.id)}
		<div
			class="flex items-center gap-3 px-4 py-3 {colorMap[toast.type]} text-white border-2 border-black font-mono text-sm rounded will-change-transform"
			transition:fly={{ x: 400, duration: 300 }}
		>
			<!-- Icon -->
			<span class="flex-shrink-0 text-lg">
				{iconMap[toast.type]}
			</span>

			<!-- Message -->
			<span class="flex-1">
				{toast.message}
			</span>

			<!-- Dismiss button - only show if dismissable -->
			{#if toast.dismissable}
				<button
					type="button"
					on:click={() => toastStore.remove(toast.id)}
					class="flex-shrink-0 text-white hover:opacity-75 transition-opacity"
					aria-label="Dismiss notification: {toast.message}"
				>
					✕
				</button>
			{/if}
		</div>
	{/each}
</div>

<style>
	/* Ensure smooth transitions for toast animations */
	:global(.will-change-transform) {
		will-change: transform;
	}
</style>

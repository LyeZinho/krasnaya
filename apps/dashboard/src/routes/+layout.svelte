<script lang="ts">
	import Sidebar from "$lib/components/layout/Sidebar.svelte";
	import NotificationToast from "$lib/molecules/NotificationToast.svelte";
	import { currentGuild } from "$lib/stores/guild";
	import { user } from "$lib/stores/user";
	import { onMount } from "svelte";
	import "../app.css";
	let { children } = $props();

	onMount(() => {
		// Initialize with a default test user and guild for development
		user.setUser({
			id: "test-user-1",
			username: "Test User",
			email: "test@example.com",
			avatar: "https://example.com/avatar.png",
			has2FA: false,
			role: "admin",
		});
		
		currentGuild.setGuild({
			id: "test-guild-1",
			name: "Test Guild",
			ownerId: "test-owner",
		});
	});
</script>

<NotificationToast position="top-right" />
<div class="flex h-screen bg-[#1a1a1a] text-white">
	<Sidebar />
	<main class="flex-1 overflow-y-auto p-8 relative">
		<!-- Background Grid Effect -->
		<div
			class="absolute inset-0 pointer-events-none opacity-[0.03]"
			style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 32px 32px;"
		></div>

		<div class="relative z-10">
			{@render children()}
		</div>
	</main>
</div>

<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold tracking-widest text-white uppercase border-b-4 border-[var(--color-soviet-red)] inline-block pb-2"
        >
            Event Handlers
        </h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SovietCard title="MEMBER_JOIN">
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-mono text-gray-400">Status</span>
                <div
                    class="w-12 h-6 bg-green-500 border-2 border-black relative cursor-pointer"
                >
                    <div
                        class="absolute right-0 top-0 bottom-0 w-6 bg-white border-l-2 border-black"
                    ></div>
                </div>
            </div>
            <p class="text-sm text-gray-300 font-mono mb-4">
                Fired when a user joins the guild.
            </p>
            <div class="text-xs text-[var(--color-soviet-red)] font-bold">
                1 Linked Flow: Auto-Role on Join
            </div>
        </SovietCard>

        <SovietCard title="MESSAGE_CREATE">
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-mono text-gray-400">Status</span>
                <div
                    class="w-12 h-6 bg-red-500 border-2 border-black relative cursor-pointer"
                >
                    <div
                        class="absolute left-0 top-0 bottom-0 w-6 bg-gray-300 border-r-2 border-black"
                    ></div>
                </div>
            </div>
            <p class="text-sm text-gray-300 font-mono mb-4">
                Fired when a message is sent.
            </p>
            <div class="text-xs text-gray-500 font-bold">No Linked Flows</div>
        </SovietCard>
    </div>
</div>

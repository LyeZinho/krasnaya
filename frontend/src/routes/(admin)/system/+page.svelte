<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold tracking-widest text-[var(--color-soviet-red)] uppercase border-b-4 border-black inline-block pb-2"
        >
            System Control
        </h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SovietCard title="Queue Health (BullMQ)">
            <div class="space-y-4">
                <div>
                    <div class="flex justify-between font-mono text-sm mb-1">
                        <span class="text-gray-400">Active</span>
                        <span class="text-white">5</span>
                    </div>
                    <div
                        class="w-full bg-black border-2 border-black h-4 overflow-hidden"
                    >
                        <div class="bg-blue-500 h-full" style="width: 5%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between font-mono text-sm mb-1">
                        <span class="text-gray-400">Waiting</span>
                        <span class="text-white">12</span>
                    </div>
                    <div
                        class="w-full bg-black border-2 border-black h-4 overflow-hidden"
                    >
                        <div
                            class="bg-yellow-500 h-full"
                            style="width: 15%"
                        ></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between font-mono text-sm mb-1">
                        <span class="text-gray-400">Failed</span>
                        <span class="text-[var(--color-soviet-red)]">0</span>
                    </div>
                    <div
                        class="w-full bg-black border-2 border-black h-4 overflow-hidden"
                    >
                        <div
                            class="bg-[var(--color-soviet-red)] h-full"
                            style="width: 0%"
                        ></div>
                    </div>
                </div>
            </div>

            <div class="mt-8 border-t-2 border-black pt-6">
                <button
                    class="w-full bg-[var(--color-soviet-red)] text-white font-black text-xl tracking-widest p-4 border-4 border-black hover:bg-black hover:text-[var(--color-soviet-red)] hover:border-[var(--color-soviet-red)] transition-colors uppercase"
                >
                    EMERGENCY KILL SWITCH
                </button>
            </div>
        </SovietCard>
    </div>
</div>

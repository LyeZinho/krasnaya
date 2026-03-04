<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";

    let flows = [
        { id: "1", name: "Auto-Role on Join", enabled: true },
        { id: "2", name: "Warn Logging", enabled: true },
        { id: "3", name: "Welcome Message", enabled: false },
    ];

    let selectedFlow = flows[0];
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold tracking-widest text-white uppercase border-b-4 border-[var(--color-soviet-red)] inline-block pb-2"
        >
            Automations Engine
        </h1>
    </header>

    <div class="grid grid-cols-[300px_1fr_350px] gap-8 h-[calc(100vh-200px)]">
        <!-- Sidebar List -->
        <SovietCard title="Flows">
            <div class="space-y-4">
                <button
                    class="w-full bg-[var(--color-soviet-red)] text-white font-bold p-3 border-2 border-black hover:bg-red-700 uppercase"
                >
                    + New Flow
                </button>
                <hr class="border-black" />
                {#each flows as flow}
                    <button
                        class="w-full text-left p-3 border-2 border-black font-mono transition-colors {selectedFlow.id ===
                        flow.id
                            ? 'bg-white text-black'
                            : 'bg-black/50 hover:bg-black/80'}"
                        on:click={() => (selectedFlow = flow)}
                    >
                        <div class="flex justify-between items-center">
                            <span>{flow.name}</span>
                            <div
                                class="w-3 h-3 border border-black {flow.enabled
                                    ? 'bg-green-500'
                                    : 'bg-red-500'}"
                            />
                        </div>
                    </button>
                {/each}
            </div>
        </SovietCard>

        <!-- Flow Builder Canvas (Mock) -->
        <div class="brutal-card bg-black/40 flex flex-col pt-4">
            <h2
                class="text-center text-xl font-bold uppercase mb-4 text-gray-400"
            >
                Flow Designer: {selectedFlow.name}
            </h2>
            <div
                class="flex-1 flex items-center justify-center p-8 text-center text-gray-500 border-t-4 border-black border-dashed"
            >
                <div>
                    <p class="text-2xl mb-4">[ Visual Node Canvas Area ]</p>
                    <p>
                        Drag and drop nodes here to connect Triggers and
                        Actions.
                    </p>
                </div>
            </div>
        </div>

        <!-- Properties Panel -->
        <SovietCard title="Properties">
            <div class="space-y-6">
                <div>
                    <label class="block text-xs uppercase text-gray-400 mb-1"
                        >Trigger Name</label
                    >
                    <input
                        type="text"
                        class="w-full bg-black border-2 border-white/20 p-2 font-mono focus:border-[var(--color-soviet-red)] outline-none"
                        value="MEMBER_JOIN"
                        readonly
                    />
                </div>

                <div>
                    <label class="block text-xs uppercase text-gray-400 mb-1"
                        >Action</label
                    >
                    <select
                        class="w-full bg-black border-2 border-white/20 p-2 font-mono focus:border-[var(--color-soviet-red)] outline-none"
                    >
                        <option>ADD_ROLE</option>
                        <option>SEND_MESSAGE</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs uppercase text-gray-400 mb-1"
                        >Role ID</label
                    >
                    <input
                        type="text"
                        class="w-full bg-black border-2 border-white/20 p-2 font-mono"
                        placeholder="1234567890"
                        value="987654321"
                    />
                </div>

                <button
                    class="w-full bg-white text-black font-bold p-3 border-2 border-black hover:bg-gray-200 mt-8"
                >
                    SAVE CHANGES
                </button>
            </div>
        </SovietCard>
    </div>
</div>

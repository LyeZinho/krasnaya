<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import {
        Layers,
        MousePointer2,
        Type,
        Image as ImageIcon,
        Square,
        Palette,
        Save,
        Play,
        Plus,
        Trash2,
        ChevronUp,
        ChevronDown,
        Eye,
        EyeOff,
        Variable,
    } from "lucide-svelte";

    // --- SVELTE 5 STATE ---
    let layers = $state([
        {
            id: "1",
            type: "rect",
            x: 0,
            y: 0,
            width: 800,
            height: 200,
            fill: "#1a1a1a",
            opacity: 1,
            visible: true,
        },
        {
            id: "2",
            type: "image",
            x: 20,
            y: 20,
            width: 160,
            height: 160,
            url: "{'{author.avatar}'}",
            visible: true,
        },
        {
            id: "3",
            type: "text",
            x: 200,
            y: 80,
            content: "PROLETARIAN: {'{author.name}'}",
            fontSize: 32,
            fill: "#ffffff",
            fontWeight: "900",
            visible: true,
        },
        {
            id: "4",
            type: "text",
            x: 200,
            y: 130,
            content: "LEVEL: {'{user.level}'} | XP: {'{user.xp}'}",
            fontSize: 18,
            fill: "#ff0000",
            fontWeight: "bold",
            visible: true,
        },
        {
            id: "5",
            type: "rect",
            x: 200,
            y: 150,
            width: 500,
            height: 10,
            fill: "#333",
            visible: true,
        },
        {
            id: "6",
            type: "rect",
            x: 200,
            y: 150,
            width: 350,
            height: 10,
            fill: "#ff0000",
            visible: true,
        },
    ]);

    let selectedLayerId = $state(layers[2].id);
    let selectedLayer = $derived(layers.find((l) => l.id === selectedLayerId));

    function selectLayer(id: string) {
        selectedLayerId = id;
    }

    function toggleVisibility(id: string) {
        const index = layers.findIndex((l) => l.id === id);
        if (index !== -1) layers[index].visible = !layers[index].visible;
    }

    function moveLayer(id: string, direction: "up" | "down") {
        const index = layers.findIndex((l) => l.id === id);
        if (direction === "up" && index > 0) {
            const temp = layers[index];
            layers[index] = layers[index - 1];
            layers[index - 1] = temp;
        } else if (direction === "down" && index < layers.length - 1) {
            const temp = layers[index];
            layers[index] = layers[index + 1];
            layers[index + 1] = temp;
        }
    }
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Visual Propaganda / SVG GENERATOR
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Card Designer
            </h1>
        </div>
        <div class="flex gap-4">
            <BrutalButton variant="default" class="flex items-center gap-2">
                <Play size={18} />
                Preview Logic
            </BrutalButton>
            <BrutalButton variant="red" class="flex items-center gap-2">
                <Save size={18} />
                Store Template
            </BrutalButton>
        </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
        <!-- Toolbar (Left) -->
        <aside class="lg:col-span-1 flex flex-col gap-4">
            <div
                class="flex flex-col border-4 border-black bg-black p-2 gap-2 shadow-[4px_4px_0px_#ff0000]"
            >
                <button
                    class="p-3 bg-white text-black hover:bg-neutral-200 transition-colors"
                    ><MousePointer2 size={20} /></button
                >
                <button
                    class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                    ><Type size={20} /></button
                >
                <button
                    class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                    ><ImageIcon size={20} /></button
                >
                <button
                    class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                    ><Square size={20} /></button
                >
                <button
                    class="p-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors border-t-2 border-white/10 mt-2"
                    ><Palette size={20} /></button
                >
            </div>
        </aside>

        <!-- Canvas (Center) -->
        <main class="lg:col-span-8 flex flex-col gap-6">
            <div
                class="flex-1 bg-black border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,0.5)] relative overflow-hidden flex items-center justify-center group"
            >
                <!-- SVG Canvas -->
                <svg
                    width="800"
                    height="200"
                    viewBox="0 0 800 200"
                    class="shadow-2xl bg-[#050505]"
                >
                    {#each layers as layer}
                        {#if layer.visible}
                            {#if layer.type === "rect"}
                                <rect
                                    x={layer.x}
                                    y={layer.y}
                                    width={layer.width ?? 0}
                                    height={layer.height ?? 0}
                                    fill={layer.fill}
                                    opacity={layer.opacity}
                                />
                            {:else if layer.type === "image"}
                                <rect
                                    x={layer.x}
                                    y={layer.y}
                                    width={layer.width ?? 0}
                                    height={layer.height ?? 0}
                                    fill="#222"
                                />
                                <text
                                    x={layer.x + (layer.width ?? 0) / 2}
                                    y={layer.y + (layer.height ?? 0) / 2}
                                    text-anchor="middle"
                                    dominant-baseline="middle"
                                    fill="#444"
                                    font-size="12"
                                    font-weight="bold">AVATAR_PLACEHOLDER</text
                                >
                            {:else if layer.type === "text"}
                                <text
                                    x={layer.x}
                                    y={layer.y}
                                    fill={layer.fill}
                                    font-size={layer.fontSize}
                                    font-weight={layer.fontWeight}
                                    font-family="Inter, sans-serif"
                                    style="text-transform: uppercase;"
                                >
                                    {layer.content}
                                </text>
                            {/if}
                        {/if}
                    {/each}
                </svg>

                <!-- Grid Overlay -->
                <div
                    class="absolute inset-0 pointer-events-none opacity-[0.05]"
                    style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"
                ></div>

                <!-- Dimensions Badge -->
                <div
                    class="absolute bottom-4 right-4 bg-black border border-white/20 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white/50"
                >
                    800 x 200 PX
                </div>
            </div>

            <!-- Card Metadata -->
            <BrutalCard class="bg-[#1a1a1a]">
                <div class="flex gap-8 items-center">
                    <div class="flex-1">
                        <label
                            for="template-id"
                            class="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 block mb-2"
                            >Template Identity</label
                        >
                        <input
                            id="template-id"
                            value="LOYALTY_RANK_CARD_V1"
                            class="w-full bg-black border-2 border-black p-3 text-sm font-black text-white focus:outline-none"
                        />
                    </div>
                    <div class="flex-1">
                        <label
                            for="dimensions-width"
                            class="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 block mb-2"
                            >Target Dimensions</label
                        >
                        <div class="flex items-center gap-2">
                            <input
                                id="dimensions-width"
                                value="800"
                                class="w-20 bg-black border-2 border-black p-3 text-center text-xs font-black text-white"
                            />
                            <span class="text-white/20">X</span>
                            <input
                                id="dimensions-height"
                                value="200"
                                class="w-20 bg-black border-2 border-black p-3 text-center text-xs font-black text-white"
                            />
                        </div>
                    </div>
                </div>
            </BrutalCard>
        </main>

        <!-- Panels (Right) -->
        <aside class="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
            <!-- Layers Panel -->
            <BrutalCard
                title="Layer Inventory"
                class="flex-1 flex flex-col min-h-0"
            >
                <div
                    class="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar"
                >
                    {#each layers as layer}
                        <div
                            role="button"
                            tabindex="0"
                            onclick={() => selectLayer(layer.id)}
                            onkeypress={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                    selectLayer(layer.id);
                            }}
                            class="w-full text-left p-3 border-2 border-black flex items-center gap-3 transition-all cursor-pointer {selectedLayerId ===
                            layer.id
                                ? 'bg-red-600 text-white'
                                : 'bg-black/40 hover:bg-neutral-800'}"
                        >
                            <span class="text-[9px] font-black opacity-30"
                                >{layer.type.toUpperCase()}</span
                            >
                            <span
                                class="flex-1 text-[10px] font-black uppercase truncate"
                                >{layer.type === "text"
                                    ? layer.content
                                    : layer.id}</span
                            >
                            <div class="flex items-center gap-1">
                                <button
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        toggleVisibility(layer.id);
                                    }}
                                    class="p-1 hover:text-white transition-colors"
                                >
                                    {#if layer.visible}<Eye
                                            size={12}
                                        />{:else}<EyeOff size={12} />{/if}
                                </button>
                                <button
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        moveLayer(layer.id, "up");
                                    }}
                                    class="p-1 hover:text-white transition-colors"
                                    ><ChevronUp size={12} /></button
                                >
                            </div>
                        </div>
                    {/each}
                </div>
                <button
                    class="w-full mt-4 py-3 bg-white text-black text-[10px] font-black uppercase flex items-center justify-center gap-2 border-4 border-black shadow-[4px_4px_0px_#000]"
                >
                    <Plus size={16} /> New Layer
                </button>
            </BrutalCard>

            <!-- Properties Panel -->
            <BrutalCard title="Unit Properties" class="h-80 flex-shrink-0">
                {#if selectedLayer}
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label
                                    for="layer-x-pos"
                                    class="text-[8px] font-black uppercase opacity-30 mb-1 block"
                                    >X POS</label
                                >
                                <input
                                    id="layer-x-pos"
                                    type="number"
                                    bind:value={selectedLayer.x}
                                    class="w-full bg-black border-2 border-black p-2 text-xs font-black"
                                />
                            </div>
                            <div>
                                <label
                                    for="layer-y-pos"
                                    class="text-[8px] font-black uppercase opacity-30 mb-1 block"
                                    >Y POS</label
                                >
                                <input
                                    id="layer-y-pos"
                                    type="number"
                                    bind:value={selectedLayer.y}
                                    class="w-full bg-black border-2 border-black p-2 text-xs font-black"
                                />
                            </div>
                        </div>

                        {#if selectedLayer.type === "text"}
                            <div>
                                <label
                                    for="layer-content"
                                    class="text-[8px] font-black uppercase opacity-30 mb-1 block"
                                    >Content Protocol</label
                                >
                                <div class="relative">
                                    <textarea
                                        id="layer-content"
                                        bind:value={selectedLayer.content}
                                        class="w-full bg-black border-2 border-black p-2 text-[10px] font-black min-h-[60px] pr-8"
                                    ></textarea>
                                    <Variable
                                        size={12}
                                        class="absolute top-2 right-2 text-blue-500 opacity-50 cursor-pointer hover:opacity-100"
                                    />
                                </div>
                            </div>
                        {/if}

                        <button
                            class="w-full py-2 bg-red-600/10 text-red-500 text-[8px] font-black uppercase border border-red-500/50 hover:bg-red-600 hover:text-white flex items-center justify-center gap-2"
                        >
                            <Trash2 size={12} /> Terminate Layer
                        </button>
                    </div>
                {:else}
                    <div
                        class="h-full flex items-center justify-center text-[9px] font-black uppercase opacity-20 italic"
                    >
                        No Selection
                    </div>
                {/if}
            </BrutalCard>
        </aside>
    </div>
</div>

<style>
    textarea,
    input {
        color: white;
    }
    textarea:focus,
    input:focus {
        border-color: #ff0000 !important;
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #333;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #444;
    }
</style>

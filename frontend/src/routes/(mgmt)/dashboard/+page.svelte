<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";
    import { onMount, onDestroy } from "svelte";

    let logs: { message: string; timestamp: number }[] = [];
    let eventSource: EventSource | null = null;
    let status: "active" | "error" | "idle" = "idle";

    onMount(() => {
        // Note: The proxy will need to be configured in Vite to forward this correctly
        eventSource = new EventSource("/api/v1/internal/monitor/sse");
        status = "active";

        eventSource.onmessage = (event) => {
            try {
                const newLog = JSON.parse(event.data);
                logs = [newLog, ...logs].slice(0, 5); // Keep last 5 logs
            } catch (e) {
                console.error("Failed to parse SSE trace", e);
            }
        };

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            status = "error";
        };
    });

    onDestroy(() => {
        if (eventSource) {
            eventSource.close();
        }
    });

    function formatTime(timestamp: number) {
        return new Date(timestamp).toLocaleTimeString();
    }
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold uppercase tracking-widest text-[var(--color-soviet-red)] uppercase border-b-4 border-black inline-block pb-2"
        >
            Красная (Krasnaya)
        </h1>
        <p class="text-gray-400 mt-2">Low-Code Framework Engine</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SovietCard title="System Overview" {status}>
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 border-2 border-black bg-black/50">
                    <div class="text-sm text-gray-400 uppercase">
                        Process.Msgs
                    </div>
                    <div class="text-3xl font-bold text-white mt-1">1,245</div>
                </div>
                <div class="p-4 border-2 border-black bg-black/50">
                    <div class="text-sm text-gray-400 uppercase">
                        Automations
                    </div>
                    <div class="text-3xl font-bold text-white mt-1">12</div>
                </div>
                <div class="p-4 border-2 border-black bg-black/50">
                    <div class="text-sm text-gray-400 uppercase">Global XP</div>
                    <div class="text-3xl font-bold text-white mt-1">45.2k</div>
                </div>
                <div class="p-4 border-2 border-black bg-black/50">
                    <div class="text-sm text-gray-400 uppercase">BullMQ Q</div>
                    <div class="text-3xl font-bold text-green-500 mt-1">
                        0 Wait
                    </div>
                </div>
            </div>
        </SovietCard>

        <SovietCard title="Monitor Ledger" {status}>
            <div
                class="space-y-2 font-mono text-sm max-h-[250px] overflow-y-auto pr-2"
            >
                {#each logs as log}
                    <div
                        class="p-2 border-l-4 border-[var(--color-soviet-red)] bg-black/30 flex justify-between items-start"
                    >
                        <span class="text-gray-300">{log.message}</span>
                        <span class="text-gray-500 text-xs shrink-0 ml-4"
                            >{formatTime(log.timestamp)}</span
                        >
                    </div>
                {:else}
                    <div
                        class="text-gray-500 flex items-center justify-center h-20"
                    >
                        Aguardando eventos...
                    </div>
                {/each}
            </div>
        </SovietCard>
    </div>
</div>

<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import { Activity, Radio, Cpu, HardDrive } from "lucide-svelte";
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Internal Diagnostics
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                System Monitor
            </h1>
        </div>
        <div class="flex items-center gap-2">
            <span class="status-dot status-dot-active"></span>
            <span
                class="text-[10px] font-bold uppercase tracking-widest text-emerald-500"
                >Live Telemetry</span
            >
        </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BrutalCard title="CPU Load (Engine)">
            <div
                class="h-48 bg-black/40 flex items-end gap-1 p-2 border-2 border-black"
            >
                {#each Array(30) as _, i}
                    <div
                        class="flex-1 bg-red-600/40 border-t-2 border-red-500"
                        style="height: {Math.random() * 80 + 10}%;"
                    ></div>
                {/each}
            </div>
            <div
                class="flex justify-between mt-2 text-[10px] font-mono opacity-40 uppercase"
            >
                <span>T-30s</span>
                <span>Realtime Performance Metric</span>
                <span>Now</span>
            </div>
        </BrutalCard>

        <BrutalCard title="Memory Distribution">
            <div class="space-y-4">
                <div
                    class="flex justify-between items-center bg-black/20 p-4 border border-white/5"
                >
                    <div class="flex items-center gap-3">
                        <Cpu size={20} class="text-blue-500" />
                        <span class="text-xs font-bold uppercase"
                            >Node Runtime</span
                        >
                    </div>
                    <span class="font-mono text-xs">256.2 MB</span>
                </div>
                <div
                    class="flex justify-between items-center bg-black/20 p-4 border border-white/5"
                >
                    <div class="flex items-center gap-3">
                        <HardDrive size={20} class="text-amber-500" />
                        <span class="text-xs font-bold uppercase"
                            >Redis Cache</span
                        >
                    </div>
                    <span class="font-mono text-xs">12.5 MB</span>
                </div>
                <div
                    class="flex justify-between items-center bg-black/20 p-4 border border-white/5"
                >
                    <div class="flex items-center gap-3">
                        <Radio size={20} class="text-red-500" />
                        <span class="text-xs font-bold uppercase"
                            >Discord WS Buffer</span
                        >
                    </div>
                    <span class="font-mono text-xs">1.2 MB</span>
                </div>
            </div>
        </BrutalCard>
    </div>

    <div class="mt-8">
        <BrutalCard title="Real-time Node Logs">
            <div
                class="bg-black p-6 font-mono text-[10px] leading-relaxed border-4 border-black text-red-100/80 overflow-y-auto h-64"
            >
                <p class="text-red-500">
                    [SYSTEM] Starting diagnostic check...
                </p>
                <p class="opacity-50">
                    03:14:15 [DEBUG] Redis connection established
                </p>
                <p class="opacity-50">03:14:16 [INFO] Listening on port 3000</p>
                <p class="opacity-50">
                    03:14:18 [INFO] DISCORD: Identified with Gateway (Session:
                    40a2bb...)
                </p>
                <p class="opacity-50">
                    03:14:20 [DEBUG] Loaded 45 automations from database
                </p>
                <p class="text-amber-500">
                    03:14:22 [WARN] Latency spike detected on Shard 0 (145ms)
                </p>
                <p class="opacity-50">
                    03:14:25 [INFO] Metrics aggregated to Prometheus collector
                </p>
                <p class="text-emerald-500">
                    03:14:30 [SUCCESS] Health check passed (A-1)
                </p>
                <div class="mt-2 animate-pulse">_</div>
            </div>
        </BrutalCard>
    </div>
</div>

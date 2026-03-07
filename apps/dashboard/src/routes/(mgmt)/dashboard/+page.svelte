<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import { Activity, Users, Zap, Terminal, Shield } from "lucide-svelte";
    import { MonitorService } from "$lib/services";
    import { onMount } from "svelte";
    import { currentGuild } from "$lib/stores/guild";

    let botStatus = {
        isOnline: false,
        guilds: 0,
        uptime: 0,
        lastHeartbeat: 0,
        databaseHealthy: false,
        redisHealthy: false,
    };

    let queueStats = {
        activeJobs: 0,
        completedJobs: 0,
        failedJobs: 0,
        averageProcessingTime: 0,
    };

    let auditStats = {
        totalLogs: 0,
        byAction: {} as Record<string, number>,
        byStatus: { success: 0, error: 0 },
        last24h: 0,
    };

    let loading = true;
    let error: string | null = null;

    async function loadDashboardData() {
        try {
            loading = true;
            error = null;
            
            const [status, queue, audit] = await Promise.all([
                MonitorService.getBotStatus(),
                MonitorService.getQueueStats(),
                MonitorService.getAuditStats($currentGuild?.id),
            ]);

            botStatus = status;
            queueStats = queue;
            auditStats = audit;
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao carregar dados";
            console.error("Dashboard error:", err);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadDashboardData();
        
        // Refresh a cada 30 segundos
        const interval = setInterval(loadDashboardData, 30000);
        return () => clearInterval(interval);
    });

    function formatUptime() {
        const seconds = botStatus.uptime;
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    }
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Operational Command
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Status Room
            </h1>
        </div>
        <div class="text-right">
            <div
                class="text-[10px] font-bold uppercase tracking-widest opacity-40"
            >
                Uptime
            </div>
            <div class="text-xl font-mono font-bold tracking-tighter">
                {formatUptime()}
            </div>
        </div>
    </header>

    {#if error}
        <div class="border-2 border-red-600 bg-red-900/20 p-4 text-red-600">
            <div class="font-bold">Erro ao carregar dados</div>
            <div class="text-xs opacity-70">{error}</div>
        </div>
    {/if}

    {#if loading}
        <div class="text-center py-8 opacity-50">Carregando dados...</div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BrutalCard
                class={botStatus.isOnline
                    ? "bg-emerald-950/20 border-emerald-900/50"
                    : "bg-red-950/20 border-red-900/50"}
            >
                <div class="flex justify-between items-start">
                    <Activity
                        class={botStatus.isOnline ? "text-emerald-500" : "text-red-500"}
                        size={24}
                    />
                    <span
                        class={`text-[10px] font-black uppercase px-2 py-0.5 ${
                            botStatus.isOnline ? "bg-emerald-600" : "bg-red-600"
                        }`}
                    >
                        {botStatus.isOnline ? "Online" : "Offline"}
                    </span>
                </div>
                <div class="mt-4">
                    <div class="text-3xl font-black tracking-tighter">
                        {botStatus.guilds}
                    </div>
                    <div
                        class="text-[10px] font-bold uppercase opacity-40 tracking-widest"
                    >
                        Servidores (Guilds)
                    </div>
                </div>
            </BrutalCard>

            <BrutalCard
                class={botStatus.databaseHealthy
                    ? "bg-blue-950/20 border-blue-900/50"
                    : "bg-red-950/20 border-red-900/50"}
            >
                <div class="flex justify-between items-start">
                    <Terminal
                        class={botStatus.databaseHealthy
                            ? "text-blue-500"
                            : "text-red-500"}
                        size={24}
                    />
                </div>
                <div class="mt-4">
                    <div class="text-3xl font-black tracking-tighter">
                        {botStatus.databaseHealthy ? "OK" : "ERRO"}
                    </div>
                    <div
                        class="text-[10px] font-bold uppercase opacity-40 tracking-widest"
                    >
                        Database Status
                    </div>
                </div>
            </BrutalCard>

            <BrutalCard>
                <div class="flex justify-between items-start">
                    <Zap class="text-amber-500" size={24} />
                </div>
                <div class="mt-4">
                    <div class="text-3xl font-black tracking-tighter">
                        {queueStats.activeJobs}
                    </div>
                    <div
                        class="text-[10px] font-bold uppercase opacity-40 tracking-widest"
                    >
                        Active Jobs
                    </div>
                </div>
            </BrutalCard>

            <BrutalCard>
                <div class="flex justify-between items-start">
                    <Shield class="text-emerald-500" size={24} />
                </div>
                <div class="mt-4">
                    <div class="text-3xl font-black tracking-tighter">
                        {auditStats.byStatus.success}
                    </div>
                    <div
                        class="text-[10px] font-bold uppercase opacity-40 tracking-widest"
                    >
                        Successful Actions (24h)
                    </div>
                </div>
            </BrutalCard>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
                <BrutalCard title="Estatísticas da Fila">
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between p-2 border-b border-white/10">
                            <span class="opacity-60">Completados:</span>
                            <span class="font-bold">{queueStats.completedJobs}</span>
                        </div>
                        <div class="flex justify-between p-2 border-b border-white/10">
                            <span class="opacity-60">Falhados:</span>
                            <span class="font-bold text-red-400">{queueStats.failedJobs}</span>
                        </div>
                        <div class="flex justify-between p-2">
                            <span class="opacity-60">Tempo Médio:</span>
                            <span class="font-bold">{queueStats.averageProcessingTime}ms</span>
                        </div>
                    </div>
                </BrutalCard>
            </div>
            <BrutalCard title="Audit Log (24h)">
                <div class="space-y-2 text-xs">
                    <div class="flex justify-between p-2 border-b border-white/10">
                        <span class="opacity-60">Total de Logs:</span>
                        <span class="font-bold">{auditStats.totalLogs}</span>
                    </div>
                    <div class="flex justify-between p-2 border-b border-white/10">
                        <span class="opacity-60">Últimas 24h:</span>
                        <span class="font-bold text-emerald-400">{auditStats.last24h}</span>
                    </div>
                    <div class="flex justify-between p-2">
                        <span class="opacity-60">Erros:</span>
                        <span class="font-bold text-red-400">{auditStats.byStatus.error}</span>
                    </div>
                </div>
            </BrutalCard>
        </div>
    {/if}
</div>

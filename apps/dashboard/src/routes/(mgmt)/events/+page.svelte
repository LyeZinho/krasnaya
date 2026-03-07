<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import { Zap, Plus, Trash2 } from "lucide-svelte";
    import { EventService } from "$lib/services";
    import { currentGuild } from "$lib/stores/guild";
    import { onMount } from "svelte";

    let availableEvents: any[] = [];
    let eventHandlers: any[] = [];
    let loading = true;
    let error: string | null = null;

    async function loadEventData() {
        if (!$currentGuild) return;
        try {
            loading = true;
            error = null;
            const [events, handlers] = await Promise.all([
                EventService.getAvailableEvents(),
                EventService.listEventHandlers($currentGuild.id),
            ]);
            availableEvents = events || [];
            eventHandlers = handlers || [];
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao carregar eventos";
        } finally {
            loading = false;
        }
    }

    async function deleteHandler(id: string) {
        if (!confirm("Tem certeza que deseja deletar?")) return;
        try {
            await EventService.deleteEventHandler(id);
            await loadEventData();
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao deletar";
        }
    }

    async function toggleHandler(id: string, enabled: boolean) {
        try {
            await EventService.toggleEventHandler(id, enabled);
            await loadEventData();
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao atualizar";
        }
    }

    onMount(() => {
        loadEventData();
    });

    function getLinkedHandlers(eventName: string) {
        return eventHandlers.filter((h) => h.event === eventName);
    }
</script>

<div class="space-y-8">
    <header class="border-b-4 border-black pb-6">
        <h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">
            Discord Events / Integration Layer
        </h2>
        <h1 class="text-5xl font-black uppercase tracking-tighter">
            Event Handlers
        </h1>
    </header>

    {#if error}
        <div class="border-2 border-red-600 bg-red-900/20 p-4 text-red-600">
            <div class="font-bold">Erro</div>
            <div class="text-xs opacity-70">{error}</div>
        </div>
    {/if}

    {#if loading}
        <div class="text-center py-8 opacity-50">Carregando eventos...</div>
    {:else}
        <div class="space-y-6">
            <div>
                <h3 class="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-4">
                    Eventos Disponíveis
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each availableEvents as event}
                        <BrutalCard>
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h4 class="font-black text-sm uppercase">
                                        {event.name}
                                    </h4>
                                    <p class="text-[10px] opacity-60 mt-1">
                                        {event.description}
                                    </p>
                                </div>
                                <Zap class="text-amber-500 flex-shrink-0" size={18} />
                            </div>
                            <div class="mt-3 pt-3 border-t border-white/10">
                                {#if getLinkedHandlers(event.name).length > 0}
                                    <div class="text-[10px] font-bold text-emerald-400">
                                        {getLinkedHandlers(event.name).length} handler(s)
                                    </div>
                                {:else}
                                    <div class="text-[10px] opacity-40">Sem handlers</div>
                                {/if}
                            </div>
                        </BrutalCard>
                    {/each}
                </div>
            </div>

            {#if eventHandlers.length > 0}
                <div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-4">
                        Handlers Configurados
                    </h3>
                    <div class="space-y-2">
                        {#each eventHandlers as handler}
                            <div class="border-2 border-black p-4 flex items-between justify-between">
                                <div>
                                    <div class="font-black text-sm uppercase">
                                        {handler.event}
                                    </div>
                                    <div class="text-[10px] opacity-60 mt-1">
                                        Automação: {handler.automationId}
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button
                                        onclick={() =>
                                            toggleHandler(handler.id, !handler.enabled)}
                                        class="px-3 py-1 text-[10px] border border-white/30 hover:bg-white/10"
                                    >
                                        {handler.enabled ? "Ativar" : "Desativar"}
                                    </button>
                                    <button
                                        onclick={() => deleteHandler(handler.id)}
                                        class="px-3 py-1 text-[10px] border border-red-600/50 text-red-400 hover:bg-red-900/20"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>

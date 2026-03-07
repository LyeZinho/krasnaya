<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import BrutalModal from "$lib/components/ui/BrutalModal.svelte";
    import {
        Play,
        Save,
        Code,
        Layout,
        Plus,
        Trash2,
        Variable,
        Database,
        Zap,
        Settings2,
        Info,
    } from "lucide-svelte";
    import { AutomationService } from "$lib/services";
    import { goto } from '$app/navigation';
    import { currentGuild } from "$lib/stores/guild";
    import { onMount } from "svelte";
    import type { Automation } from "$lib/types";

    // Standard Logic Template
    const defaultLogic = {
        and: [
            { ">": [{ var: "user.messages" }, 100] },
            { in: ["verified", { var: "user.roles" }] },
        ],
    };

    let viewMode: "visual" | "json" = "visual";
    let rawJson = JSON.stringify(defaultLogic, null, 4);

    let automations: Automation[] = [];
    let selectedAutomation: Automation | null = null;
    let loading = true;
    let error: string | null = null;
    let showCreateModal = false;
    let createError: string | null = null;
    let isCreating = false;

    // Form fields
    let newAutomationName = "";
    let newAutomationTrigger = "MESSAGE_CREATE";

    async function loadAutomations() {
        if (!$currentGuild) return;
        try {
            loading = true;
            error = null;
            automations = await AutomationService.listAutomations($currentGuild.id);
            if (automations.length > 0) {
                selectedAutomation = automations[0];
                rawJson = JSON.stringify(selectedAutomation, null, 4);
            }
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao carregar";
        } finally {
            loading = false;
        }
    }

    async function createAutomation() {
        if (!$currentGuild || !newAutomationName) {
            createError = "Nome é obrigatório";
            return;
        }

        try {
            isCreating = true;
            createError = null;
            
            const newAuto = await AutomationService.createAutomation($currentGuild.id, {
                guildId: $currentGuild.id,
                name: newAutomationName,
                trigger: {
                    type: newAutomationTrigger as 'MESSAGE_CREATE' | 'MEMBER_JOIN' | 'INTERACTION_CREATE' | 'SCHEDULED_EVENT' | 'MESSAGE_REACTION' | 'VOICE_STATE_UPDATE',
                    config: {}
                },
                conditions: [],
                actions: [],
                enabled: true,
            });

            showCreateModal = false;
            newAutomationName = "";
            newAutomationTrigger = "MESSAGE_CREATE";
            
            await loadAutomations();
        } catch (err) {
            createError = err instanceof Error ? err.message : "Erro ao criar automação";
        } finally {
            isCreating = false;
        }
    }

    async function deleteAutomation(id: string) {
        if (!confirm("Tem certeza que deseja deletar?")) return;
        try {
            await AutomationService.deleteAutomation(id);
            await loadAutomations();
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao deletar";
        }
    }

    async function toggleAutomation(id: string, enabled: boolean) {
        try {
            await AutomationService.toggleAutomation(id, enabled);
            await loadAutomations();
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao atualizar";
        }
    }

    function toggleMode() {
        viewMode = viewMode === "visual" ? "json" : "visual";
    }

    onMount(() => {
        loadAutomations();
    });
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Automation / TCA Protocol
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Flow Editor
            </h1>
        </div>
        <div class="flex gap-4">
            <button
                onclick={() => (showCreateModal = true)}
                class="px-6 py-3 border-4 border-green-600 bg-green-900/30 text-green-400 font-black uppercase text-xs flex items-center gap-2 transition-all hover:bg-green-900/50"
            >
                <Plus size={18} />
                Criar
            </button>
            <button
                onclick={toggleMode}
                class="px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all {viewMode ===
                'json'
                    ? 'bg-white text-black translate-x-1 shadow-[4px_4px_0px_#000]'
                    : 'bg-black text-white'}"
            >
                {viewMode === "visual" ? "Switch to JSON" : "Switch to Visual"}
                {#if viewMode === "visual"}<Code size={16} />{:else}<Layout
                        size={16}
                    />{/if}
            </button>
            <BrutalButton variant="red" class="flex items-center gap-2">
                <Save size={18} />
                Deploy
            </BrutalButton>
        </div>
    </header>

    {#if error}
        <div class="border-2 border-red-600 bg-red-900/20 p-4 text-red-600">
            <div class="font-bold">Erro</div>
            <div class="text-xs opacity-70">{error}</div>
        </div>
    {/if}

    {#if loading}
        <div class="text-center py-8 opacity-50">Carregando automações...</div>
    {:else if automations.length === 0}
        <div class="text-center py-8 opacity-50">Nenhuma automação criada</div>
    {:else}
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Sidebar: Registry & Variables -->
            <aside class="space-y-6">
                <BrutalCard title="Automações Ativas">
                    <div class="space-y-2">
                        {#each automations as auto}
                            <div
                                class="border-2 border-black p-3 text-[10px]"
                                class:bg-red-600={selectedAutomation?.id === auto.id}
                                class:text-white={selectedAutomation?.id === auto.id}
                            >
                                <button
                                    onclick={() => goto(`/flows/${auto.id}`)}
                                    class="w-full text-left font-black uppercase hover:opacity-75"
                                >
                                    {auto.name || "Sem Nome"}
                                </button>
                                <div class="text-[8px] opacity-60 mt-1">
                                    Trigger: {auto.trigger}
                                </div>
                                <div class="flex gap-1 mt-2">
                                    <button
                                        onclick={() =>
                                            toggleAutomation(auto.id, !auto.enabled)}
                                        class="text-[8px] px-2 py-1 border border-white/30 hover:bg-white/10"
                                    >
                                        {auto.enabled ? "Ativar" : "Desativar"}
                                    </button>
                                    <button
                                        onclick={() => deleteAutomation(auto.id)}
                                        class="text-[8px] px-2 py-1 border border-red-600/50 text-red-400 hover:bg-red-900/20"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                </BrutalCard>
            </aside>
        </div>
    {/if}
</div>

<BrutalModal
    isOpen={showCreateModal}
    title="Criar Nova Automação"
    onClose={() => {
        showCreateModal = false;
        createError = null;
    }}
>
    {#if createError}
        <div class="border-2 border-red-600 bg-red-900/20 p-4 text-red-600 mb-4">
            <div class="font-bold">Erro</div>
            <div class="text-xs opacity-70">{createError}</div>
        </div>
    {/if}

    <div class="space-y-4">
        <div class="brutal-form-group">
            <label for="autoName">Nome da Automação</label>
            <input
                id="autoName"
                type="text"
                placeholder="ex: Welcome Message"
                bind:value={newAutomationName}
                disabled={isCreating}
            />
        </div>

        <div class="brutal-form-group">
            <label for="trigger">Tipo de Trigger (Evento)</label>
            <select
                id="trigger"
                bind:value={newAutomationTrigger}
                disabled={isCreating}
                class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white"
            >
                <option value="MESSAGE_CREATE">Mensagem Criada</option>
                <option value="MEMBER_JOIN">Membro Entrou</option>
                <option value="INTERACTION_CREATE">Interação Criada</option>
                <option value="SCHEDULED_EVENT">Evento Agendado</option>
                <option value="MESSAGE_REACTION">Reação em Mensagem</option>
                <option value="VOICE_STATE_UPDATE">Estado de Voz</option>
            </select>
        </div>

        <div class="flex gap-3 mt-6">
            <button
                onclick={createAutomation}
                disabled={isCreating}
                class="flex-1 px-6 py-3 border-4 border-green-600 bg-green-900/30 text-green-400 font-black uppercase text-xs transition-all disabled:opacity-50"
            >
                {isCreating ? "Criando..." : "Criar Automação"}
            </button>
            <button
                onclick={() => (showCreateModal = false)}
                disabled={isCreating}
                class="flex-1 px-6 py-3 border-4 border-gray-600 bg-gray-900/30 text-gray-400 font-black uppercase text-xs transition-all disabled:opacity-50"
            >
                Cancelar
            </button>
        </div>
    </div>
</BrutalModal>

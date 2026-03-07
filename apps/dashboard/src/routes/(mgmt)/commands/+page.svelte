<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import BrutalModal from "$lib/components/ui/BrutalModal.svelte";
    import { goto } from '$app/navigation';
    import {
        Terminal,
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
        Users,
        MessageSquare,
        Shield,
        Globe,
    } from "lucide-svelte";
    import { CommandService } from "$lib/services";
    import { currentGuild } from "$lib/stores/guild";
    import { onMount } from "svelte";
    import type { Command } from "$lib/types";

    // Standard Command Template
    const defaultLogic = {
        if: [
            { in: ["moderator", { var: "author.roles" }] },
            {
                SEND_MSG: {
                    content: "Command executed by authorized personnel.",
                },
            },
            { SEND_MSG: { content: "Access denied, comrade." } },
        ],
    };

    let viewMode: "visual" | "json" = "visual";
    let rawJson = JSON.stringify(defaultLogic, null, 4);

    let commands: any[] = [];
    let selectedCommand: any = null;
    let loading = true;
    let error: string | null = null;
    let showCreateModal = false;
    let createError: string | null = null;
    let isCreating = false;

    // Form fields
    let newCommandName = "";
    let newCommandPrefix = "!";
    let newCommandDescription = "";

    async function loadCommands() {
        if (!$currentGuild) return;
        try {
            loading = true;
            error = null;
            commands = await CommandService.listCommands($currentGuild.id);
            if (commands.length > 0) {
                selectedCommand = commands[0];
                rawJson = JSON.stringify(selectedCommand, null, 4);
            }
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao carregar";
        } finally {
            loading = false;
        }
    }

    async function createCommand() {
        if (!$currentGuild || !newCommandName) {
            createError = "Nome é obrigatório";
            return;
        }

        try {
            isCreating = true;
            createError = null;
            
            const newCmd = await CommandService.createCommand($currentGuild.id, {
                guildId: $currentGuild.id,
                name: newCommandName,
                prefix: newCommandPrefix,
                description: newCommandDescription,
                aliases: [],
                enabled: true,
                cooldown: 1000,
            });

            showCreateModal = false;
            newCommandName = "";
            newCommandPrefix = "!";
            newCommandDescription = "";
            
            await loadCommands();
        } catch (err) {
            createError = err instanceof Error ? err.message : "Erro ao criar comando";
        } finally {
            isCreating = false;
        }
    }

    async function deleteCommand(id: string) {
        if (!confirm("Tem certeza que deseja deletar?")) return;
        try {
            await CommandService.deleteCommand(id);
            await loadCommands();
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao deletar";
        }
    }

    async function toggleCommand(id: string, enabled: boolean) {
        try {
            await CommandService.toggleCommand(id, enabled);
            await loadCommands();
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao atualizar";
        }
    }

    function toggleMode() {
        viewMode = viewMode === "visual" ? "json" : "visual";
    }

    onMount(() => {
        loadCommands();
    });
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Protocol Enforcement / CUSTOM COMMANDS
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Command Registry
            </h1>
        </div>
        <div class="flex gap-4">
            <button
                onclick={() => (showCreateModal = true)}
                class="px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all bg-red-600 text-white hover:translate-x-1 hover:shadow-[4px_4px_0px_#000]"
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
                Authorize
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
        <div class="text-center py-8 opacity-50">Carregando comandos...</div>
    {:else if commands.length === 0}
        <div class="text-center py-8 opacity-50">Nenhum comando criado</div>
    {:else}
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Sidebar: Command List & Arguments -->
            <aside class="space-y-6">
                <BrutalCard title="Comandos Ativos">
                    <div class="space-y-2">
                        {#each commands as cmd}
                            <div
                                class="border-2 border-black p-3"
                                class:bg-red-600={selectedCommand?.id === cmd.id}
                                class:text-white={selectedCommand?.id === cmd.id}
                            >
                                <button
                                    onclick={() => goto(`/commands/${cmd.id}`)}
                                    class="w-full text-left hover:opacity-75"
                                >
                                    <div class="text-[10px] font-black uppercase">
                                        {cmd.name || "Sem Nome"}
                                    </div>
                                    <div class="text-[8px] opacity-60 mt-1">
                                        {cmd.prefix || "!"} {cmd.name}
                                    </div>
                                </button>
                                <div class="flex gap-1 mt-2">
                                    <button
                                        onclick={() =>
                                            toggleCommand(cmd.id, !cmd.enabled)}
                                        class="text-[8px] px-2 py-1 border border-white/30 hover:bg-white/10"
                                    >
                                        {cmd.enabled ? "Ativar" : "Desativar"}
                                    </button>
                                    <button
                                        onclick={() => deleteCommand(cmd.id)}
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
    title="Criar Novo Comando"
    isOpen={showCreateModal}
    onClose={() => {
        showCreateModal = false;
        createError = null;
    }}
>
    <div class="space-y-4">
        {#if createError}
            <div class="border-2 border-red-600 bg-red-900/20 p-3 text-red-600 text-sm">
                {createError}
            </div>
        {/if}

        <div>
            <label for="cmd-name" class="block text-xs font-black uppercase mb-2">
                Nome do Comando *
            </label>
            <input
                id="cmd-name"
                type="text"
                placeholder="ping"
                bind:value={newCommandName}
                class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
            />
        </div>

        <div>
            <label for="cmd-prefix" class="block text-xs font-black uppercase mb-2">
                Prefixo
            </label>
            <input
                id="cmd-prefix"
                type="text"
                placeholder="!"
                bind:value={newCommandPrefix}
                class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
            />
        </div>

        <div>
            <label for="cmd-desc" class="block text-xs font-black uppercase mb-2">
                Descrição
            </label>
            <input
                id="cmd-desc"
                type="text"
                placeholder="Descrição do comando"
                bind:value={newCommandDescription}
                class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
            />
        </div>

        <div class="flex gap-3 pt-4 border-t-2 border-black">
            <button
                onclick={createCommand}
                disabled={isCreating}
                class="flex-1 px-6 py-3 border-4 border-black font-black uppercase text-xs bg-red-600 text-white hover:translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all disabled:opacity-50"
            >
                {isCreating ? "Criando..." : "Criar"}
            </button>
            <button
                onclick={() => {
                    showCreateModal = false;
                    createError = null;
                }}
                disabled={isCreating}
                class="flex-1 px-6 py-3 border-4 border-black font-black uppercase text-xs bg-black text-white hover:translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all disabled:opacity-50"
            >
                Cancelar
            </button>
        </div>
    </div>
</BrutalModal>

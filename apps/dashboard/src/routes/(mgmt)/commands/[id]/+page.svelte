<script lang="ts">
    import { goto } from '$app/navigation';
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import BrutalModal from "$lib/components/ui/BrutalModal.svelte";
    import { CommandService } from "$lib/services";
    import { toastStore } from "$lib/stores/toast";
    import type { Command } from "$lib/types";
    import { Trash2, Save, Code, Layout, ArrowLeft, Plus, X } from "lucide-svelte";
    import type { PageData } from './$types';

    export let data: PageData;

    let command = { ...data.command };
    let originalCommand = JSON.parse(JSON.stringify(data.command));
    let mode: "visual" | "json" = "visual";
    let jsonContent = JSON.stringify(command, null, 2);
    
    let isSaving = false;
    let isDeleting = false;
    let error: string | null = null;
    let showDeleteModal = false;
    let successMessage: string | null = null;
    let newAlias = "";

    $: hasUnsavedChanges = JSON.stringify(command) !== JSON.stringify(originalCommand);

    function syncVisualToJson() {
        jsonContent = JSON.stringify(command, null, 2);
    }

    function syncJsonToVisual() {
        try {
            const parsed = JSON.parse(jsonContent);
            command = parsed;
            error = null;
        } catch (err) {
            error = `JSON inválido: ${(err as Error).message}`;
        }
    }

    function addAlias() {
        if (newAlias.trim() && !command.aliases.includes(newAlias.trim())) {
            command.aliases = [...command.aliases, newAlias.trim()];
            newAlias = "";
            syncVisualToJson();
        }
    }

    function removeAlias(alias: string) {
        command.aliases = command.aliases.filter(a => a !== alias);
        syncVisualToJson();
    }

    async function saveCommand() {
        if (!command.name) {
            error = "Nome é obrigatório";
            return;
        }

        try {
            isSaving = true;
            error = null;
            await CommandService.updateCommand(command.id, command);
            toastStore.add('Comando salvo com sucesso!', 'success');
            originalCommand = JSON.parse(JSON.stringify(command));
            setTimeout(() => goto("/commands"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao salvar";
            toastStore.add('Erro ao salvar: ' + message, 'error');
        } finally {
            isSaving = false;
        }
    }

    async function deleteCommand() {
        try {
            isDeleting = true;
            await CommandService.deleteCommand(command.id);
            toastStore.add('Comando deletado com sucesso', 'success');
            setTimeout(() => goto("/commands"), 1000);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao deletar";
            toastStore.add('Erro ao deletar: ' + message, 'error');
        } finally {
            isDeleting = false;
            showDeleteModal = false;
        }
    }

    function goBack() {
        if (hasUnsavedChanges) {
            toastStore.add('Mudanças não salvas', 'warning');
            if (!confirm("Há mudanças não salvas. Tem certeza?")) {
                return;
            }
        }
        goto("/commands");
    }

    function handleKeydown(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            saveCommand();
        }
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'j') {
            event.preventDefault();
            mode = mode === 'json' ? 'visual' : 'json';
        }
        if (event.key === 'Escape' && showDeleteModal) {
            showDeleteModal = false;
        }
    }
</script>

<div class="space-y-8" onkeydown={handleKeydown}>
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div class="flex items-center gap-4">
            <button
                onclick={goBack}
                class="p-2 hover:bg-gray-900 transition-colors"
                title="Voltar"
            >
                <ArrowLeft size={24} />
            </button>
            <div>
                <h2 class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">
                    Protocol Enforcement / COMMAND EDITOR
                </h2>
                <h1 class="text-4xl font-black uppercase tracking-tighter">
                    {command.name || "Sem Nome"}
                </h1>
            </div>
        </div>
        <div class="flex gap-4">
            <button
                onclick={() => (mode = mode === "visual" ? "json" : "visual")}
                class="px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all {mode === 'json'
                    ? 'bg-white text-black translate-x-1 shadow-[4px_4px_0px_#000]'
                    : 'bg-black text-white'}"
            >
                {mode === "visual" ? "JSON Mode" : "Visual Mode"}
                {#if mode === "visual"}<Code size={16} />{:else}<Layout size={16} />{/if}
            </button>
            <button
                onclick={saveCommand}
                disabled={isSaving || !hasUnsavedChanges}
                class="px-6 py-3 border-4 border-green-600 bg-green-900/30 text-green-400 font-black uppercase text-xs flex items-center gap-2 transition-all disabled:opacity-50"
            >
                <Save size={18} />
                {isSaving ? "Salvando..." : "Salvar"}
            </button>
            <button
                onclick={() => (showDeleteModal = true)}
                class="px-6 py-3 border-4 border-red-600 bg-red-900/30 text-red-400 font-black uppercase text-xs flex items-center gap-2 transition-all"
            >
                <Trash2 size={18} />
                Deletar
            </button>
        </div>
    </header>

    {#if error}
        <div class="border-2 border-red-600 bg-red-900/20 p-4 text-red-600">
            <div class="font-bold">Erro</div>
            <div class="text-xs opacity-70">{error}</div>
        </div>
    {/if}

    {#if successMessage}
        <div class="border-2 border-green-600 bg-green-900/20 p-4 text-green-600">
            <div class="font-bold">Sucesso</div>
            <div class="text-xs opacity-70">{successMessage}</div>
        </div>
    {/if}

    {#if mode === "visual"}
        <div class="space-y-6">
            <BrutalCard title="Propriedades do Comando">
                <div class="space-y-4">
                    <div>
                        <label for="name" class="block text-xs font-black uppercase mb-2">
                            Nome *
                        </label>
                         <input
                             id="name"
                             type="text"
                             bind:value={command.name}
                             onchange={syncVisualToJson}
                             class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
                         />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="prefix" class="block text-xs font-black uppercase mb-2">
                                Prefixo
                            </label>
                             <input
                                 id="prefix"
                                 type="text"
                                 bind:value={command.prefix}
                                 onchange={syncVisualToJson}
                                 class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
                             />
                        </div>

                        <div>
                            <label for="cooldown" class="block text-xs font-black uppercase mb-2">
                                Cooldown (ms)
                            </label>
                             <input
                                 id="cooldown"
                                 type="number"
                                 bind:value={command.cooldown}
                                 onchange={syncVisualToJson}
                                 class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
                             />
                        </div>
                    </div>

                    <div>
                        <label for="description" class="block text-xs font-black uppercase mb-2">
                            Descrição
                        </label>
                         <textarea
                             id="description"
                             bind:value={command.description}
                             onchange={syncVisualToJson}
                             class="w-full border-2 border-black p-3 font-mono text-sm min-h-[80px] focus:outline-none focus:bg-yellow-100"
                         />
                    </div>

                    <div>
                        <label class="block text-xs font-black uppercase mb-2">
                            Aliases
                        </label>
                        <div class="flex gap-2 mb-3">
                             <input
                                 type="text"
                                 bind:value={newAlias}
                                 placeholder="Adicionar alias"
                                 onkeydown={(e) => e.key === 'Enter' && addAlias()}
                                 class="flex-1 border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
                             />
                            <button
                                onclick={addAlias}
                                class="px-4 py-3 border-2 border-black bg-green-600 text-white font-black text-xs hover:bg-green-700"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            {#each command.aliases as alias}
                                <div class="bg-black text-white px-3 py-1 rounded flex items-center gap-2">
                                    <span class="text-xs font-black">{alias}</span>
                                    <button
                                        onclick={() => removeAlias(alias)}
                                        class="hover:text-red-400 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div>
                        <label for="enabled" class="block text-xs font-black uppercase mb-2">
                            Status
                        </label>
                        <button
                            type="button"
                            onclick={() => {
                                command.enabled = !command.enabled;
                                syncVisualToJson();
                            }}
                            class="w-full px-4 py-3 border-2 border-black font-black uppercase text-xs {command.enabled
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-600 text-white'}"
                        >
                            {command.enabled ? "Ativado" : "Desativado"}
                        </button>
                    </div>
                </div>
            </BrutalCard>

            <BrutalCard title="Lógica do Comando">
                <textarea
                    value={typeof command !== 'object' || !command.logic ? '{}' : JSON.stringify(command.logic || {}, null, 2)}
                    onchange={(e) => {
                        try {
                            command.logic = JSON.parse(e.currentTarget.value);
                            error = null;
                        } catch (err) {
                            error = "JSON de lógica inválido";
                        }
                        syncVisualToJson();
                    }}
                    class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[300px] focus:outline-none focus:bg-gray-900"
                />
            </BrutalCard>
        </div>
    {:else}
        <BrutalCard title="JSON Editor">
            <textarea
                value={jsonContent}
                onchange={(e) => {
                    jsonContent = e.currentTarget.value;
                    syncJsonToVisual();
                }}
                class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[500px] focus:outline-none focus:bg-gray-900"
            />
        </BrutalCard>
    {/if}
</div>

<BrutalModal
    title="Confirmar Deleção"
    isOpen={showDeleteModal}
    onClose={() => (showDeleteModal = false)}
>
    <div class="space-y-4">
        <p class="text-sm">
            Tem certeza que deseja deletar o comando "<strong>{command.name}</strong>"?
            Esta ação não pode ser desfeita.
        </p>
        <div class="flex gap-3">
            <button
                onclick={deleteCommand}
                disabled={isDeleting}
                class="flex-1 px-6 py-3 border-4 border-red-600 bg-red-900/30 text-red-400 font-black uppercase text-xs transition-all disabled:opacity-50"
            >
                {isDeleting ? "Deletando..." : "Deletar"}
            </button>
            <button
                onclick={() => (showDeleteModal = false)}
                disabled={isDeleting}
                class="flex-1 px-6 py-3 border-4 border-gray-600 bg-gray-900/30 text-gray-400 font-black uppercase text-xs transition-all disabled:opacity-50"
            >
                Cancelar
            </button>
        </div>
    </div>
</BrutalModal>

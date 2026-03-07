<script lang="ts">
    import { goto } from '$app/navigation';
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import BrutalModal from "$lib/components/ui/BrutalModal.svelte";
    import { AutomationService } from "$lib/services";
    import { toastStore } from "$lib/stores/toast";
    import type { Automation } from "$lib/types";
    import { Trash2, Save, Code, Layout, ArrowLeft } from "lucide-svelte";
    import { validateJSON, validateAutomation } from '$lib/utils/validation';
    import type { PageData } from './$types';

    export let data: PageData;

    let automation = { ...data.automation };
    let originalAutomation = JSON.parse(JSON.stringify(data.automation));
    let mode: "visual" | "json" = "visual";
    let jsonContent = JSON.stringify(automation, null, 2);
    let jsonErrors: { line?: number; message: string }[] = [];
    
    let isSaving = false;
    let isDeleting = false;
    let error: string | null = null;
    let showDeleteModal = false;
    let successMessage: string | null = null;

    $: hasUnsavedChanges = JSON.stringify(automation) !== JSON.stringify(originalAutomation);

    let jsonValidationTimeout: NodeJS.Timeout;
    function handleJsonChange(value: string) {
        jsonContent = value;
        clearTimeout(jsonValidationTimeout);
        jsonValidationTimeout = setTimeout(() => {
            const errors = validateJSON(value);
            jsonErrors = errors.map((e) => ({ line: e.line, message: e.message }));
        }, 300);
    }

    function syncVisualToJson() {
        jsonContent = JSON.stringify(automation, null, 2);
    }

    function syncJsonToVisual() {
        try {
            const parsed = JSON.parse(jsonContent);
            automation = parsed;
            error = null;
        } catch (err) {
            error = `JSON inválido: ${(err as Error).message}`;
        }
    }

    async function saveAutomation() {
        try {
            const parsed = JSON.parse(jsonContent);
            const validationErrors = validateAutomation(parsed);
            if (validationErrors.length > 0) {
                toastStore.add('Verifique os erros antes de salvar', 'warning');
                return;
            }
            automation = parsed;
        } catch (err) {
            error = `JSON inválido: ${(err as Error).message}`;
            return;
        }

        if (!automation.name) {
            error = "Nome é obrigatório";
            return;
        }

        try {
            isSaving = true;
            error = null;
            await AutomationService.updateAutomation(automation.id, automation);
            toastStore.add('Automação salva com sucesso!', 'success');
            originalAutomation = JSON.parse(JSON.stringify(automation));
            setTimeout(() => goto("/flows"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao salvar";
            toastStore.add('Erro ao salvar: ' + message, 'error');
        } finally {
            isSaving = false;
        }
    }

    async function deleteAutomation() {
        try {
            isDeleting = true;
            await AutomationService.deleteAutomation(automation.id);
            toastStore.add('Automação deletada com sucesso', 'success');
            setTimeout(() => goto("/flows"), 1000);
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
        goto("/flows");
    }

    function handleKeydown(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            saveAutomation();
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
                    Automation Engine / FLOW EDITOR
                </h2>
                <h1 class="text-4xl font-black uppercase tracking-tighter">
                    {automation.name || "Sem Nome"}
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
                onclick={saveAutomation}
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
            <BrutalCard title="Propriedades da Automação">
                <div class="space-y-4">
                    <div>
                        <label for="name" class="block text-xs font-black uppercase mb-2">
                            Nome *
                        </label>
                        <input
                            id="name"
                            type="text"
                            bind:value={automation.name}
                            onchange={syncVisualToJson}
                            class="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-100"
                        />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="trigger" class="block text-xs font-black uppercase mb-2">
                                Tipo de Trigger
                            </label>
                            <select
                                id="trigger"
                                bind:value={automation.trigger.type}
                                onchange={syncVisualToJson}
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

                        <div>
                            <label for="enabled" class="block text-xs font-black uppercase mb-2">
                                Status
                            </label>
                            <button
                                type="button"
                                onclick={() => {
                                    automation.enabled = !automation.enabled;
                                    syncVisualToJson();
                                }}
                                class="w-full px-4 py-3 border-2 border-black font-black uppercase text-xs {automation.enabled
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-600 text-white'}"
                            >
                                {automation.enabled ? "Ativada" : "Desativada"}
                            </button>
                        </div>
                    </div>
                </div>
            </BrutalCard>

            <BrutalCard title="Condições">
                <textarea
                    value={JSON.stringify(automation.conditions, null, 2)}
                    onchange={(e) => {
                        try {
                            automation.conditions = JSON.parse(e.currentTarget.value);
                            error = null;
                        } catch (err) {
                            error = "JSON de condições inválido";
                        }
                        syncVisualToJson();
                    }}
                    class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[200px] focus:outline-none focus:bg-gray-900"
                />
            </BrutalCard>

            <BrutalCard title="Ações">
                <textarea
                    value={JSON.stringify(automation.actions, null, 2)}
                    onchange={(e) => {
                        try {
                            automation.actions = JSON.parse(e.currentTarget.value);
                            error = null;
                        } catch (err) {
                            error = "JSON de ações inválido";
                        }
                        syncVisualToJson();
                    }}
                    class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[200px] focus:outline-none focus:bg-gray-900"
                />
            </BrutalCard>
        </div>
    {:else}
        <BrutalCard title="JSON Editor">
            <textarea
                value={jsonContent}
                onchange={(e) => {
                    handleJsonChange(e.currentTarget.value);
                    syncJsonToVisual();
                }}
                oninput={(e) => handleJsonChange(e.currentTarget.value)}
                class="w-full border-2 border-black p-3 bg-[#0a0a0a] text-white font-mono text-sm min-h-[500px] focus:outline-none focus:bg-gray-900"
            />
            {#if jsonErrors.length > 0}
                <div class="mt-2 p-2 bg-red-100 border-2 border-red-600 text-red-800 text-sm font-mono">
                    {#each jsonErrors as error}
                        <div>Linha {error.line}: {error.message}</div>
                    {/each}
                </div>
            {/if}
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
            Tem certeza que deseja deletar a automação "<strong>{automation.name}</strong>"?
            Esta ação não pode ser desfeita.
        </p>
        <div class="flex gap-3">
            <button
                onclick={deleteAutomation}
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

# Edit Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement dedicated edit pages for Automations and Commands with bidirectional sync between visual and JSON editors.

**Architecture:** Create dynamic SvelteKit routes (`/flows/[id]` and `/commands/[id]`) that load data server-side via +page.ts and handle editing client-side with real-time sync between visual form fields and JSON representation.

**Tech Stack:** SvelteKit, TypeScript, TailwindCSS (Brutal design pattern), existing services (AutomationService, CommandService)

---

## Task 1: Create Load Function for Automation Edit Page

**Files:**
- Create: `/apps/dashboard/src/routes/(mgmt)/flows/[id]/+page.ts`

**Step 1: Write the load function**

The load function should fetch the automation by ID from the URL parameter.

```typescript
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { AutomationService } from '$lib/services';

export const load: PageLoad = async ({ params }) => {
    try {
        if (!params.id) {
            throw error(400, 'ID não fornecido');
        }

        const automation = await AutomationService.getAutomation(params.id);
        if (!automation) {
            throw error(404, 'Automação não encontrada');
        }

        return { automation };
    } catch (err: any) {
        if (err.status) throw err;
        throw error(500, `Erro ao carregar automação: ${err.message}`);
    }
};
```

**Step 2: Verify the file is created correctly**

Run: `ls -la /home/pedro/repo/krasnaya/apps/dashboard/src/routes/\(mgmt\)/flows/\[id\]/`

Expected: You should see `+page.ts` file

---

## Task 2: Create Automation Edit Page Component

**Files:**
- Create: `/apps/dashboard/src/routes/(mgmt)/flows/[id]/+page.svelte`

**Step 1: Create the page shell**

```svelte
<script lang="ts">
    import { goto } from '$app/navigation';
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import BrutalModal from "$lib/components/ui/BrutalModal.svelte";
    import { AutomationService } from "$lib/services";
    import type { Automation } from "$lib/types";
    import { Trash2, Save, Code, Layout, ArrowLeft } from "lucide-svelte";
    import type { PageData } from './$types';

    export let data: PageData;

    let automation = { ...data.automation };
    let originalAutomation = JSON.parse(JSON.stringify(data.automation));
    let viewMode: "visual" | "json" = "visual";
    let jsonContent = JSON.stringify(automation, null, 2);
    
    let isSaving = false;
    let isDeleting = false;
    let error: string | null = null;
    let showDeleteModal = false;
    let successMessage: string | null = null;

    $: hasUnsavedChanges = JSON.stringify(automation) !== JSON.stringify(originalAutomation);

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
        if (!automation.name) {
            error = "Nome é obrigatório";
            return;
        }

        try {
            isSaving = true;
            error = null;
            await AutomationService.updateAutomation(automation.id, automation);
            successMessage = "Automação atualizada com sucesso!";
            originalAutomation = JSON.parse(JSON.stringify(automation));
            setTimeout(() => goto("/flows"), 1500);
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao salvar";
        } finally {
            isSaving = false;
        }
    }

    async function deleteAutomation() {
        try {
            isDeleting = true;
            await AutomationService.deleteAutomation(automation.id);
            successMessage = "Automação deletada!";
            setTimeout(() => goto("/flows"), 1000);
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao deletar";
        } finally {
            isDeleting = false;
            showDeleteModal = false;
        }
    }

    function goBack() {
        if (hasUnsavedChanges && !confirm("Há mudanças não salvas. Tem certeza?")) {
            return;
        }
        goto("/flows");
    }
</script>

<div class="space-y-8">
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
                onclick={() => (viewMode = viewMode === "visual" ? "json" : "visual")}
                class="px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all {viewMode === 'json'
                    ? 'bg-white text-black translate-x-1 shadow-[4px_4px_0px_#000]'
                    : 'bg-black text-white'}"
            >
                {viewMode === "visual" ? "JSON Mode" : "Visual Mode"}
                {#if viewMode === "visual"}<Code size={16} />{:else}<Layout size={16} />{/if}
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

    {#if viewMode === "visual"}
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
                            on:change={syncVisualToJson}
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
                                on:change={syncVisualToJson}
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
                    on:change={(e) => {
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
                    on:change={(e) => {
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
                on:change={(e) => {
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
```

**Step 2: Verify the component renders**

Build and check for errors:

Run: `cd /home/pedro/repo/krasnaya/apps/dashboard && npm run build 2>&1 | grep -i error | head -20`

Expected: No errors related to the new page

---

## Task 3: Create Load Function for Command Edit Page

**Files:**
- Create: `/apps/dashboard/src/routes/(mgmt)/commands/[id]/+page.ts`

**Step 1: Write the load function**

```typescript
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { CommandService } from '$lib/services';

export const load: PageLoad = async ({ params }) => {
    try {
        if (!params.id) {
            throw error(400, 'ID não fornecido');
        }

        const command = await CommandService.getCommand(params.id);
        if (!command) {
            throw error(404, 'Comando não encontrado');
        }

        return { command };
    } catch (err: any) {
        if (err.status) throw err;
        throw error(500, `Erro ao carregar comando: ${err.message}`);
    }
};
```

**Step 2: Verify the file is created**

Run: `ls -la /home/pedro/repo/krasnaya/apps/dashboard/src/routes/\(mgmt\)/commands/\[id\]/`

Expected: `+page.ts` file exists

---

## Task 4: Create Command Edit Page Component

**Files:**
- Create: `/apps/dashboard/src/routes/(mgmt)/commands/[id]/+page.svelte`

**Step 1: Create the page**

```svelte
<script lang="ts">
    import { goto } from '$app/navigation';
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import BrutalModal from "$lib/components/ui/BrutalModal.svelte";
    import { CommandService } from "$lib/services";
    import type { Command } from "$lib/types";
    import { Trash2, Save, Code, Layout, ArrowLeft, Plus, X } from "lucide-svelte";
    import type { PageData } from './$types';

    export let data: PageData;

    let command = { ...data.command };
    let originalCommand = JSON.parse(JSON.stringify(data.command));
    let viewMode: "visual" | "json" = "visual";
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
            successMessage = "Comando atualizado com sucesso!";
            originalCommand = JSON.parse(JSON.stringify(command));
            setTimeout(() => goto("/commands"), 1500);
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao salvar";
        } finally {
            isSaving = false;
        }
    }

    async function deleteCommand() {
        try {
            isDeleting = true;
            await CommandService.deleteCommand(command.id);
            successMessage = "Comando deletado!";
            setTimeout(() => goto("/commands"), 1000);
        } catch (err) {
            error = err instanceof Error ? err.message : "Erro ao deletar";
        } finally {
            isDeleting = false;
            showDeleteModal = false;
        }
    }

    function goBack() {
        if (hasUnsavedChanges && !confirm("Há mudanças não salvas. Tem certeza?")) {
            return;
        }
        goto("/commands");
    }
</script>

<div class="space-y-8">
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
                onclick={() => (viewMode = viewMode === "visual" ? "json" : "visual")}
                class="px-6 py-3 border-4 border-black font-black uppercase text-xs flex items-center gap-2 transition-all {viewMode === 'json'
                    ? 'bg-white text-black translate-x-1 shadow-[4px_4px_0px_#000]'
                    : 'bg-black text-white'}"
            >
                {viewMode === "visual" ? "JSON Mode" : "Visual Mode"}
                {#if viewMode === "visual"}<Code size={16} />{:else}<Layout size={16} />{/if}
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

    {#if viewMode === "visual"}
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
                            on:change={syncVisualToJson}
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
                                on:change={syncVisualToJson}
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
                                on:change={syncVisualToJson}
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
                            on:change={syncVisualToJson}
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
                                on:keydown={(e) => e.key === 'Enter' && addAlias()}
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
                    on:change={(e) => {
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
                on:change={(e) => {
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
```

**Step 2: Verify build**

Run: `cd /home/pedro/repo/krasnaya/apps/dashboard && npm run build 2>&1 | grep -E "✓|error" | tail -10`

Expected: Build succeeds with ✓ marks

---

## Task 5: Update Flows Page to Link to Edit Pages

**Files:**
- Modify: `/apps/dashboard/src/routes/(mgmt)/flows/+page.svelte`

**Step 1: Update the automation list click handler**

Find the section around line 187-188 where automations are listed:

```svelte
<button
    onclick={() => (selectedAutomation = auto)}
    class="w-full text-left font-black uppercase"
>
    {auto.name || "Sem Nome"}
</button>
```

Replace with:

```svelte
<button
    onclick={() => goto(`/flows/${auto.id}`)}
    class="w-full text-left font-black uppercase hover:opacity-75"
>
    {auto.name || "Sem Nome"}
</button>
```

**Step 2: Add import for goto**

At the top of the script section, add:

```typescript
import { goto } from '$app/navigation';
```

---

## Task 6: Update Commands Page to Link to Edit Pages

**Files:**
- Modify: `/apps/dashboard/src/routes/(mgmt)/commands/+page.svelte`

**Step 1: Update the command list click handler**

Find the section around line 190 where commands are listed:

```svelte
<button
    onclick={() => (selectedCommand = cmd)}
    class="w-full text-left"
>
    <div class="text-[10px] font-black uppercase">
        {cmd.name || "Sem Nome"}
    </div>
</button>
```

Replace with:

```svelte
<button
    onclick={() => goto(`/commands/${cmd.id}`)}
    class="w-full text-left hover:opacity-75"
>
    <div class="text-[10px] font-black uppercase">
        {cmd.name || "Sem Nome"}
    </div>
</button>
```

**Step 2: Add import for goto**

At the top of the script section, add:

```typescript
import { goto } from '$app/navigation';
```

---

## Task 7: Verify All Build and Run Tests

**Step 1: Full build**

Run: `cd /home/pedro/repo/krasnaya/apps/dashboard && npm run build`

Expected: Build completes with `✓ built in XX.XXs`

**Step 2: Check for type errors**

Run: `cd /home/pedro/repo/krasnaya/apps/dashboard && npx tsc --noEmit 2>&1 | head -20`

Expected: No TypeScript errors

---

## Task 8: Commit All Changes

**Step 1: Stage files**

Run: `cd /home/pedro/repo/krasnaya && git add -A`

**Step 2: Commit**

Run: `git commit -m "feat: add edit pages for automations and commands with visual/json sync"`

Expected: Commit succeeds with files listed

---

## Testing Checklist

After implementation:

- [ ] Navigate to `/flows/` → click an automation → should load `/flows/[id]`
- [ ] Edit automation name in visual mode → JSON should update
- [ ] Switch to JSON mode → edit content → switch back to visual → should reflect changes
- [ ] Click Save → should call API and redirect to `/flows/`
- [ ] Click Delete → shows modal with confirmation → deletes and redirects
- [ ] Same tests for `/commands/` page
- [ ] Direct URL access `/flows/[id]` and `/commands/[id]` works
- [ ] Invalid IDs show 404 error
- [ ] Unsaved changes warning shows when clicking back button with pending changes

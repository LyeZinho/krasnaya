# Edit Pages Enhancements & Visual Flow Builder Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Enhance edit pages with toast notifications, keyboard shortcuts, validation, and add a visual no-code flow builder with infinity canvas for creating automations and commands.

**Architecture:** Four independent features stacked progressively:
1. Toast notification system (store + component)
2. Keyboard shortcuts on edit pages
3. Enhanced validation for JSON and fields
4. Visual flow builder with infinity canvas (largest feature)

**Tech Stack:** SvelteKit, TypeScript, Svelte 5, Tailwind CSS, HTML5 Drag API for flow builder

---

## Feature 1: Toast Notifications

### Task 1: Create toast store

**Files:**
- Create: `apps/dashboard/src/lib/stores/toast.ts`

**Step 1: Write the toast store**

```typescript
import { writable, type Writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
	duration?: number; // ms, optional (defaults by type)
	dismissable?: boolean;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	return {
		subscribe,

		add: (message: string, type: ToastType = 'info', duration?: number) => {
			const id = Math.random().toString(36).substr(2, 9);
			const toast: Toast = {
				id,
				type,
				message,
				duration: duration ?? getDefaultDuration(type),
				dismissable: true
			};

			update((toasts) => [...toasts, toast]);

			// Auto-dismiss
			if (toast.duration) {
				setTimeout(() => {
					toasts.remove(id);
				}, toast.duration);
			}

			return id;
		},

		remove: (id: string) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		},

		clear: () => {
			update(() => []);
		}
	};
}

function getDefaultDuration(type: ToastType): number {
	const durations: Record<ToastType, number> = {
		success: 3000,
		error: 5000,
		warning: 4000,
		info: 3000
	};
	return durations[type];
}

export const toastStore = createToastStore();
```

**Step 2: Create ToastContainer component**

Create file: `apps/dashboard/src/lib/components/ui/ToastContainer.svelte`

```svelte
<script lang="ts">
	import { toastStore, type Toast } from '$lib/stores/toast';

	const iconMap: Record<string, string> = {
		success: '✓',
		error: '✗',
		warning: '⚠️',
		info: 'ℹ️'
	};

	const bgMap: Record<string, string> = {
		success: 'bg-green-600',
		error: 'bg-red-600',
		warning: 'bg-yellow-500',
		info: 'bg-blue-600'
	};

	function dismiss(id: string) {
		toastStore.remove(id);
	}
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
	{#each $toastStore as toast (toast.id)}
		<div
			class={`${bgMap[toast.type]} text-white px-4 py-3 rounded border-2 border-black font-mono text-sm flex items-center gap-2 animate-slideIn`}
		>
			<span class="flex-shrink-0">{iconMap[toast.type]}</span>
			<span class="flex-grow">{toast.message}</span>
			{#if toast.dismissable}
				<button
					onclick={() => dismiss(toast.id)}
					class="flex-shrink-0 ml-2 hover:opacity-70 cursor-pointer"
				>
					✕
				</button>
			{/if}
		</div>
	{/each}
</div>

<style>
	@keyframes slideIn {
		from {
			transform: translateX(400px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	:global(.animate-slideIn) {
		animation: slideIn 0.3s ease-out;
	}
</style>
```

**Step 3: Add ToastContainer to root layout**

Modify: `apps/dashboard/src/routes/+layout.svelte`

Add this import and component:

```svelte
<script>
	import ToastContainer from '$lib/components/ui/ToastContainer.svelte';
	// ... other imports
</script>

<ToastContainer />
<!-- rest of layout -->
```

**Step 4: Test toast manually in browser**

- Run `npm run dev` from `apps/dashboard`
- Open browser DevTools console
- Import and test: 
  ```javascript
  import { toastStore } from '$lib/stores/toast';
  toastStore.add('Test message', 'success');
  ```
- Verify toast appears top-right with green background and auto-dismisses after 3s

**Step 5: Commit**

```bash
git add apps/dashboard/src/lib/stores/toast.ts \
  apps/dashboard/src/lib/components/ui/ToastContainer.svelte \
  apps/dashboard/src/routes/+layout.svelte
git commit -m "feat: add toast notification system"
```

---

### Task 2: Integrate toasts into automation edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/flows/[id]/+page.svelte`

**Step 1: Import toastStore**

At top of script section, add:

```typescript
import { toastStore } from '$lib/stores/toast';
```

**Step 2: Update save handler**

Find the `handleSave()` function and replace with:

```typescript
async function handleSave() {
	try {
		// Validation code (existing)
		if (!currentData.name) {
			errors.name = 'Nome é obrigatório';
			return;
		}

		// Save code (existing)
		await automationService.updateAutomation(id, jsonData);

		toastStore.add('Automação salva com sucesso!', 'success');
		isDirty = false;
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Erro ao salvar automação';
		toastStore.add(`Erro ao salvar: ${message}`, 'error');
	}
}
```

**Step 3: Update delete handler**

Find `handleDelete()` and replace with:

```typescript
async function handleDelete() {
	try {
		await automationService.deleteAutomation(id);
		toastStore.add('Automação deletada com sucesso', 'success');
		goto('/flows');
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Erro ao deletar';
		toastStore.add(`Erro ao deletar: ${message}`, 'error');
	}
}
```

**Step 4: Add warning toast before leaving**

In the unsaved changes handler:

```typescript
function handleBeforeUnload(e: BeforeUnloadEvent) {
	if (isDirty) {
		toastStore.add('Mudanças não salvas', 'warning');
		e.preventDefault();
	}
}
```

**Step 5: Test in browser**

- Navigate to edit automation page
- Make a change and save → verify success toast appears
- Try to save invalid data → verify error toast appears
- Delete an automation → verify success toast appears

**Step 6: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/flows/\[id\]/+page.svelte
git commit -m "feat: integrate toasts into automation edit page"
```

---

### Task 3: Integrate toasts into command edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/commands/[id]/+page.svelte`

**Step 1-6:** Repeat Task 2 steps for commands (same code, just different page)

Replace "automação/Automação" with "comando/Comando" in messages:
- "Comando salvo com sucesso!"
- "Erro ao salvar: ..."
- "Comando deletado com sucesso"

**Step 7: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/commands/\[id\]/+page.svelte
git commit -m "feat: integrate toasts into command edit page"
```

---

## Feature 2: Keyboard Shortcuts

### Task 4: Add keyboard shortcuts to automation edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/flows/[id]/+page.svelte`

**Step 1: Add keyboard handler to root div**

Find the root `<div>` in the markup and add:

```svelte
<div onkeydown={handleKeydown}>
	<!-- existing content -->
</div>
```

**Step 2: Add handler function**

In script section, add:

```typescript
function handleKeydown(event: KeyboardEvent) {
	// Ctrl+S or Cmd+S to save
	if ((event.ctrlKey || event.metaKey) && event.key === 's') {
		event.preventDefault();
		handleSave();
		return;
	}

	// Ctrl+Shift+J to toggle JSON mode
	if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'j') {
		event.preventDefault();
		mode = mode === 'json' ? 'visual' : 'json';
		return;
	}

	// Escape to close modals (already handled by modals, but confirm)
	if (event.key === 'Escape') {
		if (showDeleteModal) {
			showDeleteModal = false;
		}
	}
}
```

**Step 3: Test keyboard shortcuts**

- Ctrl+S → should save (test with unsaved changes)
- Ctrl+Shift+J → should toggle between Visual and JSON modes
- Escape → should close delete confirmation modal

**Step 4: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/flows/\[id\]/+page.svelte
git commit -m "feat: add keyboard shortcuts to automation edit page (Ctrl+S, Ctrl+Shift+J, Escape)"
```

---

### Task 5: Add keyboard shortcuts to command edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/commands/[id]/+page.svelte`

**Step 1-4:** Repeat Task 4 steps for commands page

**Step 5: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/commands/\[id\]/+page.svelte
git commit -m "feat: add keyboard shortcuts to command edit page"
```

---

## Feature 3: Enhanced Validation

### Task 6: Create validation utilities

**Files:**
- Create: `apps/dashboard/src/lib/utils/validation.ts`

**Step 1: Write validation helpers**

```typescript
export interface ValidationError {
	field: string;
	message: string;
	line?: number;
}

/**
 * Validate JSON string and return errors
 */
export function validateJSON(jsonString: string): ValidationError[] {
	const errors: ValidationError[] = [];

	try {
		JSON.parse(jsonString);
	} catch (error) {
		if (error instanceof SyntaxError) {
			const match = error.message.match(/position (\d+)/);
			const position = match ? parseInt(match[1]) : 0;
			// Count lines up to error position
			const line = jsonString.slice(0, position).split('\n').length;

			errors.push({
				field: 'json',
				message: error.message,
				line
			});
		}
	}

	return errors;
}

/**
 * Validate automation object
 */
export function validateAutomation(data: any): ValidationError[] {
	const errors: ValidationError[] = [];

	if (!data.name || data.name.trim() === '') {
		errors.push({ field: 'name', message: 'Nome é obrigatório' });
	}

	if (!data.trigger || !data.trigger.type) {
		errors.push({ field: 'trigger', message: 'Tipo de gatilho é obrigatório' });
	}

	if (!Array.isArray(data.actions) || data.actions.length === 0) {
		errors.push({ field: 'actions', message: 'Pelo menos uma ação é obrigatória' });
	}

	return errors;
}

/**
 * Validate command object
 */
export function validateCommand(data: any): ValidationError[] {
	const errors: ValidationError[] = [];

	if (!data.name || data.name.trim() === '') {
		errors.push({ field: 'name', message: 'Nome é obrigatório' });
	}

	if (!data.prefix || data.prefix.trim() === '') {
		errors.push({ field: 'prefix', message: 'Prefixo é obrigatório' });
	}

	if (!Array.isArray(data.actions) || data.actions.length === 0) {
		errors.push({ field: 'actions', message: 'Pelo menos uma ação é obrigatória' });
	}

	return errors;
}
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/utils/validation.ts
git commit -m "feat: add validation utilities for automation and command objects"
```

---

### Task 7: Integrate validation into automation edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/flows/[id]/+page.svelte`

**Step 1: Import validation**

Add to top of script:

```typescript
import { validateJSON, validateAutomation } from '$lib/utils/validation';
```

**Step 2: Add validation state**

Add to reactive variables:

```typescript
let jsonErrors: { line?: number; message: string }[] = [];
let fieldErrors: Record<string, string> = {};
```

**Step 3: Add validation on JSON change**

Find the code that handles JSON mode changes and add debounced validation:

```typescript
let jsonValidationTimeout: NodeJS.Timeout;

function handleJsonChange(value: string) {
	jsonData = value;
	isDirty = true;

	// Debounce validation
	clearTimeout(jsonValidationTimeout);
	jsonValidationTimeout = setTimeout(() => {
		const errors = validateJSON(value);
		jsonErrors = errors.map((e) => ({ line: e.line, message: e.message }));
	}, 300);
}
```

**Step 4: Update save handler to validate**

Replace save handler:

```typescript
async function handleSave() {
	try {
		// Parse and validate JSON
		const parsed = JSON.parse(jsonData);
		const errors = validateAutomation(parsed);

		if (errors.length > 0) {
			fieldErrors = Object.fromEntries(errors.map((e) => [e.field, e.message]));
			toastStore.add('Verifique os erros antes de salvar', 'warning');
			return;
		}

		fieldErrors = {};

		await automationService.updateAutomation(id, parsed);
		toastStore.add('Automação salva com sucesso!', 'success');
		isDirty = false;
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Erro ao salvar';
		toastStore.add(`Erro: ${message}`, 'error');
	}
}
```

**Step 5: Show validation errors in UI**

In the JSON textarea section, add:

```svelte
{#if jsonErrors.length > 0}
	<div class="mt-2 p-2 bg-red-100 border-2 border-red-600 text-red-800 text-sm font-mono">
		{#each jsonErrors as error}
			<div>Linha {error.line}: {error.message}</div>
		{/each}
	</div>
{/if}
```

**Step 6: Test validation**

- Edit automation, make JSON invalid (remove a bracket)
- Observe error message appears below JSON editor
- Try to save → warning toast appears
- Fix JSON → error disappears
- Save → success toast appears

**Step 7: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/flows/\[id\]/+page.svelte \
  apps/dashboard/src/lib/utils/validation.ts
git commit -m "feat: add JSON and field validation to automation edit page"
```

---

### Task 8: Integrate validation into command edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/commands/[id]/+page.svelte`

**Step 1-7:** Repeat Task 7 steps for commands page (use `validateCommand` instead)

**Step 8: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/commands/\[id\]/+page.svelte
git commit -m "feat: add JSON and field validation to command edit page"
```

---

## Feature 4: Visual Logic Flow Builder (Infinity Canvas)

This is the largest feature. It will be split into multiple tasks.

### Task 9: Create flow store

**Files:**
- Create: `apps/dashboard/src/lib/stores/flow.ts`

**Step 1: Define types and store**

```typescript
import { writable, derived } from 'svelte/store';

export type BlockType = 'TRIGGER' | 'ACTION' | 'CONDITION' | 'END';
export type TriggerBlockType =
	| 'MESSAGE_CREATE'
	| 'MEMBER_JOIN'
	| 'MEMBER_LEAVE'
	| 'REACTION_ADD'
	| 'MESSAGE_REACT'
	| 'MESSAGE_DELETE';

export type ActionBlockType =
	| 'SEND_MESSAGE'
	| 'SEND_EMBED'
	| 'ADD_ROLE'
	| 'REMOVE_ROLE'
	| 'KICK_USER'
	| 'BAN_USER';

export interface FlowBlock {
	id: string;
	type: BlockType;
	blockType: string; // TriggerBlockType | ActionBlockType | 'IF' | 'END'
	label: string;
	config: Record<string, any>;
	position: { x: number; y: number };
	connections: {
		input?: string;
		outputs: string[];
		conditionBranches?: {
			true: string[];
			false: string[];
		};
	};
}

export interface FlowState {
	blocks: FlowBlock[];
	selectedBlockId?: string;
	canvasOffset: { x: number; y: number };
	zoomLevel: number;
	isDirty: boolean;
}

function createFlowStore() {
	const { subscribe, set, update } = writable<FlowState>({
		blocks: [],
		canvasOffset: { x: 0, y: 0 },
		zoomLevel: 1,
		isDirty: false
	});

	return {
		subscribe,

		addBlock: (block: FlowBlock) => {
			update((state) => ({
				...state,
				blocks: [...state.blocks, block],
				isDirty: true
			}));
		},

		removeBlock: (id: string) => {
			update((state) => ({
				...state,
				blocks: state.blocks.filter((b) => b.id !== id),
				isDirty: true
			}));
		},

		updateBlock: (id: string, changes: Partial<FlowBlock>) => {
			update((state) => ({
				...state,
				blocks: state.blocks.map((b) => (b.id === id ? { ...b, ...changes } : b)),
				isDirty: true
			}));
		},

		selectBlock: (id?: string) => {
			update((state) => ({ ...state, selectedBlockId: id }));
		},

		setPan: (offset: { x: number; y: number }) => {
			update((state) => ({ ...state, canvasOffset: offset }));
		},

		setZoom: (level: number) => {
			update((state) => ({ ...state, zoomLevel: Math.max(0.5, Math.min(2, level)) }));
		},

		reset: () => {
			set({
				blocks: [],
				canvasOffset: { x: 0, y: 0 },
				zoomLevel: 1,
				isDirty: false
			});
		},

		loadFromBlocks: (blocks: FlowBlock[]) => {
			set({
				blocks,
				canvasOffset: { x: 0, y: 0 },
				zoomLevel: 1,
				isDirty: false
			});
		}
	};
}

export const flowStore = createFlowStore();

// Derived store for validation
export const flowValidation = derived(flowStore, ($flow) => {
	const errors: string[] = [];
	const hasTrigger = $flow.blocks.some((b) => b.type === 'TRIGGER');
	const hasActions = $flow.blocks.some((b) => b.type === 'ACTION');

	if (!hasTrigger) errors.push('Gatilho obrigatório');
	if (!hasActions) errors.push('Pelo menos uma ação obrigatória');

	return { isValid: errors.length === 0, errors };
});
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/stores/flow.ts
git commit -m "feat: create flow store for visual flow builder state management"
```

---

### Task 10: Create flow translator utilities

**Files:**
- Create: `apps/dashboard/src/lib/utils/flow-translator.ts`

**Step 1: Write translator functions**

```typescript
import type { FlowBlock } from '$lib/stores/flow';

/**
 * Convert FlowBlock array to automation JSON
 */
export function flowToAutomation(blocks: FlowBlock[]): any {
	const triggerBlock = blocks.find((b) => b.type === 'TRIGGER');
	if (!triggerBlock) throw new Error('Gatilho não encontrado');

	const actions = blocksToActions(blocks, triggerBlock.id);

	return {
		name: 'Automação visual',
		trigger: {
			type: triggerBlock.blockType,
			config: triggerBlock.config
		},
		actions,
		enabled: true,
		cooldown: 0
	};
}

/**
 * Convert FlowBlock array to command JSON
 */
export function flowToCommand(blocks: FlowBlock[]): any {
	const inputBlock = blocks.find((b) => b.blockType === 'COMMAND_INPUT');
	if (!inputBlock) throw new Error('Entrada de comando não encontrada');

	const actions = blocksToActions(blocks, inputBlock.id);

	return {
		name: inputBlock.config.name || 'Novo Comando',
		prefix: inputBlock.config.prefix || '!',
		description: inputBlock.config.description || '',
		aliases: inputBlock.config.aliases || [],
		actions,
		enabled: true,
		cooldown: 0
	};
}

/**
 * Build actions array from block graph starting after given block ID
 */
function blocksToActions(blocks: FlowBlock[], fromBlockId: string): any[] {
	const actions: any[] = [];
	const visited = new Set<string>();
	const queue: string[] = [];

	// Find outputs of the starting block
	const startBlock = blocks.find((b) => b.id === fromBlockId);
	if (!startBlock) return actions;

	queue.push(...startBlock.connections.outputs);

	while (queue.length > 0) {
		const blockId = queue.shift();
		if (!blockId || visited.has(blockId)) continue;

		visited.add(blockId);
		const block = blocks.find((b) => b.id === blockId);
		if (!block) continue;

		if (block.type === 'ACTION') {
			actions.push({
				type: block.blockType,
				config: block.config
			});
		}

		// Continue traversing
		queue.push(...block.connections.outputs);
	}

	return actions;
}

/**
 * Convert automation JSON back to FlowBlocks
 */
export function automationToFlow(automation: any): FlowBlock[] {
	const blocks: FlowBlock[] = [];
	let yOffset = 0;

	// Add trigger block
	const triggerId = `trigger-${Date.now()}`;
	blocks.push({
		id: triggerId,
		type: 'TRIGGER',
		blockType: automation.trigger.type,
		label: getTriggerLabel(automation.trigger.type),
		config: automation.trigger.config || {},
		position: { x: 100, y: yOffset },
		connections: { outputs: [] }
	});

	// Add action blocks
	let previousId = triggerId;
	yOffset += 100;

	if (Array.isArray(automation.actions)) {
		automation.actions.forEach((action: any, index: number) => {
			const actionId = `action-${index}-${Date.now()}`;
			const actionBlock: FlowBlock = {
				id: actionId,
				type: 'ACTION',
				blockType: action.type,
				label: getActionLabel(action.type),
				config: action.config || {},
				position: { x: 100, y: yOffset },
				connections: {
					input: previousId,
					outputs: []
				}
			};

			blocks.push(actionBlock);

			// Update previous block's outputs
			const prev = blocks.find((b) => b.id === previousId);
			if (prev) {
				prev.connections.outputs.push(actionId);
			}

			previousId = actionId;
			yOffset += 100;
		});
	}

	return blocks;
}

/**
 * Get display label for trigger type
 */
function getTriggerLabel(type: string): string {
	const labels: Record<string, string> = {
		MESSAGE_CREATE: 'Nova Mensagem',
		MEMBER_JOIN: 'Membro Entra',
		MEMBER_LEAVE: 'Membro Sai',
		REACTION_ADD: 'Reação Adicionada',
		MESSAGE_REACT: 'Mensagem Reagida',
		MESSAGE_DELETE: 'Mensagem Deletada'
	};
	return labels[type] || type;
}

/**
 * Get display label for action type
 */
function getActionLabel(type: string): string {
	const labels: Record<string, string> = {
		SEND_MESSAGE: 'Enviar Mensagem',
		SEND_EMBED: 'Enviar Embed',
		ADD_ROLE: 'Adicionar Cargo',
		REMOVE_ROLE: 'Remover Cargo',
		KICK_USER: 'Expulsar Usuário',
		BAN_USER: 'Banir Usuário'
	};
	return labels[type] || type;
}
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/utils/flow-translator.ts
git commit -m "feat: add flow translator to convert between JSON and visual blocks"
```

---

### Task 11: Create Block component

**Files:**
- Create: `apps/dashboard/src/lib/components/flow-builder/Block.svelte`

**Step 1: Write Block component**

```svelte
<script lang="ts">
	import type { FlowBlock } from '$lib/stores/flow';
	import { flowStore } from '$lib/stores/flow';

	export let block: FlowBlock;
	export let isSelected: boolean = false;
	export let onSelect: (id: string) => void;
	export let onDelete: (id: string) => void;
	export let onEdit: (id: string) => void;
</script>

<div
	class={`absolute w-40 p-3 border-2 border-black bg-white cursor-pointer transition-colors ${
		isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'
	}`}
	style="left: {block.position.x}px; top: {block.position.y}px;"
	onmousedown={() => onSelect(block.id)}
	draggable={true}
	ondragstart={(e) => {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('blockId', block.id);
	}}
>
	<div class="flex items-start justify-between gap-1">
		<div class="flex-1">
			<div class="font-mono font-bold text-xs uppercase text-gray-600">{block.type}</div>
			<div class="font-mono text-sm font-bold">{block.label}</div>
		</div>
		<button
			onclick={() => onDelete(block.id)}
			class="flex-shrink-0 text-gray-600 hover:text-red-600 text-xs"
		>
			🗑️
		</button>
	</div>

	<button
		onclick={() => onEdit(block.id)}
		class="mt-2 w-full text-xs font-mono bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300"
	>
		⚙️ Configurar
	</button>

	<!-- Connection ports -->
	<div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-2 h-2 bg-black rounded-full border border-white"></div>
	<div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-2 h-2 bg-black rounded-full border border-white"></div>
</div>

<style>
	div {
		user-select: none;
	}
</style>
```

**Step 2: Test in browser**

- Will be tested as part of full flow builder integration
- Verify block renders with correct label and buttons

**Step 3: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/Block.svelte
git commit -m "feat: create Block component for visual flow builder"
```

---

### Task 12: Create BlockPalette component

**Files:**
- Create: `apps/dashboard/src/lib/components/flow-builder/BlockPalette.svelte`

**Step 1: Write BlockPalette component**

```svelte
<script lang="ts">
	import type { FlowBlock, TriggerBlockType, ActionBlockType } from '$lib/stores/flow';

	export let resourceType: 'automation' | 'command';

	interface BlockOption {
		blockType: string;
		label: string;
		category: string;
	}

	const triggerOptions: BlockOption[] = [
		{ blockType: 'MESSAGE_CREATE', label: 'Nova Mensagem', category: 'Gatilhos' },
		{ blockType: 'MEMBER_JOIN', label: 'Membro Entra', category: 'Gatilhos' },
		{ blockType: 'MEMBER_LEAVE', label: 'Membro Sai', category: 'Gatilhos' },
		{ blockType: 'REACTION_ADD', label: 'Reação Adicionada', category: 'Gatilhos' },
		{ blockType: 'MESSAGE_REACT', label: 'Mensagem Reagida', category: 'Gatilhos' },
		{ blockType: 'MESSAGE_DELETE', label: 'Mensagem Deletada', category: 'Gatilhos' }
	];

	const actionOptions: BlockOption[] = [
		{ blockType: 'SEND_MESSAGE', label: 'Enviar Mensagem', category: 'Ações' },
		{ blockType: 'SEND_EMBED', label: 'Enviar Embed', category: 'Ações' },
		{ blockType: 'ADD_ROLE', label: 'Adicionar Cargo', category: 'Ações' },
		{ blockType: 'REMOVE_ROLE', label: 'Remover Cargo', category: 'Ações' },
		{ blockType: 'KICK_USER', label: 'Expulsar Usuário', category: 'Ações' },
		{ blockType: 'BAN_USER', label: 'Banir Usuário', category: 'Ações' }
	];

	const conditionOptions: BlockOption[] = [
		{ blockType: 'IF', label: 'Se (Condição)', category: 'Lógica' }
	];

	const controlOptions: BlockOption[] = [
		{ blockType: 'END', label: 'Fim', category: 'Controle' }
	];

	let options: BlockOption[] = [];

	$: {
		options = [];
		if (resourceType === 'automation') {
			options = [...triggerOptions, ...actionOptions, ...conditionOptions, ...controlOptions];
		} else {
			options = [...actionOptions, ...conditionOptions, ...controlOptions];
		}
	}

	function handleDragStart(e: DragEvent, blockType: string) {
		e.dataTransfer.effectAllowed = 'copy';
		e.dataTransfer.setData('newBlockType', blockType);
	}
</script>

<div class="w-48 bg-gray-100 border-r-2 border-black p-3 overflow-y-auto font-mono text-sm">
	<h3 class="font-bold mb-3">Blocos Disponíveis</h3>

	{#each [...new Set(options.map((o) => o.category))] as category}
		<div class="mb-4">
			<h4 class="font-bold text-xs uppercase text-gray-600 mb-2">{category}</h4>
			<div class="space-y-2">
				{#each options.filter((o) => o.category === category) as option}
					<div
						class="p-2 bg-white border-2 border-black cursor-move hover:bg-blue-50 transition-colors"
						draggable="true"
						ondragstart={(e) => handleDragStart(e, option.blockType)}
					>
						{option.label}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/BlockPalette.svelte
git commit -m "feat: create BlockPalette component with draggable block types"
```

---

### Task 13: Create FlowCanvas component (core canvas logic)

**Files:**
- Create: `apps/dashboard/src/lib/components/flow-builder/FlowCanvas.svelte`

**Step 1: Write FlowCanvas component**

```svelte
<script lang="ts">
	import { flowStore, type FlowBlock } from '$lib/stores/flow';
	import Block from './Block.svelte';

	export let resourceType: 'automation' | 'command';
	export let onAddBlock: (blockType: string, position: { x: number; y: number }) => void;
	export let onDeleteBlock: (id: string) => void;
	export let onEditBlock: (id: string) => void;

	let canvasEl: HTMLDivElement;
	let isDraggingCanvas = false;
	let dragStartX = 0;
	let dragStartY = 0;

	$: state = $flowStore;

	function handleCanvasMouseDown(e: MouseEvent) {
		if (e.button !== 1 && !(e.button === 0 && e.spaceKey)) return; // Middle mouse or Space+Left
		isDraggingCanvas = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;
	}

	function handleCanvasMouseMove(e: MouseEvent) {
		if (!isDraggingCanvas) return;

		const deltaX = e.clientX - dragStartX;
		const deltaY = e.clientY - dragStartY;

		flowStore.setPan({
			x: state.canvasOffset.x + deltaX,
			y: state.canvasOffset.y + deltaY
		});

		dragStartX = e.clientX;
		dragStartY = e.clientY;
	}

	function handleCanvasMouseUp() {
		isDraggingCanvas = false;
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		flowStore.setZoom(state.zoomLevel + delta);
	}

	function handleCanvasDrop(e: DragEvent) {
		e.preventDefault();
		const blockType = e.dataTransfer.getData('newBlockType');
		if (!blockType) return;

		// Calculate position relative to canvas
		const rect = canvasEl.getBoundingClientRect();
		const x = (e.clientX - rect.left - state.canvasOffset.x) / state.zoomLevel;
		const y = (e.clientY - rect.top - state.canvasOffset.y) / state.zoomLevel;

		onAddBlock(blockType, { x, y });
	}

	function handleCanvasDragOver(e: DragEvent) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}
</script>

<div
	bind:this={canvasEl}
	class="flex-1 bg-white border-l-2 border-black relative overflow-hidden cursor-grab active:cursor-grabbing"
	onmousedown={handleCanvasMouseDown}
	onmousemove={handleCanvasMouseMove}
	onmouseup={handleCanvasMouseUp}
	onwheel={handleWheel}
	ondrop={handleCanvasDrop}
	ondragover={handleCanvasDragOver}
>
	<!-- Grid background -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none" style="opacity: 0.1">
		<defs>
			<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
				<circle cx="1" cy="1" r="1" fill="black" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid)" />
	</svg>

	<!-- Canvas with transform -->
	<div
		class="absolute inset-0"
		style="transform: translate({state.canvasOffset.x}px, {state.canvasOffset.y}px) scale({state.zoomLevel});"
	>
		<!-- Blocks -->
		{#each state.blocks as block (block.id)}
			<Block
				{block}
				isSelected={state.selectedBlockId === block.id}
				onSelect={(id) => flowStore.selectBlock(id)}
				onDelete={onDeleteBlock}
				onEdit={onEditBlock}
			/>
		{/each}

		<!-- Connection lines (simplified SVG) -->
		<svg class="absolute inset-0 w-full h-full pointer-events-none" style="overflow: visible;">
			{#each state.blocks as fromBlock}
				{#each fromBlock.connections.outputs as toId}
					{@const toBlock = state.blocks.find((b) => b.id === toId)}
					{#if toBlock}
						<line
							x1={fromBlock.position.x + 160}
							y1={fromBlock.position.y + 20}
							x2={toBlock.position.x}
							y2={toBlock.position.y + 20}
							stroke="black"
							stroke-width="2"
						/>
					{/if}
				{/each}
			{/each}
		</svg>
	</div>

	<!-- Zoom controls -->
	<div class="absolute bottom-4 right-4 space-x-2 z-10">
		<button
			onclick={() => flowStore.setZoom(state.zoomLevel + 0.1)}
			class="px-3 py-1 bg-white border-2 border-black font-mono text-sm hover:bg-gray-100"
		>
			+
		</button>
		<button
			onclick={() => flowStore.setZoom(state.zoomLevel - 0.1)}
			class="px-3 py-1 bg-white border-2 border-black font-mono text-sm hover:bg-gray-100"
		>
			−
		</button>
		<span class="text-xs font-mono text-gray-600">{(state.zoomLevel * 100).toFixed(0)}%</span>
	</div>
</div>
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowCanvas.svelte
git commit -m "feat: create FlowCanvas component with pan/zoom and block rendering"
```

---

### Task 14: Create BlockModal component (for editing block configuration)

**Files:**
- Create: `apps/dashboard/src/lib/components/flow-builder/BlockModal.svelte`

**Step 1: Write BlockModal component**

```svelte
<script lang="ts">
	import { flowStore, type FlowBlock } from '$lib/stores/flow';
	import BrutalModal from '$lib/components/ui/BrutalModal.svelte';

	export let isOpen: boolean = false;
	export let block: FlowBlock | null = null;

	let config: Record<string, any> = {};

	$: if (block) {
		config = { ...block.config };
	}

	function handleClose() {
		isOpen = false;
		block = null;
	}

	function handleSave() {
		if (block) {
			flowStore.updateBlock(block.id, { config });
		}
		handleClose();
	}

	function handleFieldChange(key: string, value: any) {
		config[key] = value;
	}
</script>

<BrutalModal {isOpen} title="Configurar Bloco" onClose={handleClose}>
	<div class="space-y-4 font-mono">
		{#if block?.blockType === 'MESSAGE_CREATE'}
			<div>
				<label class="block text-sm font-bold mb-1">Nenhuma configuração necessária</label>
				<p class="text-xs text-gray-600">Este gatilho não requer configuração adicional.</p>
			</div>
		{:else if block?.blockType === 'SEND_MESSAGE'}
			<div>
				<label class="block text-sm font-bold mb-1">Mensagem</label>
				<textarea
					value={config.message || ''}
					onchange={(e) => handleFieldChange('message', e.target.value)}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="4"
					placeholder="Digite a mensagem..."
				/>
			</div>
		{:else if block?.blockType === 'ADD_ROLE'}
			<div>
				<label class="block text-sm font-bold mb-1">ID do Cargo</label>
				<input
					type="text"
					value={config.roleId || ''}
					onchange={(e) => handleFieldChange('roleId', e.target.value)}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					placeholder="123456789..."
				/>
			</div>
		{:else if block?.blockType === 'IF'}
			<div>
				<label class="block text-sm font-bold mb-1">Condição (JSON Logic)</label>
				<textarea
					value={JSON.stringify(config.condition || {}, null, 2)}
					onchange={(e) => {
						try {
							handleFieldChange('condition', JSON.parse(e.target.value));
						} catch {
							// Invalid JSON, show error
						}
					}}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="6"
					placeholder="Escreva sua condição em JSON Logic..."
				/>
				<p class="text-xs text-gray-600 mt-1">
					Exemplo: {JSON.stringify({ '==': [{ var: 'message.author.isBot' }, false] })}
				</p>
			</div>
		{:else}
			<div>
				<label class="block text-sm font-bold mb-1">Configuração JSON</label>
				<textarea
					value={JSON.stringify(config, null, 2)}
					onchange={(e) => {
						try {
							Object.assign(config, JSON.parse(e.target.value));
						} catch {
							// Invalid JSON
						}
					}}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="6"
					placeholder="Configuração avançada (JSON)"
				/>
			</div>
		{/if}

		<div class="flex gap-2 pt-4">
			<button
				onclick={handleSave}
				class="flex-1 px-4 py-2 bg-green-600 text-white border-2 border-black font-mono font-bold hover:bg-green-700"
			>
				Salvar
			</button>
			<button
				onclick={handleClose}
				class="flex-1 px-4 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
			>
				Cancelar
			</button>
		</div>
	</div>
</BrutalModal>
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/BlockModal.svelte
git commit -m "feat: create BlockModal for editing block configurations"
```

---

### Task 15: Create FlowToolbar component

**Files:**
- Create: `apps/dashboard/src/lib/components/flow-builder/FlowToolbar.svelte`

**Step 1: Write FlowToolbar component**

```svelte
<script lang="ts">
	import { flowStore, flowValidation } from '$lib/stores/flow';
	import { automationToFlow, flowToAutomation, flowToCommand } from '$lib/utils/flow-translator';
	import { toastStore } from '$lib/stores/toast';

	export let resourceType: 'automation' | 'command' = 'automation';
	export let onConvertToJSON: (json: any) => void;
	export let onLoadFromJSON: () => void;

	let showLoadModal = false;
	let loadJsonText = '';

	function handleConvertToJSON() {
		const validation = $flowValidation;
		if (!validation.isValid) {
			toastStore.add('Corrija os erros: ' + validation.errors.join(', '), 'error');
			return;
		}

		try {
			const json =
				resourceType === 'automation' ? flowToAutomation($flowStore.blocks) : flowToCommand($flowStore.blocks);

			onConvertToJSON(json);
			toastStore.add('Convertido para JSON com sucesso!', 'success');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Erro ao converter';
			toastStore.add(message, 'error');
		}
	}

	function handleLoadFromJSON() {
		try {
			const json = JSON.parse(loadJsonText);
			const blocks = resourceType === 'automation' ? automationToFlow(json) : automationToFlow(json);
			flowStore.loadFromBlocks(blocks);
			showLoadModal = false;
			loadJsonText = '';
			toastStore.add('Carregado com sucesso!', 'success');
		} catch (error) {
			toastStore.add('JSON inválido', 'error');
		}
	}

	function handleReset() {
		if (confirm('Limpar todo o fluxo?')) {
			flowStore.reset();
			toastStore.add('Fluxo limpo', 'info');
		}
	}
</script>

<div class="flex gap-2 p-3 bg-gray-100 border-b-2 border-black">
	<button
		onclick={handleConvertToJSON}
		class="px-3 py-2 bg-blue-600 text-white border-2 border-black font-mono font-bold hover:bg-blue-700"
	>
		→ Converter JSON
	</button>

	<button
		onclick={() => (showLoadModal = true)}
		class="px-3 py-2 bg-blue-600 text-white border-2 border-black font-mono font-bold hover:bg-blue-700"
	>
		← Carregar JSON
	</button>

	<div class="flex-1"></div>

	<button
		onclick={handleReset}
		class="px-3 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
	>
		Limpar
	</button>
</div>

{#if showLoadModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
		<div class="bg-white border-4 border-black p-6 max-w-md w-full">
			<h3 class="font-bold font-mono mb-3">Carregar do JSON</h3>
			<textarea
				bind:value={loadJsonText}
				class="w-full border-2 border-black p-2 font-mono text-sm mb-4"
				rows="8"
				placeholder="Cole o JSON aqui..."
			/>
			<div class="flex gap-2">
				<button
					onclick={handleLoadFromJSON}
					class="flex-1 px-3 py-2 bg-green-600 text-white border-2 border-black font-mono font-bold hover:bg-green-700"
				>
					Carregar
				</button>
				<button
					onclick={() => (showLoadModal = false)}
					class="flex-1 px-3 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
				>
					Cancelar
				</button>
			</div>
		</div>
	</div>
{/if}
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowToolbar.svelte
git commit -m "feat: create FlowToolbar with convert/load/reset controls"
```

---

### Task 16: Create main FlowBuilder component

**Files:**
- Create: `apps/dashboard/src/lib/components/flow-builder/FlowBuilder.svelte`

**Step 1: Write FlowBuilder component**

```svelte
<script lang="ts">
	import { flowStore } from '$lib/stores/flow';
	import FlowCanvas from './FlowCanvas.svelte';
	import BlockPalette from './BlockPalette.svelte';
	import FlowToolbar from './FlowToolbar.svelte';
	import BlockModal from './BlockModal.svelte';

	export let resourceType: 'automation' | 'command' = 'automation';
	export let onJsonOutput: (json: any) => void;

	let selectedBlockId: string | null = null;
	let showBlockModal = false;
	let editingBlock: any = null;

	function handleAddBlock(e: CustomEvent) {
		const { blockType, position } = e.detail;
		const id = `${blockType}-${Date.now()}`;

		const blockTypeToType: Record<string, string> = {
			MESSAGE_CREATE: 'TRIGGER',
			MEMBER_JOIN: 'TRIGGER',
			SEND_MESSAGE: 'ACTION',
			SEND_EMBED: 'ACTION',
			ADD_ROLE: 'ACTION',
			REMOVE_ROLE: 'ACTION',
			KICK_USER: 'ACTION',
			BAN_USER: 'ACTION',
			IF: 'CONDITION',
			END: 'END',
			COMMAND_INPUT: 'ACTION'
		};

		flowStore.addBlock({
			id,
			type: blockTypeToType[blockType] || 'ACTION',
			blockType,
			label: blockType,
			config: {},
			position,
			connections: { outputs: [] }
		});
	}

	function handleDeleteBlock(id: string) {
		flowStore.removeBlock(id);
	}

	function handleEditBlock(id: string) {
		const block = $flowStore.blocks.find((b) => b.id === id);
		if (block) {
			editingBlock = block;
			showBlockModal = true;
		}
	}

	function handleConvertToJSON(json: any) {
		onJsonOutput(json);
	}

	$: flowStore.selectBlock(selectedBlockId ?? undefined);
</script>

<div class="flex h-screen bg-white border-2 border-black">
	<BlockPalette {resourceType} />

	<div class="flex flex-col flex-1">
		<FlowToolbar {resourceType} onConvertToJSON={handleConvertToJSON} />

		<FlowCanvas
			{resourceType}
			onAddBlock={(blockType, position) =>
				flowStore.addBlock({
					id: `${blockType}-${Date.now()}`,
					type:
						['MESSAGE_CREATE', 'MEMBER_JOIN', 'MEMBER_LEAVE', 'REACTION_ADD', 'MESSAGE_REACT', 'MESSAGE_DELETE'].includes(
							blockType
						)
							? 'TRIGGER'
							: ['SEND_MESSAGE', 'SEND_EMBED', 'ADD_ROLE', 'REMOVE_ROLE', 'KICK_USER', 'BAN_USER'].includes(blockType)
								? 'ACTION'
								: blockType === 'IF'
									? 'CONDITION'
									: 'END',
					blockType,
					label: blockType,
					config: {},
					position,
					connections: { outputs: [] }
				})}
			onDeleteBlock={handleDeleteBlock}
			onEditBlock={handleEditBlock}
		/>
	</div>
</div>

<BlockModal isOpen={showBlockModal} block={editingBlock} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
```

**Step 2: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowBuilder.svelte
git commit -m "feat: create main FlowBuilder component orchestrating all flow builder parts"
```

---

### Task 17: Add Flow Builder tab to automation edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/flows/[id]/+page.svelte`

**Step 1: Import FlowBuilder and translator**

Add to script imports:

```typescript
import FlowBuilder from '$lib/components/flow-builder/FlowBuilder.svelte';
import { automationToFlow } from '$lib/utils/flow-translator';
```

**Step 2: Add flow builder tab**

In the tab navigation section, add a third tab button:

```svelte
<button
	onclick={() => (mode = 'flow')}
	class={`px-4 py-2 font-mono font-bold border-2 border-black ${
		mode === 'flow'
			? 'bg-blue-600 text-white'
			: 'bg-gray-200 hover:bg-gray-300'
	}`}
>
	Construtor Visual
</button>
```

**Step 3: Add flow builder tab content**

In the tab content section, add:

```svelte
{:else if mode === 'flow'}
	<FlowBuilder
		resourceType="automation"
		onJsonOutput={(json) => {
			jsonData = JSON.stringify(json, null, 2);
			mode = 'json';
		}}
	/>
```

**Step 4: Update mode variable type**

Change `mode` from `'visual' | 'json'` to `'visual' | 'json' | 'flow'`

**Step 5: Test in browser**

- Navigate to automation edit page
- Click "Construtor Visual" tab
- Drag blocks from palette to canvas
- Verify pan/zoom works
- Convert to JSON → verify it updates JSON tab

**Step 6: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/flows/\[id\]/+page.svelte
git commit -m "feat: add visual flow builder tab to automation edit page"
```

---

### Task 18: Add Flow Builder tab to command edit page

**Files:**
- Modify: `apps/dashboard/src/routes/(mgmt)/commands/[id]/+page.svelte`

**Step 1-6:** Repeat Task 17 steps for commands page (same implementation)

**Step 7: Commit**

```bash
git add apps/dashboard/src/routes/\(mgmt\)/commands/\[id\]/+page.svelte
git commit -m "feat: add visual flow builder tab to command edit page"
```

---

## Final Verification & Polish

### Task 19: Build and verify no errors

**Step 1: Run build**

```bash
cd apps/dashboard && npm run build
```

Expected: Build completes with no errors

**Step 2: Run dev server**

```bash
npm run dev
```

**Step 3: Manual testing checklist**

- ✓ Toast notifications appear on save/delete/error
- ✓ Keyboard shortcuts work (Ctrl+S, Escape, Ctrl+Shift+J)
- ✓ Validation shows errors in JSON and prevents save
- ✓ Flow builder canvas pans and zooms
- ✓ Blocks can be dragged from palette to canvas
- ✓ Blocks can be configured via modal
- ✓ Converting flow to JSON updates JSON tab
- ✓ Loading JSON creates blocks on canvas

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: verify all enhancements working correctly"
```

---

## Summary

| Feature | Tasks | Status |
|---------|-------|--------|
| Toast Notifications | 1-3 | Not started |
| Keyboard Shortcuts | 4-5 | Not started |
| Enhanced Validation | 6-8 | Not started |
| Visual Flow Builder | 9-18 | Not started |
| Final Verification | 19 | Not started |

**Total:** 19 tasks, estimated 15-20 hours of implementation


# Flow Builder Code Quality Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all accessibility (ARIA), type safety (`any` types), keyboard handling (Space+Click panning), error handling, and semantic HTML issues in the Flow Builder components.

**Architecture:** 
- Fix ARIA roles and labels for accessibility compliance
- Replace `any` types with proper typed interfaces
- Implement proper keyboard event handlers for Space+Click panning (separate from mouse events)
- Add error toasts for JSON parsing failures
- Improve form semantics with proper `<label>` association and focus management
- Remove unused exports

**Tech Stack:** Svelte, TypeScript, Tailwind CSS, Svelte stores

---

## Task 1: Fix Block.svelte Accessibility

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/Block.svelte`

**Step 1: Add ARIA roles and keyboard support to draggable div**

The main block container needs `role="button"` and `tabindex="0"` to be keyboard accessible since it's draggable.

```svelte
<div
	class={`absolute w-40 p-3 border-2 border-black bg-white cursor-pointer transition-colors ${
		isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'
	}`}
	style="left: {block.position.x}px; top: {block.position.y}px;"
	onmousedown={() => onSelect(block.id)}
	draggable={true}
	ondragstart={(e) => {
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('blockId', block.id);
		}
	}}
	role="button"
	tabindex="0"
	aria-label="Block {block.label} of type {block.type}"
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onSelect(block.id);
		}
	}}
>
```

**Step 2: Verify no TypeScript errors**

All changes are Svelte markup, no TS issues.

**Step 3: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/Block.svelte
git commit -m "fix: add ARIA roles and keyboard support to Block component"
```

---

## Task 2: Fix BlockPalette.svelte Accessibility

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/BlockPalette.svelte`

**Step 1: Add ARIA roles to draggable blocks**

Each draggable block option needs `role="button"` and proper labeling.

```svelte
{#each options.filter((o) => o.category === category) as option}
	<div
		class="p-2 bg-white border-2 border-black cursor-move hover:bg-blue-50 transition-colors"
		draggable="true"
		ondragstart={(e) => handleDragStart(e, option.blockType)}
		role="button"
		tabindex="0"
		aria-label="Add {option.label} block"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				// Trigger drag start on keyboard
				const evt = new DragEvent('dragstart', {
					bubbles: true,
					dataTransfer: new DataTransfer()
				});
				handleDragStart(evt, option.blockType);
			}
		}}
	>
		{option.label}
	</div>
{/each}
```

**Step 2: Add region role to palette container**

```svelte
<div class="w-48 bg-gray-100 border-r-2 border-black p-3 overflow-y-auto font-mono text-sm"
	role="region"
	aria-label="Available block palette">
	<h3 class="font-bold mb-3">Blocos Disponíveis</h3>
```

**Step 3: Verify no TypeScript errors**

All changes are Svelte markup, no TS issues.

**Step 4: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/BlockPalette.svelte
git commit -m "fix: add ARIA roles and keyboard support to BlockPalette"
```

---

## Task 3: Fix FlowCanvas.svelte - Space+Click Panning

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/FlowCanvas.svelte`

**Step 1: Add separate keyboard event handler for Space key tracking**

The current code tries to check `e.spaceKey` on MouseEvent, which doesn't exist. We need to track keyboard state separately.

Add state variables at the top of the script block:

```typescript
let spacePressed = false;
```

Add keyboard event handlers:

```typescript
function handleKeyDown(e: KeyboardEvent) {
	if (e.code === 'Space') {
		spacePressed = true;
		e.preventDefault();
	}
}

function handleKeyUp(e: KeyboardEvent) {
	if (e.code === 'Space') {
		spacePressed = false;
		e.preventDefault();
	}
}
```

**Step 2: Fix the mouse down handler to check spacePressed**

Replace the problematic line:

```typescript
function handleCanvasMouseDown(e: MouseEvent) {
	if (e.button !== 1 && !(e.button === 0 && spacePressed)) return; // Middle mouse or Space+Left
	isDraggingCanvas = true;
	dragStartX = e.clientX;
	dragStartY = e.clientY;
}
```

**Step 3: Add keyboard event listeners to main div**

```svelte
<div
	bind:this={canvasEl}
	class="flex-1 bg-white border-l-2 border-black relative overflow-hidden cursor-grab active:cursor-grabbing"
	onmousedown={handleCanvasMouseDown}
	onmousemove={handleCanvasMouseMove}
	onmouseup={handleCanvasMouseUp}
	onwheel={handleWheel}
	ondrop={handleCanvasDrop}
	ondragover={handleCanvasDragOver}
	onkeydown={handleKeyDown}
	onkeyup={handleKeyUp}
	role="region"
	aria-label="Canvas area for flow editor"
>
```

**Step 4: Add ARIA role to canvas container**

The root div now has `role="region"` and `aria-label`.

**Step 5: Verify TypeScript compiles**

Check for any TS errors.

**Step 6: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowCanvas.svelte
git commit -m "fix: implement proper Space+Click panning with separate keyboard handlers"
```

---

## Task 4: Remove Unused Export from FlowCanvas.svelte

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/FlowCanvas.svelte`

**Step 1: Remove unused `resourceType` export**

This export is declared but never used in the component:

```typescript
// REMOVE THIS LINE:
export let resourceType: 'automation' | 'command';
```

**Step 2: Check for references in FlowBuilder.svelte**

Verify that FlowBuilder.svelte is not passing this prop. Looking at FlowBuilder.svelte line 63-68, the prop is not passed, so it's safe to remove.

**Step 3: Verify TypeScript compiles**

Check for any TS errors.

**Step 4: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowCanvas.svelte
git commit -m "fix: remove unused resourceType export from FlowCanvas"
```

---

## Task 5: Fix BlockModal.svelte - Type Safety

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/BlockModal.svelte`

**Step 1: Create proper config type interface**

At the top of the script block, replace the `any` type with a proper union type:

```typescript
type BlockConfig = 
	| {} // MESSAGE_CREATE - no config
	| { message?: string } // SEND_MESSAGE
	| { roleId?: string } // ADD_ROLE
	| { condition?: any } // IF - condition is complex JSON Logic
	| Record<string, unknown>; // Fallback for unknown blocks

export let isOpen: boolean = false;
export let block: FlowBlock | null = null;

let config: BlockConfig = {};
```

**Step 2: Update handleFieldChange to be type-safe**

```typescript
function handleFieldChange<K extends string>(key: K, value: unknown) {
	config = { ...config, [key]: value };
}
```

**Step 3: Verify TypeScript compiles**

Check for any TS errors.

**Step 4: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/BlockModal.svelte
git commit -m "fix: replace any types with proper BlockConfig union type"
```

---

## Task 6: Fix BlockModal.svelte - Form Semantics and ARIA

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/BlockModal.svelte`

**Step 1: Add proper form element and label associations**

Replace the generic divs with form structure and associate labels with inputs via `for` and `id`:

For SEND_MESSAGE block:
```svelte
{:else if block?.blockType === 'SEND_MESSAGE'}
	<div>
		<label for="message-input" class="block text-sm font-bold mb-1">Mensagem</label>
		<textarea
			id="message-input"
			value={config.message || ''}
			onchange={(e) => handleFieldChange('message', e.currentTarget.value)}
			class="w-full border-2 border-black p-2 font-mono text-sm"
			rows="4"
			placeholder="Digite a mensagem..."
			aria-label="Message content"
		/>
	</div>
```

For ADD_ROLE block:
```svelte
{:else if block?.blockType === 'ADD_ROLE'}
	<div>
		<label for="role-id-input" class="block text-sm font-bold mb-1">ID do Cargo</label>
		<input
			id="role-id-input"
			type="text"
			value={config.roleId || ''}
			onchange={(e) => handleFieldChange('roleId', e.currentTarget.value)}
			class="w-full border-2 border-black p-2 font-mono text-sm"
			placeholder="123456789..."
			aria-label="Role ID"
		/>
	</div>
```

For IF block:
```svelte
{:else if block?.blockType === 'IF'}
	<div>
		<label for="condition-input" class="block text-sm font-bold mb-1">Condição (JSON Logic)</label>
		<textarea
			id="condition-input"
			value={JSON.stringify(config.condition || {}, null, 2)}
			onchange={(e) => {
				try {
					handleFieldChange('condition', JSON.parse(e.currentTarget.value));
				} catch {
					// Invalid JSON, show error via toast
					toastStore.add('JSON inválido na condição', 'error');
				}
			}}
			class="w-full border-2 border-black p-2 font-mono text-sm"
			rows="6"
			placeholder="Escreva sua condição em JSON Logic..."
			aria-label="Condition in JSON Logic format"
		/>
		<p class="text-xs text-gray-600 mt-1" id="condition-help">
			Exemplo: {JSON.stringify({ '==': [{ var: 'message.author.isBot' }, false] })}
		</p>
	</div>
```

For generic config:
```svelte
{:else}
	<div>
		<label for="config-input" class="block text-sm font-bold mb-1">Configuração JSON</label>
		<textarea
			id="config-input"
			value={JSON.stringify(config, null, 2)}
			onchange={(e) => {
				try {
					Object.assign(config, JSON.parse(e.currentTarget.value));
				} catch {
					toastStore.add('JSON inválido', 'error');
				}
			}}
			class="w-full border-2 border-black p-2 font-mono text-sm"
			rows="6"
			placeholder="Configuração avançada (JSON)"
			aria-label="Advanced JSON configuration"
		/>
	</div>
{/if}
```

**Step 2: Add role and aria-label to modal wrapper**

Update the form div container:
```svelte
<BrutalModal {isOpen} title="Configurar Bloco" onClose={handleClose}>
	<form class="space-y-4 font-mono" on:submit={(e) => { e.preventDefault(); handleSave(); }} role="form" aria-label="Block configuration form">
```

**Step 3: Import toastStore**

Add to imports at top:
```typescript
import { toastStore } from '$lib/stores/toast';
```

**Step 4: Update buttons with aria-labels**

```svelte
<button
	onclick={handleSave}
	class="flex-1 px-4 py-2 bg-green-600 text-white border-2 border-black font-mono font-bold hover:bg-green-700"
	aria-label="Save block configuration"
>
	Salvar
</button>
<button
	onclick={handleClose}
	class="flex-1 px-4 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
	aria-label="Cancel and close block configuration"
>
	Cancelar
</button>
```

**Step 5: Verify TypeScript compiles**

Check for any TS errors.

**Step 6: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/BlockModal.svelte
git commit -m "fix: improve BlockModal form semantics with proper label association and error toasts"
```

---

## Task 7: Fix FlowBuilder.svelte - Type Safety

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/FlowBuilder.svelte`

**Step 1: Import FlowBlock type and replace any**

Update imports:
```typescript
import { flowStore, type FlowBlock } from '$lib/stores/flow';
```

Then replace the `any` type:
```typescript
let editingBlock: FlowBlock | null = null;
```

**Step 2: Verify TypeScript compiles**

Check for any TS errors.

**Step 3: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowBuilder.svelte
git commit -m "fix: replace editingBlock any type with FlowBlock | null"
```

---

## Task 8: Fix FlowToolbar.svelte - JSON Validation

**Files:**
- Modify: `apps/dashboard/src/lib/components/flow-builder/FlowToolbar.svelte`

**Step 1: Add better JSON validation before loading**

Update the `handleLoadFromJSON` function to validate JSON structure:

```typescript
function handleLoadFromJSON() {
	try {
		const json = JSON.parse(loadJsonText);
		
		// Validate JSON structure
		if (!json || typeof json !== 'object') {
			throw new Error('JSON deve ser um objeto válido');
		}
		
		const blocks = resourceType === 'automation' ? automationToFlow(json) : automationToFlow(json);
		flowStore.loadFromBlocks(blocks);
		showLoadModal = false;
		loadJsonText = '';
		toastStore.add('Carregado com sucesso!', 'success');
		onLoadFromJSON();
	} catch (error) {
		const message = error instanceof Error ? error.message : 'JSON inválido';
		toastStore.add(message, 'error');
	}
}
```

**Step 2: Add aria-label to textarea in modal**

```svelte
<textarea
	id="load-json-textarea"
	bind:value={loadJsonText}
	class="w-full border-2 border-black p-2 font-mono text-sm mb-4"
	rows="8"
	placeholder="Cole o JSON aqui..."
	aria-label="JSON content to load"
	aria-describedby="json-help"
/>
<p id="json-help" class="text-xs text-gray-600 mb-2">Paste valid automation or command JSON here</p>
```

**Step 3: Add role and aria-label to modal**

```svelte
{#if showLoadModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="load-modal-title">
		<div class="bg-white border-4 border-black p-6 max-w-md w-full">
			<h3 id="load-modal-title" class="font-bold font-mono mb-3">Carregar do JSON</h3>
```

**Step 4: Verify TypeScript compiles**

Check for any TS errors.

**Step 5: Commit**

```bash
git add apps/dashboard/src/lib/components/flow-builder/FlowToolbar.svelte
git commit -m "fix: add JSON structure validation and improve modal accessibility"
```

---

## Task 9: Accessibility Testing

**Files:**
- No files modified; verification only

**Step 1: Build the project**

```bash
npm run build
```

Expected: Build succeeds without errors or warnings.

**Step 2: Manual accessibility checks**

- Test keyboard navigation through Block and BlockPalette components using Tab
- Test Space+Click panning by holding Space and dragging canvas with left mouse button
- Verify all form inputs in BlockModal have associated labels
- Test focus management in modals
- Verify ARIA labels are present on all interactive elements

**Step 3: Run linter (if available)**

```bash
npm run lint
```

Expected: No accessibility warnings.

**Step 4: Visual verification**

- Open browser DevTools
- Check Elements panel for proper ARIA attributes
- Verify semantic HTML structure

---

## Task 10: Self-Review Checklist

**Step 1: Review all changes**

Using git diff, verify:
- [ ] All `any` types removed
- [ ] ARIA roles added to interactive elements
- [ ] Keyboard handlers properly implemented
- [ ] Form semantics improved (labels with `for` attribute)
- [ ] Error handling with toasts added
- [ ] Unused exports removed
- [ ] No new type errors introduced

**Step 2: Check for regressions**

Ensure no existing functionality broken:
- [ ] Block selection still works
- [ ] Block deletion still works
- [ ] Block editing still works
- [ ] Canvas panning with Space+Click works
- [ ] Canvas zooming still works
- [ ] JSON export works
- [ ] JSON import works

**Step 3: Final verification**

```bash
npm run build
npm run lint
```

Expected: Both succeed without errors.

---

## Summary of Changes

| Component | Fixes |
|-----------|-------|
| Block.svelte | ARIA roles, keyboard support, accessibility labels |
| BlockPalette.svelte | ARIA roles for palette and items, region role |
| FlowCanvas.svelte | Fix Space+Click panning with proper keyboard handlers, remove unused export, add region role |
| BlockModal.svelte | Type safety (no `any`), form semantics, label associations, error toasts, ARIA labels |
| FlowBuilder.svelte | Type safety for editingBlock |
| FlowToolbar.svelte | JSON validation, modal accessibility improvements |

---

## Total Commits

8 commits total (1 per major task group):
1. Block.svelte accessibility
2. BlockPalette.svelte accessibility
3. FlowCanvas.svelte Space+Click panning + cleanup
4. BlockModal.svelte type safety + semantics
5. FlowBuilder.svelte type safety
6. FlowToolbar.svelte validation + accessibility
7. (Combined with above tasks as appropriate)

All changes follow Svelte/TypeScript best practices and Web Accessibility Guidelines (WCAG 2.1).

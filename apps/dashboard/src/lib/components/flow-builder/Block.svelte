<script lang="ts">
	import type { FlowBlock } from '$lib/stores/flow';

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

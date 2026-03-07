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
		if (e.button !== 1 && !(e.button === 0 && (e as any).spaceKey)) return; // Middle mouse or Space+Left
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
		const blockType = e.dataTransfer?.getData('newBlockType');
		if (!blockType) return;

		// Calculate position relative to canvas
		const rect = canvasEl.getBoundingClientRect();
		const x = (e.clientX - rect.left - state.canvasOffset.x) / state.zoomLevel;
		const y = (e.clientY - rect.top - state.canvasOffset.y) / state.zoomLevel;

		onAddBlock(blockType, { x, y });
	}

	function handleCanvasDragOver(e: DragEvent) {
		e.preventDefault();
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'copy';
		}
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

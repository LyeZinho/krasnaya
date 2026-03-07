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

	function handleAddBlock(blockType: string, position: { x: number; y: number }) {
		const blockTypeToType = (blockType: string): 'TRIGGER' | 'ACTION' | 'CONDITION' | 'END' => {
			if (['MESSAGE_CREATE', 'MEMBER_JOIN', 'MEMBER_LEAVE', 'REACTION_ADD', 'MESSAGE_REACT', 'MESSAGE_DELETE'].includes(blockType)) {
				return 'TRIGGER';
			} else if (['SEND_MESSAGE', 'SEND_EMBED', 'ADD_ROLE', 'REMOVE_ROLE', 'KICK_USER', 'BAN_USER'].includes(blockType)) {
				return 'ACTION';
			} else if (blockType === 'IF') {
				return 'CONDITION';
			}
			return 'END';
		};

		flowStore.addBlock({
			id: `${blockType}-${Date.now()}`,
			type: blockTypeToType(blockType),
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
			onAddBlock={handleAddBlock}
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

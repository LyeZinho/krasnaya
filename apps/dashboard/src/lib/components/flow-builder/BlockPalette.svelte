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
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'copy';
			e.dataTransfer.setData('newBlockType', blockType);
		}
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

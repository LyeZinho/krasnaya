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
export function blocksToActions(blocks: FlowBlock[], fromBlockId: string): any[] {
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
export function getTriggerLabel(type: string): string {
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
export function getActionLabel(type: string): string {
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

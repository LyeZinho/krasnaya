import type { FlowBlock, BlockConfig } from '$lib/stores/flow';

export interface ActionEntry {
	type: string;
	config: BlockConfig;
}

export interface AutomationJSON {
	name: string;
	trigger: {
		type: string;
		config: BlockConfig;
	};
	actions: ActionEntry[];
	enabled: boolean;
	cooldown: number;
}

export interface CommandJSON {
	name: string;
	prefix: string;
	description: string;
	aliases: string[];
	actions: ActionEntry[];
	enabled: boolean;
	cooldown: number;
}

/**
 * Generate unique ID using crypto.randomUUID
 */
function generateId(prefix: string): string {
	if (typeof window !== 'undefined' && window.crypto) {
		return `${prefix}-${crypto.getRandomValues(new Uint8Array(8)).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')}`;
	}
	// Fallback for SSR or unsupported environments
	return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convert FlowBlock array to automation JSON
 */
export function flowToAutomation(blocks: FlowBlock[]): AutomationJSON {
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
export function flowToCommand(blocks: FlowBlock[]): CommandJSON {
	const inputBlock = blocks.find((b) => b.blockType === 'COMMAND_INPUT');
	if (!inputBlock) throw new Error('Entrada de comando não encontrada');

	const actions = blocksToActions(blocks, inputBlock.id);

	return {
		name: (inputBlock.config.name as string) || 'Novo Comando',
		prefix: (inputBlock.config.prefix as string) || '!',
		description: (inputBlock.config.description as string) || '',
		aliases: (inputBlock.config.aliases as string[]) || [],
		actions,
		enabled: true,
		cooldown: 0
	};
}

/**
 * Build actions array from block graph starting after given block ID
 * Handles both normal outputs and conditional branches (IF blocks)
 * Validates block references and detects circular references
 */
export function blocksToActions(blocks: FlowBlock[], fromBlockId: string): ActionEntry[] {
	const actions: ActionEntry[] = [];
	const visited = new Set<string>();
	const inProgress = new Set<string>();
	const queue: string[] = [];

	// Create block map for O(1) lookups instead of O(n)
	const blockMap = new Map<string, FlowBlock>();
	for (const block of blocks) {
		blockMap.set(block.id, block);
	}

	// Validate that all referenced block IDs exist
	for (const block of blocks) {
		if (block.connections.input && !blockMap.has(block.connections.input)) {
			throw new Error(`Bloco referencia entrada inexistente: ${block.connections.input}`);
		}
		for (const outputId of block.connections.outputs) {
			if (!blockMap.has(outputId)) {
				throw new Error(`Bloco referencia saída inexistente: ${outputId}`);
			}
		}
		if (block.connections.conditionBranches) {
			for (const branchId of block.connections.conditionBranches.true) {
				if (!blockMap.has(branchId)) {
					throw new Error(`Bloco referencia ramo (true) inexistente: ${branchId}`);
				}
			}
			for (const branchId of block.connections.conditionBranches.false) {
				if (!blockMap.has(branchId)) {
					throw new Error(`Bloco referencia ramo (false) inexistente: ${branchId}`);
				}
			}
		}
	}

	function traverse(blockId: string): void {
		if (visited.has(blockId)) return;
		if (inProgress.has(blockId)) {
			throw new Error('Referência circular detectada na traversal de blocos');
		}

		inProgress.add(blockId);
		const block = blockMap.get(blockId);

		if (block && block.type === 'ACTION') {
			actions.push({
				type: block.blockType,
				config: block.config
			});
		}

		if (block) {
			// Traverse normal outputs
			for (const outputId of block.connections.outputs) {
				traverse(outputId);
			}

			// Traverse conditional branches
			if (block.connections.conditionBranches) {
				for (const branchId of block.connections.conditionBranches.true) {
					traverse(branchId);
				}
				for (const branchId of block.connections.conditionBranches.false) {
					traverse(branchId);
				}
			}
		}

		inProgress.delete(blockId);
		visited.add(blockId);
	}

	// Find outputs of the starting block
	const startBlock = blockMap.get(fromBlockId);
	if (!startBlock) return actions;

	for (const outputId of startBlock.connections.outputs) {
		traverse(outputId);
	}

	return actions;
}

/**
 * Convert automation JSON back to FlowBlocks
 */
export function automationToFlow(automation: AutomationJSON): FlowBlock[] {
	const blocks: FlowBlock[] = [];
	let yOffset = 0;

	// Add trigger block with unique ID
	const triggerId = generateId('trigger');
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

	// Create block map for O(1) lookups
	const blockMap = new Map<string, FlowBlock>();
	blockMap.set(triggerId, blocks[0]);

	if (Array.isArray(automation.actions)) {
		automation.actions.forEach((action: ActionEntry, index: number) => {
			const actionId = generateId(`action-${index}`);
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
			blockMap.set(actionId, actionBlock);

			// Update previous block's outputs
			const prev = blockMap.get(previousId);
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

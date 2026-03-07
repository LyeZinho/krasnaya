import { describe, it, expect, beforeEach } from 'vitest';
import { flowStore, flowValidation, type FlowBlock } from '$lib/stores/flow';
import {
	flowToAutomation,
	automationToFlow,
	blocksToActions,
	getTriggerLabel,
	getActionLabel
} from '$lib/utils/flow-translator';
import { get } from 'svelte/store';

describe('Flow Store', () => {
	beforeEach(() => {
		flowStore.reset();
	});

	it('should initialize with empty blocks and default state', () => {
		const state = get(flowStore);
		expect(state.blocks).toEqual([]);
		expect(state.canvasOffset).toEqual({ x: 0, y: 0 });
		expect(state.zoomLevel).toBe(1);
		expect(state.isDirty).toBe(false);
	});

	it('should add a block and set isDirty to true', () => {
		const block: FlowBlock = {
			id: 'trigger-1',
			type: 'TRIGGER',
			blockType: 'MESSAGE_CREATE',
			label: 'Nova Mensagem',
			config: {},
			position: { x: 0, y: 0 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		const state = get(flowStore);

		expect(state.blocks).toHaveLength(1);
		expect(state.blocks[0]).toEqual(block);
		expect(state.isDirty).toBe(true);
	});

	it('should remove a block', () => {
		const block: FlowBlock = {
			id: 'trigger-1',
			type: 'TRIGGER',
			blockType: 'MESSAGE_CREATE',
			label: 'Nova Mensagem',
			config: {},
			position: { x: 0, y: 0 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		flowStore.removeBlock('trigger-1');
		const state = get(flowStore);

		expect(state.blocks).toHaveLength(0);
		expect(state.isDirty).toBe(true);
	});

	it('should update a block', () => {
		const block: FlowBlock = {
			id: 'action-1',
			type: 'ACTION',
			blockType: 'SEND_MESSAGE',
			label: 'Enviar Mensagem',
			config: { message: 'Hello' },
			position: { x: 100, y: 100 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		flowStore.updateBlock('action-1', { config: { message: 'Updated' } });
		const state = get(flowStore);

		expect(state.blocks[0].config.message).toBe('Updated');
		expect(state.isDirty).toBe(true);
	});

	it('should select a block', () => {
		const block: FlowBlock = {
			id: 'trigger-1',
			type: 'TRIGGER',
			blockType: 'MESSAGE_CREATE',
			label: 'Nova Mensagem',
			config: {},
			position: { x: 0, y: 0 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		flowStore.selectBlock('trigger-1');
		const state = get(flowStore);

		expect(state.selectedBlockId).toBe('trigger-1');
	});

	it('should update pan/canvas offset', () => {
		flowStore.setPan({ x: 50, y: 100 });
		const state = get(flowStore);

		expect(state.canvasOffset).toEqual({ x: 50, y: 100 });
	});

	it('should update zoom level and clamp between 0.5 and 2', () => {
		flowStore.setZoom(1.5);
		let state = get(flowStore);
		expect(state.zoomLevel).toBe(1.5);

		flowStore.setZoom(0.3); // Should clamp to 0.5
		state = get(flowStore);
		expect(state.zoomLevel).toBe(0.5);

		flowStore.setZoom(2.5); // Should clamp to 2
		state = get(flowStore);
		expect(state.zoomLevel).toBe(2);
	});

	it('should reset to initial state', () => {
		const block: FlowBlock = {
			id: 'trigger-1',
			type: 'TRIGGER',
			blockType: 'MESSAGE_CREATE',
			label: 'Nova Mensagem',
			config: {},
			position: { x: 0, y: 0 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		flowStore.setPan({ x: 100, y: 100 });
		flowStore.setZoom(1.5);
		flowStore.reset();

		const state = get(flowStore);
		expect(state.blocks).toHaveLength(0);
		expect(state.canvasOffset).toEqual({ x: 0, y: 0 });
		expect(state.zoomLevel).toBe(1);
		expect(state.isDirty).toBe(false);
	});

	it('should load blocks from array', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: {},
				position: { x: 0, y: 0 },
				connections: { outputs: ['action-1'] }
			},
			{
				id: 'action-1',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem',
				config: { message: 'Test' },
				position: { x: 100, y: 100 },
				connections: { input: 'trigger-1', outputs: [] }
			}
		];

		flowStore.loadFromBlocks(blocks);
		const state = get(flowStore);

		expect(state.blocks).toHaveLength(2);
		expect(state.blocks).toEqual(blocks);
		expect(state.isDirty).toBe(false);
	});
});

describe('Flow Validation Store', () => {
	beforeEach(() => {
		flowStore.reset();
	});

	it('should require a trigger block', () => {
		const block: FlowBlock = {
			id: 'action-1',
			type: 'ACTION',
			blockType: 'SEND_MESSAGE',
			label: 'Enviar Mensagem',
			config: {},
			position: { x: 100, y: 100 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		const validation = get(flowValidation);

		expect(validation.isValid).toBe(false);
		expect(validation.errors).toContain('Gatilho obrigatório');
	});

	it('should require at least one action block', () => {
		const block: FlowBlock = {
			id: 'trigger-1',
			type: 'TRIGGER',
			blockType: 'MESSAGE_CREATE',
			label: 'Nova Mensagem',
			config: {},
			position: { x: 0, y: 0 },
			connections: { outputs: [] }
		};

		flowStore.addBlock(block);
		const validation = get(flowValidation);

		expect(validation.isValid).toBe(false);
		expect(validation.errors).toContain('Pelo menos uma ação obrigatória');
	});

	it('should be valid with trigger and action', () => {
		const trigger: FlowBlock = {
			id: 'trigger-1',
			type: 'TRIGGER',
			blockType: 'MESSAGE_CREATE',
			label: 'Nova Mensagem',
			config: {},
			position: { x: 0, y: 0 },
			connections: { outputs: ['action-1'] }
		};

		const action: FlowBlock = {
			id: 'action-1',
			type: 'ACTION',
			blockType: 'SEND_MESSAGE',
			label: 'Enviar Mensagem',
			config: {},
			position: { x: 100, y: 100 },
			connections: { input: 'trigger-1', outputs: [] }
		};

		flowStore.addBlock(trigger);
		flowStore.addBlock(action);
		const validation = get(flowValidation);

		expect(validation.isValid).toBe(true);
		expect(validation.errors).toHaveLength(0);
	});
});

describe('Flow Translator', () => {
	it('getTriggerLabel should return correct labels', () => {
		expect(getTriggerLabel('MESSAGE_CREATE')).toBe('Nova Mensagem');
		expect(getTriggerLabel('MEMBER_JOIN')).toBe('Membro Entra');
		expect(getTriggerLabel('UNKNOWN')).toBe('UNKNOWN');
	});

	it('getActionLabel should return correct labels', () => {
		expect(getActionLabel('SEND_MESSAGE')).toBe('Enviar Mensagem');
		expect(getActionLabel('ADD_ROLE')).toBe('Adicionar Cargo');
		expect(getActionLabel('UNKNOWN')).toBe('UNKNOWN');
	});

	it('blocksToActions should traverse conditional branches in IF blocks', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: {},
				position: { x: 0, y: 0 },
				connections: { outputs: ['condition-1'] }
			},
			{
				id: 'condition-1',
				type: 'CONDITION',
				blockType: 'IF',
				label: 'Se',
				config: { expression: 'message.length > 10' },
				position: { x: 100, y: 100 },
				connections: {
					input: 'trigger-1',
					outputs: [],
					conditionBranches: {
						true: ['action-true'],
						false: ['action-false']
					}
				}
			},
			{
				id: 'action-true',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem (True)',
				config: { message: 'Message is long' },
				position: { x: 200, y: 50 },
				connections: { input: 'condition-1', outputs: [] }
			},
			{
				id: 'action-false',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem (False)',
				config: { message: 'Message is short' },
				position: { x: 200, y: 150 },
				connections: { input: 'condition-1', outputs: [] }
			}
		];

		const actions = blocksToActions(blocks, 'trigger-1');

		// Should contain both true and false branch actions
		expect(actions).toHaveLength(2);
		expect(actions).toContainEqual({
			type: 'SEND_MESSAGE',
			config: { message: 'Message is long' }
		});
		expect(actions).toContainEqual({
			type: 'SEND_MESSAGE',
			config: { message: 'Message is short' }
		});
	});

	it('blocksToActions should detect circular references', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: {},
				position: { x: 0, y: 0 },
				connections: { outputs: ['action-1'] }
			},
			{
				id: 'action-1',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem',
				config: { message: 'Hello' },
				position: { x: 100, y: 100 },
				connections: { input: 'trigger-1', outputs: ['action-1'] } // Circular reference
			}
		];

		expect(() => blocksToActions(blocks, 'trigger-1')).toThrow('Referência circular');
	});

	it('blocksToActions should validate that referenced blocks exist', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: {},
				position: { x: 0, y: 0 },
				connections: { outputs: ['action-nonexistent'] } // References non-existent block
			}
		];

		expect(() => blocksToActions(blocks, 'trigger-1')).toThrow('referencia saída inexistente');
	});

	it('blocksToActions should traverse block graph and extract actions', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: {},
				position: { x: 0, y: 0 },
				connections: { outputs: ['action-1'] }
			},
			{
				id: 'action-1',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem',
				config: { message: 'Hello' },
				position: { x: 100, y: 100 },
				connections: { input: 'trigger-1', outputs: ['action-2'] }
			},
			{
				id: 'action-2',
				type: 'ACTION',
				blockType: 'ADD_ROLE',
				label: 'Adicionar Cargo',
				config: { roleId: '123' },
				position: { x: 100, y: 200 },
				connections: { input: 'action-1', outputs: [] }
			}
		];

		const actions = blocksToActions(blocks, 'trigger-1');

		expect(actions).toHaveLength(2);
		expect(actions[0]).toEqual({
			type: 'SEND_MESSAGE',
			config: { message: 'Hello' }
		});
		expect(actions[1]).toEqual({
			type: 'ADD_ROLE',
			config: { roleId: '123' }
		});
	});

	it('flowToAutomation should convert blocks to automation JSON', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: { excludeBots: true },
				position: { x: 0, y: 0 },
				connections: { outputs: ['action-1'] }
			},
			{
				id: 'action-1',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem',
				config: { message: 'Hello' },
				position: { x: 100, y: 100 },
				connections: { input: 'trigger-1', outputs: [] }
			}
		];

		const automation = flowToAutomation(blocks);

		expect(automation.name).toBe('Automação visual');
		expect(automation.trigger.type).toBe('MESSAGE_CREATE');
		expect(automation.trigger.config).toEqual({ excludeBots: true });
		expect(automation.actions).toHaveLength(1);
		expect(automation.actions[0].type).toBe('SEND_MESSAGE');
		expect(automation.enabled).toBe(true);
		expect(automation.cooldown).toBe(0);
	});

	it('flowToAutomation should throw if no trigger found', () => {
		const blocks: FlowBlock[] = [
			{
				id: 'action-1',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem',
				config: {},
				position: { x: 100, y: 100 },
				connections: { outputs: [] }
			}
		];

		expect(() => flowToAutomation(blocks)).toThrow('Gatilho não encontrado');
	});

	it('automationToFlow should convert automation JSON back to blocks', () => {
		const automation = {
			name: 'Test Automation',
			trigger: {
				type: 'MESSAGE_CREATE',
				config: { excludeBots: true }
			},
			actions: [
				{ type: 'SEND_MESSAGE', config: { message: 'Hello' } },
				{ type: 'ADD_ROLE', config: { roleId: '123' } }
			],
			enabled: true,
			cooldown: 0
		};

		const blocks = automationToFlow(automation);

		expect(blocks).toHaveLength(3);
		expect(blocks[0].type).toBe('TRIGGER');
		expect(blocks[0].blockType).toBe('MESSAGE_CREATE');
		expect(blocks[0].label).toBe('Nova Mensagem');
		expect(blocks[0].config).toEqual({ excludeBots: true });

		expect(blocks[1].type).toBe('ACTION');
		expect(blocks[1].blockType).toBe('SEND_MESSAGE');
		expect(blocks[1].label).toBe('Enviar Mensagem');
		expect(blocks[1].config).toEqual({ message: 'Hello' });

		expect(blocks[2].type).toBe('ACTION');
		expect(blocks[2].blockType).toBe('ADD_ROLE');
		expect(blocks[2].config).toEqual({ roleId: '123' });

		// Check connections are properly set
		expect(blocks[0].connections.outputs).toEqual([blocks[1].id]);
		expect(blocks[1].connections.input).toBe(blocks[0].id);
		expect(blocks[1].connections.outputs).toEqual([blocks[2].id]);
	});

	it('should round-trip: flow -> automation -> flow', () => {
		const originalBlocks: FlowBlock[] = [
			{
				id: 'trigger-1',
				type: 'TRIGGER',
				blockType: 'MESSAGE_CREATE',
				label: 'Nova Mensagem',
				config: { excludeBots: true },
				position: { x: 0, y: 0 },
				connections: { outputs: ['action-1'] }
			},
			{
				id: 'action-1',
				type: 'ACTION',
				blockType: 'SEND_MESSAGE',
				label: 'Enviar Mensagem',
				config: { message: 'Hello' },
				position: { x: 100, y: 100 },
				connections: { input: 'trigger-1', outputs: ['action-2'] }
			},
			{
				id: 'action-2',
				type: 'ACTION',
				blockType: 'ADD_ROLE',
				label: 'Adicionar Cargo',
				config: { roleId: '123' },
				position: { x: 100, y: 200 },
				connections: { input: 'action-1', outputs: [] }
			}
		];

		// Convert to automation
		const automation = flowToAutomation(originalBlocks);

		// Convert back to flow
		const reconstructedBlocks = automationToFlow(automation);

		// Verify structure matches (IDs will be different, so check content)
		expect(reconstructedBlocks).toHaveLength(3);
		expect(reconstructedBlocks[0].blockType).toBe('MESSAGE_CREATE');
		expect(reconstructedBlocks[0].config).toEqual({ excludeBots: true });
		expect(reconstructedBlocks[1].blockType).toBe('SEND_MESSAGE');
		expect(reconstructedBlocks[1].config).toEqual({ message: 'Hello' });
		expect(reconstructedBlocks[2].blockType).toBe('ADD_ROLE');
		expect(reconstructedBlocks[2].config).toEqual({ roleId: '123' });
	});
});

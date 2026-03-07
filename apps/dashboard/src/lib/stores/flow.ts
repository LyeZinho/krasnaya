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

export type BlockConfig = Record<string, string | number | boolean | string[] | number[] | null | undefined>;

export interface FlowBlock {
	id: string;
	type: BlockType;
	blockType: string; // TriggerBlockType | ActionBlockType | 'IF' | 'END'
	label: string;
	config: BlockConfig;
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

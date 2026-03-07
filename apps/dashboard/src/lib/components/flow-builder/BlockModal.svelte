<script lang="ts">
	import { flowStore, type FlowBlock } from '$lib/stores/flow';
	import BrutalModal from '$lib/components/ui/BrutalModal.svelte';
	import { toastStore } from '$lib/stores/toast';

	export let isOpen: boolean = false;
	export let block: FlowBlock | null = null;

	interface BlockConfigLocal {
		[key: string]: string | number | boolean | string[] | number[] | null | undefined;
	}

	let config: BlockConfigLocal = {};

	$: if (block) {
		config = { ...block.config };
	}

	function handleClose() {
		isOpen = false;
		block = null;
	}

	function handleSave() {
		if (block) {
			flowStore.updateBlock(block.id, { config: config as Record<string, string | number | boolean | string[] | number[] | null | undefined> });
		}
		handleClose();
	}

	function handleFieldChange(key: string, value: string | number | boolean | string[] | number[] | null | undefined) {
		config[key] = value;
	}
</script>

<BrutalModal {isOpen} title="Configurar Bloco" onClose={handleClose}>
	<div class="space-y-4 font-mono">
	{#if block?.blockType === 'MESSAGE_CREATE'}
		<div>
			<p class="block text-sm font-bold mb-1">Nenhuma configuração necessária</p>
			<p class="text-xs text-gray-600">Este gatilho não requer configuração adicional.</p>
		</div>
		{:else if block?.blockType === 'SEND_MESSAGE'}
			<div>
				<label for="message-input" class="block text-sm font-bold mb-1">Mensagem</label>
				<textarea
					id="message-input"
					value={typeof config.message === 'string' ? config.message : ''}
					onchange={(e) => handleFieldChange('message', e.currentTarget.value)}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="4"
					placeholder="Digite a mensagem..."
					aria-label="Message content"
				/>
			</div>
		{:else if block?.blockType === 'ADD_ROLE'}
			<div>
				<label for="role-id-input" class="block text-sm font-bold mb-1">ID do Cargo</label>
				<input
					id="role-id-input"
					type="text"
					value={typeof config.roleId === 'string' ? config.roleId : ''}
					onchange={(e) => handleFieldChange('roleId', e.currentTarget.value)}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					placeholder="123456789..."
					aria-label="Role ID"
				/>
			</div>
		{:else if block?.blockType === 'IF'}
			<div>
				<label for="condition-input" class="block text-sm font-bold mb-1">Condição (JSON Logic)</label>
				<textarea
					id="condition-input"
					value={JSON.stringify((config.condition as unknown) || {}, null, 2)}
					onchange={(e) => {
						try {
							const parsed = JSON.parse(e.currentTarget.value);
							// Store complex JSON logic conditions as string representation
							if (typeof parsed === 'object' && parsed !== null) {
								config['condition'] = JSON.stringify(parsed);
							}
						} catch {
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
		{:else}
			<div>
				<label for="config-input" class="block text-sm font-bold mb-1">Configuração JSON</label>
				<textarea
					id="config-input"
					value={JSON.stringify(config, null, 2)}
					onchange={(e) => {
						try {
							const parsed = JSON.parse(e.currentTarget.value);
							if (typeof parsed === 'object' && parsed !== null) {
								// Merge parsed config, converting incompatible types to strings
								for (const [key, val] of Object.entries(parsed)) {
									if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' || val === null) {
										config[key] = val as string | number | boolean | null;
									} else {
										// Convert complex objects/arrays to strings
										config[key] = JSON.stringify(val);
									}
								}
							}
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

		<div class="flex gap-2 pt-4">
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
		</div>
	</div>
</BrutalModal>

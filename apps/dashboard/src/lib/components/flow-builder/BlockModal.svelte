<script lang="ts">
	import { flowStore, type FlowBlock } from '$lib/stores/flow';
	import BrutalModal from '$lib/components/ui/BrutalModal.svelte';

	export let isOpen: boolean = false;
	export let block: FlowBlock | null = null;

	let config: Record<string, any> = {};

	$: if (block) {
		config = { ...block.config };
	}

	function handleClose() {
		isOpen = false;
		block = null;
	}

	function handleSave() {
		if (block) {
			flowStore.updateBlock(block.id, { config });
		}
		handleClose();
	}

	function handleFieldChange(key: string, value: any) {
		config[key] = value;
	}
</script>

<BrutalModal {isOpen} title="Configurar Bloco" onClose={handleClose}>
	<div class="space-y-4 font-mono">
		{#if block?.blockType === 'MESSAGE_CREATE'}
			<div>
				<label class="block text-sm font-bold mb-1">Nenhuma configuração necessária</label>
				<p class="text-xs text-gray-600">Este gatilho não requer configuração adicional.</p>
			</div>
		{:else if block?.blockType === 'SEND_MESSAGE'}
			<div>
				<label class="block text-sm font-bold mb-1">Mensagem</label>
				<textarea
					value={config.message || ''}
					onchange={(e) => handleFieldChange('message', e.currentTarget.value)}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="4"
					placeholder="Digite a mensagem..."
				/>
			</div>
		{:else if block?.blockType === 'ADD_ROLE'}
			<div>
				<label class="block text-sm font-bold mb-1">ID do Cargo</label>
				<input
					type="text"
					value={config.roleId || ''}
					onchange={(e) => handleFieldChange('roleId', e.currentTarget.value)}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					placeholder="123456789..."
				/>
			</div>
		{:else if block?.blockType === 'IF'}
			<div>
				<label class="block text-sm font-bold mb-1">Condição (JSON Logic)</label>
				<textarea
					value={JSON.stringify(config.condition || {}, null, 2)}
					onchange={(e) => {
						try {
							handleFieldChange('condition', JSON.parse(e.currentTarget.value));
						} catch {
							// Invalid JSON, show error
						}
					}}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="6"
					placeholder="Escreva sua condição em JSON Logic..."
				/>
				<p class="text-xs text-gray-600 mt-1">
					Exemplo: {JSON.stringify({ '==': [{ var: 'message.author.isBot' }, false] })}
				</p>
			</div>
		{:else}
			<div>
				<label class="block text-sm font-bold mb-1">Configuração JSON</label>
				<textarea
					value={JSON.stringify(config, null, 2)}
					onchange={(e) => {
						try {
							Object.assign(config, JSON.parse(e.currentTarget.value));
						} catch {
							// Invalid JSON
						}
					}}
					class="w-full border-2 border-black p-2 font-mono text-sm"
					rows="6"
					placeholder="Configuração avançada (JSON)"
				/>
			</div>
		{/if}

		<div class="flex gap-2 pt-4">
			<button
				onclick={handleSave}
				class="flex-1 px-4 py-2 bg-green-600 text-white border-2 border-black font-mono font-bold hover:bg-green-700"
			>
				Salvar
			</button>
			<button
				onclick={handleClose}
				class="flex-1 px-4 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
			>
				Cancelar
			</button>
		</div>
	</div>
</BrutalModal>

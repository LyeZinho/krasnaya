<script lang="ts">
	import { flowStore, flowValidation } from '$lib/stores/flow';
	import { automationToFlow, flowToAutomation, flowToCommand } from '$lib/utils/flow-translator';
	import { toastStore } from '$lib/stores/toast';

	export let resourceType: 'automation' | 'command' = 'automation';
	export let onConvertToJSON: (json: any) => void;
	export let onLoadFromJSON: () => void = () => {};

	let showLoadModal = false;
	let loadJsonText = '';

	function handleConvertToJSON() {
		const validation = $flowValidation;
		if (!validation.isValid) {
			toastStore.add('Corrija os erros: ' + validation.errors.join(', '), 'error');
			return;
		}

		try {
			const json =
				resourceType === 'automation' ? flowToAutomation($flowStore.blocks) : flowToCommand($flowStore.blocks);

			onConvertToJSON(json);
			toastStore.add('Convertido para JSON com sucesso!', 'success');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Erro ao converter';
			toastStore.add(message, 'error');
		}
	}

	function handleLoadFromJSON() {
		try {
			const json = JSON.parse(loadJsonText);
			
			// Validate JSON structure
			if (!json || typeof json !== 'object') {
				throw new Error('JSON deve ser um objeto válido');
			}
			
			const blocks = resourceType === 'automation' ? automationToFlow(json) : automationToFlow(json);
			flowStore.loadFromBlocks(blocks);
			showLoadModal = false;
			loadJsonText = '';
			toastStore.add('Carregado com sucesso!', 'success');
			onLoadFromJSON();
		} catch (error) {
			const message = error instanceof Error ? error.message : 'JSON inválido';
			toastStore.add(message, 'error');
		}
	}

	function handleReset() {
		if (confirm('Limpar todo o fluxo?')) {
			flowStore.reset();
			toastStore.add('Fluxo limpo', 'info');
		}
	}
</script>

<div class="flex gap-2 p-3 bg-gray-100 border-b-2 border-black">
	<button
		onclick={handleConvertToJSON}
		class="px-3 py-2 bg-blue-600 text-white border-2 border-black font-mono font-bold hover:bg-blue-700"
	>
		→ Converter JSON
	</button>

	<button
		onclick={() => (showLoadModal = true)}
		class="px-3 py-2 bg-blue-600 text-white border-2 border-black font-mono font-bold hover:bg-blue-700"
	>
		← Carregar JSON
	</button>

	<div class="flex-1"></div>

	<button
		onclick={handleReset}
		class="px-3 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
	>
		Limpar
	</button>
</div>

{#if showLoadModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="load-modal-title">
		<div class="bg-white border-4 border-black p-6 max-w-md w-full">
			<h3 id="load-modal-title" class="font-bold font-mono mb-3">Carregar do JSON</h3>
			<textarea
				id="load-json-textarea"
				bind:value={loadJsonText}
				class="w-full border-2 border-black p-2 font-mono text-sm mb-4"
				rows="8"
				placeholder="Cole o JSON aqui..."
				aria-label="JSON content to load"
				aria-describedby="json-help"
			/>
			<p id="json-help" class="text-xs text-gray-600 mb-2">Paste valid automation or command JSON here</p>
			<div class="flex gap-2">
				<button
					onclick={handleLoadFromJSON}
					class="flex-1 px-3 py-2 bg-green-600 text-white border-2 border-black font-mono font-bold hover:bg-green-700"
					aria-label="Load flow from JSON"
				>
					Carregar
				</button>
				<button
					onclick={() => (showLoadModal = false)}
					class="flex-1 px-3 py-2 bg-gray-600 text-white border-2 border-black font-mono font-bold hover:bg-gray-700"
					aria-label="Cancel and close JSON load dialog"
				>
					Cancelar
				</button>
			</div>
		</div>
	</div>
{/if}

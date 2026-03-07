<script lang="ts">
    let { isOpen = false, title, children, class: className = "", onClose } = $props();
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-[#1a1a1a] border-4 border-black p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto {className}">
            <div class="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
                <h2 class="text-2xl font-black uppercase tracking-tighter">{title}</h2>
                {#if onClose}
                    <button
                        onclick={onClose}
                        class="text-2xl font-black text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                {/if}
            </div>
            {@render children()}
        </div>
    </div>
{/if}

<style>
    div :global(.brutal-form-group) {
        margin-bottom: 1rem;
    }

    div :global(.brutal-form-group label) {
        display: block;
        font-weight: bold;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        opacity: 0.7;
        margin-bottom: 0.5rem;
    }

    div :global(.brutal-form-group input),
    div :global(.brutal-form-group textarea),
    div :global(.brutal-form-group select) {
        width: 100%;
        border: 2px solid #000;
        padding: 0.75rem;
        font-family: inherit;
        background: #0a0a0a;
        color: #fff;
    }

    div :global(.brutal-form-group textarea) {
        resize: vertical;
        min-height: 100px;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.875rem;
    }
</style>

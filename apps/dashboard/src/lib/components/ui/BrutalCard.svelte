<script lang="ts">
    let { title, children, class: className = "" } = $props();
</script>

<div class="brutal-card p-6 flex flex-col gap-4 {className}">
    {#if title}
        <div class="border-b-2 border-black/20 pb-2 mb-2">
            <h3 class="text-xs font-black uppercase tracking-widest opacity-50">
                {title}
            </h3>
        </div>
    {/if}
    {@render children()}
</div>

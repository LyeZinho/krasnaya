<script lang="ts">
    let {
        variant = "default",
        children,
        class: className = "",
        ...props
    } = $props();
</script>

<button
    class="brutal-btn {variant === 'red' ? 'brutal-btn-red' : ''} {className}"
    {...props}
>
    {@render children()}
</button>

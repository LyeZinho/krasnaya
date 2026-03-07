<script lang="ts">
  export let label: string = '';
  export let error: string = '';
</script>

<div class="form-group">
  {#if label}
    <label class="form-label">{label}</label>
  {/if}
  <div class="form-control">
    <slot />
  </div>
  {#if error}
    <span class="form-error">{error}</span>
  {/if}
</div>

<style>
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .form-label {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-control {
    position: relative;
  }

  .form-error {
    color: var(--color-brutal-red);
    font-size: 0.875rem;
    font-weight: 600;
  }
</style>

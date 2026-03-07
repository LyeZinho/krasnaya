<script lang="ts">
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let label: string = '';
</script>

<label class="checkbox-wrapper">
  <input
    type="checkbox"
    bind:checked
    {disabled}
    on:change
  />
  <span class="checkbox">{label}</span>
</label>

<style>
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-weight: 600;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-brutal-black);
    background: transparent;
    cursor: pointer;
    accent-color: var(--color-brutal-red);
  }

  input[type="checkbox"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

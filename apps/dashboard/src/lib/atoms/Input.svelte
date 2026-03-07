<script lang="ts">
  export let type: 'text' | 'email' | 'password' | 'number' = 'text';
  export let placeholder: string = '';
  export let value: string = '';
  export let disabled: boolean = false;
  export let hasError: boolean = false;

  let input: HTMLInputElement | undefined;

  export function focus() {
    input?.focus();
  }
</script>

<input
  bind:this={input}
  bind:value
  class="brutal-input"
  class:has-error={hasError}
  {type}
  {placeholder}
  {disabled}
  on:change
  on:input
  on:focus
  on:blur
/>

<style>
  input {
    width: 100%;
  }
</style>

<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  export let disabled: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let onClick: (() => void) | undefined = undefined;
</script>

<button
  class="brutal-btn {variant}"
  {disabled}
  {type}
  on:click={onClick}
>
  <slot />
</button>

<style>
  button {
    width: 100%;
  }
</style>

<script lang="ts">
  export let value: any = '';
  export let options: { label: string; value: any }[] = [];
  export let disabled: boolean = false;
  export let placeholder: string = 'Selecione...';
</script>

<select class="brutal-select" bind:value {disabled} on:change>
  {#if placeholder}
    <option value="" disabled>{placeholder}</option>
  {/if}
  {#each options as option (option.value)}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>

<style>
  select {
    width: 100%;
  }
</style>

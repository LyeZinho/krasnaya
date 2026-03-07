<script lang="ts">
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    if (!$user) {
      goto('/login');
    }
  });
</script>

{#if $user}
  <slot />
{:else}
  <p>Carregando...</p>
{/if}

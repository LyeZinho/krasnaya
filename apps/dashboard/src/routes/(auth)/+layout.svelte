<script lang="ts">
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    // If user is already logged in, redirect to dashboard
    if ($user) {
      goto('/dashboard');
    }
  });
</script>

{#if !$user}
  <slot />
{:else}
  <p>Redirecting...</p>
{/if}

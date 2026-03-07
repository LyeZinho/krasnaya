<script lang="ts">
  import type { Command } from '$lib/types';
  import Card from '$lib/atoms/Card.svelte';
  import Button from '$lib/atoms/Button.svelte';

  export let command: Command;
  export let onEdit: ((cmd: Command) => void) | undefined = undefined;
  export let onDelete: ((id: string) => void) | undefined = undefined;
  export let onToggle: ((id: string, enabled: boolean) => void) | undefined = undefined;
</script>

<Card title="{command.prefix}{command.name}" status={command.enabled ? 'active' : 'idle'}>
  <div class="command-card">
    <div class="command-info">
      <p><strong>Descrição:</strong> {command.description || 'N/A'}</p>
      <p><strong>Aliases:</strong> {command.aliases?.length > 0 ? command.aliases.join(', ') : 'Nenhum'}</p>
      <p><strong>Cooldown:</strong> {command.cooldown}ms</p>
    </div>

    <div class="command-actions">
      {#if onToggle}
        <Button
          variant="secondary"
          on:click={() => onToggle?.(command.id, command.enabled)}
        >
          {command.enabled ? 'DESABILITAR' : 'HABILITAR'}
        </Button>
      {/if}

      {#if onEdit}
        <Button variant="secondary" on:click={() => onEdit?.(command)}>
          EDITAR
        </Button>
      {/if}

      {#if onDelete}
        <Button variant="danger" on:click={() => onDelete?.(command.id)}>
          DELETAR
        </Button>
      {/if}
    </div>
  </div>
</Card>

<style>
  .command-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .command-info {
    flex: 1;
  }

  .command-info p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  .command-actions {
    display: flex;
    gap: 0.75rem;
  }
</style>

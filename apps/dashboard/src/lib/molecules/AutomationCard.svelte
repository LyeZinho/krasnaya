<script lang="ts">
  import type { Automation } from '$lib/types';
  import Card from '$lib/atoms/Card.svelte';
  import Button from '$lib/atoms/Button.svelte';

  export let automation: Automation;
  export let onEdit: ((auto: Automation) => void) | undefined = undefined;
  export let onDelete: ((id: string) => void) | undefined = undefined;
  export let onToggle: ((id: string, enabled: boolean) => void) | undefined = undefined;
</script>

<Card title={automation.name} status={automation.enabled ? 'active' : 'idle'}>
  <div class="automation-card">
    <div class="automation-info">
      <p><strong>Trigger:</strong> {automation.trigger.type}</p>
      <p><strong>Condições:</strong> {automation.conditions.length}</p>
      <p><strong>Ações:</strong> {automation.actions.length}</p>
    </div>

    <div class="automation-actions">
      {#if onToggle}
        <Button
          variant="secondary"
          on:click={() => onToggle?.(automation.id, automation.enabled)}
        >
          {automation.enabled ? 'DESABILITAR' : 'HABILITAR'}
        </Button>
      {/if}

      {#if onEdit}
        <Button variant="secondary" on:click={() => onEdit?.(automation)}>
          EDITAR
        </Button>
      {/if}

      {#if onDelete}
        <Button variant="danger" on:click={() => onDelete?.(automation.id)}>
          DELETAR
        </Button>
      {/if}
    </div>
  </div>
</Card>

<style>
  .automation-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .automation-info {
    flex: 1;
  }

  .automation-info p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  .automation-actions {
    display: flex;
    gap: 0.75rem;
  }
</style>

<script lang="ts">
  export let title: string;
  export let status: 'idle' | 'active' | 'error' = 'idle';
</script>

<div class="brutal-card">
  <header class="card-header">
    <h3>{title}</h3>
    <div class="status-indicator {status}" />
  </header>
  <main class="card-content">
    <slot />
  </main>
</div>

<style>
  .card-header {
    border-bottom: 4px solid var(--color-brutal-black);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    margin: 0;
  }

  .status-indicator {
    width: 12px;
    height: 12px;
    border: 2px solid var(--color-brutal-black);
  }

  .status-indicator.active {
    background: var(--color-brutal-green);
    box-shadow: 0 0 10px var(--color-brutal-green);
  }

  .status-indicator.error {
    background: var(--color-brutal-red);
    box-shadow: 0 0 10px var(--color-brutal-red);
  }

  .status-indicator.idle {
    background: var(--color-brutal-gray);
  }
</style>

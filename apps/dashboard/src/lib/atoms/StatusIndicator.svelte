<script lang="ts">
  export let status: 'online' | 'offline' | 'idle' = 'offline';
</script>

<div class="status-indicator {status}" />

<style>
  .status-indicator {
    width: 12px;
    height: 12px;
    border: 2px solid var(--color-brutal-black);
    border-radius: 50%;
  }

  .status-indicator.online {
    background: var(--color-brutal-green);
    box-shadow: 0 0 10px var(--color-brutal-green);
  }

  .status-indicator.offline {
    background: var(--color-brutal-red);
    box-shadow: 0 0 10px var(--color-brutal-red);
  }

  .status-indicator.idle {
    background: #ffaa00;
    box-shadow: 0 0 10px #ffaa00;
  }
</style>

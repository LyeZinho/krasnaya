<script lang="ts">
  import { notifications } from '$lib/stores/notifications';

  export let position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
</script>

<div class="toast-container {position}">
  {#each $notifications as notif (notif.id)}
    <div class="toast {notif.type}">
      <span class="icon">
        {#if notif.type === 'success'}✓{:else if notif.type === 'error'}✗{:else if notif.type === 'warning'}⚠️{:else}ℹ️{/if}
      </span>
      <span class="message">{notif.message}</span>
      <button
        class="close"
        on:click={() => notifications.remove(notif.id)}
      >
        ✕
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 9999;
    pointer-events: none;
  }

  .toast-container.top-right {
    top: 2rem;
    right: 2rem;
  }

  .toast-container.top-left {
    top: 2rem;
    left: 2rem;
  }

  .toast-container.bottom-right {
    bottom: 2rem;
    right: 2rem;
  }

  .toast-container.bottom-left {
    bottom: 2rem;
    left: 2rem;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--glass-bg);
    backdrop-filter: blur(15px);
    border: 2px solid var(--color-brutal-black);
    box-shadow: 4px 4px 0px var(--color-brutal-black);
    font-weight: 600;
    pointer-events: all;
    animation: slideIn 200ms ease;
  }

  .icon {
    font-size: 1.25rem;
    font-weight: 800;
  }

  .message {
    flex: 1;
  }

  .close {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 800;
    padding: 0.25rem 0.5rem;
    color: inherit;
    opacity: 0.7;
    transition: opacity 100ms;
  }

  .close:hover {
    opacity: 1;
  }

  .toast.success {
    border-color: var(--color-brutal-green);
    color: var(--color-brutal-green);
  }

  .toast.error {
    border-color: var(--color-brutal-red);
    color: var(--color-brutal-red);
  }

  .toast.warning {
    border-color: #ffaa00;
    color: #ffaa00;
  }

  .toast.info {
    border-color: #66ccff;
    color: #66ccff;
  }

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>

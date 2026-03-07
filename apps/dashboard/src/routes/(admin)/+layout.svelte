<script lang="ts">
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Button from '$lib/atoms/Button.svelte';

  let navExpanded = false;

  const adminMenuItems = [
    { label: 'System Monitor', href: '/system', icon: '🖥️' },
    { label: 'Audit Ledger', href: '/ledger', icon: '📋' },
    { label: 'RBAC & Security', href: '/rbac', icon: '🔐' },
  ];

  async function handleLogout() {
    user.clearUser();
    await goto('/login');
  }

  onMount(() => {
    if (!$user || $user.role !== 'admin') {
      goto('/dashboard');
    }
  });
</script>

<div class="admin-layout">
  <aside class="sidebar admin-sidebar">
    <header class="sidebar-header">
      <h1>⚡ ADMIN</h1>
      <button class="hamburger" on:click={() => navExpanded = !navExpanded}>
        {#if navExpanded}✕{:else}☰{/if}
      </button>
    </header>

    <nav class="sidebar-nav" class:expanded={navExpanded}>
      {#each adminMenuItems as item (item.href)}
        <a href={item.href} class="nav-item">
          <span class="icon">{item.icon}</span>
          <span class="label">{item.label}</span>
        </a>
      {/each}
    </nav>

    <footer class="sidebar-footer">
      <div class="user-info admin-badge">
        <span>ADMIN: {$user?.username}</span>
      </div>
      <Button variant="danger" on:click={handleLogout}>
        SAIR
      </Button>
    </footer>
  </aside>

  <main class="admin-content">
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100vh;
    gap: 0;
  }

  .admin-sidebar {
    background: var(--color-brutal-bg);
    border-right: 6px solid var(--color-brutal-red);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .sidebar-header {
    border-bottom: 6px solid var(--color-brutal-red);
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    margin: 0;
    color: var(--color-brutal-red);
    font-size: 1.5rem;
  }

  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .sidebar-nav {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 2px solid transparent;
    color: inherit;
    text-decoration: none;
    transition: all 100ms;
  }

  .nav-item:hover {
    border: 2px solid var(--color-brutal-red);
    background: rgba(204, 51, 51, 0.15);
  }

  .icon {
    font-size: 1.25rem;
  }

  .label {
    font-weight: 700;
    text-transform: uppercase;
  }

  .sidebar-footer {
    border-top: 6px solid var(--color-brutal-red);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-info {
    padding: 0.75rem;
    border: 2px solid var(--color-brutal-red);
    text-align: center;
    font-weight: 700;
  }

  .admin-badge {
    background: rgba(204, 51, 51, 0.1);
  }

  .admin-content {
    overflow-y: auto;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .admin-layout {
      grid-template-columns: 1fr;
    }

    .hamburger {
      display: block;
    }

    .sidebar-nav {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      background: var(--color-brutal-bg);
      border-bottom: 6px solid var(--color-brutal-red);
      max-height: 0;
      overflow: hidden;
      transition: max-height 200ms;
    }

    .sidebar-nav.expanded {
      max-height: 500px;
    }
  }
</style>

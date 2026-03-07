<script lang="ts">
    let { title, status = "idle", children } = $props();
</script>

<div class="brutal-card soviet-card">
    <div class="glass-overlay">
        <header
            class="border-b-4 border-black p-4 flex justify-between items-center"
        >
            <h2 class="text-xl font-bold uppercase tracking-tighter text-white">
                {title}
            </h2>
            <div class="status-indicator {status}"></div>
        </header>

        <main class="p-6">
            {@render children()}
        </main>
    </div>
</div>

<style>
    .soviet-card {
        background: #1a1a1a;
    }

    .glass-overlay {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        height: 100%;
        width: 100%;
    }

    .status-indicator {
        width: 12px;
        height: 12px;
        border: 2px solid #000;
    }

    .active {
        background: #33cc33;
        box-shadow: 0 0 10px #33cc33;
    }
    .idle {
        background: #888;
    }
    .error {
        background: #cc3333;
        box-shadow: 0 0 10px #cc3333;
    }
</style>

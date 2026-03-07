<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<svelte:head>
    <title>KRASNAYA | The People's Framework</title>
</svelte:head>

<div
    class="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
>
    <!-- Propaganda Background Elements -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
            class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-soviet-red)] blur-[150px] rounded-full"
        ></div>
        <div
            class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-soviet-red)] blur-[150px] rounded-full"
        ></div>
    </div>

    {#if mounted}
        <main
            class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
            in:fade={{ duration: 1000 }}
        >
            <div class="space-y-8">
                <header>
                    <h1
                        class="text-7xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none"
                        in:fly={{ y: 50, duration: 800 }}
                    >
                        Kras<span class="text-[var(--color-soviet-red)]"
                            >naya</span
                        >
                    </h1>
                    <p
                        class="text-xl font-mono text-gray-400 mt-4 border-l-4 border-[var(--color-soviet-red)] pl-4 uppercase tracking-widest"
                        in:fly={{ x: -20, delay: 400 }}
                    >
                        The Premier Discord Automation Engine
                    </p>
                </header>

                <p
                    class="text-lg leading-relaxed text-gray-300 max-w-lg"
                    in:fade={{ delay: 600 }}
                >
                    Stop being a luxury support for your own users. Empower the
                    collective with a modular, high-performance framework built
                    on NestJS and SvelteKit.
                </p>

                <div class="flex flex-wrap gap-4" in:fade={{ delay: 800 }}>
                    <a
                        href="/dashboard"
                        class="brutal-card bg-[var(--color-soviet-red)] text-white px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        Enter the Machine
                    </a>
                    <a
                        href="https://github.com/LyeZinho/krasnaya"
                        class="brutal-card bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        Read the Manifesto
                    </a>
                </div>

                <div
                    class="grid grid-cols-3 gap-4 pt-12 border-t border-white/10"
                    in:fade={{ delay: 1000 }}
                >
                    <div>
                        <h3
                            class="text-2xl font-bold text-[var(--color-soviet-red)]"
                        >
                            100%
                        </h3>
                        <p class="text-xs uppercase text-gray-500">Modular</p>
                    </div>
                    <div>
                        <h3
                            class="text-2xl font-bold text-[var(--color-soviet-red)]"
                        >
                            SSE
                        </h3>
                        <p class="text-xs uppercase text-gray-500">
                            Monitoring
                        </p>
                    </div>
                    <div>
                        <h3
                            class="text-2xl font-bold text-[var(--color-soviet-red)]"
                        >
                            Low
                        </h3>
                        <p class="text-xs uppercase text-gray-500">
                            Code/No-Code
                        </p>
                    </div>
                </div>
            </div>

            <div class="relative" in:fly={{ x: 50, duration: 1000 }}>
                <div
                    class="brutal-card p-2 bg-black/40 rotate-1 hover:rotate-0 transition-transform duration-500"
                >
                    <img
                        src="/hero.png"
                        alt="Krasnaya Hero"
                        class="w-full grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                <!-- Decorative Crosshair -->
                <div
                    class="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[var(--color-soviet-red)]"
                ></div>
                <div
                    class="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[var(--color-soviet-red)]"
                ></div>
            </div>
        </main>
    {/if}
</div>

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>

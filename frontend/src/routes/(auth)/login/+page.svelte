<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";
</script>

<div
    class="min-h-screen p-8 flex items-center justify-center bg-[var(--color-soviet-black)]"
>
    <div class="w-full max-w-md">
        <SovietCard title="Admin Login">
            <form class="space-y-6">
                <div>
                    <label class="block font-mono text-sm uppercase mb-2"
                        >Access Key</label
                    >
                    <input
                        type="password"
                        class="w-full bg-black/50 border-2 border-[var(--color-soviet-red)] p-4 text-center tracking-widest font-mono text-xl focus:outline-none focus:bg-white focus:text-black transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <label class="block font-mono text-sm uppercase mb-2"
                        >OTP (2FA)</label
                    >
                    <input
                        type="text"
                        class="w-full bg-black/50 border-2 border-white/20 p-4 text-center tracking-[1em] font-mono text-xl focus:outline-none focus:border-white transition-colors"
                        placeholder="000000"
                        maxlength="6"
                    />
                </div>

                <button
                    type="button"
                    class="w-full bg-[var(--color-soviet-red)] text-white border-4 border-black p-4 font-bold text-lg uppercase tracking-wider hover:bg-red-800 active:translate-y-1 transition-all"
                >
                    Authorize
                </button>
            </form>
        </SovietCard>
    </div>
</div>

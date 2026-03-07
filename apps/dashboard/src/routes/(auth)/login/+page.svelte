<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { AuthService } from '$lib/services/auth.service';
    import { user } from '$lib/stores/user';

    let password = '';
    let otp = '';
    let loading = false;
    let error = '';

    const isDev = import.meta.env.DEV;

    onMount(async () => {
        // Auto-login in development mode
        if (isDev) {
            try {
                loading = true;
                // Simulate login
                const result = await AuthService.login('dev-code');
                user.setUser({
                    ...result.user,
                    role: 'admin',
                    has2FA: false
                });
                // Redirect to dashboard
                await goto('/dashboard');
            } catch (err) {
                console.error('Dev auto-login failed:', err);
            } finally {
                loading = false;
            }
        }
    });

    async function handleLogin(e: Event) {
        e.preventDefault();
        
        if (!password && !isDev) {
            error = 'Access key required';
            return;
        }

        try {
            loading = true;
            error = '';
            
            // In dev mode, skip password check
            if (isDev) {
                const result = await AuthService.login('dev-code');
                user.setUser({
                    ...result.user,
                    role: 'admin',
                    has2FA: false
                });
            } else {
                // Real authentication would happen here
                const result = await AuthService.login('auth-code');
                user.setUser({
                    ...result.user,
                    role: 'admin',
                    has2FA: false
                });
            }

            await goto('/dashboard');
        } catch (err: any) {
            error = err?.message || 'Authentication failed';
            console.error('Login error:', err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen p-8 flex items-center justify-center bg-[#1a1a1a]">
    <div class="w-full max-w-md">
        <BrutalCard title="Admin Authorization">
            {#if isDev}
                <div class="mb-4 p-4 bg-yellow-500/10 border-2 border-yellow-500 text-yellow-500 text-xs font-mono uppercase">
                    🚀 DEVELOPMENT MODE - Auto-login enabled
                </div>
            {/if}

            <form class="space-y-6" on:submit={handleLogin}>
                {#if !isDev}
                    <div>
                        <label
                            for="access-key"
                            class="block font-mono text-sm uppercase mb-2 text-white/60"
                            >Access Key</label
                        >
                        <input
                            id="access-key"
                            type="password"
                            bind:value={password}
                            class="w-full bg-black/50 border-4 border-black p-4 text-center tracking-widest font-mono text-xl focus:outline-none focus:bg-white focus:text-black transition-colors text-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label
                            for="otp-input"
                            class="block font-mono text-sm uppercase mb-2 text-white/60"
                            >OTP (2FA)</label
                        >
                        <input
                            id="otp-input"
                            type="text"
                            bind:value={otp}
                            class="w-full bg-black/50 border-4 border-black p-4 text-center tracking-[1em] font-mono text-xl focus:outline-none focus:border-white transition-colors text-white"
                            placeholder="000000"
                            maxlength="6"
                        />
                    </div>
                {/if}

                {#if error}
                    <div class="p-3 bg-red-500/10 border-2 border-red-500 text-red-500 text-xs font-mono">
                        {error}
                    </div>
                {/if}

                <BrutalButton 
                    variant="red" 
                    class="w-full text-lg p-6"
                    disabled={loading}
                >
                    {loading ? 'Authorizing...' : isDev ? 'Enter Development Mode' : 'Authorize Session'}
                </BrutalButton>
            </form>
        </BrutalCard>
    </div>
</div>

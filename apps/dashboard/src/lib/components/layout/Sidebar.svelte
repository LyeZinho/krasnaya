<script lang="ts">
    import {
        LayoutDashboard,
        Zap,
        Database,
        ShieldAlert,
        Activity,
        History,
        Settings,
        Terminal,
        Layers,
        Image as ImageIcon,
        ShoppingBag,
        LogOut,
    } from "lucide-svelte";
    import { page } from "$app/state";
    import { clsx } from "clsx";
    import { user } from "$lib/stores/user";
    import { goto } from "$app/navigation";

    const isActive = (path: string) => page.url.pathname === path;

    async function handleLogout() {
        user.clearUser();
        await goto("/login");
    }
</script>

<div class="w-64 h-screen border-r-4 border-black bg-[#121212] flex flex-col">
    <div class="p-6 border-b-4 border-black">
        <div class="flex items-center gap-2 mb-4">
            <Terminal class="text-red-600" size={24} />
            <h1
                class="text-xl font-black tracking-tighter uppercase text-white"
            >
                Krasnaya
            </h1>
        </div>

        <div class="flex items-center gap-2">
            <div
                class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
            ></div>
            <span
                class="text-[10px] font-bold uppercase tracking-tighter text-white"
                >System Operational</span
            >
        </div>
    </div>

    <div class="flex-1 overflow-y-auto py-4">
        <div
            class="px-6 mb-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]"
        >
            Management
        </div>

        <a
            href="/dashboard"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/dashboard")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <LayoutDashboard size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Dashboard</span
            >
        </a>

        <a
            href="/flows"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/flows")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <Zap size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Automations</span
            >
        </a>

        <a
            href="/commands"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/commands")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <Terminal size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Commands</span
            >
        </a>

        <a
            href="/cards"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/cards")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <ImageIcon size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Cards</span
            >
        </a>

        <a
            href="/modules"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/modules")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <Layers size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Modules</span
            >
        </a>

        <a
            href="/database"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/database")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <Database size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Variables</span
            >
        </a>

        <div
            class="px-6 mt-8 mb-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]"
        >
            System Admin
        </div>

        <a
            href="/admin/system"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/admin/system")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <Activity size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Monitor</span
            >
        </a>

        <a
            href="/admin/ledger"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/admin/ledger")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <History size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Audit Ledger</span
            >
        </a>

        <a
            href="/admin/rbac"
            class={clsx(
                "flex items-center gap-3 p-3 transition-all border-l-4",
                isActive("/admin/rbac")
                    ? "bg-white/10 border-red-600 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5",
            )}
        >
            <ShieldAlert size={18} />
            <span class="text-xs font-bold uppercase tracking-widest"
                >Security</span
            >
        </a>
    </div>

    <div class="p-6 border-t-4 border-black bg-black/20 flex flex-col gap-3">
        {#if $user}
            <div class="text-[10px] font-bold text-white/50 text-center mb-2">
                {$user.username}
            </div>
            <button
                on:click={handleLogout}
                class="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border-2 border-red-600 text-red-400 uppercase text-xs font-bold transition-all"
            >
                <LogOut size={14} />
                Logout
            </button>
        {/if}
        <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold opacity-30">V.2.5.0-STABLE</div>
            <Settings
                size={14}
                class="opacity-30 hover:opacity-100 cursor-pointer"
            />
        </div>
    </div>
</div>

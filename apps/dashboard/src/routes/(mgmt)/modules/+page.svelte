<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import {
        Shield,
        Zap,
        MessageSquare,
        ShieldAlert,
        Coins,
        Users,
        Search,
        Trophy,
        Music,
        Gamepad2,
        Ticket,
        Gift,
        Star,
        Tv,
        Youtube,
        MousePointerClick,
        Clock,
        Repeat,
        BarChart3,
        Hammer,
        Flame,
        Inbox,
        BellRing,
    } from "lucide-svelte";

    let modules = [
        {
            id: "leveling",
            name: "System Leveling",
            description: "Reward active comrades with XP and ranks.",
            icon: Zap,
            enabled: true,
            color: "text-amber-500",
        },
        {
            id: "welcomer",
            name: "Greeting Protocol",
            description: "Dispatch automated welcomes to new arrivals.",
            icon: MessageSquare,
            enabled: true,
            color: "text-blue-500",
        },
        {
            id: "automod",
            name: "Auto-Censorship",
            description: "Maintain order by filtering prohibited content.",
            icon: ShieldAlert,
            enabled: false,
            color: "text-red-500",
        },
        {
            id: "economy",
            name: "Resource Exchange",
            description: "Manage internal currency and market items.",
            icon: Coins,
            enabled: true,
            color: "text-emerald-500",
        },
        {
            id: "verification",
            name: "Identity Check",
            description: "Verify new members through specific protocols.",
            icon: Shield,
            enabled: false,
            color: "text-purple-500",
        },
        {
            id: "logging",
            name: "Surveillance",
            description: "Log every action to the central ledger.",
            icon: Search,
            enabled: true,
            color: "text-white",
        },
        {
            id: "ranks",
            name: "Global Hierarchy",
            description: "Track leadership across all sectors.",
            icon: Trophy,
            enabled: false,
            color: "text-yellow-400",
        },
        {
            id: "music",
            name: "Sonic Broadcast",
            description: "Stream high-fidelity audio to voice channels.",
            icon: Music,
            enabled: true,
            color: "text-pink-500",
        },
        {
            id: "games",
            name: "Recreational Unit",
            description: "Interactive games for crew morale.",
            icon: Gamepad2,
            enabled: false,
            color: "text-indigo-400",
        },
        {
            id: "tickets",
            name: "Direct Appeal",
            description: "Formal support ticket system for comrades.",
            icon: Ticket,
            enabled: true,
            color: "text-cyan-400",
        },
        {
            id: "giveaways",
            name: "State Lottery",
            description: "Manage resource redistribution events.",
            icon: Gift,
            enabled: false,
            color: "text-orange-500",
        },
        {
            id: "starboard",
            name: "Hall of Honor",
            description: "Preserve legendary transmissions.",
            icon: Star,
            enabled: true,
            color: "text-yellow-200",
        },
        {
            id: "twitch",
            name: "Twitch Relay",
            description: "Monitor and alert on external broadcasts.",
            icon: Tv,
            enabled: false,
            color: "text-purple-600",
        },
        {
            id: "youtube",
            name: "Visual Archive",
            description: "Sync with state-approved video channels.",
            icon: Youtube,
            enabled: false,
            color: "text-red-600",
        },
        {
            id: "reactionrolls",
            name: "Interactive Roles",
            description: "Assign duties via symbolic reactions.",
            icon: MousePointerClick,
            enabled: true,
            color: "text-emerald-300",
        },
        {
            id: "tempchannels",
            name: "Tactical Channels",
            description: "Dynamic temporary voice frequencies.",
            icon: Clock,
            enabled: false,
            color: "text-slate-400",
        },
        {
            id: "autoresponder",
            name: "Auto-Response",
            description: "Pre-recorded answers for common queries.",
            icon: Repeat,
            enabled: true,
            color: "text-sky-300",
        },
        {
            id: "stats",
            name: "Demographics",
            description: "Real-time server growth analytics.",
            icon: BarChart3,
            enabled: true,
            color: "text-lime-400",
        },
        {
            id: "moderation",
            name: "Disciplinary Action",
            description: "Advanced ban, kick, and mute tools.",
            icon: Hammer,
            enabled: true,
            color: "text-red-400",
        },
        {
            id: "antiraid",
            name: "Incursion Shield",
            description: "Rapid response to automated attacks.",
            icon: Flame,
            enabled: false,
            color: "text-orange-600",
        },
        {
            id: "suggestions",
            name: "Suggestion Box",
            description: "Gather feedback for the collective.",
            icon: Inbox,
            enabled: true,
            color: "text-blue-300",
        },
        {
            id: "reminders",
            name: "Duty Schedule",
            description: "Automated reminders for essential tasks.",
            icon: BellRing,
            enabled: false,
            color: "text-zinc-300",
        },
    ];

    function toggleModule(id: string) {
        modules = modules.map((m) =>
            m.id === id ? { ...m, enabled: !m.enabled } : m,
        );
    }
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Central Command
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Bot Modules
            </h1>
        </div>
        <div class="flex items-center gap-4">
            <div
                class="bg-blue-950/20 text-blue-500 border border-blue-500/50 px-4 py-2 flex items-center gap-2"
            >
                <span class="text-[10px] font-black uppercase tracking-widest"
                    >{modules.filter((m) => m.enabled).length} ACTIVE UNITS</span
                >
            </div>
        </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each modules as mod}
            <div
                class="brutal-card p-6 bg-[#1a1a1a] relative group overflow-hidden"
            >
                <!-- Status Bar -->
                <div
                    class="absolute top-0 left-0 w-full h-1 {mod.enabled
                        ? 'bg-emerald-500'
                        : 'bg-red-600'}"
                />

                <div class="flex justify-between items-start mb-6">
                    <div class="p-3 bg-black border-2 border-black {mod.color}">
                        <mod.icon size={24} />
                    </div>
                    <button
                        onclick={() => toggleModule(mod.id)}
                        aria-label="Toggle {mod.name} module"
                        class="w-12 h-6 border-2 border-black relative transition-colors {mod.enabled
                            ? 'bg-emerald-500'
                            : 'bg-red-600'}"
                    >
                        <div
                            class="absolute top-0 w-5 h-full bg-white border-2 border-black transition-all {mod.enabled
                                ? 'left-full -translate-x-full'
                                : 'left-0'}"
                        />
                    </button>
                </div>

                <h3
                    class="text-lg font-black uppercase tracking-tight mb-2 text-white"
                >
                    {mod.name}
                </h3>
                <p
                    class="text-xs text-white/40 font-bold uppercase tracking-wide leading-relaxed mb-6"
                >
                    {mod.description}
                </p>

                <div class="flex gap-2">
                    <BrutalButton
                        class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white"
                    >
                        Configure
                    </BrutalButton>
                    {#if mod.enabled}
                        <div
                            class="px-3 flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/50"
                        >
                            <span
                                class="text-[8px] font-black uppercase tracking-widest"
                                >Active</span
                            >
                        </div>
                    {:else}
                        <div
                            class="px-3 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/50"
                        >
                            <span
                                class="text-[8px] font-black uppercase tracking-widest"
                                >Offline</span
                            >
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <BrutalCard title="Module Analytics" class="mt-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            {#each Array(4) as _, i}
                <div class="space-y-1">
                    <div
                        class="text-[9px] font-black uppercase opacity-30 tracking-[0.2em]"
                    >
                        Module_Metric_{i}
                    </div>
                    <div class="text-3xl font-black tracking-tighter">
                        {(Math.random() * 100).toFixed(1)}%
                    </div>
                    <div class="w-full h-1 bg-black">
                        <div
                            class="h-full bg-red-600"
                            style="width: {Math.random() * 100}%"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </BrutalCard>
</div>

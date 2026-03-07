<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import { ShieldAlert, UserCheck, Key, Lock } from "lucide-svelte";
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Access Control
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Security & RBAC
            </h1>
        </div>
        <div class="flex items-center gap-4">
            <div
                class="bg-emerald-950/20 text-emerald-500 border border-emerald-500/50 px-4 py-2 flex items-center gap-2"
            >
                <Lock size={14} />
                <span class="text-[10px] font-black uppercase tracking-widest"
                    >Enforcement Active</span
                >
            </div>
        </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Role List -->
        <BrutalCard title="Role Definitions" class="lg:col-span-1">
            <div class="space-y-3">
                <div
                    class="p-4 bg-red-600 border-4 border-black shadow-[4px_4px_0px_#000] text-white"
                >
                    <div class="flex justify-between items-center">
                        <span class="font-black uppercase text-xs"
                            >General Secretary</span
                        >
                        <ShieldAlert size={14} />
                    </div>
                    <div class="text-[9px] font-bold opacity-60 uppercase mt-1">
                        Full System Access
                    </div>
                </div>
                <div
                    class="p-4 bg-white/5 border-4 border-black hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <div class="flex justify-between items-center text-white">
                        <span class="font-black uppercase text-xs"
                            >Commissar</span
                        >
                        <UserCheck size={14} class="opacity-30" />
                    </div>
                    <div class="text-[9px] font-bold opacity-40 uppercase mt-1">
                        Moderation & Economy
                    </div>
                </div>
                <div
                    class="p-4 bg-white/5 border-4 border-black hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <div class="flex justify-between items-center text-white">
                        <span class="font-black uppercase text-xs">Worker</span>
                        <Key size={14} class="opacity-30" />
                    </div>
                    <div class="text-[9px] font-bold opacity-40 uppercase mt-1">
                        Standard Dashboard Use
                    </div>
                </div>
            </div>

            <BrutalButton
                class="w-full mt-6 bg-transparent border-dashed text-white/30 border-white/10"
                >+ New Role</BrutalButton
            >
        </BrutalCard>

        <!-- Permissions Grid -->
        <BrutalCard
            title="Permission Matrix (General Secretary)"
            class="lg:col-span-2"
        >
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div
                        class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"
                    >
                        <span
                            class="text-[10px] font-black uppercase tracking-widest"
                            >Manage Automations</span
                        >
                        <div
                            class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"
                        >
                            <div
                                class="w-4 h-4 bg-white border-2 border-black ml-auto"
                            ></div>
                        </div>
                    </div>
                    <div
                        class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"
                    >
                        <span
                            class="text-[10px] font-black uppercase tracking-widest"
                            >Execute Commands</span
                        >
                        <div
                            class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"
                        >
                            <div
                                class="w-4 h-4 bg-white border-2 border-black ml-auto"
                            ></div>
                        </div>
                    </div>
                    <div
                        class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"
                    >
                        <span
                            class="text-[10px] font-black uppercase tracking-widest"
                            >Access Ledger</span
                        >
                        <div
                            class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"
                        >
                            <div
                                class="w-4 h-4 bg-white border-2 border-black ml-auto"
                            ></div>
                        </div>
                    </div>
                    <div
                        class="p-4 border-2 border-black bg-black/40 flex justify-between items-center"
                    >
                        <span
                            class="text-[10px] font-black uppercase tracking-widest"
                            >Modify Economy</span
                        >
                        <div
                            class="w-10 h-6 bg-red-600 border-2 border-black flex items-center px-1"
                        >
                            <div
                                class="w-4 h-4 bg-white border-2 border-black ml-auto"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-red-950/20 border-l-4 border-red-600">
                    <h4
                        class="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2"
                    >
                        Danger Zone
                    </h4>
                    <p class="text-xs opacity-60 mb-4">
                        Roles with 'Full System Access' can delete the entire
                        database and revoke administrator access.
                    </p>
                    <BrutalButton
                        variant="red"
                        class="py-2 px-4 shadow-none border-2"
                        >Revoke All Admin Tokens</BrutalButton
                    >
                </div>
            </div>
        </BrutalCard>
    </div>
</div>

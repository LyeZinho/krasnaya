<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import BrutalButton from "$lib/components/ui/BrutalButton.svelte";
    import { Database, Search, Code } from "lucide-svelte";
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Knowledge Base
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Global Variables
            </h1>
        </div>
        <div class="relative">
            <Search
                class="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                size={16}
            />
            <input
                type="text"
                placeholder="Search variables..."
                class="bg-black/40 border-4 border-black pl-10 pr-4 py-2 font-mono text-xs focus:bg-white focus:text-black focus:outline-none transition-all w-64"
            />
        </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3">
            <BrutalCard title="Registry">
                <div class="overflow-x-auto">
                    <table class="w-full text-left font-mono text-sm">
                        <thead>
                            <tr
                                class="border-b-2 border-black/20 text-[10px] font-bold uppercase tracking-widest opacity-40"
                            >
                                <th class="py-4">Key</th>
                                <th class="py-4">Value</th>
                                <th class="py-4">Created</th>
                                <th class="py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            <tr>
                                <td class="py-4 text-emerald-500"
                                    >GLOBAL_BONUS_XP</td
                                >
                                <td class="py-4">1.5</td>
                                <td class="py-4 opacity-40">2026-03-01</td>
                                <td class="py-4 text-right">
                                    <button
                                        class="px-2 py-1 bg-white/5 border border-white/20 hover:border-red-500 transition-colors uppercase text-[10px] font-bold"
                                        >Override</button
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td class="py-4 text-emerald-500"
                                    >MAINTENANCE_MODE</td
                                >
                                <td class="py-4">false</td>
                                <td class="py-4 opacity-40">2026-02-28</td>
                                <td class="py-4 text-right">
                                    <button
                                        class="px-2 py-1 bg-white/5 border border-white/20 hover:border-red-500 transition-colors uppercase text-[10px] font-bold"
                                        >Override</button
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </BrutalCard>
        </div>

        <div class="space-y-6">
            <BrutalCard title="Metadata stats">
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] font-bold uppercase opacity-40"
                            >Total Keys</span
                        >
                        <span class="font-bold">142</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] font-bold uppercase opacity-40"
                            >Last Update</span
                        >
                        <span class="font-bold text-xs">2m ago</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] font-bold uppercase opacity-40"
                            >Memory Cost</span
                        >
                        <span class="font-bold">12KB</span>
                    </div>
                </div>
            </BrutalCard>

            <BrutalButton
                class="w-full border-dashed bg-transparent border-white/20 text-white/40 hover:text-white hover:border-white"
            >
                <Code size={16} class="mr-2" /> JSON View
            </BrutalButton>
        </div>
    </div>
</div>

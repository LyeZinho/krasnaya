<script lang="ts">
    import BrutalCard from "$lib/components/ui/BrutalCard.svelte";
    import { History, Download, Filter } from "lucide-svelte";
</script>

<div class="space-y-8">
    <header class="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2"
            >
                Immutable History
            </h2>
            <h1 class="text-5xl font-black uppercase tracking-tighter">
                Audit Ledger
            </h1>
        </div>
        <div class="flex gap-4">
            <button
                class="brutal-btn flex items-center gap-2 py-2 px-4 shadow-[2px_2px_0px_#000] text-xs"
            >
                <Filter size={14} /> Filter
            </button>
            <button
                class="brutal-btn-red brutal-btn flex items-center gap-2 py-2 px-4 shadow-[2px_2px_0px_#000] text-xs"
            >
                <Download size={14} /> Export CSV
            </button>
        </div>
    </header>

    <BrutalCard title="Log Registry">
        <div class="overflow-x-auto mt-4">
            <table class="w-full text-left font-mono text-xs">
                <thead>
                    <tr
                        class="border-b-2 border-black/20 text-[10px] font-black uppercase tracking-widest opacity-40"
                    >
                        <th class="py-4 px-2">Timestamp</th>
                        <th class="py-4 px-2">Operator</th>
                        <th class="py-4 px-2">Action</th>
                        <th class="py-4 px-2">Entity</th>
                        <th class="py-4 px-2">Change</th>
                        <th class="py-4 px-2 text-right">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {#each Array(8) as _, i}
                        <tr class="hover:bg-white/[0.02] transition-colors">
                            <td class="py-4 px-2 opacity-30"
                                >2026-03-07 14:55:12</td
                            >
                            <td
                                class="py-4 px-2 font-bold uppercase tracking-tight"
                                >System_Automator</td
                            >
                            <td
                                class="py-4 px-2 text-blue-500 font-bold uppercase"
                                >Update_Variable</td
                            >
                            <td class="py-4 px-2">GLOBAL_EXP</td>
                            <td class="py-4 px-2"
                                ><span class="text-red-500">1.2</span> →
                                <span class="text-emerald-500">1.5</span></td
                            >
                            <td class="py-4 px-2 text-right">
                                <span
                                    class="text-[8px] font-black uppercase bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 border border-emerald-500/50"
                                    >Verified</span
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <div class="mt-8 flex justify-center gap-4">
            <button
                class="opacity-20 hover:opacity-100 transition-opacity font-black uppercase text-xs"
                >Previous Page</button
            >
            <span class="font-black text-xs">01 / 45</span>
            <button class="hover:text-red-500 font-black uppercase text-xs"
                >Next Page</button
            >
        </div>
    </BrutalCard>
</div>

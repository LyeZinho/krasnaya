<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";

    let logs = [
        {
            id: 1042,
            actor: "System Worker",
            action: "UPDATE_BOT_CONFIG",
            target: "Auto-Role",
            time: "14:32:01",
        },
        {
            id: 1041,
            actor: "pedro (Admin)",
            action: "MODIFY_RBAC",
            target: "Role: Mod",
            time: "14:15:22",
        },
        {
            id: 1040,
            actor: "pedro (Admin)",
            action: "LOGIN_SUCCESS",
            target: "System",
            time: "14:10:05",
        },
        {
            id: 1039,
            actor: "System Worker",
            action: "CREATE_FLOW",
            target: "Welcome Msg",
            time: "13:00:11",
        },
    ];
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold tracking-widest text-[var(--color-soviet-red)] uppercase border-b-4 border-black inline-block pb-2"
        >
            Audit Ledger
        </h1>
    </header>

    <SovietCard title="System Activity">
        <table class="w-full text-left font-mono text-sm">
            <thead class="bg-black/80 text-white">
                <tr>
                    <th class="p-3 border-2 border-black">ID</th>
                    <th class="p-3 border-2 border-black">Timestamp</th>
                    <th class="p-3 border-2 border-black">Actor</th>
                    <th class="p-3 border-2 border-black">Action</th>
                    <th class="p-3 border-2 border-black">Target</th>
                    <th class="p-3 border-2 border-black">Details</th>
                </tr>
            </thead>
            <tbody>
                {#each logs as log}
                    <tr
                        class="bg-black/30 hover:bg-black/50 transition-colors border-b border-white/10"
                    >
                        <td class="p-3 border-2 border-black text-gray-500"
                            >#{log.id}</td
                        >
                        <td class="p-3 border-2 border-black text-gray-400"
                            >{log.time}</td
                        >
                        <td
                            class="p-3 border-2 border-black font-bold text-white"
                            >{log.actor}</td
                        >
                        <td
                            class="p-3 border-2 border-black text-[var(--color-soviet-red)]"
                            >{log.action}</td
                        >
                        <td class="p-3 border-2 border-black text-gray-300"
                            >{log.target}</td
                        >
                        <td class="p-3 border-2 border-black">
                            <button
                                class="bg-white text-black px-2 py-1 border border-black hover:bg-gray-200 text-xs font-bold"
                                >INSPECT</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </SovietCard>
</div>

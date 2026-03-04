<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold tracking-widest text-white uppercase border-b-4 border-[var(--color-soviet-red)] inline-block pb-2"
        >
            Custom Commands
        </h1>
    </header>

    <div class="grid grid-cols-1 gap-8">
        <SovietCard title="Registered Commands">
            <div class="flex justify-end mb-4">
                <button
                    class="bg-[var(--color-soviet-red)] text-white font-bold p-2 px-6 border-2 border-black hover:bg-red-700 uppercase"
                >
                    + Add Command
                </button>
            </div>
            <table class="w-full text-left font-mono">
                <thead class="bg-black/80 text-[var(--color-soviet-red)]">
                    <tr>
                        <th class="p-3 border-2 border-black">Prefix/Trigger</th
                        >
                        <th class="p-3 border-2 border-black">Description</th>
                        <th class="p-3 border-2 border-black">Linked Flow</th>
                        <th class="p-3 border-2 border-black">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-black/30 hover:bg-black/50 transition-colors">
                        <td
                            class="p-3 border-2 border-black font-bold text-white"
                            >!warn</td
                        >
                        <td class="p-3 border-2 border-black text-gray-300"
                            >Avisa um membro</td
                        >
                        <td class="p-3 border-2 border-black text-blue-400"
                            >Flow: Warn Logging</td
                        >
                        <td class="p-3 border-2 border-black">
                            <button
                                class="bg-white text-black px-4 py-1 border border-black hover:bg-gray-200"
                                >EDIT</button
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </SovietCard>
    </div>
</div>

<script lang="ts">
    import SovietCard from "$lib/components/SovietCard.svelte";
</script>

<div class="min-h-screen p-8">
    <header class="mb-12">
        <h1
            class="text-4xl font-extrabold tracking-widest text-[var(--color-soviet-red)] uppercase border-b-4 border-black inline-block pb-2"
        >
            RBAC & Security
        </h1>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SovietCard title="Negative Access Matrix">
            <p class="text-sm text-gray-400 font-mono mb-6">
                Define strict denials for roles. By default, access is denied.
                Actions checked here will be EXPLICITLY DENIED even if the user
                has admin rights.
            </p>

            <div class="space-y-4 font-mono">
                <div
                    class="border-2 border-[var(--color-soviet-red)] bg-black/40 p-4"
                >
                    <div
                        class="flex justify-between items-center border-b border-gray-600 pb-2 mb-2"
                    >
                        <h3 class="font-bold text-white uppercase">
                            Role: Moderators
                        </h3>
                        <span class="text-xs text-[var(--color-soviet-red)]"
                            >2 Denials</span
                        >
                    </div>
                    <div class="space-y-2">
                        <label
                            class="flex items-center space-x-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked
                                class="w-5 h-5 accent-[var(--color-soviet-red)]"
                            />
                            <span class="text-gray-300"
                                >DENY: bot.config.edit</span
                            >
                        </label>
                        <label
                            class="flex items-center space-x-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked
                                class="w-5 h-5 accent-[var(--color-soviet-red)]"
                            />
                            <span class="text-gray-300"
                                >DENY: rbac.roles.manage</span
                            >
                        </label>
                        <label
                            class="flex items-center space-x-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                class="w-5 h-5 accent-[var(--color-soviet-red)]"
                            />
                            <span class="text-gray-500">DENY: flows.create</span
                            >
                        </label>
                    </div>
                </div>
            </div>

            <button
                class="w-full mt-6 bg-white text-black font-bold p-3 border-2 border-black hover:bg-gray-200"
            >
                ADD NEW ROLE RULE
            </button>
        </SovietCard>
    </div>
</div>

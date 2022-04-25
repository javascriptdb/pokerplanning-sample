<script>
    import {auth} from "@jsdb/sdk";

    export let game;

    let displayName;

    function saveDisplayName() {
        game.displayNames[auth.userId] = displayName;
    }
</script>


{#if !$game?.displayNames?.[auth.userId]}
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                    <div>
                        <label for="displayName" class="block text-sm font-medium text-gray-700">Display
                            name</label>
                        <div class="mt-1">
                            <input bind:value={displayName} placeholder="Enter your display name..."
                                   id="displayName"
                                   name="displayName" type="text" required
                                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6">
                    <button on:click={saveDisplayName} type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm">
                        Save display name
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}


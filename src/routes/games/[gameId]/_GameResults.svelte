<script>
    import {auth} from "@jsdb/sdk";

    export let game;
    let average, mostVoted, mostVotedCount = 0, histrogram = {};

    function startNewVoting() {
        game.votes = {};
        game.status = 'VOTING';
    }

    $: {
        // Compute stats
        mostVotedCount = 0;
        histrogram = {};
        const voteEntries = Object.entries($game?.votes || {});
        let total = 0;
        voteEntries.forEach(([, vote]) => {
            if (Number.isFinite(Number(vote))) {
                total += Number(vote);
            }
            if (!histrogram[vote]) {
                histrogram[vote] = 0;
            }
            histrogram[vote]++;
        })
        Object.entries(histrogram).forEach(([vote, count]) => {
            if (count > mostVotedCount) {
                mostVoted = vote;
                mostVotedCount = count;
            }
        })
        average = (total / voteEntries.length).toFixed(1);
    }
</script>

{#if $game?.status === 'FINISHED'}
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <h2 class="font-bold mb-2">Voting Results</h2>
                <div class="flex space-x-10 mb-10">
                    <div class="flex justify-center items-center flex-col">
                        <div class="border-rose-600 bg-rose-200 block w-10 h-16 border-2 rounded-lg flex items-center justify-center">
                            {average}
                        </div>
                        <span>Average</span>
                    </div>
                    <div class="flex justify-center items-center flex-col">
                        <div class="block w-10 h-16 border-2 border-gray-400 bg-gray-200 rounded-lg flex items-center justify-center">
                            {mostVoted}
                        </div>
                        <span>Top vote - {mostVotedCount} times</span>
                    </div>
                </div>
                <h2 class="font-bold mb-2">Player votes</h2>
                <div class="flex space-x-10 mb-2">
                    {#each Object.entries($game?.votes || {}) as [userId, vote]}
                        <div class="flex justify-center items-center flex-col">
                            <div class="block w-10 h-16 border-2 border-gray-400 bg-gray-200 rounded-lg flex items-center justify-center">
                                {vote}
                            </div>
                            <span>{$game?.displayNames?.[userId]}</span>
                        </div>
                    {/each}
                </div>
                {#if $game?.userId === auth.userId}
                    <div class="mt-5 sm:mt-6">
                        <button on:click={startNewVoting} type="button"
                                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm">
                            Start new voting
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}


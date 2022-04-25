<script>
    import {page} from "$app/stores";
    import {auth, DatabaseArray} from "@jsdb/sdk";
    import DisplayNameModal from "./_DisplayNameModal.svelte";
    import PlayersCard from "./_PlayersCard.svelte";
    import GameResults from "./_GameResults.svelte";
    import {onDestroy} from "svelte";

    let games = new DatabaseArray('games');
    let game = games[$page.params.gameId];
    let playerSliceA = [];
    let playerSliceB = [];
    let pendingDisplayNames = [];

    function startVoting() {
        game.votes = {}
        game.status = 'VOTING'
    }

    function vote(votingOption) {
        game.votes[auth.userId] = votingOption;
    }

    function finishGame() {
        game.status = 'FINISHED'
    }

    onDestroy(() => {
        delete game.votes[auth.userId];
        delete game.displayNames[auth.userId];
    })

    $: {
        // Split players into two halves to display on both side of the board
        const entries = Object.entries($game?.displayNames || {});
        const half = Math.ceil(entries.length / 2);
        playerSliceA = entries.slice(0, half)
        playerSliceB = entries.slice(half)

        // Get list of pending users
        const pendingEntries = entries.filter(([userId]) => !$game?.votes?.[userId])

        pendingDisplayNames = pendingEntries.map(([, displayName]) => displayName)
    }
</script>

{#if $game}
    <DisplayNameModal {game}/>
    <GameResults {game}/>

    <section class="flex flex-col h-screen">
        <div class="flex p-2 bg-gray-100 flex place-content-between items-center">
            <h2 class="font-bold text-3xl text-rose-600">{$game.name}</h2>
            <p class="text-lg flex items-center text-rose-600 mr-4">Hi {$game.displayNames?.[auth.userId]}!
                <!--                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"-->
                <!--                     stroke="currentColor" stroke-width="2">-->
                <!--                    <path stroke-linecap="round" stroke-linejoin="round"-->
                <!--                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>-->
                <!--                </svg>-->
            </p>
        </div>
        <div class="flex-1 flex items-center justify-center p-2">

            <div class="w-full sm:w-2/3 md:w-1/3 ">
                <div id="players-top" class="flex items-center justify-center place-content-between space-x-10 pb-2">
                    {#each playerSliceA as [userId, displayName] (userId)}
                        <PlayersCard {game} {userId} {displayName}/>
                    {/each}
                </div>

                <div id="board"
                     class="rounded-3xl bg-rose-600 h-40 space-y-2 flex flex-col items-center justify-center text-white">
                    {#if $game.status === 'VOTING'}
                        {#if $game.votes?.[auth.userId]}
                            {#if pendingDisplayNames.length > 0}
                                Waiting for {pendingDisplayNames.join(',')}
                            {:else}
                                Waiting for admin to finish round
                            {/if}
                        {:else}
                            Waiting for your vote
                        {/if}
                    {/if}
                </div>

                <div id="players-bottom" class="flex items-center justify-center place-content-between space-x-10 pt-2">
                    {#each playerSliceB as [userId, displayName] (userId)}
                        <PlayersCard {game} {userId} {displayName}/>
                    {/each}
                </div>
                {#if $game?.userId === auth.userId}
                    <div id="board-controls" class="flex items-center justify-center space-x-2">
                        {#if pendingDisplayNames.length < Object.keys($game.votes || {}).length}
                            <button on:click={finishGame}
                                    class="rounded bg-white text-gray-500 p-2 hover:ring-2">Finish
                                Round
                            </button>
                        {/if}
                        <button on:click={startVoting} class="rounded bg-white text-gray-500 p-2 hover:ring-2">Reset
                            Voting
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        <div class="p-4 bg-gray-100 flex justify-center flex-col items-center">
            <h1 class="flex items-center">Voting Options
                <!--{#if $game?.userId === auth.userId}-->
                <!--    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"-->
                <!--         stroke="currentColor" stroke-width="2">-->
                <!--        <path stroke-linecap="round" stroke-linejoin="round"-->
                <!--              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>-->
                <!--    </svg>-->
                <!--{/if}-->
            </h1>
            <div class="py-4 flex space-x-1 justify-center items-center">
                {#each $game.votingOptions as votingOption, index (index)}
                    <div on:click={()=>vote(votingOption)}
                         class="block w-10 h-16 border-2 {$game.votes?.[auth.userId] === votingOption ? 'border-rose-600' : 'border-gray-400'} rounded-lg flex items-center justify-center cursor-pointer">
                        {votingOption}
                    </div>
                {/each}
            </div>
        </div>
    </section>
{/if}





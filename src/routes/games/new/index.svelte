<script>
    import {auth, DatabaseMap} from "@jsdb/sdk";
    import {goto} from "$app/navigation";

    let values = {
        name: "",
        userId: auth.userId,
        createdAt: new Date(),
        votingOptions: "0,1,2,3,5,8,13,21,?",
        status: 'VOTING'
    };
    let games = new DatabaseMap('games');

    async function save() {
        let gameId = values.name.replace(/[^a-zA-Z ]/g, "").replaceAll(' ', '-') + '-' + Date.now();
        values.votingOptions = values.votingOptions.replaceAll(' ', '').split(',')
        games[gameId] = values;
        await goto(`/games/${gameId}`);
    }
</script>

<section class="page">
    <form class="bg-white space-y-8 divide-y divide-gray-200 shadow p-6">
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Create a new game</h3>
                </div>

                <div class="mt-6 flex flex-col space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700"> Game name </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="name" id="name" bind:value={values.name}
                                   placeholder="Cool company name here..."
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>
                    </div>
                    <div>
                        <label for="votingOptions" class="block text-sm font-medium text-gray-700"> Voting options
                            (separated by commas)</label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="votingOptions" id="votingOptions" bind:value={values.votingOptions}
                                   placeholder="Cool company name here..."
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-5">
            <div class="flex justify-end">
                <a href="/"
                   class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Cancel
                </a>
                <button type="submit" on:click|preventDefault={save}
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Create game
                </button>
            </div>
        </div>
    </form>
</section>

<script>
  import {auth} from "@jsdb/sdk";
  export let state;

  let credentials = {
    email: undefined,
    password: undefined
  };

  async function signUp() {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)){
      return alert('Invalid email.')
    }
    try {
      await auth.createAccount(credentials);
    } catch (e) {
        alert('Email already exists');
    }
  }

  function continueAsGuest() {
      auth.createAccount({email:`guest-${Date.now()}@planningpoker.day`, password: Math.floor(Math.random() * 100000).toString()})
  }
</script>

<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 class="text-2xl font-bold text-center">Planning poker day</h1>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        <p class="mt-2 text-center text-md text-gray-600">
            Or
            <button on:click={()=>state = 'signIn'} class="font-medium text-rose-600 hover:text-rose-500"> Log in to your existing account </button>
        </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                    <div class="mt-1">
                        <input bind:value={credentials.email} id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                    <div class="mt-1">
                        <input bind:value={credentials.password} id="password" name="password" type="password" autocomplete="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                    </div>
                </div>

                <div class="text-center flex flex-col space-y-4">
                    <button on:click|preventDefault={signUp} type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">Create account</button>
                    <span> OR </span>
                    <button on:click|preventDefault={continueAsGuest} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">Continue as guest</button>
                </div>
            </form>
        </div>
    </div>
</div>
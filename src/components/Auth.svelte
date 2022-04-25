<script>
  import SignIn from "./SignIn.svelte";
  import SignUp from "./SignUp.svelte";

  let state = 'signIn';
</script>

{#if state === 'signUp'}
    <SignUp bind:state/>
{:else if state === 'signIn'}
    <SignIn bind:state/>
{/if}
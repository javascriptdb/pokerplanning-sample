<script>
    import {auth} from "@jsdb/sdk";
    import Auth from "../../components/Auth.svelte";

    let loggedIn;

    auth.on('tokenChanged', (token) => {
        loggedIn = !!token
    });
</script>

{#if loggedIn}
    <slot/>
{:else}
    <Auth/>
{/if}
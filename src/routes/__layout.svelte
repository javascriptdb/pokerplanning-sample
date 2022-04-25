<script>
    import "../app.css";
    import {setServerUrl} from "@jsdb/sdk";
    import {env} from "../env.js";
    setServerUrl(env.serverUrl);
</script>

<slot />
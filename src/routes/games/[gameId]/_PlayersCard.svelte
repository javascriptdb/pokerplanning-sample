<script>
    export let game;
    export let userId, displayName;
</script>

<div class="flex justify-center items-center flex-col">
    <div
         class="{$game?.votes?.[userId] ? 'border-rose-600 bg-rose-200' : 'border-gray-400 bg-gray-200'} block w-10 h-16 border-2 rounded-lg flex items-center justify-center cursor-pointer">
        {$game?.votes?.[userId] ? '' : '?'}
    </div>
    <strong class="font-bold">{displayName}</strong>
</div>
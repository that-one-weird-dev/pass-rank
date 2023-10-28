<script lang="ts">
    import type { User } from "$lib/models/user";
    import UserTag from "./UserTag.svelte";

    export let user: User;
    export let rank: number | undefined = undefined;
</script>

<div class="bg-slate-800 rounded-xl border border-gray-700 flex divide-x divide-gray-700">
    {#if rank}
        <div class="flex items-center justify-end px-8 text-5xl">
            #{rank}
        </div>
    {/if}
    <div class="p-6 w-full">
        <div class="text-3xl">{user.displayName}</div>
        <div><UserTag username={user.username} /></div>
    </div>
    <div class="flex items-center justify-end px-8 text-5xl text-green-300">
        {user.loginCount}
    </div>
</div>

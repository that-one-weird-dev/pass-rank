<script lang="ts">
    import { goto } from '$app/navigation';
    import type { User } from '$lib/models/user';

    export let user: User;
    export let rank: number | undefined = undefined;
    export let isCurrentUser: boolean = false;
</script>

<button
    class="text-left bg-slate-800 rounded-xl border border-gray-700 flex divide-x divide-gray-700 shadow-lg hover:border-blue-600 cursor-pointer"
    class:border-indigo-600={isCurrentUser}
    on:click={() => goto(`/user/${user.username}`)}
>
    {#if rank}
        <div
            class="flex items-center justify-end px-8 text-5xl"
            class:text-amber-500={rank === 1}
            class:glowing-gold={rank === 1}
            class:text-zinc-400={rank === 2}
            class:glowing-silver={rank === 2}
            class:text-orange-800={rank === 3}
            class:glowing-bronze={rank === 3}
        >
            <h1 class="glowing">
                #{rank}
            </h1>
        </div>
    {/if}

    <div class="p-6 w-full flex flex-row justify-between gap-8">
        <div>
            <div class="text-3xl">{user.displayName}</div>
            <div class="text-blue-600">@{user.username}</div>
        </div>
        <div class="text-xl">
            <strong class="text-green-300">{user.loginCount}</strong>
            {user.loginCount === 1 ? 'login' : 'logins'}
        </div>
    </div>
</button>

<style>
    .glowing-gold {
        text-shadow: 0 0 32px theme('colors.amber.500');
    }
    .glowing-silver {
        text-shadow: 0 0 24px theme('colors.zinc.400');
    }
    .glowing-bronze {
        text-shadow: 0 0 16px theme('colors.orange.800');
    }
</style>

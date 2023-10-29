<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { SessionUser } from '$lib/models/session-user';
    import UserSearchBar from '../components/UserSearchBar.svelte';
    import UserTag from '../components/UserTag.svelte';

    export let user: SessionUser | undefined;
</script>

<nav class="w-full bg-slate-800 text-white flex flex-row justify-between rounded-b-lg shadow-lg">
    <div class="p-4 border-b border-l border-gray-700 rounded-bl-lg flex items-end gap-8">
        <button
            class="text-white text-3xl font-bold title transition-all"
            on:click={() => goto('/')}>Pass/Rank</button
        >
    </div>

    <div class="border-b border-gray-700 w-full flex flex-row justify-center items-center gap-6">
        <a href="/" class:font-bold={$page.url.pathname === '/'} class="anchor transition">Users</a>
        <a href="/cookies" class:font-bold={$page.url.pathname === '/cookies'} class="anchor transition">Cookies</a>
    </div>

    <div class="flex flex-row-reverse">
        {#if user}
            <form method="post" action="/login?/logout" use:enhance>
                <button
                    class="h-full float-right rounded-br-lg bg-indigo-800 border-b border-x border-indigo-500 py-2 px-6 hover:bg-indigo-700 whitespace-nowrap"
                    type="submit"
                >
                    Logout
                </button>
            </form>
            <div class="flex items-center border-b border-gray-700 pr-6">
                <UserTag username={user.username} />
            </div>
        {:else}
            <button
                class="float-right rounded-br-lg bg-indigo-800 border-b border-x border-indigo-500 py-2 px-6 hover:bg-indigo-700 whitespace-nowrap"
                on:click={() => goto('/login')}
            >
                Login
            </button>
        {/if}

        <div class="pr-6 flex flex-col justify-center border-b border-gray-700">
            <UserSearchBar />
        </div>
    </div>
</nav>

<style>
    .title:hover {
        --offset: 5px;
        transform: translateY(calc(var(--offset) * -1));
        text-shadow: 0 var(--offset) 0 theme('colors.indigo.700');
    }

    .anchor:hover {
        --offset: 2px;
        transform: translateY(calc(var(--offset) * -1));
        text-shadow: 0 var(--offset) 0 theme('colors.indigo.700');
    }
</style>

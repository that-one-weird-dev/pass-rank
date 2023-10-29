<script lang="ts">
    import { z } from 'zod';
    import SearchBar from './SearchBar.svelte';
    import { goto } from '$app/navigation';

    const ListUser = z.object({
        username: z.string(),
        displayName: z.string()
    });

    let users: z.infer<typeof ListUser>[] = [];
    $: empty = users.length === 0;

    async function fetchResults(e: CustomEvent<string>) {
        const search = e.detail;

        if (search.length === 0 || search === '@') {
            users = [];
            return;
        }

        const response = search.startsWith('@')
            ? await fetch(`/api/user/find?username=${search.slice(1)}`)
            : await fetch(`/api/user/find?displayName=${search}`);

        users = ListUser.array().parse(await response.json());
    }

    function select(username: string) {
        goto(`/user/${username}`);
    }
</script>

<SearchBar on:change={fetchResults} on:focusout={() => (users = [])} bind:empty>
    <div class="p-1">
        {#each users as user}
            <button
                class="flex flex-col items-start bg-slate-700 hover:bg-slate-600 py-1 px-2 rounded-lg w-full"
                on:click={() => select(user.username)}
            >
                <div class="text-lg">{user.displayName}</div>
                <div>@{user.username}</div>
            </button>
        {/each}
    </div>
</SearchBar>

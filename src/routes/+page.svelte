<script lang="ts">
    import User from '../components/User.svelte';

    export let data;
    console.dir(data);
    $: users = data.pageUsers.toReversed();
</script>

<div class="flex flex-col gap-3">
    {#each users as user, i}
        <User {user} rank={i + 1} />
    {/each}
</div>

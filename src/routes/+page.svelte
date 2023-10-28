<script lang="ts">
    import User from '../components/User.svelte';

    export let data;
</script>

<div class="flex flex-col gap-3">
    {#each data.pageUsers as user, i}
        <User {user} rank={i + 1} isCurrentUser={user.username === data.user?.username} />
    {/each}
</div>

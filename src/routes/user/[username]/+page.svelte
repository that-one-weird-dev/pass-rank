<script lang="ts">
    import Stat from '../../../components/Stat.svelte';
    import UserTag from '../../../components/UserTag.svelte';

    export let data;
</script>

<div class="text-center">
    <h1 class="text-4xl mb-2">
        {data.pageUser.displayName}
    </h1>
    <div class="text-lg">
        <UserTag username={data.pageUser.username} />
    </div>

    <section class="mt-8">
        <Stat value={data.pageUser.loginCount} message="Total logins" />
    </section>
</div>

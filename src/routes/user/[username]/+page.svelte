<script lang="ts">
    import User from '../../../components/User.svelte';

    export let data;
</script>

<User user={data.pageUser} />

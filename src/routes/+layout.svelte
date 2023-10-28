<script lang="ts">
    import Navbar from './Navbar.svelte';
    import './styles.css';

    export let data;
</script>

<div class="app">
    <Navbar user={data.user} />
    <main class="flex items-center justify-center p-5">
        <slot />
    </main>
</div>

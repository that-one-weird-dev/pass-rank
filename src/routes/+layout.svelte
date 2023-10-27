<script lang="ts">
    import Navbar from './Navbar.svelte';
    import './styles.css';

    export let data;
</script>

<div class="app">
    <Navbar user={data.user} />
    <main>
        <slot />
    </main>
</div>

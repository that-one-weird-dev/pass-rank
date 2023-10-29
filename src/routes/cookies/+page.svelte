<script lang="ts">
    import CookieStat from "./CookieStat.svelte";

    export let data;

    const enjoyerPercentage =Math.floor((data.stats.cookieEnjoyers / data.stats.total) * 100);
</script>

<div class="flex justify-evenly w-full">
    <CookieStat percentage={enjoyerPercentage} message="Cookie enjoyers" />

    <CookieStat percentage={100 - enjoyerPercentage} message="Bad people" />
</div>

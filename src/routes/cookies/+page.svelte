<script lang="ts">
    import Stat from '../../components/Stat.svelte';


    export let data;

    const enjoyerPercentage =Math.floor((data.stats.cookieEnjoyers / data.stats.total) * 100);
</script>

<div class="flex justify-evenly w-full">
    <Stat value={enjoyerPercentage} suffix="%" message="Cookie enjoyers" />

    <Stat value={100 - enjoyerPercentage} suffix="%" message="Bad people" />
</div>

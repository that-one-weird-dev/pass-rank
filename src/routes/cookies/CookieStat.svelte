<script lang="ts">
    export let percentage: number;
    export let message: string;
</script>

<section class="flex flex-col items-center">
    <h1 style="font-size: 10rem;" class="font-bold percentage">
        {percentage}%
    </h1>
    <p class="text-gray-500 text-xl">{message}</p>
</section>

<style>
    .percentage {
        text-shadow: 0 10px 0 theme('colors.indigo.700');
    }
</style>

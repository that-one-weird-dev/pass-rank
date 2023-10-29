<script lang="ts">
    import { onMount } from "svelte";

    export let value: number;
    export let message: string;
    export let suffix: string = "";
    export let animationDurationSec: number = 1.2;

    let animatedValue = 0;

    $: animatedValue = 0, value;
    $: incrementTimeDelta = (animationDurationSec / value) * 1000;

    function increment() {
        setTimeout(() => {
            animatedValue += 1;

            if (animatedValue < value) {
                increment();
            }
        }, incrementTimeDelta);
    }

    onMount(increment);
</script>

<section class="flex flex-col items-center">
    <h1 style="font-size: 10rem;" class="font-bold percentage">
        {animatedValue}{suffix}
    </h1>
    <p class="text-gray-500 text-xl">{message}</p>
</section>

<style>
    .percentage {
        text-shadow: 0 10px 0 theme('colors.indigo.700');
    }
</style>

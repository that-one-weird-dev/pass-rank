<script lang="ts">
    import { fly, type FlyParams } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    export let show = false;

    const flyParams: FlyParams = {
        duration: 300,
        x: 0,
        y: 100,
        opacity: 0,
        easing: quintOut
    };

    async function confirm(likesCookies: boolean) {
        show = false;

        await fetch('/user/likesCookies', {
            method: "POST",
            body: JSON.stringify({
                likesCookies,
            }),
        })
    }
</script>

{#if show}
    <div class="fixed bottom-0 w-full flex justify-center mb-4">
        <section
            class="bg-slate-800 rounded-lg shadow-2xl flex justify-between"
            transition:fly={flyParams}
        >
            <div class="p-6 border-y border-l border-gray-700 rounded-l-lg">
                <h1 class="text-2xl">Cookies?</h1>
                <p>Do you like cookies?</p>
            </div>

            <div class="flex">
                <button
                    class="text-xl bg-red-800 border-y border-l border-red-500 rouded w-full p-2 hover:bg-red-700 px-6"
                    on:click={() => confirm(false)}
                >
                    No
                </button>
                <button
                    class="text-xl bg-teal-800 border border-teal-500 rouded w-full rounded-r-lg p-2 hover:bg-teal-700 px-6"
                    on:click={() => confirm(true)}
                >
                    Yes
                </button>
            </div>
        </section>
    </div>
{/if}

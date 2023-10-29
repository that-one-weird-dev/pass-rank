<script lang="ts">
    import Icon from '@iconify/svelte';
    import { createEventDispatcher } from 'svelte';

    export let empty = true;

    const dispatch = createEventDispatcher<{ change: string; search: void; focusout: void }>();

    let searchText = '';
    let focus = false;

    const onChange = () => {
        dispatch('change', searchText);
    };

    function focusout() {
        setTimeout(() => {
            focus = false;
            searchText = '';
            dispatch('focusout');
        }, 200);
    }
</script>

<div
    class="relative rounded-t-lg bg-slate-700 focus-within:shadow-lg"
    class:rounded-b-lg={empty}
    on:focusout={focusout}
    on:focusin={() => (focus = true)}
>
    <div class="flex divide-x divide-gray-600 z-20 border border-gray-600 rounded-lg shadow-sm">
        <input
            class="px-3 py-2 bg-slate-700 rounded-l-lg w-16 focus:outline-none"
            class:w-auto={focus}
            bind:value={searchText}
            on:change={onChange}
        />
        <button class="p-2 hover:bg-slate-600 rounded-r-lg" on:click={() => dispatch('search')}>
            <Icon icon="mdi:search" />
        </button>
    </div>
    {#if !empty}
        <div
            class="absolute bg-slate-700 w-full z-10 rounded-b-lg border-x border-b border-gray-600 flex flex-col gap-2"
        >
            <slot />
        </div>
    {/if}
</div>

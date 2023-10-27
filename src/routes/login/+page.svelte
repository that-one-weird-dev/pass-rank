<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import type { ActionData } from './$types';

    export let form: ActionData;

    let isRegister = false;
    $: isRegister = $page.url.searchParams.get('register') !== null;
</script>

<main class="flex items-center justify-center">
    <form
        method="post"
        action={isRegister ? '?/register' : '?/login'}
        use:enhance={() => {
            return async ({update}) => update({reset: false});
        }}
    >
        <div class="m-5 rounded-lg shadow-lg bg-slate-800">
            <div
                class="rounded-t-lg border border-gray-700 text-white flex items-center justify-center py-2 font-bold text-lg"
            >
                {isRegister ? 'Register' : 'Login'}
            </div>
            <div class="grid gap-3 py-5 px-10 border-x border-gray-700">
                {#if isRegister}
                    <div>
                        <label for="displayName" class="block mb-2 text-white">Display name</label>
                        <input
                            name="displayName"
                            class="shadow bg-slate-700 p-2 border border-gray-600 text-white rounded block focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            type="text"
                            required
                        />
                    </div>
                {/if}

                <div>
                    <label for="username" class="block mb-2 text-white">Username</label>
                    <input
                        name="username"
                        class="shadow bg-slate-700 p-2 border border-gray-600 text-white rounded block focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-white">Password</label>
                    <input
                        name="password"
                        class="shadow bg-slate-700 p-2 border border-gray-600 text-white rounded block focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type="password"
                        required
                    />
                </div>

                <span class="text-white text-xs">
                    {#if !isRegister}
                        Don't have an account?
                        <a
                            href="/login?register"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Register!
                        </a>
                    {/if}
                </span>
            </div>

            {#if form?.error}
                <div class="bg-red-500 border-x border-t border-red-400 p-2">
                    {#if form.error.type === 'user-exists'}
                        User already exists 😢
                    {:else if form.error.type === 'password-exists'}
                        Password already taken by user @{form.error.username} 😢
                    {:else if form.error.type === 'invalid-credentials'}
                        Invalid credentials
                    {:else if form.error.type === 'invalid-data'}
                        Invalid data
                    {/if}
                </div>
            {/if}

            <button
                type="submit"
                class="text-white bg-indigo-800 border border-indigo-500 rouded w-full rounded-b-lg p-2 hover:bg-indigo-700"
                >{isRegister ? 'Register' : 'Login'}</button
            >
        </div>
    </form>
</main>

import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { Config } from "@sveltejs/kit";

const config: Config = {
	kit: {
		adapter: adapter()
	},
    preprocess: vitePreprocess(),
};

export default config;

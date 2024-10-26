import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'import.meta.env.VITE_CURRENT_GIT_HASH': JSON.stringify(process.env.CURRENT_GIT_HASH)
	}
});

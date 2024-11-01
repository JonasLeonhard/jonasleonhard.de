import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	define: {
		'import.meta.env.VITE_CURRENT_GIT_HASH': JSON.stringify(process.env.CURRENT_GIT_HASH)
	},
	build: {
		rollupOptions: {
			external: ['/pagefind/pagefind.js?url']
		}
	}
});

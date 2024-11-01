export const prerender = true;
import type { LayoutServerLoad } from './$types';
import { type MetaData } from '$lib';

/**
 * Imports all svelte files, looks if the export a module that contains "metadata".
 * If so, we recognize them as a blogpost, and add them to our list
 */
export const load: LayoutServerLoad = async () => {
	const modules = import.meta.glob('/src/routes/**/*.svelte', { eager: true });

	const allPosts = Object.entries(modules)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.filter(([_path, post]) => {
			return post && typeof post === 'object' && 'metadata' in post;
		})
		.map(([path, post]) => {
			try {
				const postHref = path.replace('/src/routes', '').replace('+page.svelte', '');

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return { href: postHref, ...((post as any).metadata as MetaData) };
			} catch (err) {
				throw new Error(`ValidationError: post.metadata in ${path} throws ${err?.toString()}`);
			}
		});

	const posts = allPosts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

	return {
		posts
	};
};

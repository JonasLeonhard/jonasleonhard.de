export const prerender = true;
export const trailingSlash = 'always';

import type { LayoutServerLoad } from './$types';
import { getBlogMetadata, getMetadata } from '$lib/getMetadata';

/**
 * Imports all svelte files, looks if the export a module that contains "metadata".
 * If so, we recognize them as a blogpost, and add them to our list
 */
export const load: LayoutServerLoad = async (event) => {
	const posts = await getBlogMetadata();
	const metadata = await getMetadata(event);

	return {
		posts,
		metadata
	};
};

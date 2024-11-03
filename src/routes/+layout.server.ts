export const prerender = true;
export const trailingSlash = 'always';

import type { LayoutServerLoad } from './$types';
import { getAllMetadata } from '$lib/getAllMetadata';

/**
 * Imports all svelte files, looks if the export a module that contains "metadata".
 * If so, we recognize them as a blogpost, and add them to our list
 */
export const load: LayoutServerLoad = async () => {
	const posts = await getAllMetadata();

	return {
		posts
	};
};

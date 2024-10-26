export const prerender = true;
import type { LayoutServerLoad } from './$types';
import { z } from 'zod';

const postSchema = z.object({
	title: z.string().max(60),
	description: z.string().max(160),
	author: z.string(),
	publishDate: z.string().transform((val) => new Date(val)),
	coverImage: z.object({
		src: z.string(),
		alt: z.string()
	}),
	draft: z.boolean().default(true),
	tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),

	// optional data:
	updatedDate: z
		.string()
		.optional()
		.transform((str) => (str ? new Date(str) : undefined))
});

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

export const load: LayoutServerLoad = async () => {
	const modules = import.meta.glob('/src/routes/**/*.svx', { eager: true });

	const allPosts = Object.entries(modules).map(([path, post]) => {
		if (post && typeof post === 'object' && 'metadata' in post) {
			try {
				// zod validate mdsvex metadata!
				const parsed = postSchema.parse(post.metadata);
				const postHref = path.replace('/src/routes', '').replace('+page.svx', '');

				return { href: postHref, ...parsed };
			} catch (err) {
				throw new Error(`ValidationError: post.metadata in ${path} throws ${err?.toString()}`);
			}
		}

		throw new Error(`ValidationError: post.metadata is not set for ${path}`);
	});

	const posts = allPosts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

	return {
		posts
	};
};

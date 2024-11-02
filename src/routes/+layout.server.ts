export const prerender = true;
export const trailingSlash = 'always';

import type { LayoutServerLoad } from './$types';
import { type MetaData } from '$lib';
import { codeToHtml } from 'shiki';
const { MODE } = import.meta.env;

/**
 * Imports all svelte files, looks if the export a module that contains "metadata".
 * If so, we recognize them as a blogpost, and add them to our list
 */
export const load: LayoutServerLoad = async ({ url }) => {
	const modules = import.meta.glob('/src/routes/**/*.svelte', { eager: true });
	const currentPath = `/src/routes${url.pathname}/+page.svelte`;

	/**
	 * INFO: get the currently loaded page's module metadata, if it is set
	 */
	let metadata: MetaData | null = null;
	if (
		modules[currentPath] &&
		typeof modules[currentPath] === 'object' &&
		'metadata' in modules[currentPath]
	) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		metadata = (modules[currentPath] as any).metadata as MetaData;
	}

	/**
	 * INFO: This will accumulate all module metadata as posts
	 */
	const allPosts = Object.entries(modules)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.filter(([_path, post]) => {
			return (
				post &&
				typeof post === 'object' &&
				'metadata' in post &&
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(MODE === 'production' ? !((post as any).metadata as MetaData).draft : true) // filters out draft items in production builds
			);
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

	// INFO: This is where we pre-rendering code-blocks to html with shiki
	const c1 = await codeToHtml(
		`// program to generate fibonacci series up to n terms

// take input from the user
const number = parseInt(prompt('Enter the number of terms: '));
let n1 = 0, n2 = 1, nextTerm;

console.log('Fibonacci Series:');

for (let i = 1; i <= number; i++) {
    console.log(n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
}`,
		{
			lang: 'javascript',
			theme: 'catppuccin-mocha'
		}
	);

	return {
		posts,
		rendered: {
			example: {
				c1
			}
		},
		metadata
	};
};

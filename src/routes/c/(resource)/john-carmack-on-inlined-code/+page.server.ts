import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'John Carmack on inlined code',
	author: 'Jonathan Blow',
	description: 'John Carmack on inlined code',
	publishDate: new Date('01 Feb 2025'),
	tags: ['lowlevel', 'cpp', 'performance'],
	coverImage: {
		src: coverImage,
		alt: 'thumbnail'
	},
	draft: false
};

export const load: PageServerLoad = async () => {
	return {
		metadata: _metadata
	};
};

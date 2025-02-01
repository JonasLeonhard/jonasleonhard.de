import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: '0DE5',
	author: 'Kay Lack',
	description:
		'Beautifully crafted low level courses ranging from assembly, to stacks and how parsing works.',
	publishDate: new Date('01 Feb 2025'),
	tags: ['lowlevel', 'c', 'assembly', 'parsing', 'binary', 'regex', 'stack'],
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

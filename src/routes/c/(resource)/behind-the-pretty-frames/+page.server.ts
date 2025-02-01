import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Behind the Pretty Frames',
	author: 'mamoniem',
	description: 'Writeups on how popular games render',
	publishDate: new Date('01 Feb 2025'),
	tags: ['lowlevel', 'graphics'],
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

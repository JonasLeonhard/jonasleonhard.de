import type { PageServerLoad } from './$types';
import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Better be late',
	author: 'Theo - t3.gg',
	description: 'Why its better to be late when it comes to new technology',
	publishDate: new Date('01 Feb 2025'),
	tags: ['advice'],
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

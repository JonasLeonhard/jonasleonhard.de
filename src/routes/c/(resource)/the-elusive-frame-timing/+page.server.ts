import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'The Elusive Frame Timing',
	author: 'Alen Ladavac',
	description: 'Why some games stutter',
	publishDate: new Date('01 Feb 2025'),
	tags: ['gamedev', 'graphics', 'performance'],
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

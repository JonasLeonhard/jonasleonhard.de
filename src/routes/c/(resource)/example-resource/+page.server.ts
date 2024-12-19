import type { PageServerLoad } from './$types';
import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Example Resource',
	author: 'Theo - t3.gg',
	description: 'Why its Better to be late',
	publishDate: new Date('10 May 2024'),
	updatedDate: new Date('10 May 2024'),
	tags: ['draft'],
	coverImage: {
		src: coverImage,
		alt: 'thumbnail'
	},
	draft: true
};

export const load: PageServerLoad = async () => {
	return {
		metadata: _metadata
	};
};

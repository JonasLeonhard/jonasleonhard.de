import type { MetaData } from '$lib';
import type { PageServerLoad } from './$types';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Impressum',
	author: 'Jonas Leonhard',
	description: 'Precompute stuff',
	publishDate: new Date('08 Feb 2024'),
	tags: ['resources'],
	coverImage: {
		src: cover,
		alt: 'Precompute'
	},
	draft: true
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

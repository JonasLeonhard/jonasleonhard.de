import type { MetaData } from '$lib';
import type { PageServerLoad } from './$types';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Credits',
	author: 'Jonas Leonhard',
	description: 'Credits where credits is due',
	publishDate: new Date('17 Nov 2024'),
	tags: ['credits'],
	coverImage: {
		src: cover,
		alt: 'Credtis'
	},
	draft: false
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

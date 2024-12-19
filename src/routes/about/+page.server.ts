import type { MetaData } from '$lib';
import type { PageServerLoad } from './$types';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'About',
	author: 'Jonas Leonhard',
	description: 'All About me',
	publishDate: new Date('17 Nov 2024'),
	tags: ['about'],
	coverImage: {
		src: cover,
		alt: 'About me'
	},
	draft: false
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

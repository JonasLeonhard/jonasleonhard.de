import type { MetaData } from '$lib';
import type { PageServerLoad } from './$types';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Home',
	author: 'Jonas Leonhard',
	description: 'Home Page',
	publishDate: new Date('17 Nov 2024'),
	tags: ['Home'],
	coverImage: {
		src: cover,
		alt: 'Home Page'
	},
	draft: false
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

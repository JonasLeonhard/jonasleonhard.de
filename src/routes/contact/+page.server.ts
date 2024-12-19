import type { MetaData } from '$lib';
import type { PageServerLoad } from './$types';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Contact',
	author: 'Jonas Leonhard',
	description:
		'Want to work with me, or just wish me a good day? This is the right place to do so.',
	publishDate: new Date('17 Nov 2024'),
	tags: ['contact'],
	coverImage: {
		src: cover,
		alt: 'Contact Me'
	},
	draft: false
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

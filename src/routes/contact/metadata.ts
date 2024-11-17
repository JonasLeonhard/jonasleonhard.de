import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
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

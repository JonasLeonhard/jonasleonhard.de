import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
	title: 'Resources',
	author: 'Jonas Leonhard',
	description: 'A Collection of useful Resources',
	publishDate: new Date('17 Nov 2024'),
	tags: ['resources'],
	coverImage: {
		src: cover,
		alt: 'Resources'
	},
	draft: false
};

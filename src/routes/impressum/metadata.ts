import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
	title: 'Impressum',
	author: 'Jonas Leonhard',
	description: 'Impressum',
	publishDate: new Date('17 Nov 2024'),
	tags: ['resources'],
	coverImage: {
		src: cover,
		alt: 'Impressum'
	},
	draft: false
};

import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
	title: 'RSS',
	author: 'Jonas Leonhard',
	description: 'RSS Feed',
	publishDate: new Date('17 Nov 2024'),
	tags: ['RSS'],
	coverImage: {
		src: cover,
		alt: 'RSS Feed'
	},
	draft: false
};

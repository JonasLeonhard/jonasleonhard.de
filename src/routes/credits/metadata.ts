import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
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

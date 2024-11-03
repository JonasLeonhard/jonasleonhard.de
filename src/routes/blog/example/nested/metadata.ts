import type { MetaData } from '$lib';

export const metadata: MetaData = {
	title: 'Example Nested Post',
	author: 'Jonas Leonhard',
	description:
		'Neovim - from basic setup, to advanced functionality, to writing your own config and plugins. The ultimate getting started guide.',
	publishDate: new Date('10 May 2024'),
	tags: ['neovim', 'lua'],
	coverImage: {
		src: '/src/assets/images/cover.png',
		alt: 'Neovim, from zero to hero cover'
	},
	draft: true
};

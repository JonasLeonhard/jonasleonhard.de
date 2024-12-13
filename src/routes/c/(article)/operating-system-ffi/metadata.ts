import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
	title: 'Operating System FFI',
	author: 'Jonas Leonhard',
	description: 'How can i call functions of the Operating System?',
	publishDate: new Date('13 Dec 2024'),
	tags: ['os', 'ffi'],
	coverImage: {
		src: cover,
		alt: 'TODO: linux?'
	},
	draft: true
};

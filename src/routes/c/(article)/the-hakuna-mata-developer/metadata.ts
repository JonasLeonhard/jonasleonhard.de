import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
	title: 'The Hakuna Matata Developer',
	author: 'Jonas Leonhard',
	description: '~Hakuna Matata - How to be ok with everything and everybody.',
	publishDate: new Date('8 Nov 2024'),
	tags: ['development', 'advice'],
	coverImage: {
		src: cover,
		alt: 'TODO: lion king reference?'
	},
	draft: false
};

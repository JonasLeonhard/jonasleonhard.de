import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Exploring the Power of Negative Space Programming ',
	author: 'double-trouble.dev',
	description:
		'Negative space programming is a concept that embraces the art of defining a program by what it should not do, rather than what it should. This approach allows developers to create more robust and error-resistant code. Let’s dive into how this concept can be applied and explore its benefits.',
	publishDate: new Date('01 Feb 2025'),
	tags: ['advice'],
	coverImage: {
		src: coverImage,
		alt: 'thumbnail'
	},
	draft: false
};

export const load: PageServerLoad = async () => {
	return {
		metadata: _metadata
	};
};

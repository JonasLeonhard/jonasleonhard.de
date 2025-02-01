import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Practical Data Oriented Design',
	author: 'Andrew Kelly',
	description:
		'A talk by Andrew Kelly, the creator of the zig programming language about data oriented design.',
	publishDate: new Date('01 Feb 2025'),
	tags: ['lowlevel', 'zig', 'performance'],
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

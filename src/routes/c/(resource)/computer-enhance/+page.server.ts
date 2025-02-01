import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Compute Enhance!',
	author: 'Casey Muratori',
	description:
		"Excellent course on how hardware runs programs and optimization techniques every programmer should know. SIMD, Caching, Assembly, How CPU's work, Profiling, ...",
	publishDate: new Date('01 Feb 2025'),
	tags: ['lowlevel', 'c', 'assembly', 'performance'],
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

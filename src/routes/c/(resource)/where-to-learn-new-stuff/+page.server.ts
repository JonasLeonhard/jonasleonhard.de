import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Where do i learn about new stuff?',
	author: 'various',
	description: 'Stay up to date with fireships videos or 100sec explanations of technical topics',
	publishDate: new Date('01 Feb 2025'),
	tags: ['news'],
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

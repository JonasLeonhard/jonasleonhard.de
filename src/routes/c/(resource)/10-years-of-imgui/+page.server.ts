import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: '10 years of ImGui',
	author: 'ocornut',
	description: "A blogpost about the history of ImGui for it's 10 year anniversary",
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

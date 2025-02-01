import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'How Unreal Nanite works',
	author: 'various',
	description:
		'From the basics of clustering and LODs to advanced techniques like small triangle culling and hierarchical Z-buffers',
	publishDate: new Date('01 Feb 2025'),
	tags: ['gamedev', 'graphics'],
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

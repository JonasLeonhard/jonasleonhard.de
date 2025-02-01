import type { PageServerLoad } from './$types';
import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Example Project',
	author: 'Jonas Leonhard',
	description: 'example project i worked on',
	publishDate: new Date('10 May 2024'),
	updatedDate: new Date('10 May 2024'),
	tags: ['draft'],
	coverImage: {
		src: coverImage,
		alt: 'thumbnail'
	},
	draft: true
};

export const load: PageServerLoad = async () => {
	return {
		metadata: _metadata
	};
};

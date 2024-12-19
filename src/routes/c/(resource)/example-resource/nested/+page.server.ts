import type { PageServerLoad } from './$types';

import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Example Nested Resource',
	author: 'Jonas Leonhard',
	description: 'This is a subresource for /example-resource',
	publishDate: new Date('10 May 2024'),
	tags: ['draft'],
	coverImage: {
		src: cover,
		alt: 'thumbnail'
	},
	draft: true
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

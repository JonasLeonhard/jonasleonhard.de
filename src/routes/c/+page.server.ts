import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Content',
	author: 'Jonas Leonhard',
	description:
		'A searchable overview of this pages content. Thoughts, tutorials, explainations and my work. You can find them all here.',
	publishDate: new Date('17 Nov 2024'),
	tags: ['contact'],
	coverImage: {
		src: cover,
		alt: 'Blogposts'
	},
	draft: false
};

export const load: PageServerLoad = () => {
	return {
		metadata: _metadata
	};
};

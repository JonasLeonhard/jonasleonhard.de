import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: "How Clay's UI Layout Algorithm Works",
	author: 'Nic Barker',
	description:
		'Clay is a UI layout library written in C, and this video gives a high level explanation of how the flexbox-like layout algorithm in Clay works.',
	publishDate: new Date('02 Mar 2025'),
	tags: ['ui', 'layout', 'c'],
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

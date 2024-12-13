import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const metadata: MetaData = {
	title: 'Awesome CLI tools',
	author: 'Jonas Leonhard',
	description: 'Just a list of random awesome stuff i like to use in the commandline.',
	publishDate: new Date('13 Dec 2024'),
	tags: ['commandline', 'awesome'],
	coverImage: {
		src: cover,
		alt: 'TODO: awesome?'
	},
	draft: true
};

import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: 'Simple made easy',
	author: 'Rick Hickey',
	description:
		"Rich Hickey, the author of Clojure and designer of Datomic, is a software developer with over 30 years of experience in various domains. Rich has worked on scheduling systems, broadcast automation, audio analysis and fingerprinting, database design, yield management, exit poll systems, and machine listening, in a variety of languages. This keynote was given at Strange Loop 2011, and is perhaps the best known and most highly regarded of Rich's many excellent talks, ushering in a new way to think about the problems of software design and the constant fight against complexity.",
	publishDate: new Date('24 Apr 2025'),
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

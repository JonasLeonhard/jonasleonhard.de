import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: '3D animated character from first principles in one sitting (c + opengl)',
	author: 'Sphaerophoria',
	description:
		"Sphaerophoria tries building up 3d animations from first principles in one sitting while it's all fresh.",
	publishDate: new Date('01 Feb 2025'),
	tags: ['c', 'opengl', 'graphics'],
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

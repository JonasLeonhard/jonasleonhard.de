import type { MetaData } from '$lib';
import coverImage from '$lib/assets/images/cover.png?enhanced';
import type { PageServerLoad } from './$types';

export const _metadata: MetaData = {
	title: '0DE5',
	author: 'Casey Muratori',
	description:
		'Building a Game from Scratch in C++. No engine, nothing but syscalls. A must watch with everything ranging from C basics, to the Windows API, DirectSound, Tile Maps, Bitmaps, Arena Allocators, Textures, Simd, ui, entities',
	publishDate: new Date('01 Feb 2025'),
	tags: ['lowlevel', 'c', 'gamedev'],
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

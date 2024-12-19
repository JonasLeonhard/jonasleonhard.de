import type { PageServerLoad } from './$types';
import { codeToHtml } from 'shiki';

import type { MetaData } from '$lib';
import cover from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Neovim, from zero to hero',
	author: 'Jonas Leonhard',
	description:
		'Neovim - from basic setup, to advanced functionality, to writing your own config and plugins. The ultimate getting started guide.',
	publishDate: new Date('10 May 2024'),
	tags: ['neovim', 'lua'],
	coverImage: {
		src: cover,
		alt: 'Neovim, from zero to hero cover'
	},
	draft: false
};

export const load: PageServerLoad = async () => {
	const startExample = await codeToHtml(
		`
nvim;
nvim yourfile.txt;
nvim yourdir;
    `,
		{
			lang: 'bash',
			theme: 'catppuccin-mocha'
		}
	);

	return {
		metadata: _metadata,
		startExample
	};
};

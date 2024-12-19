import type { PageServerLoad } from './$types';
import type { MetaData } from '$lib';
import { codeToHtml } from 'shiki';
import coverImage from '$lib/assets/images/cover.png?enhanced';

export const _metadata: MetaData = {
	title: 'Example Post',
	author: 'Jonas Leonhard',
	description:
		'Neovim - from basic setup, to advanced functionality, to writing your own config and plugins. The ultimate getting started guide.',
	publishDate: new Date('10 May 2024'),
	updatedDate: new Date('11 May 2024'),
	tags: ['neovim', 'lua'],
	coverImage: {
		src: coverImage,
		alt: 'Neovim, from zero to hero cover'
	},
	draft: true
};

export const load: PageServerLoad = async () => {
	const codeExample = await codeToHtml(
		`
    // program to generate fibonacci series up to n terms

    // take input from the user
    const number = parseInt(prompt('Enter the number of terms: '));
    let n1 = 0, n2 = 1, nextTerm;

    console.log('Fibonacci Series:');

    for (let i = 1; i <= number; i++) {
        console.log(n1);
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
    }
    `,
		{
			lang: 'javascript',
			theme: 'catppuccin-mocha'
		}
	);

	return {
		metadata: _metadata,
		codeExample
	};
};

import { metadata } from './metadata';
import type { PageServerLoad } from './$types';
import { codeToHtml } from 'shiki';

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
		metadata,
		startExample
	};
};

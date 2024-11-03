import { metadata } from './metadata';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		metadata
	};
};

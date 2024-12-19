import { type Picture } from '@sveltejs/enhanced-img';

/***
 * getMetaData.ts expects that a page.server.ts exports "export _metadata: Metadata = ..." in order to build seo relevant data
 */
export type MetaData = {
	title: string;
	description: string;
	author: string;
	publishDate: Date;
	coverImage: {
		/**
		 * You can import a enhanced-img Picture like this:
		 * 'import coverImage from '$lib/assets/images/cover.png?enhanced';'
		 * */
		src: Picture;
		alt: string;
	};
	draft: boolean;
	tags: string[];

	/**
	 * This will be set in getAllMetaData, and will not be set for a single pages metadata
	 **/
	href?: string;
	updatedDate?: Date;
};

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
	updatedDate?: Date;

	/**
	 * This will be set when loading the metadata, you don't need to set this manually!
	 **/
	href?: string;
	/**
	 * This will be set when loading the metadata, you don't need to set this manually!
	 **/
	type?: 'project' | 'article' | 'resource';
};

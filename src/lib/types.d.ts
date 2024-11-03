export type MetaData = {
	title: string;
	description: string;
	author: string;
	publishDate: Date;
	coverImage: {
		src: string;
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

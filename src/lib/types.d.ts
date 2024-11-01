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

	// optional data:
	updatedDate?: Date;
};

import type { MetaData } from '$lib';

export async function getBlogMetadata() {
	const modules = import.meta.glob<MetaData>('/src/routes/blog/\\(article\\)/**/metadata.ts', {
		import: 'metadata'
	});

	const metadata: MetaData[] = [];

	for (const path in modules) {
		try {
			const modMetadata = await modules[path]();
			const routePath = path
				.replace('/src/routes', '')
				.replace('/(article)', '')
				.replace('/metadata.ts', '');

			metadata.push({
				...modMetadata,
				href: routePath || '/'
			});
		} catch (error) {
			console.error(`Error loading metadata from ${path}:`, error);
		}
	}

	return metadata.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

export async function getMetadata(url: URL) {
	const pathname = url.pathname;
	const modules = import.meta.glob<MetaData>('/src/routes/**/metadata.ts', {
		import: 'metadata'
	});

	// Construct the expected path to the metadata file
	const metadataPath = `/src/routes${pathname.replace('/blog', '/blog/(article)')}metadata.ts`;

	try {
		// Check if the metadata file exists for this path
		if (metadataPath in modules) {
			const modMetadata = await modules[metadataPath]();
			return {
				...modMetadata,
				href: pathname || '/'
			};
		}
		return null; // Return null if no metadata found for this URL
	} catch (error) {
		console.error(`Error loading metadata for ${pathname}:`, error);
		return null;
	}
}
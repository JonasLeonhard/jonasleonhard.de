import type { MetaData } from '$lib';

export async function getAllMetadata() {
	const modules = import.meta.glob<MetaData>('/src/routes/**/metadata.ts', {
		import: 'metadata'
	});

	const metadata: MetaData[] = [];

	for (const path in modules) {
		try {
			const modMetadata = await modules[path]();
			const routePath = path.replace('/src/routes', '').replace('/metadata.ts', '');

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

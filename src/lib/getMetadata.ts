import type { MetaData } from '$lib';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function getBlogMetadata() {
	const modules = import.meta.glob<MetaData>('/src/routes/c/\\(article\\)/**/+page.server.ts', {
		import: '_metadata'
	});

	// Validate that all files have _metadata export
	for (const path in modules) {
		if (modules[path] === undefined) {
			throw new Error(`getBlogMetadata:  missing export _metadata from +page.server.ts at ${path}`);
		}
	}

	const metadata: MetaData[] = [];
	for (const path in modules) {
		const modMetadata = await modules[path]();
		if (!modMetadata) {
			throw new Error(`getBlogMetadata: missing export _metadata from +page.server.ts at ${path}`);
		}

		const routePath = path
			.replace('/src/routes', '')
			.replace('/(article)', '')
			.replace('/+page.server.ts', '');

		metadata.push({
			...modMetadata,
			href: routePath || '/'
		});
	}

	return metadata.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

export async function getMetadata(event: ServerLoadEvent) {
	const modules = import.meta.glob<MetaData>('/src/routes/**/+page.server.ts', {
		import: '_metadata'
	});

	const routeId = event.route.id;
	if (!routeId) {
		throw new Error('getMetadata: Route ID is missing');
	}

	const metadataPath = `/src/routes${routeId == '/' ? '' : routeId}/+page.server.ts`;

	// Check if the metadata file exists for this path
	if (metadataPath in modules) {
		const modMetadata = await modules[metadataPath]();
		if (!modMetadata) {
			throw new Error(`getMetadata: Missing export _metadata from +page.server.ts at ${routeId}`);
		}
		return {
			...modMetadata,
			href: event.url.pathname || '/'
		};
	}

	throw new Error(`getMetadata: No +page.server.ts found at path: ${metadataPath}`);
}

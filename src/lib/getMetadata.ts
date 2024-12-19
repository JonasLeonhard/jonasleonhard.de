import type { MetaData } from '$lib';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function getBlogMetadata() {
	const modules = import.meta.glob<MetaData>('/src/routes/c/**/+page.server.ts', {
		import: '_metadata'
	});
	const excluded = ['/src/routes/c/+page.server.ts']; // dont add this path to metadata

	// Validate that all files have _metadata export
	for (const path in modules) {
		if (modules[path] === undefined) {
			throw new Error(`getBlogMetadata:  missing export _metadata from +page.server.ts at ${path}`);
		}
	}

	const metadata: MetaData[] = [];
	for (const path in modules) {
		if (excluded.includes(path)) {
			continue;
		}

		const modMetadata = await modules[path]();
		if (!modMetadata) {
			throw new Error(`getBlogMetadata: missing export _metadata from +page.server.ts at ${path}`);
		}

		const routePath = path
			.replace('/src/routes', '')
			.replace(/\([^)]+\)\//g, '') // Replaces any hidden routes like '(article)' followed by /
			.replace('/+page.server.ts', '');

		if (dev || !modMetadata.draft) {
			metadata.push({
				...modMetadata,
				href: routePath || '/',
				type: getType(path)
			});
		}
	}

	return metadata.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

function getType(path: string | null): MetaData['type'] {
	if (path?.includes('(resource)')) {
		return 'resource';
	}

	if (path?.includes('(project)')) {
		return 'project';
	}

	return 'article';
}

export async function getMetadata(event: ServerLoadEvent) {
	const modules = import.meta.glob<MetaData>('/src/routes/**/+page.server.ts', {
		import: '_metadata'
	});

	let routeId = event.route.id;
	if (!routeId) {
		routeId = '/'; // load the default +page.server.metadata for pages like +error
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
			href: event.url.pathname || '/',
			type: getType(event.route.id)
		};
	}

	throw new Error(`getMetadata: No +page.server.ts found at path: ${metadataPath}`);
}

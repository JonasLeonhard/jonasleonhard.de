export const prerender = true;

import type { MetaData } from '$lib';
import { getBlogMetadata } from '$lib/getMetadata';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const metadata = (await getBlogMetadata()).filter((post) => !post.draft);
	const body = render(metadata);

	return new Response(String(body));
};

const render = (metadata: MetaData[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<atom:link href="${import.meta.env.VITE_CANONICAL_URL}/rss" rel="self" type="application/rss+xml" />
<title>Jonas Leonhard</title>
<link>${import.meta.env.VITE_CANONICAL_URL}</link>
<description>Jonas Leonhard's blog about Code, and anything technical</description>
${metadata
	.map(
		(post) => `<item>
<guid>${import.meta.env.VITE_CANONICAL_URL}${post.href}</guid>
<title>${post.title}</title>
<link>${import.meta.env.VITE_CANONICAL_URL}${post.href}</link>
<description>${post.description}</description>
<pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
</item>`
	)
	.join('')}
</channel>
</rss>
`;

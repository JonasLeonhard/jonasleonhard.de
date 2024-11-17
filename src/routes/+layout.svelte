<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { cn, Header, Footer, Toaster, GridPattern } from '$lib';

	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		children: Snippet;
		data: PageData;
	}
	let { children, data }: Props = $props();
</script>

<svelte:head>
	<title>{data.metadata?.title ?? 'Bugs always hunt in packs...'}</title>
	<meta
		name="description"
		content={data.metadata?.description ?? 'Blog articles and useful resources.'}
	/>
	<link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}${$page.url.pathname}`} />
	{#if data.metadata}
		<meta name="author" content={data.metadata.author} />
		<meta property="og:title" content={data.metadata.title} />
		<meta property="og:description" content={data.metadata.description} />
		<meta property="og:url" content={data.metadata.href} />
		{#if data.metadata.coverImage}
			<meta property="og:image" content={data.metadata.coverImage.src?.img?.src} />
			<meta property="og:image:alt" content={data.metadata.coverImage.alt} />
		{/if}
		<meta property="article:published_time" content={data.metadata.publishDate.toISOString()} />
		{#if data.metadata.updatedDate}
			<meta property="article:modified_time" content={data.metadata.updatedDate.toISOString()} />
		{/if}
		{#if data.metadata.tags?.length}
			<meta name="keywords" content={data.metadata.tags.join(', ')} />
		{/if}
	{/if}
</svelte:head>

<div
	data-vaul-drawer-wrapper
	class="box-border flex h-fit min-h-screen flex-col gap-y-6 font-sans antialiased"
>
	<Header />
	<GridPattern
		width={35}
		height={35}
		class={cn(
			'mx-auto [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] '
		)}
	/>

	<main class="min-h-[calc(100vh-15rem)] flex-grow">
		{@render children()}
	</main>
	<Footer />
	<Toaster />
</div>

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
		<meta data-pagefind-meta="author[content]" name="author" content={data.metadata.author} />
		<meta property="og:title" data-pagefind-sort="title[content]" content={data.metadata.title} />
		<meta
			data-pagefind-meta="description[content]"
			property="og:description"
			content={data.metadata.description}
		/>
		<meta property="og:url" content={data.metadata.href} />
		{#if data.metadata.coverImage}
			<meta property="og:image" content={data.metadata.coverImage.src?.img?.src} />
			<meta property="og:image:alt" content={data.metadata.coverImage.alt} />
		{/if}
		<meta
			data-pagefind-meta="publishDate[content]"
			data-pagefind-sort="publishDate[content]"
			property="article:published_time"
			content={data.metadata.publishDate.toISOString()}
		/>
		{#if data.metadata.updatedDate}
			<meta
				data-pagefind-meta="updatedDate[content]"
				data-pagefind-sort="updatedDate[content]"
				property="article:modified_time"
				content={data.metadata.updatedDate.toISOString()}
			/>
		{/if}
		{#if data.metadata.tags?.length}
			<meta
				data-pagefind-meta="tags[content]"
				name="keywords"
				content={[data.metadata?.type || 'article', ...data.metadata.tags].join(', ')}
			/>
			{#each data.metadata.tags as tag}
				<meta
					data-pagefind-filter="tag[content]"
					content={`${data.metadata.draft ? '_DRAFT_' : '_VISIBLE_'}${tag}`}
				/>
			{/each}
		{/if}

		{#if data.metadata?.type}
			<meta
				data-pagefind-filter="tag[content]"
				content={`${data.metadata.draft ? '_DRAFT_' : '_VISIBLE_'}${data.metadata.type}`}
			/>
		{/if}

		<meta
			data-pagefind-filter="visibility[content]"
			content={data.metadata.draft ? 'draft' : 'visible'}
		/>
	{/if}

	<link data-pagefind-meta="url[href]" href={$page.url.pathname} />
</svelte:head>

<div
	data-vaul-drawer-wrapper
	class="box-border flex h-fit min-h-screen flex-col gap-y-6 bg-linear-to-r from-white to-transparent font-sans antialiased dark:from-black"
>
	<Header />
	<GridPattern
		width={35}
		height={35}
		class={cn(
			'mx-auto [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] '
		)}
	/>

	<main class="min-h-[calc(100vh-15rem)] grow">
		{@render children()}
	</main>
	<Toaster />
</div>

<Footer />

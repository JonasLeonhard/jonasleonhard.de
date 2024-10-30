<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { MouseDrag } from '$lib';
	import { X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/components/ui/drawer';

	interface PagefindResult {
		id: string;
		score: number;
		words: number[];
		data: () => Promise<{
			url: string;
			excerpt: string;
			meta: {
				title: string;
				[key: string]: string;
			};
		}>;
	}

	type PagefindSearchResult = Promise<{
		filters: unknown;
		results: PagefindResult[];
		timings: { preload: number; search: number; total: number }[];
	}>;

	interface Pagefind {
		options: (opts: { baseUrl: string; bundlePath: string }) => Promise<void>;
		init: () => Promise<void>;
		search: (query: string) => PagefindSearchResult;
	}

	let isOpen = $state(false);
	let pagefind: Pagefind | null = $state(null);
	let searchInput = $state('');
	let searchResults: PagefindResult[] = $state([]);
	let isLoading = $state(false);

	async function lazyLoadPagefind(open: boolean, initialized: Pagefind | null) {
		if (!open || initialized) {
			return;
		}
		// INFO: This will throw an error if vite cannot find this script in static/pagefind/pagefind.js
		// it gets installed after running 'bun run build'
		// if this is the first time starting this app, run 'bun run build' first, to build a pagefind index
		const _pagefind = (await import('/pagefind/pagefind.js?url')) as unknown as Pagefind;
		await _pagefind.options({
			baseUrl: import.meta.env.BASE_URL,
			bundlePath: '/pagefind/'
		});
		_pagefind.init();
		pagefind = _pagefind;
	}

	async function performSearch() {
		if (!pagefind || !searchInput.trim()) {
			searchResults = [];
			return;
		}

		isLoading = true;
		try {
			const result = await pagefind.search(searchInput);
			searchResults = result.results;
		} catch (error) {
			console.error('Search failed:', error);
			searchResults = [];
		} finally {
			isLoading = false;
		}
	}

	function debug(some: any) {
		console.log(some);
	}

	$effect(() => {
		lazyLoadPagefind(isOpen, pagefind);
	});

	$effect(() => {
		performSearch();
	});
</script>

<svelte:head>
	<link data-pagefind-meta="url[href]" rel="canonical" href={$page.url.pathname} />
</svelte:head>

<Drawer.Root
	backgroundColor="transparent"
	shouldScaleBackground
	onOpenChange={(open) => (isOpen = open)}
	open={isOpen}
>
	<Drawer.Trigger>
		<div class="flex h-8 w-8 items-center justify-center">
			<MouseDrag>
				<Search />
			</MouseDrag>
		</div>
	</Drawer.Trigger>

	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Search</Drawer.Title>
			<Drawer.Description>
				<input
					bind:value={searchInput}
					placeholder="Type to search..."
					class="mb-8 w-full rounded-md border p-2"
				/>
			</Drawer.Description>
		</Drawer.Header>

		<div class="h-[30vh] overflow-y-auto p-4">
			{#if isLoading}
				<div class="flex justify-center">
					<span class="animate-spin">⌛</span>
				</div>
			{:else if searchResults.length === 0}
				<div class="text-center text-gray-500">
					{searchInput ? 'No results found' : 'Start typing to search'}
				</div>
			{:else}
				{#each searchResults as result (result.id)}
					{#await result.data() then data}
						{debug(data)}
						<a
							href={data.meta?.url || data.url?.replace('.html', '')}
							onclick={() => (isOpen = false)}
							class="mb-4 block rounded-lg border p-4 hover:bg-gray-50"
						>
							<h3 class="font-bold">{data.meta.title}</h3>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<p class="mt-2 text-sm text-gray-600">{@html data.excerpt}</p>
						</a>
					{:catch error}
						{error}
					{/await}
				{/each}
			{/if}
		</div>

		<Drawer.Footer>
			<Drawer.Close class="m-auto flex w-max items-center justify-center gap-2">
				<span>Cancel</span>
				<X />
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>

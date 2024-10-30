<script lang="ts">
	import { Search, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { MouseDrag, Drawer, Input, Label, Skeleton, Pagination } from '$lib';
	import { X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { MediaQuery } from 'runed';

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

	const paginationPageSize = 10;
	const isDesktop = new MediaQuery('(min-width: 768px)');

	let isOpen = $state(false);
	let pagefind: Pagefind | null = $state(null);
	let searchInput = $state('');
	let searchIsLoading = $state(false);
	let searchResults: PagefindResult[] = $state([]);
	let paginationPage = $state(1);
	const paginationSiblingCount = $derived(isDesktop.matches ? 1 : 0);
	let paginatedSearchResults: PagefindResult[] = $derived(
		searchResults.slice(
			(paginationPage - 1) * paginationPageSize,
			(paginationPage - 1) * paginationPageSize + paginationPageSize
		)
	);

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

		searchIsLoading = true;
		try {
			const result = await pagefind.search(searchInput);
			searchResults = result.results;
		} catch (error) {
			console.error('Search failed:', error);
			searchResults = [];
		} finally {
			searchIsLoading = false;
		}
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
			<Drawer.Title class="mb-4">Search</Drawer.Title>
			<Drawer.Description>
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="search">Search Query</Label>
					<Input id="search" bind:value={searchInput} placeholder="Type a keyword..." />
				</div>
			</Drawer.Description>
		</Drawer.Header>

		<div class="h-[50vh] overflow-y-auto p-4">
			{#if searchIsLoading}
				<Skeleton class="h-8 w-[33%]" />
			{:else if searchResults.length === 0}
				<div class="text-center text-muted-foreground">
					{searchInput ? 'No results found' : 'Start typing to search'}
				</div>
			{:else}
				{#each paginatedSearchResults as result (result.id)}
					{#await result.data()}
						<Skeleton class="h-8 w-[33%]" />
					{:then data}
						<a
							href={data.meta?.url || data.url?.replace('.html', '')}
							onclick={() => (isOpen = false)}
							class="mb-4 block border p-4 hover:bg-gray-50"
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
			{#if searchResults.length > paginationPageSize}
				<Pagination.Root
					bind:page={paginationPage}
					count={searchResults.length}
					perPage={paginationPageSize}
					siblingCount={paginationSiblingCount}
				>
					{#snippet children({ pages, currentPage })}
						<Pagination.Content>
							<Pagination.Item>
								<Pagination.PrevButton>
									<ChevronLeft class="size-4" />
									<span class="hidden sm:block">Previous</span>
								</Pagination.PrevButton>
							</Pagination.Item>
							{#each pages as page (page.key)}
								{#if page.type === 'ellipsis'}
									<Pagination.Item>
										<Pagination.Ellipsis />
									</Pagination.Item>
								{:else}
									<Pagination.Item>
										<Pagination.Link {page} isActive={currentPage === page.value}>
											{page.value}
										</Pagination.Link>
									</Pagination.Item>
								{/if}
							{/each}
							<Pagination.Item>
								<Pagination.NextButton>
									<span class="hidden sm:block">Next</span>
									<ChevronRight class="size-4" />
								</Pagination.NextButton>
							</Pagination.Item>
						</Pagination.Content>
					{/snippet}
				</Pagination.Root>
			{/if}

			<Drawer.Close class="m-auto flex w-max items-center justify-center gap-2">
				<span>Cancel</span>
				<X />
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>

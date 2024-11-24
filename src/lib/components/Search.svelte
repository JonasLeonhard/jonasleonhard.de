<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Search, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import {
		Collapsible,
		Drawer,
		Folder,
		Input,
		Badge,
		Label,
		MouseDrag,
		Pagination,
		Skeleton,
		useLink,
		send,
		receive
	} from '$lib';
	import { X } from 'lucide-svelte';
	import { MediaQuery } from 'runed';

	interface PagefindResultItem {
		id: string;
		score: number;
		words: number[];
		data: () => Promise<{
			url: string;
			excerpt: string;
			meta: {
				title: string;
				url?: string;
				image?: string;
				image_alt?: string;
				description: string;
				author?: string;
				publishDate?: string;
				updatedDate?: string;
				tags?: string;
			};
		}>;
	}

	interface PagefindResult {
		filters: unknown;
		results: PagefindResultItem[];
		timings: { preload: number; search: number; total: number }[];
		unfilteredResultCount: number;
	}

	interface PagefindFilters {
		[key: string]: PagefindFilter;
	}

	interface PagefindFilter {
		[key: string]: number;
	}

	interface PagefindSearchOptions {
		filters: any;
	}

	interface Pagefind {
		options: (opts: { baseUrl: string; bundlePath: string }) => Promise<void>;
		init: () => Promise<void>;
		search: (query: string, options: PagefindSearchOptions) => Promise<PagefindResult>;
		filters: () => Promise<PagefindFilters>;
	}

	let tags: PagefindFilter = $state({});
	let unselectedTags: PagefindFilter = $state({});

	const paginationPageSize = 10;
	const isDesktop = new MediaQuery('(min-width: 768px)');

	let isOpen = $state(false);
	let pagefind: Pagefind | null = $state(null);
	let searchInput = $state('');
	let searchIsLoading = $state(false);
	let searchResult: PagefindResult | undefined = $state();
	let paginationPage = $state(1);
	const paginationSiblingCount = $derived(isDesktop.matches ? 1 : 0);
	let paginatedSearchResults: PagefindResultItem[] = $derived(
		searchResult?.results?.slice(
			(paginationPage - 1) * paginationPageSize,
			(paginationPage - 1) * paginationPageSize + paginationPageSize
		) || []
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

		const filters = await pagefind.filters();
		unselectedTags = filters.tag || {};
	}

	async function performSearch() {
		if (!pagefind || !searchInput.trim()) {
			searchResult = undefined;
			return;
		}

		searchIsLoading = true;
		try {
			searchResult = await pagefind.search(searchInput, {
				filters: {
					tag: {
						any: Object.keys(tags)
					}
				}
			});
		} catch (error) {
			console.error('Search failed:', error);
			searchResult = undefined;
		} finally {
			searchIsLoading = false;
		}
	}

	async function resetSearch() {
		if (!pagefind) return;

		searchInput = '';
		const filters = await pagefind.filters();
		unselectedTags = filters.tag || {};
		tags = {};
		performSearch();
	}

	$effect(() => {
		lazyLoadPagefind(isOpen, pagefind);
	});

	$effect(() => {
		performSearch();
	});
</script>

<Drawer.Root
	setBackgroundColorOnScale={false}
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
			<Drawer.Title class="mb-4"
				>Search
				{searchResult ? `- ${searchResult?.unfilteredResultCount} Results` : ''}
			</Drawer.Title>
		</Drawer.Header>

		<!-- Filter Left -->
		<div class="flex gap-4">
			<div class="p-4">
				<div
					class="mb-4 flex w-max justify-between border-b border-muted-foreground pb-2 font-mono text-xs"
				>
					<div class="col-span-1 pr-20">/Filter</div>
					<button onmousedown={resetSearch} class="col-span-10">clear filters</button>
				</div>
				<div class="mb-4 flex w-full max-w-sm flex-col gap-1.5">
					<Label class="flex items-center gap-1" for="search">
						<Search class="w-4" />
						/Query
					</Label>
					<Input id="search" bind:value={searchInput} placeholder="Type a keyword..." />
				</div>

				<Folder class="mb-4" expanded name="/Selected">
					<div class="flex flex-col gap-1">
						{#each Object.entries(tags) as [key, value] (key)}
							<div animate:flip={{ duration: 600 }} in:receive={{ key }} out:send={{ key }}>
								<Badge
									class="cursor-pointer"
									onmousedown={() => {
										delete tags[key];
										unselectedTags[key] = value;
									}}
								>
									{key}
									{value}
								</Badge>
							</div>
						{/each}
					</div>
				</Folder>

				<Folder class="mb-4" expanded name="/Unselected">
					<div class="flex flex-col gap-1">
						{#each Object.entries(unselectedTags) as [key, value] (key)}
							<div animate:flip={{ duration: 600 }} in:receive={{ key }} out:send={{ key }}>
								<Badge
									class="cursor-pointer opacity-50"
									onmousedown={() => {
										delete unselectedTags[key];
										tags[key] = value;
									}}
								>
									{key}
									{value}
								</Badge>
							</div>
						{/each}
					</div>
				</Folder>
			</div>

			<!-- Results Right -->
			<div
				class="grid h-[50vh] w-full auto-rows-max grid-cols-12 gap-0 overflow-y-auto p-4 font-mono text-xs"
			>
				<div class="col-span-1 h-max border-b border-muted-foreground pb-2">/Date</div>
				<div class="col-span-10 h-max border-b border-muted-foreground pb-2">/Name</div>
				<div class="col-span-1 h-max border-b border-muted-foreground pb-2">/Tag</div>

				{#if searchIsLoading}
					<Skeleton class="col-span-12 h-8 w-[33%]" />
				{:else if !searchResult?.results?.length}
					<div class="col-span-12 mt-8 text-center text-lg text-muted-foreground">
						{searchInput ? 'No results found' : 'Start typing to search'}
					</div>
				{:else}
					{#each paginatedSearchResults as result (result.id)}
						{#await result.data()}
							<Skeleton class="h-8 w-[33%]" />
						{:then data}
							<div class="col-span-12 mb-4 grid grid-cols-subgrid pt-2">
								<Collapsible class="col-span-12 grid grid-cols-subgrid text-left">
									<span
										class="col-span-1 flex h-max items-center gap-2 pt-2.5 before:block before:h-[8px] before:w-[8px] before:bg-black dark:before:bg-white"
									>
										{#if data.meta?.publishDate}
											{new Date(data.meta.publishDate).toLocaleDateString()}
										{:else}
											-
										{/if}
									</span>

									<div class="col-span-10">
										<h3
											class="w-max bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-xl text-transparent dark:from-white dark:to-white/40"
										>
											{data.meta.title}
										</h3>
										<p>
											<span class="text-muted">[…]</span>
											<span
												class="bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-sm text-transparent dark:from-white dark:to-white/40"
											>
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												{@html data.excerpt}
											</span>
											<span class="text-muted">[…]</span>
										</p>
									</div>

									{#if data.meta?.tags}
										<div class="col-span-1 mb-4 mt-2 flex flex-wrap gap-1">
											{#each data.meta.tags.split(',') as tag}
												<Badge>
													{tag}
												</Badge>
											{/each}
										</div>
									{/if}

									{#snippet expanded()}
										<div class="col-span-12 pt-6" />
										<!-- info -->
										{#if data.meta?.image}
											<span class="font-mono text-muted-foreground">TEASER:</span>
											<img
												src={data.meta.image}
												alt={data.meta.image_alt || 'Teaser Image'}
												class="col-span-12 h-auto w-[150px] border border-muted-foreground"
												width="150px"
												loading="lazy"
											/>
										{/if}

										{#if data.meta?.author}
											<p class="mb-1 w-max">
												<span class="font-mono text-muted-foreground">AUTHOR:</span>
												{data.meta.author}
											</p>
										{/if}

										{#if data.meta?.description}
											<p class="mb-1 w-max">
												<span class="font-mono text-muted-foreground">DESCRIPTION:</span>
												{data.meta.description}
											</p>
										{/if}

										<a
											class="mt-3 block w-full text-accent underline"
											use:useLink
											href={data.meta?.url || data.url?.replace('.html', '')}
											onclick={() => (isOpen = false)}
											class:flex={data.meta?.image}
										>
											READ
										</a>
									{/snippet}
								</Collapsible>
							</div>
						{:catch error}
							{error}
						{/await}
					{/each}
				{/if}
			</div>
		</div>

		<Drawer.Footer>
			{#if (searchResult?.results?.length || 0) > paginationPageSize}
				<Pagination.Root
					bind:page={paginationPage}
					count={searchResult?.results?.length || 0}
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

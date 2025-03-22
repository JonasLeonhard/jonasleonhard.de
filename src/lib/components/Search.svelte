<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dev } from '$app/environment';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	import {
		Folder,
		Input,
		Badge,
		Label,
		Pagination,
		Select,
		Skeleton,
		SearchTeaser,
		SearchPath,
		send,
		receive
	} from '$lib';
	import { onMount } from 'svelte';
	import type { Selected } from 'bits-ui';
	import { MediaQuery } from 'svelte/reactivity';

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
		debouncedSearch: (
			query: string | null,
			options: PagefindSearchOptions
		) => Promise<PagefindResult>;
		filters: () => Promise<PagefindFilters>;
	}

	let tags: PagefindFilter = $state({});
	let unselectedTags: PagefindFilter = $state({});

	const paginationPageSize = 10;
	const isDesktop = new MediaQuery('(min-width: 768px)');

	let pagefind: Pagefind | null = $state(null);
	let searchInput = $state('');
	let searchIsLoading = $state(false);
	let searchResult: PagefindResult | undefined = $state();
	let sortBy: Selected<unknown> | undefined = $state({
		label: 'Publish Date desc',
		value: 'publishDate-desc'
	});
	let paginationPage = $state(1);
	const paginationSiblingCount = $derived(isDesktop.current ? 1 : 0);
	let paginatedSearchResults: PagefindResultItem[] = $derived(
		searchResult?.results?.slice(
			(paginationPage - 1) * paginationPageSize,
			(paginationPage - 1) * paginationPageSize + paginationPageSize
		) || []
	);

	async function loadFilters() {
		if (!pagefind) return;

		const filters = await pagefind.filters();

		// filter out _DRAFT_ tags for production
		if (!dev && filters.tag) {
			unselectedTags = Object.entries(filters.tag).reduce(
				(acc, [key, value]) => {
					if (!key.startsWith('_DRAFT_')) {
						acc[key] = value;
					}
					return acc;
				},
				{} as Record<string, number>
			);
		} else {
			unselectedTags = filters.tag || {};
		}
		tags = {};
	}

	async function lazyLoadPagefind(initialized: Pagefind | null) {
		if (initialized) {
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
		await loadFilters();
	}

	async function performSearch(
		sInput: string | null,
		sTags: PagefindFilter,
		sSortBy: Selected<unknown> | undefined
	) {
		if (!pagefind) {
			searchResult = undefined;
			return;
		}

		searchIsLoading = true;
		const searchOpts = {
			filters: {
				tag: {
					any: Object.keys(sTags)
				},
				visibility: {
					any: ['visible'] as ('visible' | 'draft')[]
				}
			},
			sort: {} as { [key: string]: string }
		};
		if (sSortBy) {
			const [key, val] = (sSortBy.value as string).split('-') || [];
			if (key && val) {
				searchOpts.sort[key] = val;
			}
		}
		if (dev) {
			searchOpts.filters.visibility.any = ['visible', 'draft']; // show draft articles in search for dev env
		}
		try {
			searchResult = await pagefind.debouncedSearch(sInput, searchOpts);
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
		tags = {};
		performSearch(searchInput, tags, sortBy);
	}

	onMount(() => {
		lazyLoadPagefind(pagefind);
	});

	$effect(() => {
		performSearch(searchInput?.trim() === '' ? null : searchInput, tags, sortBy);
	});
</script>

<div class="mb-80">
	<div class="mb-32 flex flex-col gap-4 lg:flex-row lg:gap-10">
		<div>
			<span
				class="text-muted-foreground relative z-10 mb-4 block max-w-max border border-dashed text-base"
			>
				These are the droids you are looking for.
			</span>

			<h3
				class="relative z-10 mt-4 mb-4 max-w-3xl bg-linear-to-br from-black from-30% to-black/40 bg-clip-text p-4 text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
			>
				Blog, Projects & Shorts
			</h3>
		</div>
	</div>

	<div class="@container/search_results">
		<div class="flex flex-col gap-4 @xl/search_results:flex-row">
			<!-- Filter Left -->
			<div class="@xl/search_results:p-4">
				<Label for="search">Search</Label>
				<SearchPath searchTerm={searchInput} />
				<Input class="mb-4" id="search" bind:value={searchInput} placeholder="Search Query..." />

				<Select.Root bind:selected={sortBy}>
					<Label for="sort">Sort by</Label>
					<Select.Trigger class="mb-8 w-full @xl/search_results:w-[180px]">
						<Select.Value id="sort" placeholder="-" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="publishDate-desc">Publish Date desc</Select.Item>
						<Select.Item value="publishDate-asc">Publish Date asc</Select.Item>
						<Select.Item value="title-desc">Title desc</Select.Item>
						<Select.Item value="title-asc">Title asc</Select.Item>
						<Select.Item value="updatedDate-desc">Updated Date desc</Select.Item>
						<Select.Item selected value="updatedDate-asc">Updated Date asc</Select.Item>
					</Select.Content>
				</Select.Root>

				<Folder class="mb-8" expanded name="Selected/">
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
									{key.replace('_VISIBLE_', '')}
									{value}
								</Badge>
							</div>
						{/each}
					</div>
				</Folder>

				<Folder class="mb-8" expanded name="Unselected/">
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
									{key.replace('_VISIBLE_', '')}
									{value}
								</Badge>
							</div>
						{/each}
					</div>
				</Folder>

				<button onmousedown={resetSearch} class="hover:text-accent underline">clear filters</button>
			</div>

			<!-- Results Right -->
			<div
				class="grid h-full w-full auto-rows-max grid-cols-12 gap-0 overflow-y-auto font-mono text-base @xl/search-results:p-4"
			>
				<div class="col-span-12 mb-8 ml-auto">
					<span class="text-accent">{searchResult ? searchResult?.results?.length : 0}</span> Results
				</div>

				{#if searchIsLoading || !pagefind}
					<Skeleton class="col-span-12 h-52 w-full" />
				{:else if !searchResult?.results?.length}
					<span class="w-max text-4xl">No search results</span>
				{:else}
					{#each paginatedSearchResults as result (result.id)}
						{#await result.data()}
							<Skeleton class="col-span-12 h-32 w-32" />
						{:then data}
							<SearchTeaser
								headline={data.meta.title}
								date={data.meta?.publishDate
									? new Date(data.meta.publishDate).toLocaleDateString()
									: '-'}
								excerpt={data.excerpt}
								selectedTags={tags}
								tags={data.meta.tags}
								author={data.meta?.author}
								description={data.meta?.description}
								isFiltered={searchInput !== ''}
								url={data.meta?.url}
							/>
						{:catch error}
							{error}
						{/await}
					{/each}
				{/if}
			</div>
		</div>

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
	</div>
</div>

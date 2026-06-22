<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dev } from '$app/environment';
	import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import {
		Folder,
		Input,
		Badge,
		Label,
		Pagination,
		Skeleton,
		SearchTeaser,
		SearchPath,
		send,
		receive
	} from '$lib';
	import { onMount, untrack } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	interface PagefindResultItem {
		id: string;
		score: number;
		words: number[];
		data: () => Promise<{
			excerpt: string;
			meta: {
				url: string;
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

	interface PagefindFiltersResponse {
		tag?: Record<string, number>;
		author?: Record<string, number>;
		[key: string]: Record<string, number> | undefined;
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
		sort?: { [key: string]: string };
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

	let isInitialized = $state(false);
	let lastSyncedSearch = ''; // To prevent infinite update loops

	let tags: PagefindFilter = $state({});
	let unselectedTags: PagefindFilter = $state({});

	let authors: PagefindFilter = $state({});
	let unselectedAuthors: PagefindFilter = $state({});

	let advancedSearchVisible = $state(false);

	const paginationPageSize = 10;
	const isDesktop = new MediaQuery('(min-width: 768px)');
	const shouldShowAdvancedSearch = $derived(isDesktop.current || advancedSearchVisible);

	let pagefind: Pagefind | null = $state(null);
	let searchInput = $state('');
	let searchIsLoading = $state(false);
	let searchResult: PagefindResult | undefined = $state();

	let sortBy = $state('publishDate-desc');
	let paginationPage = $state(1);

	const paginationSiblingCount = $derived(isDesktop.current ? 1 : 0);
	let paginatedSearchResults: PagefindResultItem[] = $derived(
		searchResult?.results?.slice(
			(paginationPage - 1) * paginationPageSize,
			(paginationPage - 1) * paginationPageSize + paginationPageSize
		) || []
	);

	const sortLabels: Record<string, string> = {
		'publishDate-desc': 'Publish Date desc',
		'publishDate-asc': 'Publish Date asc',
		'title-desc': 'Title desc',
		'title-asc': 'Title asc',
		'updatedDate-desc': 'Updated Date desc',
		'updatedDate-asc': 'Updated Date asc'
	};

	// Derived values for dynamic UI
	const activeSearchPath = $derived(
		[
			searchInput,
			...Object.keys(authors),
			...Object.keys(tags).map((t) => t.replace('_VISIBLE_', '')),
			sortBy ? sortLabels[sortBy] : null
		]
			.filter(Boolean)
			.join(' / ')
	);

	const currentAvailableTags = $derived(
		(searchResult?.filters as PagefindFiltersResponse | undefined)?.tag || {}
	);

	const currentAvailableAuthors = $derived(
		(searchResult?.filters as PagefindFiltersResponse | undefined)?.author || {}
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

		unselectedAuthors = filters.author || {};

		initializeFromUrl();
		lastSyncedSearch = new URL(page.url).searchParams.toString();
		isInitialized = true;
	}

	function initializeFromUrl() {
		const url = new URL(page.url);
		const urlTags = url.searchParams.getAll('tag');
		const urlAuthors = url.searchParams.getAll('author');
		const urlPage = url.searchParams.get('page');
		const urlSort = url.searchParams.get('sort');

		// Move all current state back to unselected arrays to start fresh
		for (const [key, value] of Object.entries(tags)) {
			unselectedTags[key] = value;
			delete tags[key];
		}
		for (const [key, value] of Object.entries(authors)) {
			unselectedAuthors[key] = value;
			delete authors[key];
		}

		if (urlPage) {
			const p = parseInt(urlPage, 10);
			if (!isNaN(p) && p > 0) {
				paginationPage = p;
			}
		} else {
			paginationPage = 1;
		}

		if (urlSort && urlSort in sortLabels) {
			sortBy = urlSort;
		} else {
			sortBy = 'publishDate-desc';
		}

		if (urlTags.length > 0) {
			urlTags.forEach((tag) => {
				const variations = [tag, `_VISIBLE_${tag}`, tag.toUpperCase(), tag.toLowerCase()];

				for (const variation of variations) {
					if (variation in unselectedTags) {
						tags[variation] = unselectedTags[variation];
						delete unselectedTags[variation];
						break;
					}
				}
			});
		}

		if (urlAuthors.length > 0) {
			urlAuthors.forEach((author) => {
				const variations = [author, author.toLowerCase(), author.toUpperCase()];

				for (const variation of variations) {
					if (variation in unselectedAuthors) {
						authors[variation] = unselectedAuthors[variation];
						delete unselectedAuthors[variation];
						break;
					}
				}
			});
		}
	}

	async function lazyLoadPagefind(initialized: Pagefind | null) {
		if (initialized) {
			return;
		}
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
		sAuthors: PagefindFilter,
		sSortBy: string
	) {
		if (!pagefind) {
			searchResult = undefined;
			return;
		}

		searchIsLoading = true;
		const searchOpts: PagefindSearchOptions = {
			filters: {
				tag: {
					any: Object.keys(sTags)
				},
				author: {
					any: Object.keys(sAuthors)
				},
				visibility: {
					any: ['visible'] as ('visible' | 'draft')[]
				}
			},
			sort: {}
		};

		if (sSortBy) {
			const [key, val] = sSortBy.split('-') || [];
			if (key && val) {
				searchOpts.sort = { [key.toLowerCase()]: val };
			}
		}

		if (dev) {
			searchOpts.filters.visibility.any = ['visible', 'draft'];
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
		authors = {};
		sortBy = 'publishDate-desc';
		paginationPage = 1;
	}

	function selectTag(key: string, value: number) {
		delete unselectedTags[key];
		tags[key] = value;
		paginationPage = 1;
	}

	function deselectTag(key: string, value: number) {
		delete tags[key];
		unselectedTags[key] = value;
		paginationPage = 1;
	}

	function selectAuthor(key: string, value: number) {
		delete unselectedAuthors[key];
		authors[key] = value;
		paginationPage = 1;
	}

	function deselectAuthor(key: string, value: number) {
		delete authors[key];
		unselectedAuthors[key] = value;
		paginationPage = 1;
	}

	onMount(() => {
		lazyLoadPagefind(pagefind);
	});

	// URL -> State sync: Reacts to external link clicks / browser navigation
	$effect(() => {
		const currentSearch = page.url.searchParams.toString();

		if (isInitialized && currentSearch !== lastSyncedSearch) {
			lastSyncedSearch = currentSearch;
			untrack(() => {
				initializeFromUrl();
			});
		}
	});

	// State -> URL sync: Updates the URL when the user clicks internal filters
	$effect(() => {
		if (!isInitialized) return;

		// Track variables to trigger effect
		const currentTags = Object.keys(tags);
		const currentAuthors = Object.keys(authors);
		const pPage = paginationPage;
		const sBy = sortBy;

		untrack(() => {
			const url = new URL(page.url);
			url.searchParams.delete('tag');
			url.searchParams.delete('author');
			url.searchParams.delete('page');
			url.searchParams.delete('sort');

			currentTags.forEach((tag) => {
				const cleanTag = tag.replace('_VISIBLE_', '').toLowerCase();
				url.searchParams.append('tag', cleanTag);
			});

			currentAuthors.forEach((author) => {
				url.searchParams.append('author', author);
			});

			if (pPage > 1) {
				url.searchParams.set('page', pPage.toString());
			}

			if (sBy && sBy !== 'publishDate-desc') {
				url.searchParams.set('sort', sBy);
			}

			const newUrlString = url.toString();
			const newSearchString = url.searchParams.toString();

			if (newUrlString !== page.url.toString()) {
				lastSyncedSearch = newSearchString;
				goto(newUrlString, { replaceState: true, noScroll: true, keepFocus: true });
			} else {
				lastSyncedSearch = newSearchString;
			}
		});
	});

	// Perform Search on Parameter Changes
	$effect(() => {
		if (!isInitialized || !pagefind) return;
		performSearch(searchInput?.trim() === '' ? null : searchInput, tags, authors, sortBy);
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
				Content I Love
			</h3>

			<p class="max-w-lg">
				I write Blogposts from time to time. You can find them here. This list also contains
				resources i find worth sharing. I hope you will enjoy this list as much as i did!
			</p>
		</div>
	</div>

	<div class="@container/search_results">
		<div class="flex flex-col gap-4 @xl/search_results:flex-row">
			<div class="@xl/search_results:p-4">
				<Label for="search">Search</Label>
				<SearchPath searchTerm={activeSearchPath} />
				<Input
					class="mb-4"
					id="search"
					bind:value={searchInput}
					oninput={() => {
						paginationPage = 1;
					}}
					placeholder="Search Query..."
				/>

				{#if !isDesktop.current}
					<button
						class="hover:text-accent mb-4 flex items-center gap-2 text-sm underline"
						onclick={() => (advancedSearchVisible = !advancedSearchVisible)}
					>
						{advancedSearchVisible ? 'Hide' : 'Show'} Advanced Search
						{#if advancedSearchVisible}
							<ChevronUp class="h-4 w-4" />
						{:else}
							<ChevronDown class="h-4 w-4" />
						{/if}
					</button>
				{/if}

				{#if shouldShowAdvancedSearch}
					<div
						class="border-muted-foreground/30 mb-4 border border-dashed p-4 @xl/search_results:w-[250px]"
					>
						<div class="mb-6 w-full @xl/search_results:w-[180px]">
							<Label for="sort" class="mb-2 block">Sort by</Label>
							<select
								id="sort"
								bind:value={sortBy}
								onchange={() => {
									paginationPage = 1;
								}}
								class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-none border px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{#each Object.entries(sortLabels) as [val, label]}
									<option value={val}>{label}</option>
								{/each}
							</select>
						</div>

						<Folder class="mb-6" expanded name="Selected Tags/">
							<div class="flex flex-wrap gap-1">
								{#each Object.entries(tags) as [key, value] (key)}
									<div animate:flip={{ duration: 600 }} in:receive={{ key }} out:send={{ key }}>
										<Badge class="cursor-pointer" onmousedown={() => deselectTag(key, value)}>
											{key.replace('_VISIBLE_', '')}
										</Badge>
									</div>
								{/each}
							</div>
						</Folder>

						<Folder class="mb-6" expanded name="Available Tags/">
							<div class="flex flex-wrap gap-1">
								{#each Object.entries(unselectedTags) as [key, value] (key)}
									{@const availableCount = searchResult ? currentAvailableTags[key] : value}
									{@const isDisabled = searchResult && !availableCount}
									<div animate:flip={{ duration: 600 }} in:receive={{ key }} out:send={{ key }}>
										<Badge
											class="transition-all duration-200 {isDisabled
												? 'opacity-20 cursor-not-allowed'
												: 'cursor-pointer opacity-50 hover:opacity-100'}"
											onmousedown={() => !isDisabled && selectTag(key, value)}
										>
											{key.replace('_VISIBLE_', '')}
											{availableCount || 0}
										</Badge>
									</div>
								{/each}
							</div>
						</Folder>

						<Folder class="mb-6" expanded name="Selected Authors/">
							<div class="flex flex-wrap gap-1">
								{#each Object.entries(authors) as [key, value] (key)}
									<div animate:flip={{ duration: 600 }} in:receive={{ key }} out:send={{ key }}>
										<Badge class="cursor-pointer" onmousedown={() => deselectAuthor(key, value)}>
											{key}
										</Badge>
									</div>
								{/each}
							</div>
						</Folder>

						<Folder class="mb-6" expanded name="Available Authors/">
							<div class="flex flex-wrap gap-1">
								{#each Object.entries(unselectedAuthors) as [key, value] (key)}
									{@const availableCount = searchResult ? currentAvailableAuthors[key] : value}
									{@const isDisabled = searchResult && !availableCount}
									<div animate:flip={{ duration: 600 }} in:receive={{ key }} out:send={{ key }}>
										<Badge
											class="transition-all duration-200 {isDisabled
												? 'opacity-20 cursor-not-allowed'
												: 'cursor-pointer opacity-50 hover:opacity-100'}"
											onmousedown={() => !isDisabled && selectAuthor(key, value)}
										>
											{key}
											{availableCount || 0}
										</Badge>
									</div>
								{/each}
							</div>
						</Folder>

						<button onmousedown={resetSearch} class="hover:text-accent text-sm underline">
							Clear all filters
						</button>
					</div>
				{/if}
			</div>

			<div
				class="grid h-full w-full auto-rows-max grid-cols-12 gap-0 overflow-y-auto font-mono text-base @xl/search-results:p-4"
			>
				<div
					class="col-span-12 mb-8 ml-auto flex flex-wrap items-center justify-end gap-1 text-right"
				>
					<span class="text-accent">{searchResult ? searchResult?.results?.length : 0}</span>
					Results

					{#if Object.keys(authors).length > 0}
						<span class="ml-1">by</span>
						<span class="text-accent">{Object.keys(authors).join(', ')}</span>
					{/if}

					{#if Object.keys(tags).length > 0}
						<span class="ml-1">tagged</span>
						<span class="text-accent">
							{Object.keys(tags)
								.slice(0, 3)
								.map((t) => t.replace('_VISIBLE_', ''))
								.join(', ')}
							{#if Object.keys(tags).length > 3}...{/if}
						</span>
					{/if}
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

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Search, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import {
		Checkbox,
		Collapsible,
		Drawer,
		Folder,
		Input,
		Label,
		MouseDrag,
		Pagination,
		Skeleton,
		useLink
	} from '$lib';
	import { X } from 'lucide-svelte';
	import { page } from '$app/stores';
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
			};
		}>;
	}

	interface PagefindResult {
		filters: unknown;
		results: PagefindResultItem[];
		timings: { preload: number; search: number; total: number }[];
		unfilteredResultCount: number;
	}

	interface Pagefind {
		options: (opts: { baseUrl: string; bundlePath: string }) => Promise<void>;
		init: () => Promise<void>;
		search: (query: string) => Promise<PagefindResult>;
	}

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
	}

	async function performSearch() {
		if (!pagefind || !searchInput.trim()) {
			searchResult = undefined;
			return;
		}

		searchIsLoading = true;
		try {
			searchResult = await pagefind.search(searchInput);
		} catch (error) {
			console.error('Search failed:', error);
			searchResult = undefined;
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
					<div class="col-span-10">clear filters</div>
				</div>
				<div class="mb-4 flex w-full max-w-sm flex-col gap-1.5">
					<Label class="flex items-center gap-1" for="search">
						<Search class="w-4" />
						/Query
					</Label>
					<Input id="search" bind:value={searchInput} placeholder="Type a keyword..." />
				</div>

				<Folder class="mb-4" expanded name="/Type">
					<div class="flex flex-col">
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
					</div>
				</Folder>

				<Folder expanded name="/Topic">
					<div class="flex flex-col">
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
						<Checkbox checked label="Topic01" />
					</div>
				</Folder>
			</div>

			<!-- Results Right -->
			<div
				class="grid h-[50vh] w-full grid-cols-12 grid-rows-[max-content] overflow-y-auto p-4 font-mono text-xs"
			>
				<div class="col-span-1 h-max border-b border-muted-foreground pb-2">/Date</div>
				<div class="col-span-10 h-max border-b border-muted-foreground pb-2">/Name</div>
				<div class="col-span-1 h-max border-b border-muted-foreground pb-2">/Type</div>

				{#if searchIsLoading}
					<Skeleton class="col-span-12 h-8 w-[33%]" />
				{:else if !searchResult?.results?.length}
					<div class="col-span-12 text-center text-muted-foreground">
						{searchInput ? 'No results found' : 'Start typing to search'}
					</div>
				{:else}
					{#each paginatedSearchResults as result, i (result.id)}
						{#await result.data()}
							<Skeleton class="h-8 w-[33%]" />
						{:then data}
							<div
								class="col-span-12 mb-4 grid grid-cols-subgrid pb-2 pt-2"
								transition:fly={{ y: -16, opacity: 0, duration: 80, delay: i * 150 }}
							>
								<Collapsible class="col-span-12 grid grid-cols-subgrid text-left">
									<span
										class="col-span-1 flex h-max items-center gap-2 pt-2.5 before:block before:h-[8px] before:w-[8px] before:bg-black dark:before:bg-white"
										>TODO: date</span
									>

									<div class="col-span-10">
										<h3 class="font-mono text-3xl font-bold">{data.meta.title}</h3>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										<p class="mt-2 text-sm text-gray-600">{@html data.excerpt}</p>
									</div>

									<div class="col-span-1 mt-2 h-max w-max border border-dashed p-1">TODO: type</div>

									{#snippet expanded()}
										<!-- info -->
										{#if data.meta?.image}
											<span>TEASER:</span>
											<img
												src={data.meta.image}
												alt={data.meta.image_alt || 'Teaser Image'}
												class="col-span-12 h-auto w-[150px] border border-muted-foreground"
												width="150px"
												loading="lazy"
											/>
										{/if}

										<p class="mb-4">AUTHOR: TODO</p>

										<p class="mb-4">TOPIC: TODO</p>

										<a
											class="w-full"
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

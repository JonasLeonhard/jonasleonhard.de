<script lang="ts">
	import { MoveRight } from 'lucide-svelte';
	import { Badge, useLink } from '$lib';
	interface PagefindFilter {
		[key: string]: number;
	}
	interface Props {
		url?: string;
		headline: string;
		date: string;
		excerpt: string;
		tags?: string;
		selectedTags?: PagefindFilter;
		author?: string;
		description?: string;
		isFiltered?: boolean;
	}

	const {
		headline,
		date,
		excerpt,
		tags,
		selectedTags,
		author,
		description,
		url,
		isFiltered
	}: Props = $props();
</script>

<div
	class="group border-muted-foreground/50 hover:border-muted-foreground relative col-span-12 mb-10 border text-left transition-all duration-1000"
>
	<MoveRight class="absolute top-8 right-12 z-10 transition-all duration-500 group-hover:right-8" />
	<div class="relative flex flex-col overflow-hidden pt-8 pr-8 pl-8">
		<a class="z-10" use:useLink href={url?.replace('.html', '')}>
			<h3 class="mb-2 max-w-[calc(100%-32px)] font-mono text-3xl">{headline}</h3>
			<div class="mb-20">
				<span class="font-mono text-base">{date}</span>
				<span class="text-muted-foreground text-base"> --- {author}</span>
				<span class="text-muted-foreground text-base">
					---
					{#if isFiltered}
						{@html excerpt}
					{:else}
						{description}
					{/if}
				</span>
			</div>
		</a>

		<div class="flex items-center gap-2">
			{#if tags}
				<div class="col-span-1 mt-2 mb-4 flex flex-wrap gap-1">
					{#each tags.split(',') as tag}
						<Badge
							variant={Object.keys(selectedTags || {}).includes(tag.trim())
								? 'selected'
								: 'default'}
						>
							{tag}
						</Badge>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

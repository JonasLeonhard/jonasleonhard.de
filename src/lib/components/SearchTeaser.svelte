<script lang="ts">
	import { MoveRight } from 'lucide-svelte';
	import { Collapsible, Badge, useLink } from '$lib';
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
		image?: string;
		imageAlt?: string;
		author?: string;
		description?: string;
	}

	const {
		headline,
		date,
		excerpt,
		tags,
		selectedTags,
		image,
		imageAlt,
		author,
		description,
		url
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
				<span class="font-mono">{date}</span>
				<span class="text-muted-foreground"> -- {@html excerpt}</span>
			</div>
		</a>

		<Collapsible class="z-10 pb-4">
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
				<span
					class="border-muted-foreground text-muted-foreground hover:text-accent border-b border-dashed"
					>more</span
				>
			</div>
			{#snippet expanded()}
				{#if image}
					<span class="text-muted-foreground font-mono">TEASER:</span>
					<img
						src={image}
						alt={imageAlt || 'Teaser Image'}
						class="border-muted-foreground col-span-12 h-auto w-[150px] border"
						width="150px"
						loading="lazy"
					/>
				{/if}

				{#if author}
					<p class="mb-1 w-max">
						<span class="text-muted-foreground font-mono">AUTHOR:</span>
						{author}
					</p>
				{/if}

				{#if description}
					<p class="mb-1 w-max">
						<span class="text-muted-foreground font-mono">DESCRIPTION:</span>
						{description}
					</p>
				{/if}

				<a
					class="text-accent mt-3 block w-max underline"
					use:useLink
					href={url?.replace('.html', '')}
					class:flex={image}
				>
					READ
				</a>
			{/snippet}
		</Collapsible>
	</div>
</div>

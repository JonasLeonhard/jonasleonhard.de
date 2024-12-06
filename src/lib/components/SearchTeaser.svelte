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
	class="group relative col-span-12 mb-10 border border-muted-foreground/50 text-left transition-all duration-1000 hover:border-muted-foreground"
>
	<div
		class="absolute left-[50%] top-0 z-10 h-[1px] -translate-x-[50%] animate-border-width rounded-full bg-gradient-to-r from-[rgba(230,230,230,0)] via-black to-[rgba(230,230,230,0)] transition-all duration-1000 dark:from-[rgba(17,17,17,0)] dark:via-white dark:to-[rgba(17,17,17,0)]"
	></div>

	<MoveRight class="absolute right-12 top-8 z-10 transition-all duration-500 group-hover:right-8" />
	<div
		class="relative flex flex-col overflow-hidden bg-gradient-to-b from-muted to-background pl-8 pr-8 pt-8"
	>
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
					<div class="col-span-1 mb-4 mt-2 flex flex-wrap gap-1">
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
					class="border-b border-dashed border-muted-foreground text-muted-foreground hover:text-accent"
					>more</span
				>
			</div>
			{#snippet expanded()}
				{#if image}
					<span class="font-mono text-muted-foreground">TEASER:</span>
					<img
						src={image}
						alt={imageAlt || 'Teaser Image'}
						class="col-span-12 h-auto w-[150px] border border-muted-foreground"
						width="150px"
						loading="lazy"
					/>
				{/if}

				{#if author}
					<p class="mb-1 w-max">
						<span class="font-mono text-muted-foreground">AUTHOR:</span>
						{author}
					</p>
				{/if}

				{#if description}
					<p class="mb-1 w-max">
						<span class="font-mono text-muted-foreground">DESCRIPTION:</span>
						{description}
					</p>
				{/if}

				<a
					class="mt-3 block w-max text-accent underline"
					use:useLink
					href={url?.replace('.html', '')}
					class:flex={image}
				>
					READ
				</a>
			{/snippet}
		</Collapsible>
	</div>
	<div
		class="absolute top-0 h-full w-full bg-[radial-gradient(100vh_circle_at_50%_-10%,hsl(var(--accent)),hsl(var(--background)))] opacity-0 transition-all duration-500 group-hover:opacity-50"
	></div>
</div>

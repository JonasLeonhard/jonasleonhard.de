<script lang="ts">
	import { type MetaData, Badge, badgeVariants, useLink } from '$lib';

	interface Props {
		metadata: MetaData;
	}

	const { metadata }: Props = $props();
</script>

<div class="prose dark:prose-invert mx-auto mb-16 flex flex-col">
	<h1
		class="relative z-10 mt-4 mb-4 bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
	>
		{metadata.title}
	</h1>

	<div class="flex gap-2">
		<p class="border-r pr-2 text-sm">{metadata.author}</p>

		<p class="border-r pr-2 text-sm">{metadata.publishDate.toLocaleDateString()}</p>

		{#if metadata.updatedDate}
			<p class="text-sm">{metadata.updatedDate.toLocaleDateString()}</p>
		{/if}
	</div>

	<div class="flex gap-2">
		{#if metadata.draft}
			<Badge variant="destructive">#draft</Badge>
		{/if}

		{#each metadata.tags as tag}
			<a use:useLink href={`/c?tag=${tag}`} class={badgeVariants({ variant: 'default' })}>
				#{tag}
			</a>
		{/each}
	</div>
</div>

<script lang="ts">
	import { type MetaData, Badge, badgeVariants, useLink } from '$lib';

	interface Props {
		metadata: MetaData;
	}

	const { metadata }: Props = $props();
</script>

<section class="container mx-auto -mt-28">
	<enhanced:img
		class="max-h-screen/3 mx-auto mb-6 w-full max-w-[1000px] object-cover"
		src={metadata.coverImage.src}
		alt={metadata.coverImage.alt}
	/>

	<div class="prose mx-auto flex flex-col items-center justify-center dark:prose-invert">
		<h1 class="!mb-0">{metadata.title}</h1>

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
				<a use:useLink href={`/blog?tag=${tag}`} class={badgeVariants({ variant: 'default' })}>
					#{tag}
				</a>
			{/each}
		</div>
	</div>
</section>

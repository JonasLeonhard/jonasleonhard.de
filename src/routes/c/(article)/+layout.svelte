<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Hero } from '$lib';
	import type { PageData } from '../$types';

	interface Props {
		data: PageData;
		children: Snippet;
	}
	let { children, data }: Props = $props();
</script>

<article
	data-pagefind-body={!data.metadata?.draft ? true : undefined}
	data-pagefind-ignore={data.metadata?.draft ? 'all' : undefined}
>
	{#if data.metadata}
		<Hero metadata={data.metadata} />
	{/if}

	<div class="prose mx-auto mb-52 px-4 dark:prose-invert lg:px-0">
		{@render children()}
	</div>
</article>

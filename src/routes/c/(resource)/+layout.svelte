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
	data-pagefind-body
	data-pagefind-filter={data.metadata?.draft ? 'visibility:draft' : 'visibility:visible'}
>
	{#if data.metadata}
		<Hero metadata={data.metadata} />
	{/if}

	<div class="prose mx-auto mb-52 px-4 dark:prose-invert lg:px-0">
		{@render children()}
	</div>
</article>

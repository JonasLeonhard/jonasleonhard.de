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
	data-pagefind-body={!data.post?.draft ? true : undefined}
	data-pagefind-ignore={data.post?.draft ? 'all' : undefined}
>
	{#if data.post}
		<Hero metadata={data.post} />
	{/if}

	<div class="prose mx-auto mb-52 dark:prose-invert">
		{@render children()}
	</div>
</article>

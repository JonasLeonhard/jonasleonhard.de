<script lang="ts">
	import type { Snippet } from 'svelte';
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
	class="!container prose mx-auto max-w-full dark:prose-invert"
>
	{@render children()}
</article>

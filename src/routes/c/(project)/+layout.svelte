<script lang="ts">
	import { Hero } from '$lib';

	let { children, data } = $props();
</script>

<article
	data-pagefind-body
	data-pagefind-filter={data.metadata?.draft ? 'visibility:draft' : 'visibility:visible'}
>
	{#if data.metadata}
		<Hero metadata={data.metadata} />
	{/if}

	<div class="prose dark:prose-invert mx-auto mb-52 px-4 lg:px-0">
		{@render children()}
	</div>
</article>

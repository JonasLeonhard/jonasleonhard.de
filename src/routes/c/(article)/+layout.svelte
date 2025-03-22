<script lang="ts">
	import { Hero } from '$lib';

	let { children, data } = $props();
</script>

<article class="container mx-auto" data-pagefind-body>
	{#if data.metadata}
		<Hero metadata={data.metadata} />
	{/if}

	<div class="prose dark:prose-invert mx-auto mb-52">
		{@render children()}
	</div>
</article>

<script lang="ts">
	let { children } = $props();
</script>

<article class="!container prose mx-auto max-w-full dark:prose-invert">
	{@render children()}
</article>

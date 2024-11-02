<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

{#each data.posts as post}
	<a class="block underline hover:text-accent" href={post.href}>
		{post.title} - {post.publishDate.toLocaleDateString()}
		{#if post.draft}
			THIS IS A DRAFT!
		{/if}
	</a>
{/each}

blog page overview TODO

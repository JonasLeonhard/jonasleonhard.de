<script lang="ts">
	import { useLink } from '$lib';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

{#each data.posts as post}
	<a use:useLink class="block underline hover:text-accent" href={post.href}>
		{post.title} - {post.publishDate.toLocaleDateString()}
		{#if post.draft}
			[Draft]
		{/if}
	</a>
{/each}

blog page overview TODO

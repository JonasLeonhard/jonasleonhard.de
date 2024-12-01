<script lang="ts">
	import { useLink, Search } from '$lib';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<section class="container mx-auto">
	<Search />

	<div class="prose dark:prose-invert">
		<h1>Content</h1>
		{#each data.posts as post}
			<a use:useLink class="block underline hover:text-accent" href={post.href}>
				{post.title} - {post.publishDate.toLocaleDateString()}
			</a>
		{/each}
	</div>
</section>

<script lang="ts">
	import { Headroom, ClipboardCopy, ThemeToggle, MouseDrag, BreadCrumbs, useLink } from '$lib';
	import { Rss, Check, Menu, Search } from 'lucide-svelte';
</script>

<Headroom offset={40} tolerance={180}>
	<div
		class="relative container mx-auto flex h-20 flex-col justify-center gap-2 md:flex-row md:items-center"
	>
		<BreadCrumbs />
		<div class="flex w-max items-center justify-center gap-8 md:ml-auto md:py-4">
			<ClipboardCopy
				clipboard={`${import.meta.env.VITE_CANONICAL_URL}/rss`}
				toastMsg="Copied this RSS feed link to your clipboard:"
			>
				{#snippet copy()}
					<div title="Rss copy to clipboard"><Rss /></div>
				{/snippet}
				{#snippet copied()}
					<div title="Rss copied!"><Check /></div>
				{/snippet}
			</ClipboardCopy>

			<a href="/c" use:useLink class="flex h-8 w-8 items-center justify-center">
				<MouseDrag>
					<Search />
				</MouseDrag>
			</a>

			<ThemeToggle />
		</div>
	</div>
</Headroom>

<script lang="ts">
	import { Headroom, ClipboardCopy, ThemeToggle, MouseDrag, BreadCrumbs, useLink } from '$lib';
	import { Rss, Check, Menu, Search } from 'lucide-svelte';
</script>

<Headroom offset={40} tolerance={180}>
	<div class="container relative mx-auto flex h-20 flex-wrap items-center">
		<BreadCrumbs />
		<div class="group ml-auto flex flex-col items-center justify-center gap-4">
			<button aria-label="Open Menu" title="Open Menu" class="cursor-pointer md:hidden">
				<Menu />
			</button>
			<div
				class="absolute right-0 top-0 hidden flex-col items-end gap-8 border-2 border-solid border-muted-foreground bg-white px-2 py-4 group-focus-within:flex group-hover:flex dark:bg-muted md:relative md:right-auto md:flex md:flex-row md:border-none md:bg-transparent md:shadow-none md:dark:bg-transparent"
			>
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
	</div>
</Headroom>

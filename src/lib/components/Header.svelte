<script lang="ts">
	import { Headroom, ClipboardCopy, Search, ThemeToggle, BreadCrumbs } from '$lib';
	import { Rss, Check, Menu } from 'lucide-svelte';
</script>

<Headroom offset={40} tolerance={180}>
	<div class="container px-4 relative mx-auto flex flex-wrap h-20 items-center">
		<BreadCrumbs
			items={[{ href: '/', text: 'jonas' }, { href: '/blog', text: 'blog' }, { text: 'postname' }]}
		/>
		<div class="group flex-col ml-auto flex items-center justify-center gap-4">
			<button aria-label="Open Menu" title="Open Menu" class="md:hidden cursor-pointer">
				<Menu />
			</button>
			<div
				class="absolute right-0 top-0 hidden border-muted-foreground border-2 border-solid group-focus-within:flex group-hover:flex flex-col items-end gap-8 bg-white dark:bg-muted py-4 px-2 shadow-lg md:flex md:flex-row md:relative md:right-auto md:dark:bg-transparent md:bg-transparent md:border-none md:shadow-none"
			>
				<ClipboardCopy clipboard={`TODO->rss.xml`}>
					{#snippet copy()}
						<div title="Rss copy to clipboard"><Rss /></div>
					{/snippet}
					{#snippet copied()}
						<div title="Rss copied!"><Check /></div>
					{/snippet}
				</ClipboardCopy>

				<Search />

				<ThemeToggle />
			</div>
		</div>
	</div>
</Headroom>

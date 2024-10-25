<script lang="ts">
	import { Headroom, ClipboardCopy, Search, ThemeToggle, BreadCrumbs } from '$lib';
	import { Rss, Check } from 'lucide-svelte';
</script>

<Headroom offset={40} tolerance={180}>
	<div class="container relative mx-auto flex h-20 items-center">
		<BreadCrumbs
			items={[{ href: '/', text: 'home' }, { href: '/blog', text: 'blog' }, { text: 'postname' }]}
		/>
		<div class="ml-auto flex items-center justify-center gap-4">
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
</Headroom>

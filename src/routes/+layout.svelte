<script lang="ts">
	import '../app.css';

	import { cn, Header, Footer, Toaster, GridPattern } from '$lib';

	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div
	data-vaul-drawer-wrapper
	class="box-border flex h-fit min-h-screen flex-col gap-y-6 font-sans antialiased"
>
	<Header />
	<GridPattern
		width={35}
		height={35}
		class={cn(
			'mx-auto [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] '
		)}
	/>

	<main class="min-h-[calc(100vh-15rem)] flex-grow">
		{@render children()}
	</main>
	<Footer />
	<Toaster />
</div>

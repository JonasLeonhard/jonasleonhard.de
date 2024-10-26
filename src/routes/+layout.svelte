<script lang="ts">
	import '../app.css';

	import { Header, Footer } from '$lib';

	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="box-border flex h-fit min-h-screen flex-col gap-y-6 font-sans antialiased">
	<Header />
	<main class="min-h-[calc(100vh-15rem)] flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>

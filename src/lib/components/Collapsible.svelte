<script lang="ts">
	import { tv } from 'tailwind-variants';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		class?: string;
		children: Snippet;
		expanded: Snippet;
	}

	const { class: className, children, expanded }: Props = $props();

	const button = tv({ base: 'h-max' });
	let isExpanded = $state(false);
</script>

<button class={button({ class: className })} onclick={() => (isExpanded = !isExpanded)}>
	{@render children()}

	{#if isExpanded}
		<div
			class="border-muted-foreground ml-2 border-l border-dashed pl-4"
			transition:slide={{ duration: 300 }}
		>
			{@render expanded()}
		</div>
	{/if}
</button>

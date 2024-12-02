<script lang="ts">
	import { cn } from '$lib';
	import type { ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		class?: ClassValue;
		children: Snippet;
		expanded: Snippet;
	}

	const { class: className, children, expanded }: Props = $props();

	let isExpanded = $state(false);
</script>

<button class={cn('h-max', className)} onclick={() => (isExpanded = !isExpanded)}>
	{@render children()}

	{#if isExpanded}
		<div
			class="ml-2 border-l border-dashed border-muted-foreground pl-4"
			transition:slide={{ duration: 300 }}
		>
			{@render expanded()}
		</div>
	{/if}
</button>

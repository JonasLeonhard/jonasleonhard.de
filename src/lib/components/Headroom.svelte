<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface Props {
		offset?: number;
		tolerance?: number;
		children?: Snippet;
	}
	type ScrollDirection = 'up' | 'down';

	let { offset = 0, tolerance = 0, children }: Props = $props();

	let y = $state(0);
	let lastY = 0;
	let lastScrollDirection: ScrollDirection = 'up';

	const getScrollDirection = (y: number): ScrollDirection => {
		// Some browsers (Safari or Browsers on iOS) will let you scroll "above" 0, into the negative numbers.
		// This will cause the header to collapse after the user scrolls to the top.
		if (y <= 0) return 'up';

		if (y < offset) return lastScrollDirection;

		const scrolled = lastY - y;

		if (Math.abs(scrolled) < tolerance) return lastScrollDirection;

		const scrollDirection = scrolled >= 0 ? 'up' : 'down';
		lastY = y;
		lastScrollDirection = scrollDirection;
		return scrollDirection;
	};

	let headerVisible = $derived(getScrollDirection(y) === 'down' ? false : true);
	let headerDocked = $derived(y <= 0 && getScrollDirection(y) === 'up');
	let classesHeaderDocked = $derived(headerDocked ? 'pt-20' : 'bg-background');
</script>

<svelte:window bind:scrollY={y} />

<div class="h-[240px] lg:h-[300px]">
	<header
		class={cn(
			'fixed -top-20 z-50 flex w-full flex-col transition-all duration-700',
			classesHeaderDocked
		)}
		class:top-0={headerVisible}
	>
		{@render children?.()}
		{#if !headerDocked && headerVisible}
			<div
				transition:fly={{
					delay: headerVisible ? 0 : 250,
					duration: 800,
					opacity: 0,
					x: '-100%'
				}}
				class="block w-screen border-spacing-8 border border-dashed"
				style="border-dash-pattern: 16px 16px"
			></div>
		{/if}
	</header>
</div>

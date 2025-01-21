<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

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
	let classesHeaderDocked = $derived(
		headerDocked
			? 'pt-20 after:h-0 after:opacity-0 after:duration-[0.25s]'
			: 'after:h-full after:opacity-1'
	);
</script>

<svelte:window bind:scrollY={y} />

<div class="h-[300px]">
	<header
		class={`fixed z-50 flex w-full flex-col to-transparent transition-all duration-700 after:absolute after:top-0 after:-z-10 after:contents after:w-full after:bg-gradient-to-b after:from-white after:to-transparent after:backdrop-blur-[2px] after:transition-all after:duration-1000 dark:after:from-black ${classesHeaderDocked}`}
		class:top-0={headerVisible}
		class:-top-20={!headerVisible}
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
				class="block w-screen border border-dashed border-spacing-8"
				style="border-dash-pattern: 16px 16px"
			></div>
		{/if}
	</header>
</div>

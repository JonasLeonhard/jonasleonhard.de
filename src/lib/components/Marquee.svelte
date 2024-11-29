<script lang="ts">
	import { spring } from 'svelte/motion';
	import { cn } from '$lib';
	import { onMount } from 'svelte';

	type Direction = 'left' | 'up';
	interface Props {
		direction?: Direction;
		pauseOnHover?: boolean;
		reverse?: boolean;
		fade?: boolean;
		innerClassName?: string;
		numberOfCopies?: number;
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		direction = 'left',
		pauseOnHover = false,
		reverse = false,
		fade = false,
		innerClassName = '',
		numberOfCopies = 2,
		children,
		class: className
	}: Props = $props();

	const position = spring(0, {
		stiffness: 0.05,
		damping: 0.9
	});

	let animating = true;
	let lastTimestamp = 0;
	let speed = 3; // pixels per second

	function animate(timestamp: number) {
		if (!lastTimestamp) lastTimestamp = timestamp;
		const delta = timestamp - lastTimestamp;

		if (animating) {
			position.update((pos) => (pos - (delta * speed) / 1000) % 100);
		}

		lastTimestamp = timestamp;
		requestAnimationFrame(animate);
	}

	onMount(() => {
		requestAnimationFrame(animate);
	});
</script>

<div
	role="presentation"
	class={cn(`group flex gap-[1rem] overflow-hidden ${className}`, {
		'flex-row': direction === 'left',
		'flex-col': direction !== 'left'
	})}
	style={`mask-image: ${
		fade
			? `linear-gradient(${
					direction === 'left' ? 'to right' : 'to bottom'
				}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
			: 'none'
	};
	  -webkit-mask-image: ${
			fade
				? `linear-gradient(${
						direction === 'left' ? 'to right' : 'to bottom'
					}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
				: 'none'
		};
	  `}
	onmouseenter={() => pauseOnHover && (animating = false)}
	onmouseleave={() => pauseOnHover && (animating = true)}
>
	{#each Array(numberOfCopies).fill(0) as _, i (i)}
		<div
			class={cn(
				'flex shrink-0 justify-around gap-[10rem] [--gap:10rem]',
				direction === 'left' ? 'flex-row' : 'flex-col',
				reverse && 'direction-reverse',
				innerClassName
			)}
			style={direction === 'left'
				? `transform: translateX(${$position}%)`
				: `transform: translateY(${$position}%)`}
		>
			{@render children?.()}
		</div>
	{/each}
</div>

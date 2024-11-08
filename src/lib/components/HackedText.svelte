<script lang="ts">
	import { cn } from '$lib';
	import type { ClassValue } from 'clsx';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		class?: ClassValue;
		text: string;
		letters?: string;
		animationDelay?: number;
	}

	let { text, letters = '01', animationDelay = 0, class: className = '' }: Props = $props();

	let scrambled = $state(text);

	let interval: ReturnType<typeof setInterval> | null = null;
	let loaded = $state(false);

	const scrambleText = (iteration: number) => {
		scrambled = text
			.split('')
			.map((_letter, index) => {
				if (index < iteration) {
					return text[index];
				}

				return letters[Math.floor(Math.random() * letters.length)];
			})
			.join('');
	};

	const animateText = (animationSpeed: number = 50) => {
		if (interval) clearInterval(interval);

		let iteration = 0;

		scrambleText(iteration);

		interval = setInterval(() => {
			scrambleText(iteration);

			if (interval && iteration >= text.length) {
				clearInterval(interval);
			}

			iteration += 1 / 3;
		}, animationSpeed);
	};

	onMount(() => {
		loaded = true;
		setTimeout(() => {
			animateText(100);
		}, animationDelay);
	});
</script>

{#if loaded}
	<p
		class={cn(className)}
		onmouseenter={() => animateText(30)}
		transition:fly={{ x: 0, y: 100, opacity: 0, delay: animationDelay, duration: 100 }}
	>
		{scrambled}
	</p>
{:else}
	<p class={cn('opacity-0', className)}>
		{scrambled}
	</p>
{/if}

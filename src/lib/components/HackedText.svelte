<script lang="ts">
	import { cn } from '$lib';
	import { tweened } from 'svelte/motion';
	import type { ClassValue } from 'clsx';
	import { fly, fade } from 'svelte/transition';

	interface Props {
		class?: ClassValue;
		text: string;
		letters?: string;
		scrambled?: boolean;
	}

	let { text, class: className = '', scrambled = false }: Props = $props();

	let scrambleIteration = tweened(scrambled ? 0 : text.length, { duration: 650 });

	function getScrambled(iteration: number) {
		return text
			.split('')
			.map((_, index) => {
				// Show actual letter if within iteration count
				if (index < iteration) {
					return text[index];
				}
				// Otherwise show 0 and 1 alternating
				return index % 2 === 0 ? '0' : '1';
			})
			.join('');
	}

	$effect(() => {
		if (scrambled) {
			scrambleIteration.set(0);
		} else {
			scrambleIteration.set(text.length);
		}
	});
</script>

<div class="grid">
	<p
		in:fade
		out:fly={{ x: 0, y: 100, opacity: 0, duration: 100 }}
		class={cn('col-start-1 row-start-1', className)}
	>
		{getScrambled($scrambleIteration)}
	</p>
</div>

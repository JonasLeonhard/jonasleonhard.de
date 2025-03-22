<script lang="ts">
	import { cn } from '$lib';
	import { Tween } from 'svelte/motion';
	import type { ClassValue } from 'clsx';
	interface Props {
		class?: ClassValue;
		text: string;
		scrambled?: boolean;
		widthDuration?: number;
		revealDuration?: number;
		charset?: string;
	}
	let {
		text,
		class: className = '',
		scrambled = false,
		widthDuration = 500,
		revealDuration = 500,
		charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?'
	}: Props = $props();

	let prevScrambled = $state(scrambled);

	let widthTween = new Tween(scrambled ? 0 : 1, { duration: widthDuration });
	let revealTween = new Tween(scrambled ? 0 : 1, { duration: revealDuration });

	let visibleWidth = $derived(Math.ceil(widthTween.current * text.length));
	let revealedChars = $derived(Math.ceil(revealTween.current * visibleWidth));
	let randomChars = $state(
		Array(text.length)
			.fill('')
			.map(() => getRandomChar())
	);
	let interval: Timer;

	function getRandomChar() {
		return charset[Math.floor(Math.random() * charset.length)];
	}

	$effect(() => {
		if (prevScrambled !== scrambled) {
			const animate = async () => {
				if (scrambled) {
					// First reset reveal, then width
					await revealTween.set(0);
					await widthTween.set(0);
				} else {
					// First expand width, then reveal
					await widthTween.set(1);
					await revealTween.set(1);
				}
			};

			animate();
		}

		prevScrambled = scrambled;
	});

	$effect(() => {
		clearInterval(interval);
		if (visibleWidth > revealedChars) {
			interval = setInterval(() => {
				randomChars = randomChars.map((_, i) => {
					// Only update random chars for positions that are visible but not yet revealed
					if (i >= revealedChars && i < visibleWidth) {
						return getRandomChar();
					}
					return randomChars[i];
				});
			}, 50);
		}
		return () => clearInterval(interval);
	});

	function getDisplayText() {
		return text
			.split('')
			.map((char, index) => {
				if (index < revealedChars) {
					// Show the actual character if it's been revealed
					return char;
				} else if (index < visibleWidth) {
					// Show a random character if it's in the scrambled part
					return randomChars[index];
				} else {
					// Hide characters beyond the visible width
					return '';
				}
			})
			.join('');
	}
</script>

{#snippet Text()}
	{@const text = getDisplayText()}
	<div class={cn('font-mono text-nowrap', className)}>
		{#if text === ''}
			<p class="w-0 overflow-hidden">{@html '&nbsp'}</p>
		{:else}
			<p>{text}</p>
		{/if}
	</div>
{/snippet}

{@render Text()}

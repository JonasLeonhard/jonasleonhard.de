<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { tv } from 'tailwind-variants';
	import { untrack } from 'svelte'; // <-- Import untrack

	interface Props {
		class?: string;
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

	const hackedText = tv({ base: 'font-mono text-nowrap' });

	let prevScrambled = untrack(() => scrambled);

	let widthTween = new Tween(untrack(() => (scrambled ? 0 : 1)));
	let revealTween = new Tween(untrack(() => (scrambled ? 0 : 1)));

	let visibleWidth = $derived(Math.ceil(widthTween.current * text.length));
	let revealedChars = $derived(Math.ceil(revealTween.current * visibleWidth));

	let randomChars = $state<string[]>(
		untrack(() =>
			Array(text.length)
				.fill('')
				.map(() => getRandomChar())
		)
	);

	$effect(() => {
		const len = text.length;
		untrack(() => {
			if (randomChars.length !== len) {
				randomChars = Array(len)
					.fill('')
					.map(() => getRandomChar());
			}
		});
	});

	let interval: ReturnType<typeof setInterval>;

	function getRandomChar() {
		return charset[Math.floor(Math.random() * charset.length)];
	}

	$effect(() => {
		const currentScrambled = scrambled;

		untrack(() => {
			if (prevScrambled !== currentScrambled) {
				const animate = async () => {
					if (currentScrambled) {
						await revealTween.set(0, { duration: revealDuration });
						await widthTween.set(0, { duration: widthDuration });
					} else {
						await widthTween.set(1, { duration: widthDuration });
						await revealTween.set(1, { duration: revealDuration });
					}
				};
				animate();
			}
			prevScrambled = currentScrambled;
		});
	});

	$effect(() => {
		clearInterval(interval);

		const vWidth = visibleWidth;
		const rChars = revealedChars;

		if (vWidth > rChars) {
			interval = setInterval(() => {
				randomChars = randomChars.map((_, i) => {
					if (i >= rChars && i < vWidth) {
						return getRandomChar();
					}
					return randomChars[i];
				});
			}, 50);
		}
		return () => clearInterval(interval);
	});

	let displayText = $derived.by(() => {
		if (!text) return '';
		return text
			.split('')
			.map((char, index) => {
				if (index < revealedChars) {
					return char;
				} else if (index < visibleWidth) {
					return randomChars[index];
				} else {
					return '';
				}
			})
			.join('');
	});
</script>

{#snippet Text()}
	<div class={hackedText({ class: className })}>
		{#if displayText === ''}
			<p class="w-0 overflow-hidden">{@html '&nbsp;'}</p>
		{:else}
			<p>{displayText}</p>
		{/if}
	</div>
{/snippet}

{@render Text()}

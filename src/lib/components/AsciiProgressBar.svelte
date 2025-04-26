<script lang="ts">
	import { tv } from 'tailwind-variants';

	interface Props {
		progress: number;
		class?: string;
	}

	const { class: classValue, progress }: Props = $props();
	const asciiProgressBar = tv({
		base: 'text-muted-foreground font-mono text-xl transition-all duration-500'
	});

	const getAsciiLoadingBar = (
		/// number from 0-1
		progress: number,
		width = 10,
		filledChar = '+',
		emptyChar = '-'
	): string => {
		const filledCount = Math.round(progress * width);
		const emptyCount = width - filledCount;

		const bar = filledChar.repeat(filledCount) + emptyChar.repeat(emptyCount);

		return `${Math.round(progress * 100)}% [${bar}]`;
	};
</script>

<div
	class={asciiProgressBar({ class: classValue })}
	class:opacity-0={progress == 0 || progress == 1}
>
	{getAsciiLoadingBar(progress)}
</div>

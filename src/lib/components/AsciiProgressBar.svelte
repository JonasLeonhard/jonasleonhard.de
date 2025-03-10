<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	interface Props {
		progress: number;

		class?: ClassValue;
	}

	const { class: classValue, progress }: Props = $props();

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
	class={cn('text-muted-foreground font-mono text-xl transition-all duration-500', classValue)}
	class:opacity-0={progress == 0 || progress == 1}
>
	{getAsciiLoadingBar(progress)}
</div>

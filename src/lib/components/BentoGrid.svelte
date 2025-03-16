<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: ClassValue;
		children: Snippet;
	}
	const { class: className = '', children }: Props = $props();
</script>

<div class={cn('grid w-full auto-rows-[20rem] grid-cols-3 gap-8', className)}>
	{@render children?.()}
</div>

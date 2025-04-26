<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';

	interface Props {
		class?: string;
		children: Snippet;
	}
	const { class: className = '', children }: Props = $props();
	const bentoGrid = tv({ base: 'grid w-full auto-rows-[20rem] grid-cols-3 gap-8' });
</script>

<div class={bentoGrid({ class: className })}>
	{@render children?.()}
</div>

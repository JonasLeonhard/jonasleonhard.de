<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv } from 'tailwind-variants';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	class={tv({ base: 'flex size-9 items-center justify-center' })({ class: className })}
	{...restProps}
>
	<Ellipsis class="size-4" />
	<span class="sr-only">More pages</span>
</span>

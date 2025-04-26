<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { tv } from 'tailwind-variants';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLUListElement>> = $props();
</script>

<ul
	bind:this={ref}
	class={tv({ base: 'flex flex-row items-center gap-1' })({ class: className })}
	{...restProps}
>
	{@render children?.()}
</ul>

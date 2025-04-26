<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import { tv } from 'tailwind-variants';

	let {
		ref = $bindable(null),
		class: className,
		count = 0,
		perPage = 10,
		page = $bindable(1),
		siblingCount = 1,
		...restProps
	}: PaginationPrimitive.RootProps = $props();

	const pagination = tv({ base: 'mx-auto flex w-full flex-col items-center' });
</script>

<PaginationPrimitive.Root
	bind:ref
	class={pagination({ class: className })}
	{count}
	{perPage}
	{siblingCount}
	bind:page
	{...restProps}
/>

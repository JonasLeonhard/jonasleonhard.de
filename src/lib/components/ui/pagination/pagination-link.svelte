<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import { type Props, buttonVariants } from '$lib/components/ui/button/index.js';

	let {
		ref = $bindable(null),
		class: className,
		size = 'icon',
		isActive = false,
		page,
		children,
		...restProps
	}: PaginationPrimitive.PageProps &
		Props & {
			isActive: boolean;
		} = $props();
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	bind:ref
	{page}
	class={buttonVariants({
		variant: isActive ? 'outline' : 'ghost',
		size,
		class: className
	})}
	children={children || Fallback}
	{...restProps}
/>

<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.DescriptionProps = $props();
</script>

<DrawerPrimitive.Description
	bind:ref
	class={tv({ base: 'text-muted-foreground text-sm' })({ class: className as string })}
	{...restProps}
/>

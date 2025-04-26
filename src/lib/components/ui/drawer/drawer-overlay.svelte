<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.OverlayProps = $props();
</script>

<DrawerPrimitive.Overlay
	bind:ref
	class={tv({ base: 'fixed inset-0 z-50 bg-black/80' })({ class: className })}
	{...restProps}
/>

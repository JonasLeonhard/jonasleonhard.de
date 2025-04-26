<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.TitleProps = $props();
</script>

<DrawerPrimitive.Title
	bind:ref
	class={tv({ base: 'font-mono text-lg leading-none font-semibold tracking-tight' })({
		class: className as string
	})}
	{...restProps}
/>

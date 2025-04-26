<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { tv } from 'tailwind-variants';

	type $$Props = SelectPrimitive.LabelProps;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Label
	class={tv({ base: 'py-1.5 pr-2 pl-8 text-sm font-semibold' })({ class: className as string })}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Label>

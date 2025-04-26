<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { tv } from 'tailwind-variants';

	interface Props {
		class?: string;
		[key: string]: any;
	}

	let { class: className = undefined, ...rest }: Props = $props();
</script>

<SelectPrimitive.Separator
	class={tv({ base: 'bg-muted -mx-1 my-1 h-px' })({ class: className })}
	{...rest}
/>

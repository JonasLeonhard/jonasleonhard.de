<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { tv } from 'tailwind-variants';

	type $$Props = SelectPrimitive.TriggerProps;
	type $$Events = SelectPrimitive.TriggerEvents;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

	const children_render = $derived(children);
</script>

<SelectPrimitive.Trigger
	class={tv({
		base: 'border-input bg-background ring-offset-background focus-visible:ring-ring aria-[invalid]:border-destructive [&>span]:data-placeholder:text-muted-foreground flex h-10 w-full items-center justify-between border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
	})({ class: className as string })}
	{...rest}
	on:click
	on:keydown
>
	{#snippet children({ builder })}
		{@render children_render?.({ builder })}
		<div>
			<ChevronDown class="h-4 w-4 opacity-50" />
		</div>
	{/snippet}
</SelectPrimitive.Trigger>

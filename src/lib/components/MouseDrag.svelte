<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Spring } from 'svelte/motion';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let mouseOver = $state(false);

	let mouseOverClasses = $derived(mouseOver ? 'z-10 scale-110' : '');

	const coords = new Spring(
		{ x: 0, y: 0 },
		{
			damping: 0.5,
			stiffness: 0.25
		}
	);
</script>

<div
	role="presentation"
	class={`bg-bg-accent-light w-max cursor-pointer rounded-md ${mouseOverClasses}`}
	onfocus={() => {
		mouseOver = true;
	}}
	onfocusout={() => {
		mouseOver = false;
	}}
	onblur={() => {
		mouseOver = false;
	}}
	onmouseover={() => {
		mouseOver = true;
	}}
	onmouseleave={() => {
		mouseOver = false;
	}}
	onmousemove={(event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		coords.set({
			x: event.clientX - rect.left - rect.width / 2,
			y: event.clientY - rect.top - rect.height / 2
		});
	}}
	onmouseout={() => {
		mouseOver = false;
		coords.set({ x: 0, y: 0 });
	}}
	style={`translate: ${coords.current.x}px ${coords.current.y}px;`}
>
	{@render children?.()}
</div>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		class?: string;
		expanded?: boolean;
		name: string;
		children: Snippet;
	}

	let { expanded = $bindable(false), name, children, class: className }: Props = $props();

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class={className}>
	<button
		class="flex items-center gap-[3px] border-none bg-transparent text-sm font-medium outline-hidden"
		onmousedown={toggle}
	>
		{#if expanded}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.4"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="border-none outline-hidden"
				><path
					d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
				/></svg
			>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.4"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="border-none outline-hidden"
				><path
					d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
				/></svg
			>
		{/if}
		{name}
	</button>

	{#if expanded}
		<div
			class="ml-2 border-l border-dashed border-muted-foreground pl-4"
			transition:slide={{ duration: 300 }}
		>
			{@render children()}
		</div>
	{/if}
</div>

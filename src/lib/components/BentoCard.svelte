<script lang="ts">
	import { useLink } from '$lib';
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	import { MoveRight } from 'lucide-svelte';

	interface Props {
		class?: ClassValue;
		name: string;
		description: string;
		href: string;
		cta: string;
	}

	let { class: className = '', name, description, href, cta }: Props = $props();
</script>

<a
	{href}
	use:useLink
	class={cn(
		'group relative col-span-3 flex max-w-screen-lg flex-col border border-muted-foreground/50 bg-gradient-to-b from-muted to-background transition-all duration-1000 hover:border-muted-foreground',
		className
	)}
>
	<div
		class="absolute left-[50%] top-0 z-10 h-[1px] -translate-x-[50%] animate-border-width rounded-full bg-gradient-to-r from-[rgba(230,230,230,0)] via-black to-[rgba(230,230,230,0)] transition-all duration-1000 dark:from-[rgba(17,17,17,0)] dark:via-white dark:to-[rgba(17,17,17,0)]"
	></div>

	<MoveRight
		class="absolute right-12 top-8 z-10 transition-all duration-500 group-hover:right-8 group-hover:opacity-0"
	/>
	<h3 class="z-10 mb-2 max-w-[calc(100%-32px)] pl-8 pr-8 pt-8 font-mono text-3xl">{name}</h3>

	<div
		class="pointer-events-none z-10 mt-auto flex transform-gpu flex-col gap-1 p-8 transition-all duration-300 group-hover:-translate-y-10"
	>
		<p class="max-w-lg text-neutral-400">{description}</p>
	</div>

	<div
		class={cn(
			'pointer-events-none absolute bottom-0 z-10 ml-2.5 flex w-max translate-y-10 transform-gpu flex-row items-center justify-center gap-2 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
		)}
	>
		{cta}
		<MoveRight />
	</div>
	<div
		class="absolute top-0 h-full w-full bg-[radial-gradient(100vh_circle_at_50%_-10%,hsl(var(--accent)),hsl(var(--background)))] opacity-0 transition-all duration-500 group-hover:opacity-50"
	></div>
</a>

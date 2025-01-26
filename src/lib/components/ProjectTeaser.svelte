<script lang="ts">
	import type { Snippet } from 'svelte';
	import { MoveRight, Plus, ArrowLeft, ArrowRight, RotateCw } from 'lucide-svelte';
	import { useLink } from '$lib/useLink.svelte';

	interface Props {
		href: string;
		headline: string;
		company: string;
		pageUrl: string;
		year: string;
		description: string;
		children: Snippet;
	}

	const { href, headline, company, pageUrl, year, description, children }: Props = $props();
</script>

<div
	role="presentation"
	class="group border-muted-foreground/50 hover:border-muted-foreground relative max-w-(--breakpoint-lg) border transition-all duration-1000"
>
	<div
		class="animate-border-width absolute top-0 left-[50%] z-10 h-[1px] -translate-x-[50%] rounded-full bg-linear-to-r from-[rgba(230,230,230,0)] via-black to-[rgba(230,230,230,0)] transition-all duration-1000 dark:from-[rgba(17,17,17,0)] dark:via-white dark:to-[rgba(17,17,17,0)]"
	></div>

	<MoveRight class="absolute top-8 right-12 z-10 transition-all duration-500 group-hover:right-8" />
	<a
		class="from-muted to-background relative flex flex-col overflow-hidden bg-linear-to-b pt-8 pr-8 pl-8"
		{href}
		use:useLink
	>
		<h3 class="z-10 mb-2 max-w-[calc(100%-32px)] font-mono text-3xl">{headline}</h3>
		<div class="z-10 mb-20">
			<span class="font-mono">{company}, </span>
			<span class="font-mono">{year}</span>
			<span class="text-muted-foreground"> -- {description}</span>
		</div>

		<div
			class="rounded-r-l from-muted-foreground/50 z-10 translate-y-[10%] rounded-t-lg bg-linear-to-b to-transparent p-px shadow-2xl transition-all duration-500 group-hover:translate-y-0 lg:mx-10"
		>
			<div class="rounded-r-l bg-background rounded-t-lg">
				<div class="border-muted bg-muted/50 flex flex-col items-center border-b py-2">
					<div class="mr-auto flex w-full items-center gap-2 px-2">
						<div class="flex gap-1.5">
							<div class="h-3 w-3 rounded-full bg-red-500"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
							<div class="h-3 w-3 rounded-full bg-green-500"></div>
						</div>
						<div class="rouded-r-sm bg-muted h-6 w-36 rounded-t-sm"></div>
						<Plus class="text-muted-foreground w-4" />
					</div>
					<div class="bg-muted flex w-full items-center gap-2 p-1 pr-8">
						<ArrowLeft class="text-muted-foreground ml-0.5 w-4" />
						<ArrowRight class="text-muted-foreground w-4" />
						<RotateCw class="text-muted-foreground w-4" />
						<div
							class="bg-background/50 text-muted-foreground w-full flex-1 rounded px-2 py-1 text-xs"
						>
							{pageUrl}
						</div>
					</div>
					<div>
						{@render children()}
					</div>
				</div>
			</div>
		</div>
	</a>
	<div
		class="absolute top-0 h-full w-full bg-[radial-gradient(100vh_circle_at_50%_-10%,hsl(var(--accent)),hsl(var(--background)))] opacity-0 transition-all duration-500 group-hover:opacity-50"
	></div>
</div>

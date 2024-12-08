<script lang="ts">
	import type { Snippet } from 'svelte';
	import { MoveRight, Plus, ArrowLeft, ArrowRight, RotateCw } from 'lucide-svelte';

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
	class="group relative max-w-screen-lg border border-muted-foreground/50 transition-all duration-1000 hover:border-muted-foreground"
>
	<div
		class="absolute left-[50%] top-0 z-10 h-[1px] -translate-x-[50%] animate-border-width rounded-full bg-gradient-to-r from-[rgba(230,230,230,0)] via-black to-[rgba(230,230,230,0)] transition-all duration-1000 dark:from-[rgba(17,17,17,0)] dark:via-white dark:to-[rgba(17,17,17,0)]"
	></div>

	<MoveRight class="absolute right-12 top-8 z-10 transition-all duration-500 group-hover:right-8" />
	<a
		class="relative flex flex-col overflow-hidden bg-gradient-to-b from-muted to-background pl-8 pr-8 pt-8"
		{href}
	>
		<h3 class="z-10 mb-2 max-w-[calc(100%-32px)] font-mono text-3xl">{headline}</h3>
		<div class="z-10 mb-20">
			<span class="font-mono">{company}, </span>
			<span class="font-mono">{year}</span>
			<span class="text-muted-foreground"> -- {description}</span>
		</div>

		<div
			class="rounded-r-l z-10 translate-y-[10%] rounded-t-lg bg-gradient-to-b from-muted-foreground/50 to-transparent p-px shadow-2xl transition-all duration-500 group-hover:translate-y-0 lg:mx-10"
		>
			<div class="rounded-r-l rounded-t-lg bg-background">
				<div class="flex flex-col items-center border-b border-muted bg-muted/50 py-2">
					<div class="mr-auto flex w-full items-center gap-2 px-2">
						<div class="flex gap-1.5">
							<div class="h-3 w-3 rounded-full bg-red-500"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
							<div class="h-3 w-3 rounded-full bg-green-500"></div>
						</div>
						<div class="rouded-r-sm h-6 w-36 rounded-t-sm bg-muted"></div>
						<Plus class="w-4 text-muted-foreground" />
					</div>
					<div class="flex w-full items-center gap-2 bg-muted p-1 pr-8">
						<ArrowLeft class="ml-0.5 w-4 text-muted-foreground" />
						<ArrowRight class="w-4 text-muted-foreground" />
						<RotateCw class="w-4 text-muted-foreground" />
						<div
							class="w-full flex-1 rounded bg-background/50 px-2 py-1 text-xs text-muted-foreground"
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

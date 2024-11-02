<script lang="ts">
	import { Home, ChevronRight } from 'lucide-svelte';
</script>

<div class="container mx-auto">
	<h2 class="font-mono text-3xl">Headline</h2>

	<div
		class="text- mb-14 bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-3xl text-transparent dark:from-white dark:to-white/40"
	>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, sit aut alias placeat neque
		ipsam reprehenderit impedit similique odit cupiditate iste optio, natus architecto incidunt
		aliquid vel perspiciatis praesentium vitae.
	</div>

	<div>
		<a
			href="/about#projects"
			class="group mx-auto mb-6 flex justify-center text-center text-muted-foreground hover:text-accent hover:underline"
		>
			Trusted by Teams around the world <ChevronRight
				class="w-4 transition-all group-hover:translate-x-1.5"
			/>
		</a>
		<div class="mx-auto mb-14 flex w-max gap-24">
			<Home />
			<Home />
			<Home />
			<Home />
			<Home />
		</div>
		<div
			class="pointer-events-none relative mx-auto -mt-[18.8rem] h-[50rem] animate-pulse overflow-hidden transition-all [--color:#FD9644] [animation-duration:_8s] [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] before:absolute before:inset-0 before:size-full before:opacity-60 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background"
		></div>
	</div>
	<br />
	<a href="/blog">Blog -></a>
</div>

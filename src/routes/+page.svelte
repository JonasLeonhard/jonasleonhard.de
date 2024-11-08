<script lang="ts">
	import { useLink, BentoGrid, BentoCard, HackedText } from '$lib';
	import { Home, ChevronRight, MessageSquareMore } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<div class="container mx-auto">
	<div class="mb-40 flex flex-col gap-8 lg:flex-row">
		<div class="flex h-max flex-col pt-4">
			<HackedText class="relative z-10 w-max text-8xl" text="J0NAS" animationDelay={250} />
			<HackedText class="relative z-10 w-max text-8xl" text="LE0NHARD" animationDelay={500} />
			<HackedText class="relative z-10 w-max text-8xl" text="FULLSTACK," animationDelay={750} />
			<HackedText class="relative z-10 w-max text-8xl" text="DEVEL0PER" animationDelay={1000} />
		</div>
		<div class="min-h-[400px] flex-1 border shadow-lg">
			...TODO Circuit + card moves on hover...
		</div>
	</div>

	<section class="mb-40">
		<h2 class="mb-8 text-3xl">Blog Articles</h2>

		<div class="mb-6 flex items-center justify-center">
			<BentoGrid>
				{#each data.posts.slice(0, 4) as post, index}
					<BentoCard
						name={post.title}
						description={post.description}
						href={post.href || '/'}
						cta="View Post"
						class="col-span-3 {index % 4 === 0 || index % 4 === 3
							? 'lg:col-span-1'
							: 'lg:col-span-2'}"
					>
						{#snippet icon()}
							<MessageSquareMore />
						{/snippet}

						<div class="m-auto self-center justify-self-center pb-12">
							<enhanced:img
								src={post.coverImage.src}
								alt={post.coverImage.alt}
								class="h-auto w-12"
							/>
							<span class="absolute left-0 top-0 opacity-15"
								>TODO: image beams circuit like from outside to image</span
							>
						</div>
					</BentoCard>
				{/each}
			</BentoGrid>
		</div>

		<a use:useLink href="/blog" class="hover:text-accent hover:underline"
			>View all {data.posts.length} blog articles</a
		>
	</section>

	<div
		class="text- mb-80 bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-3xl text-transparent dark:from-white dark:to-white/40"
	>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, sit aut alias placeat neque
		ipsam reprehenderit impedit similique odit cupiditate iste optio, natus architecto incidunt
		aliquid vel perspiciatis praesentium vitae.
	</div>

	<div>
		<a
			use:useLink
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
			class="pointer-events-none relative mx-auto -mt-[18.8rem] h-[50rem] animate-pulse overflow-hidden transition-all [--color:#FD9644] [animation-duration:_8s] [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] before:absolute before:inset-0 before:size-full before:opacity-100 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_100%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background dark:before:opacity-60 dark:before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)]"
		></div>
	</div>
	<br />
</div>

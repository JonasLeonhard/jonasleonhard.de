<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';

	import { useLink, BentoGrid, BentoCard, HackedText, Circuit, lerp } from '$lib';

	import { Home, ChevronRight, MessageSquareMore } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<div
	class="pointer-events-none fixed top-0 -z-50 h-full w-full bg-gradient-to-r from-white to-transparent dark:from-black"
>
	<Canvas>
		<Circuit />
		<T.PerspectiveCamera
			makeDefault
			position={[0, 0, lerp(scrollY, 0, 1000, 620, 550)]}
			fov={50}
			rotation={[0, 0, lerp(scrollY, 0, 1000, 0, Math.PI / 10)]}
		/>
	</Canvas>
</div>

<div class="container mx-auto">
	<div class="mb-80 flex flex-col gap-8 lg:flex-row">
		<div class="flex h-max flex-col pt-4">
			<h6
				class="flex items-center gap-2 before:ml-2 before:h-2 before:w-2 before:animate-pulse before:rounded-full before:bg-gradient-to-br before:from-green-400 before:to-green-800"
			>
				Building Experiences at <a
					class="underline hover:text-accent"
					href="https://www.fork.de/"
					target="_blank">Fork</a
				>
			</h6>
			<h3
				class="relative z-10 w-max bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-8xl text-transparent dark:from-white dark:to-white/40"
			>
				Fullstack
			</h3>
			<h3
				class="relative z-10 w-max bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-8xl text-transparent dark:from-white dark:to-white/40"
			>
				Developer
			</h3>
		</div>
	</div>

	<section class="mb-40">
		<h2 class="mb-8 text-5xl">Latest</h2>

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

		<a use:useLink href="/blog" class="hover:text-accent hover:underline">Open Search</a>
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

<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { fade, fly } from 'svelte/transition';
	import { T } from '@threlte/core';
	import { inview } from 'svelte-inview';
	import someStaticImage from '$lib/assets/images/cover.png?enhanced';
	import { MediaQuery } from 'runed';

	import { useLink, ProjectTeaser, BentoGrid, BentoCard, Circuit, HackedText, lerp } from '$lib';
	import Marqueeck from '@arisbh/marqueeck';

	import { Home } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	let scrollY = $state(0);
	let currentDescIndex = $state(0);
	let visibleProjectsHeadline = $state(false);
	let visibleProject01 = $state(false);
	let visibleProject02 = $state(false);
	let visibleProject03 = $state(false);
	let visibleProject04 = $state(false);
	const isDesktop = new MediaQuery('(min-width: 1024px)');

	const descriptions = [
		'Fullstack Developer.',
		"Works agile, but can't reach his toes",
		'Actually reads documentation',
		'Deployed on fridays',
		'Has a rubber duck',
		'Believes tabs are superior',
		'Takes his coffee in Big O notation',
		'Actually used a binary tree before',
		'Neovim and a terminal is all i need',
		'Suck it uncle bob!'
	];

	$effect(() => {
		const onInterval = () => {
			currentDescIndex = (currentDescIndex + 1) % descriptions.length;
		};
		const interval = setInterval(onInterval, 4500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:window bind:scrollY />

<section class="container mx-auto -mt-20 flex flex-col pb-60 pt-4">
	<h3
		class="relative z-10 w-full max-w-3xl bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-4xl text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
	>
		Jonas,
	</h3>
	<div class="relative h-[120px]">
		{#each descriptions as description, index}
			{#if index === currentDescIndex}
				<h3
					in:fly={{ y: 20, duration: 300 }}
					out:fade={{ duration: 200 }}
					class="absolute left-0 top-0 z-10 w-full max-w-3xl bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-4xl text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
				>
					{description}
				</h3>
			{/if}
		{/each}
	</div>
</section>

<section
	class="container mx-auto flex w-full flex-wrap justify-between gap-4 transition-all duration-1000 lg:gap-60"
	class:opacity-0={scrollY > 250}
	class:-translate-y-2={scrollY > 250}
	class:pointer-events-none={scrollY > 250}
	aria-hidden={scrollY > 250}
>
	<p
		class="md:text-1xl mr-auto mt-auto flex flex-wrap gap-4 text-lg sm:gap-6 sm:text-xl md:gap-10 lg:gap-14 lg:text-2xl"
	>
		<a href="/c" use:useLink class="underline hover:text-accent">blog</a>
		<a href="/#projects" use:useLink class="underline hover:text-accent">projects</a>
		<a href="/contact" use:useLink class="underline hover:text-accent">contact</a>
	</p>
	<p
		class="flex flex-wrap items-center gap-2 text-muted-foreground before:h-2 before:w-2 before:animate-pulse before:rounded-full before:bg-linear-to-br before:from-green-400 before:to-green-800"
	>
		Building Experiences at <a
			class="underline hover:text-accent"
			href="https://www.fork.de/"
			target="_blank">Fork</a
		>
	</p>
</section>

<div class="pointer-events-none fixed left-0 top-0 -z-50 h-full w-full">
	<Canvas>
		<Circuit />
		<T.PerspectiveCamera
			makeDefault
			position={[
				isDesktop.matches ? lerp(scrollY, 0, 600, -200, 0) : 0,
				0,
				lerp(scrollY, 0, 1000, 620, 550)
			]}
			fov={50}
			rotation={[0, 0, lerp(scrollY, 0, 1000, 0, Math.PI / 10)]}
		/>
	</Canvas>
</div>

<section class="container mx-auto mb-40 mt-[50vh]">
	<div
		id="projects"
		class="mb-40 transition-all duration-1000"
		class:opacity-0={!visibleProjectsHeadline}
		use:inview={{ threshold: 0, rootMargin: '-60% 0% 50% 0%' }}
		oninview_change={(event) => {
			visibleProjectsHeadline = !event.detail.inView;
		}}
	>
		<HackedText
			class="w-max font-mono text-6xl lg:text-8xl"
			text="Projects"
			scrambled={!visibleProjectsHeadline}
		/>
	</div>

	<!-- these enter when in the viewport -->
	<div
		class="mb-40 transition-all duration-1000"
		class:opacity-0={!visibleProject01}
		use:inview={{ threshold: 0.1 }}
		oninview_change={(event) => {
			visibleProject01 = event.detail.inView;
		}}
	>
		<ProjectTeaser
			href="/?TODO=true"
			headline="Buerkert"
			description="B2B Ecommerce Platform in Vue"
			company="Fork"
			pageUrl="buerkert.de"
			year="2021-2024"
		>
			<enhanced:img
				class="h-full w-full object-cover"
				src={someStaticImage}
				alt="describe what can be seeon here!"
			/>
		</ProjectTeaser>
	</div>

	<div
		class="mb-40 transition-all duration-1000"
		class:opacity-0={!visibleProject02}
		use:inview={{ threshold: 0.1 }}
		oninview_change={(event) => {
			visibleProject02 = event.detail.inView;
		}}
	>
		<ProjectTeaser
			href="/?TODO=true"
			headline="Hapeko"
			description="Personal Beratung und Jobbörse"
			company="Fork"
			pageUrl="hapeko.de"
			year="2023-2024"
		>
			<enhanced:img
				class="h-full w-full object-cover"
				src={someStaticImage}
				alt="describe what can be seeon here!"
			/>
		</ProjectTeaser>
	</div>

	<div
		class="mb-40 transition-all duration-1000"
		class:opacity-0={!visibleProject03}
		use:inview={{ threshold: 0.1 }}
		oninview_change={(event) => {
			visibleProject03 = event.detail.inView;
		}}
	>
		<ProjectTeaser
			href="/?TODO=true"
			headline="Futurium"
			description="Futuristic Museum right in the hearth of Berlin"
			company="Fork"
			pageUrl="futurium.de"
			year="2021-2022"
		>
			<enhanced:img
				class="h-full w-full object-cover"
				src={someStaticImage}
				alt="describe what can be seeon here!"
			/>
		</ProjectTeaser>
	</div>

	<div
		class="mb-40 transition-all duration-1000"
		class:opacity-0={!visibleProject04}
		use:inview={{ threshold: 0.1 }}
		oninview_change={(event) => {
			visibleProject04 = event.detail.inView;
		}}
	>
		<ProjectTeaser
			href="/?TODO=true"
			headline="Landesanstalt für Medien"
			description="Zebra"
			company="Fork"
			year="2020"
			pageUrl="fragzebra.de"
		>
			<enhanced:img
				class="h-full w-full object-cover"
				src={someStaticImage}
				alt="describe what can be seeon here!"
			/>
		</ProjectTeaser>
	</div>
</section>

<div class="w-screen overflow-hidden">
	<Marqueeck
		class="mb-40 w-full border border-dashed border-muted"
		--marqueeck-padding-y="2rem"
		options={{ paddingX: 200, gap: 200, speed: 40 }}
	>
		<div
			class="flex items-center gap-1 text-3xl text-accent grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Buerkert
		</div>
		<div
			class="flex items-center gap-1 text-3xl text-accent grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Hapeko
		</div>
		<div
			class="flex items-center gap-1 text-3xl text-accent grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Obi
		</div>
		<div
			class="flex items-center gap-1 text-3xl text-accent grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Hapeko
		</div>
		<div
			class="flex items-center gap-1 text-3xl text-accent grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Landesanstalt für Medien NRW
		</div>
	</Marqueeck>
</div>

<section class="container mx-auto mb-40">
	<HackedText class="mb-40 w-max font-mono text-6xl lg:text-8xl" text="Latest Posts" />

	<div class="mb-16 flex items-center justify-center">
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
				></BentoCard>
			{/each}
		</BentoGrid>
	</div>

	<a use:useLink href="/c" class="hover:text-accent hover:underline">View All</a>
</section>

<div
	class="text- container mx-auto mb-80 bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-3xl text-transparent dark:from-white dark:to-white/40"
>
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, sit aut alias placeat neque
	ipsam reprehenderit impedit similique odit cupiditate iste optio, natus architecto incidunt
	aliquid vel perspiciatis praesentium vitae."
</div>

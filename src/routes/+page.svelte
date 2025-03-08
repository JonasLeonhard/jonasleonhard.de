<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { fade, fly } from 'svelte/transition';
	import { T } from '@threlte/core';
	import { inview } from 'svelte-inview';
	import { MediaQuery } from 'runed';
	import { Spring } from 'svelte/motion';

	import { useLink, BentoGrid, BentoCard, Circuit, HackedText } from '$lib';
	import Marqueeck from '@arisbh/marqueeck';

	import { Home } from 'lucide-svelte';

	let { data } = $props();

	const isDesktop = new MediaQuery('(min-width: 1024px)');
	let scrollY = $state(0);
	interface Keyframe {
		scroll: number;
		camera: {
			position: [number, number, number];
			rotation: [number, number, number];
		};
	}

	const desktopKeyframes: Keyframe[] = [
		{
			scroll: 0,
			camera: {
				position: [-200, 0, 620],
				rotation: [0, 0, 0]
			}
		},
		{
			scroll: 600,
			camera: {
				position: [0, 0, 550],
				rotation: [0, 0, Math.PI / 12]
			}
		},
		{
			scroll: 6000,
			camera: {
				position: [0, 0, 400],
				rotation: [0, 0, Math.PI / 4]
			}
		}
	];

	const mobileKeyframes: Keyframe[] = [
		{
			scroll: 0,
			camera: {
				position: [0, 0, 550],
				rotation: [0, 0, 0]
			}
		},
		{
			scroll: 600,
			camera: {
				position: [0, 0, 550],
				rotation: [0, 0, Math.PI / 12]
			}
		},
		{
			scroll: 2000,
			camera: {
				position: [200, 100, 400],
				rotation: [Math.PI / 12, 0, Math.PI / 6]
			}
		}
	];
	let keyframes = $derived(isDesktop.matches ? desktopKeyframes : mobileKeyframes);
	const camera = new Spring(
		isDesktop.matches ? desktopKeyframes[0].camera : mobileKeyframes[0].camera,
		{
			stiffness: 0.3,
			damping: 0.7
		}
	);

	let loadedPage = $state(false);
	let currentDescIndex = $state(0);
	let visibleProjects = $state(false);

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
		const nextKeyframeIndex = keyframes.findIndex((k) => k.scroll > scrollY);
		if (nextKeyframeIndex === -1) {
			// Past the last keyframe, stay at last position
			camera.set(keyframes[keyframes.length - 1].camera);
			return;
		}
		if (nextKeyframeIndex === 0) {
			// Before first keyframe, stay at first position
			camera.set(keyframes[0].camera);
			return;
		}
		const currentKeyframe = keyframes[nextKeyframeIndex - 1];
		const nextKeyframe = keyframes[nextKeyframeIndex];

		const progress =
			(scrollY - currentKeyframe.scroll) / (nextKeyframe.scroll - currentKeyframe.scroll);

		camera.set({
			position: currentKeyframe.camera.position.map(
				(start, i) => start + (nextKeyframe.camera.position[i] - start) * progress
			) as [number, number, number],
			rotation: currentKeyframe.camera.rotation.map(
				(start, i) => start + (nextKeyframe.camera.rotation[i] - start) * progress
			) as [number, number, number]
		});
	});

	$effect(() => {
		loadedPage = true;

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

<section class="container mx-auto -mt-20 flex flex-col pt-4 pb-60">
	<h3
		class="relative z-10 w-full max-w-3xl bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-4xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
	>
		Jonas
	</h3>

	<div class="relative h-[120px]">
		{#each descriptions as description, index}
			{#if index === currentDescIndex}
				<h3
					in:fly={{ y: 20, duration: 300 }}
					out:fade={{ duration: 200 }}
					class="absolute top-0 left-0 z-10 w-full max-w-3xl bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-4xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
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
	class:pointer-events-none={scrollY > 250}
	aria-hidden={scrollY > 250}
>
	<div
		class="md:text-1xl mt-auto mr-auto flex flex-wrap gap-4 text-lg sm:gap-6 sm:text-xl md:gap-10 lg:gap-14 lg:text-2xl"
	>
		<a href="/c" use:useLink class="hover:text-accent underline">
			<HackedText text="blog" scrambled={!loadedPage || scrollY > 250} />
		</a>
		<a href="/#projects" use:useLink class="hover:text-accent underline">
			<HackedText text="projects" scrambled={!loadedPage || scrollY > 250} />
		</a>
		<a href="/contact" use:useLink class="hover:text-accent underline">
			<HackedText text="contact" scrambled={!loadedPage || scrollY > 250} />
		</a>
	</div>

	<p
		class="text-muted-foreground flex flex-wrap items-center gap-2 transition-all delay-700 duration-500 before:h-2 before:w-2 before:animate-pulse before:rounded-full before:bg-linear-to-br before:from-green-400 before:to-green-800"
		class:opacity-100={loadedPage}
		class:opacity-0={!loadedPage}
	>
		Building Experiences at <a
			class="hover:text-accent underline"
			href="https://www.fork.de/"
			target="_blank">Fork</a
		>
	</p>
</section>

<div class="pointer-events-none fixed top-0 left-0 -z-50 h-full w-full">
	<Canvas>
		{#if scrollY < 3700}
			<Circuit />
		{/if}
		<T.PerspectiveCamera
			makeDefault
			position={camera.current.position}
			rotation={camera.current.rotation}
			fov={50}
		/>
	</Canvas>
</div>

<section class="container mx-auto mt-[200vh] mb-40 h-[400vh]">
	<div
		id="projects"
		class="sticky top-0 flex h-screen items-center justify-center"
		use:inview={{ threshold: 1, rootMargin: '50px' }}
		oninview_change={(event) => {
			visibleProjects = event.detail.inView;
		}}
	>
		<div class="m-auto grid w-full grid-cols-8">
			<div class="col-span-3 col-start-1 my-auto">
				<HackedText class="text-8xl" text="I love a" scrambled={!visibleProjects} />
				<HackedText class="text-8xl" text="good Team" scrambled={!visibleProjects} />
			</div>

			<div
				class="text-muted-foreground col-span-2 col-start-4 mx-auto mb-auto -translate-y-20 font-mono"
			>
				<HackedText text="Roles // 52 6F 6C 65 73" scrambled={!visibleProjects} />
				<HackedText text="& Architecture // QXJjaGl0ZWN0dXJl" scrambled={!visibleProjects} />
			</div>

			<div class="col-span-3 col-start-6 mb-auto ml-auto">
				<HackedText
					class="mb-auto text-right text-8xl"
					text="Projects"
					scrambled={!visibleProjects}
				/>
			</div>

			<div class="col-span-3 col-start-1 mt-6 mb-auto">
				<HackedText
					class="text-muted-foreground mb-auto font-mono text-xl"
					text="Chpt 01. // ⠠⠉⠓⠁⠏⠞⠀⠼⠚⠁⠲"
					scrambled={!visibleProjects}
				/>
			</div>
		</div>
	</div>
</section>

<div class="w-screen overflow-hidden">
	<Marqueeck
		class="border-muted mb-40 w-full border border-dashed"
		--marqueeck-padding-y="2rem"
		options={{ paddingX: 200, gap: 200, speed: 40 }}
	>
		<div
			class="text-accent flex items-center gap-1 text-3xl grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Buerkert
		</div>
		<div
			class="text-accent flex items-center gap-1 text-3xl grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Hapeko
		</div>
		<div
			class="text-accent flex items-center gap-1 text-3xl grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Obi
		</div>
		<div
			class="text-accent flex items-center gap-1 text-3xl grayscale transition-all duration-1000 hover:grayscale-0"
		>
			<Home /> Hapeko
		</div>
		<div
			class="text-accent flex items-center gap-1 text-3xl grayscale transition-all duration-1000 hover:grayscale-0"
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

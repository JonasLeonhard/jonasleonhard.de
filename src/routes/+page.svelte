<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { fade, fly } from 'svelte/transition';
	import { T } from '@threlte/core';
	import { MediaQuery } from 'runed';
	import { Spring } from 'svelte/motion';
	import {
		useLink,
		AsciiProgressBar,
		BentoGrid,
		BentoCard,
		Circuit,
		HackedText,
		ProjectsProgress
	} from '$lib'; // TODO: rename ProjectsProgress
	import Marqueeck from '@arisbh/marqueeck';
	import { Home } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	interface ProjectState {
		visible: boolean;
		progress: number;

		title: string;
		subtitle: string;
		role: string;
		roleKey: string;
		alignment: 'left' | 'right';
	}

	let { data } = $props();

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

	const projectsData: Record<string, ProjectState> = {
		stPauli: {
			visible: false,
			progress: 0,
			title: 'FC St. Pauli',
			subtitle: 'Sports Club',
			role: 'Lead Frontend',
			roleKey: 'upcoming',
			alignment: 'left'
		},
		buerkert: {
			visible: false,
			progress: 0,
			title: 'Buerkert',
			subtitle: 'Eccomerce',
			role: 'Lead Frontend',
			roleKey: '3I85$C/PD5LE',
			alignment: 'right'
		},
		hapeko: {
			visible: false,
			progress: 0,
			title: 'Hapeko',
			subtitle: 'Consulting',
			role: 'Frontend & Backend',
			roleKey: 'nmuEGyI%',
			alignment: 'left'
		},
		vw: {
			visible: false,
			progress: 0,
			title: 'VW',
			subtitle: 'ID 4',
			role: 'Frontend',
			roleKey: '...- .--',
			alignment: 'right'
		},
		futurium: {
			visible: false,
			progress: 0,
			title: 'Futurium',
			subtitle: 'Museum',
			role: 'Frontend & Backend',
			roleKey: '!?===',
			alignment: 'left'
		},
		zebra: {
			visible: false,
			progress: 0,
			title: 'Zebra',
			subtitle: 'Media Authority NRW',
			role: 'Frontend & Backend',
			roleKey: 'arbez',
			alignment: 'right'
		},
		obi: {
			visible: false,
			progress: 0,
			title: 'Obi',
			subtitle: 'Machbar',
			role: 'Frontend & Backend',
			roleKey: 'obi',
			alignment: 'left'
		}
	};

	const isDesktop = new MediaQuery('(min-width: 1024px)');
	let scrollY = $state(0);

	const desktopPositions = {
		start: {
			position: [-200, 0, 620],
			rotation: [0, 0, 0]
		},
		team: {
			position: [0, 0, 550],
			rotation: [0, 0, Math.PI / 12]
		},
		end: {
			position: [0, 0, 400],
			rotation: [0, 0, Math.PI / 2]
		}
	};

	const mobilePositions = {
		start: {
			position: [0, 0, 550],
			rotation: [0, 0, 0]
		},
		team: {
			position: [0, 0, 550],
			rotation: [0, 0, Math.PI / 12]
		},
		end: {
			position: [200, 100, 400],
			rotation: [Math.PI / 12, 0, Math.PI / 6]
		}
	};

	const positions = isDesktop.matches ? desktopPositions : mobilePositions;

	let camera = $state({
		position: isDesktop.matches ? desktopPositions.start.position : mobilePositions.start.position,
		rotation: isDesktop.matches ? desktopPositions.start.rotation : mobilePositions.start.rotation
	});

	let projectsState = $state<Record<string, ProjectState>>(projectsData);
	let teamState = $state({ visible: false, progress: 0 });
	let overviewState = $state({ visible: false });
	let currentDescIndex = $state(0);
	let loadedPage = $state(false);
	let outlineProgress = $state(0);
	let imageOpacity = $state(0);

	onMount(() => {
		loadedPage = true;
		gsap.registerPlugin(ScrollTrigger);

		const interval = setInterval(() => {
			currentDescIndex = (currentDescIndex + 1) % descriptions.length;
		}, 4500);

		// CameraMovement 01: Intro -> Team camera
		gsap.timeline({
			scrollTrigger: {
				trigger: 'body',
				endTrigger: '#team',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress;

					const startPos = positions.start;
					const endPos = positions.team;

					// Interpolate position
					camera.position = [
						startPos.position[0] + (endPos.position[0] - startPos.position[0]) * progress,
						startPos.position[1] + (endPos.position[1] - startPos.position[1]) * progress,
						startPos.position[2] + (endPos.position[2] - startPos.position[2]) * progress
					];

					// Interpolate rotation
					camera.rotation = [
						startPos.rotation[0] + (endPos.rotation[0] - startPos.rotation[0]) * progress,
						startPos.rotation[1] + (endPos.rotation[1] - startPos.rotation[1]) * progress,
						startPos.rotation[2] + (endPos.rotation[2] - startPos.rotation[2]) * progress
					];
				}
			}
		});

		// Camera Movement 02: Team
		gsap.timeline({
			scrollTrigger: {
				trigger: '#team',
				start: 'top top',
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress;

					const startPos = positions.team;
					const endPos = positions.end;

					// Interpolate position
					camera.position = [
						startPos.position[0] + (endPos.position[0] - startPos.position[0]) * progress,
						startPos.position[1] + (endPos.position[1] - startPos.position[1]) * progress,
						startPos.position[2] + (endPos.position[2] - startPos.position[2]) * progress
					];

					// Interpolate rotation
					camera.rotation = [
						startPos.rotation[0] + (endPos.rotation[0] - startPos.rotation[0]) * progress,
						startPos.rotation[1] + (endPos.rotation[1] - startPos.rotation[1]) * progress,
						startPos.rotation[2] + (endPos.rotation[2] - startPos.rotation[2]) * progress
					];
				}
			}
		});

		// Display the Team Section
		gsap.timeline({
			scrollTrigger: {
				trigger: `#team`,
				start: 'top 0%',
				end: 'bottom 0%',
				scrub: 1,
				markers: false, // Uncomment for timeline debugging
				onUpdate: (self) => {
					teamState.progress = self.progress;
					teamState.visible = self.isActive;
				}
			}
		});
		// Team image outline
		gsap.timeline({
			scrollTrigger: {
				trigger: '#team',
				start: 'top 0%',
				end: 'bottom 0%',
				scrub: 1,
				onUpdate: (self) => {
					outlineProgress = self.progress;
				}
			}
		});

		// Projects
		Object.keys(projectsState).forEach((projectId) => {
			gsap.timeline({
				scrollTrigger: {
					trigger: `#${projectId}`,
					start: 'top 0%',
					end: 'bottom 0%',
					scrub: 1,
					onUpdate: (self) => {
						projectsState[projectId].progress = self.progress;
						projectsState[projectId].visible = self.isActive;
					}
				}
			});
		});

		// Overview
		gsap.timeline({
			scrollTrigger: {
				trigger: `#overview`,
				start: 'top 50%',
				end: 'bottom 0%',
				scrub: 1,
				onUpdate: (self) => {
					overviewState.visible = self.isActive;
				}
			}
		});

		// Animate Image opacity in
		gsap.timeline({
			scrollTrigger: {
				trigger: '#stPauli',
				start: 'top 0%',
				end: 'bottom 0%',
				scrub: 1,
				onUpdate: (self) => {
					imageOpacity = self.progress;
				}
			}
		});

		// fade in / out the nav-bar
		gsap.to('#intro-nav-bar', {
			scrollTrigger: {
				trigger: 'body',
				start: 'top top',
				end: '250 top',
				scrub: true
			},
			opacity: 0,
			pointerEvents: 'none'
		});

		return () => {
			clearInterval(interval);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
	id="intro-nav-bar"
	class="container mx-auto flex w-full flex-wrap justify-between gap-4 transition-all duration-1000 lg:gap-60"
>
	<div
		class="md:text-1xl mt-auto mr-auto flex flex-wrap gap-4 text-lg sm:gap-6 sm:text-xl md:gap-10 lg:gap-14 lg:text-2xl"
	>
		<a href="/c" use:useLink class="hover:text-accent underline">
			<HackedText text="blog" scrambled={!loadedPage} />
		</a>
		<a href="/#projects" use:useLink class="hover:text-accent underline">
			<HackedText text="projects" scrambled={!loadedPage} />
		</a>
		<a href="/contact" use:useLink class="hover:text-accent underline">
			<HackedText text="contact" scrambled={!loadedPage} />
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

		<ProjectsProgress {outlineProgress} {imageOpacity} />

		<T.PerspectiveCamera
			makeDefault
			position={camera.position}
			rotation={camera.rotation}
			fov={50}
		/>
	</Canvas>
</div>

<!-- Special handling for the first "Team" section -->
<section class="container mx-auto h-[400vh]">
	<div id="team" class="sticky top-0 flex h-screen items-center justify-center">
		<div class="m-auto grid w-full grid-cols-8">
			<div class="col-span-3 col-start-1 my-auto">
				<HackedText class="text-8xl" text="I love a" scrambled={!teamState.visible} />
				<HackedText class="text-8xl" text="good Team" scrambled={!teamState.visible} />
			</div>

			<div
				class="text-muted-foreground col-span-2 col-start-4 mx-auto mb-auto -translate-y-20 font-mono"
			>
				<HackedText text="Roles // 52 6F 6C 65 73" scrambled={!teamState.visible} />
				<HackedText text="& Architecture // QXJjaGl0ZWN0dXJl" scrambled={!teamState.visible} />
			</div>

			<div class="col-span-3 col-start-6 mb-auto ml-auto">
				<HackedText
					class="mb-auto text-right text-8xl"
					text="Projects"
					scrambled={!teamState.visible}
				/>
			</div>

			<AsciiProgressBar class="col-span-3 col-start-1 mt-6 mb-auto" progress={teamState.progress} />
		</div>
	</div>
</section>

<!-- ProjectsState -->
{#each Object.entries(projectsState) as [projectId, project]}
	<section class="container mx-auto h-[200vh]">
		<div id={projectId} class="sticky top-0 flex h-screen items-center justify-center">
			<div class="m-auto w-full {project.alignment === 'right' ? 'text-right' : ''}">
				<HackedText
					class="text-muted-foreground text-xl"
					text={`${project.role} // ${project.roleKey}`}
					scrambled={!project.visible}
				/>
				<HackedText class="text-8xl" text={project.title} scrambled={!project.visible} />
				{#if project.subtitle}
					<HackedText class="text-8xl" text={project.subtitle} scrambled={!project.visible} />
				{/if}
				<AsciiProgressBar progress={project.progress} />
			</div>
		</div>
	</section>
{/each}

<!-- Overview -->
<section id="overview" class="mb-40 flex flex-col items-center justify-center">
	<div class="container mx-auto mb-8 grid grid-cols-8">
		<HackedText
			class="text-muted-foreground col-span-3 col-start-1 text-xl"
			text="Fullstack / Js - Rust - Php - Go"
			scrambled={!overviewState.visible}
		/>
		<HackedText
			class="col-span-3 col-start-1 text-6xl"
			text="And Many More…"
			scrambled={!overviewState.visible}
		/>
		<p
			class="col-span-4 col-start-5 transition-all delay-500 duration-1000 ease-in"
			class:opacity-0={!overviewState.visible}
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</div>

	<div
		class="col-span-full mb-8 w-screen overflow-hidden transition-all delay-700 duration-1000 ease-in"
		class:opacity-0={!overviewState.visible}
	>
		<Marqueeck
			class="border-muted w-full border border-dashed"
			--marqueeck-padding-y="2rem"
			options={{ paddingX: 200, gap: 200, speed: 40 }}
		>
			{#each ['FC St. Pauli', 'Buerkert', 'Hapeko', 'Futurium', 'Obi', 'Landesanstalt für Medien NRW', 'Merck', 'Aareal', 'Otto', 'Fintropolis', 'Gambit', 'Wasserried', 'Berenberg', 'Initiative Milch', 'VDP', 'Lufthansa Technik'] as company}
				<div
					class="text-accent flex items-center gap-1 text-3xl grayscale transition-all duration-1000 hover:grayscale-0"
				>
					<Home />
					{company}
				</div>
			{/each}
		</Marqueeck>
	</div>

	<div class="container mx-auto grid grid-cols-8">
		<p
			class="col-span-4 col-start-5 transition-all delay-1000 duration-1000 ease-in"
			class:opacity-0={!overviewState.visible}
		>
			Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl platea sodales aliquam volutpat
			integer lacus fames. Laoreet sed praesent sed eget dui elementum nunc gravida. Facilisi
			lobortis faucibus vel primis orci massa. Adipiscing bibendum hendrerit sed urna vehicula; odio
			at maecenas. Dolor netus auctor potenti tempor; pharetra nam magna. Arcu nam nostra metus
			fermentum venenatis habitant hendrerit. Rhoncus aliquam phasellus pharetra cursus commodo
			fringilla. Consectetur neque nullam nec, maecenas quis natoque fames. Iaculis orci ridiculus
		</p>
	</div>
</section>

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

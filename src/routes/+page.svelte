<script module lang="ts">
	export interface ProjectState {
		visible: boolean;
		progress: number;

		title: string;
		subtitle: string;
		role: string;
		roleKey: string;
		alignment: 'left' | 'right';
		imagePath: string;
	}
</script>

<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { fade, fly } from 'svelte/transition';
	import { T } from '@threlte/core';
	import {
		useLink,
		AsciiProgressBar,
		BentoGrid,
		BentoCard,
		Circuit,
		HackedText,
		ImageOutline
	} from '$lib';
	import Marqueeck from '@arisbh/marqueeck';
	import { Home } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import ImageProject from '$lib/components/ImageProject.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
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
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/FF4136/FFFFFF?text=St.Pauli' // Added image path
		},
		buerkert: {
			visible: false,
			progress: 0,
			title: 'Buerkert',
			subtitle: 'Eccomerce',
			role: 'Lead Frontend',
			roleKey: '3I85$C/PD5LE',
			alignment: 'right',
			imagePath: 'https://placehold.co/400x400/0074D9/FFFFFF?text=Buerkert' // Added image path
		},
		// Add imagePath for all other projects similarly
		hapeko: {
			visible: false,
			progress: 0,
			title: 'Hapeko',
			subtitle: 'Consulting',
			role: 'Frontend & Backend',
			roleKey: 'nmuEGyI%',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/2ECC40/FFFFFF?text=Hapeko'
		},
		vw: {
			visible: false,
			progress: 0,
			title: 'VW',
			subtitle: 'ID 4',
			role: 'Frontend',
			roleKey: '...- .--',
			alignment: 'right',
			imagePath: 'https://placehold.co/400x400/FFDC00/333333?text=VW'
		},
		futurium: {
			visible: false,
			progress: 0,
			title: 'Futurium',
			subtitle: 'Museum',
			role: 'Frontend & Backend',
			roleKey: '!?===',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/B10DC9/FFFFFF?text=Futurium'
		},
		zebra: {
			visible: false,
			progress: 0,
			title: 'Zebra',
			subtitle: 'Media Authority NRW',
			role: 'Frontend & Backend',
			roleKey: 'arbez',
			alignment: 'right',
			imagePath: 'https://placehold.co/400x400/01FF70/333333?text=Zebra'
		},
		obi: {
			visible: false,
			progress: 0,
			title: 'Obi',
			subtitle: 'Machbar',
			role: 'Frontend & Backend',
			roleKey: 'obi',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/FF851B/FFFFFF?text=OBI'
		}
	};

	const isDesktop = new MediaQuery('(min-width: 1140px)');
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
			position: [0, 70, 550],
			rotation: [0, 0, 0]
		},
		team: {
			position: [0, 12, 550],
			rotation: [0, 0, Math.PI / 12]
		},
		end: {
			position: [0, 12, 400],
			rotation: [0, 0, Math.PI / 2]
		}
	};

	const positions = $derived(isDesktop.current ? desktopPositions : mobilePositions);

	let camera = $state({
		position: isDesktop.current ? desktopPositions.start.position : mobilePositions.start.position,
		rotation: isDesktop.current ? desktopPositions.start.rotation : mobilePositions.start.rotation
	});

	let projectsState = $state<Record<string, ProjectState>>(projectsData);
	let teamState = $state({ visible: false, progress: 0 });
	let overviewState = $state({ visible: false });
	let postsState = $state({ visible: false });
	let currentDescIndex = $state(0);
	let loadedPage = $state(false);
	let outlineProgress = $state(0);
	let imageFadeIn = $state(0);
	let imageFadeOut = $state(0);

	onMount(() => {
		loadedPage = true;

		const interval = setInterval(() => {
			currentDescIndex = (currentDescIndex + 1) % descriptions.length;
		}, 4500);

		// CameraMovement
		gsap.timeline({
			scrollTrigger: {
				trigger: 'body',
				endTrigger: '#team',
				start: 'top 0%',
				end: 'bottom 100%',
				scrub: 1,
				// markers: true, // Uncomment for debugging
				onUpdate: (self) => {
					let progress = self.progress;

					// The midpoint where we should transition from first to second animation
					const midpoint = 0.5;

					if (progress < midpoint) {
						// First half of the scroll
						const normalizedProgress = progress / midpoint; // 0-1

						const startPos = positions.start;
						const endPos = positions.team;

						// Interpolate position
						camera.position = [
							startPos.position[0] +
								(endPos.position[0] - startPos.position[0]) * normalizedProgress,
							startPos.position[1] +
								(endPos.position[1] - startPos.position[1]) * normalizedProgress,
							startPos.position[2] +
								(endPos.position[2] - startPos.position[2]) * normalizedProgress
						];

						// Interpolate rotation
						camera.rotation = [
							startPos.rotation[0] +
								(endPos.rotation[0] - startPos.rotation[0]) * normalizedProgress,
							startPos.rotation[1] +
								(endPos.rotation[1] - startPos.rotation[1]) * normalizedProgress,
							startPos.rotation[2] +
								(endPos.rotation[2] - startPos.rotation[2]) * normalizedProgress
						];
					} else {
						// Second half of the scroll
						const normalizedProgress = (progress - midpoint) / (1 - midpoint); // 0-1

						const startPos = positions.team;
						const endPos = positions.end;

						// Interpolate position
						camera.position = [
							startPos.position[0] +
								(endPos.position[0] - startPos.position[0]) * normalizedProgress,
							startPos.position[1] +
								(endPos.position[1] - startPos.position[1]) * normalizedProgress,
							startPos.position[2] +
								(endPos.position[2] - startPos.position[2]) * normalizedProgress
						];

						// Interpolate rotation
						camera.rotation = [
							startPos.rotation[0] +
								(endPos.rotation[0] - startPos.rotation[0]) * normalizedProgress,
							startPos.rotation[1] +
								(endPos.rotation[1] - startPos.rotation[1]) * normalizedProgress,
							startPos.rotation[2] +
								(endPos.rotation[2] - startPos.rotation[2]) * normalizedProgress
						];
					}
				}
			}
		});

		// Team
		gsap.timeline({
			scrollTrigger: {
				trigger: `#team`,
				start: 'top 0%',
				end: 'bottom 0%',
				scrub: 1,
				onUpdate: (self) => {
					teamState.progress = self.progress;
					teamState.visible = self.isActive;
				}
			}
		});
		// Team - image outline
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

		// Animate Image opacity in/out
		gsap.timeline({
			scrollTrigger: {
				trigger: `#team-done`,
				start: 'top 0%',
				end: 'bottom 50%',
				scrub: 1,
				onUpdate: (self) => {
					imageFadeIn = self.progress;
				}
			}
		});
		gsap.timeline({
			scrollTrigger: {
				trigger: '#overview',
				start: 'top 100%',
				end: 'bottom 20%',
				scrub: 1,
				onUpdate: (self) => {
					imageFadeOut = self.progress * 2;
				}
			}
		});

		gsap.timeline({
			scrollTrigger: {
				trigger: `#posts`,
				start: 'top 50%',
				end: 'bottom 0%',
				scrub: 1,
				onUpdate: (self) => {
					postsState.visible = self.isActive;
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
		class="relative z-10 w-max max-w-3xl border border-dashed bg-linear-to-br from-black from-30% to-black/40 bg-clip-text p-4 text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
	>
		Jonas
	</h3>

	<div class="relative h-[120px]">
		{#each descriptions as description, index}
			{#if index === currentDescIndex}
				<h3
					in:fly={{ y: 20, duration: 300 }}
					out:fade={{ duration: 200 }}
					class="absolute top-0 left-0 z-10 mt-4 max-w-3xl bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
				>
					{description}
				</h3>
			{/if}
		{/each}
	</div>
</section>

<section
	id="intro-nav-bar"
	class="fixed bottom-8 left-1/2 container flex w-full -translate-x-1/2 flex-wrap justify-between gap-4 transition-all duration-1000 lg:bottom-16 lg:gap-60"
>
	<div
		class="md:text-1xl mt-auto mr-auto flex flex-wrap gap-4 text-lg sm:gap-6 sm:text-xl md:gap-10 lg:gap-14 lg:text-2xl"
	>
		<a href="/c" use:useLink class="hover:text-accent underline">
			<HackedText text="blog" scrambled={!loadedPage} />
		</a>
		<a href="/" use:useLink class="hover:text-accent underline">
			<HackedText text="projects" scrambled={!loadedPage} />
		</a>
		<a href="/contact" use:useLink class="hover:text-accent underline">
			<HackedText text="contact" scrambled={!loadedPage} />
		</a>
	</div>

	<p
		class="text-muted-foreground flex flex-wrap items-center gap-2 text-xs transition-all delay-700 duration-500 before:h-2 before:w-2 before:animate-pulse before:rounded-full before:bg-linear-to-br before:from-green-400 before:to-green-800 sm:text-base"
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
			<Circuit dissolveProgress={imageFadeIn} />
		{/if}

		<ImageOutline outlineProgress={outlineProgress - imageFadeOut} />

		<ImageProject allProjects={projectsState} {imageFadeIn} {imageFadeOut} />

		<T.PerspectiveCamera
			makeDefault
			position={camera.position}
			rotation={camera.rotation}
			fov={50}
		/>
	</Canvas>
</div>

<!-- Special handling for the first "Team" section -->
<section class="container mx-auto h-[200vh]" id="team">
	<div
		class="pointer-events-auto fixed top-0 flex h-screen items-center justify-center transition-all duration-200"
		class:pointer-events-none={teamState.progress === 0 || teamState.progress === 1}
		class:opacity-0={teamState.progress === 0 || teamState.progress === 1}
	>
		<div class="mt-auto mb-8 grid w-full grid-cols-8 overflow-hidden lg:m-auto">
			<div
				class="text-muted-foreground col-span-full mx-auto mb-4 border border-dashed font-mono text-sm sm:text-base md:col-span-2 md:col-start-4 md:mb-auto"
			>
				<HackedText text="Roles // 52 6F 6C 65 73" scrambled={!teamState.visible} />
				<HackedText text="& Architecture // QXJjaGl0ZWN0dXJl" scrambled={!teamState.visible} />
			</div>

			<div class="col-span-3 col-start-1 my-auto">
				<HackedText
					class="bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-2xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
					text="I love a"
					scrambled={!teamState.visible || teamState.progress === 0 || teamState.progress === 1}
				/>
				<HackedText
					class="bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-2xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
					text="good Team"
					scrambled={!teamState.visible || teamState.progress === 0 || teamState.progress === 1}
				/>
			</div>

			<div class="col-span-3 col-start-6 mb-auto ml-auto">
				<HackedText
					class="mb-auto bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-right text-2xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
					text="Projects"
					scrambled={!teamState.visible || teamState.progress === 0 || teamState.progress === 1}
				/>
			</div>

			<AsciiProgressBar
				class="col-span-full mt-6 mb-auto text-sm md:col-span-3 md:col-start-1 md:text-base"
				progress={teamState.progress}
			/>
		</div>
	</div>
</section>

<section id="team-done" class="h-[100vh]"></section>

<!-- ProjectsState -->
{#each Object.entries(projectsState) as [projectId, project]}
	{@const progress = Math.min(project.progress * 2, 1)}
	<section class="h-[200vh]" id={projectId}>
		<div
			class="pointer-events-auto fixed top-0 left-1/2 container mx-auto flex h-screen -translate-x-1/2 items-center justify-center transition-all duration-200"
			class:pointer-events-none={progress === 0 || progress === 1}
			class:opacity-0={progress === 0 || progress === 1}
			aria-hidden={progress === 0 || progress === 1}
		>
			<div
				class="mt-auto mb-8 w-full overflow-hidden lg:m-auto"
				class:text-right={project.alignment === 'right'}
			>
				<HackedText
					class={`text-muted-foreground mb-2 w-max border border-dashed text-base md:text-xl ${project.alignment === 'right' ? 'ml-auto' : ''}`}
					text={`${project.role} // ${project.roleKey}`}
					scrambled={progress === 0 || progress === 1}
				/>
				<HackedText
					class={`w-max bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40 ${project.alignment === 'right' ? 'ml-auto' : ''}`}
					text={project.title}
					scrambled={progress === 0 || progress === 1}
				/>
				{#if project.subtitle}
					<HackedText
						class={`w-max bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40 ${project.alignment === 'right' ? 'ml-auto' : ''}`}
						text={project.subtitle}
						scrambled={progress === 0 || progress === 1}
					/>
				{/if}
				<AsciiProgressBar class="mt-4 text-sm md:text-base" {progress} />
			</div>
		</div>
	</section>
{/each}

<!-- Overview -->
<section id="overview" class="mb-40 flex flex-col items-center justify-center">
	<div class="container mx-auto mb-8 grid grid-cols-8 overflow-hidden">
		<HackedText
			class="text-muted-foreground col-span-full mb-2 w-max border border-dashed text-base md:col-span-3 md:col-start-1 md:text-xl"
			text="Fullstack / Js - Rust - Php - Go"
			scrambled={!overviewState.visible}
		/>
		<HackedText
			class="col-span-full mb-20 h-max bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-5xl text-transparent sm:text-6xl md:col-span-3 md:col-start-1 md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
			text="And More…"
			scrambled={!overviewState.visible}
		/>
		<p
			class="col-span-full transition-all delay-500 duration-1000 ease-in lg:col-span-4 lg:col-start-5"
			class:opacity-0={!overviewState.visible}
		>
			In the grim darkness of our sprint backlog, there is only technical debt. A Dark Eldar torture
			chamber of global variables and spaghetti logic. While others whisper "we'll fix it later", my
			battle cry echoes through our Slack channels: "The God-Emperor of Clean Code demands
			vigilance! Technical debt is heresy!". "One does not simply refactor the codebase," muttered
			Dave, our senior developer with a thousand-yard stare. He'd rolled a critical failure on his
			saving throw after discovering the authentication module was AI generated by a vibe coder
			intern who thought Hobbits were a JavaScript framework.
		</p>
	</div>

	<div
		class="col-span-full mb-8 w-full overflow-hidden transition-all delay-700 duration-1000 ease-in"
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
			class="col-span-full transition-all delay-1000 duration-1000 ease-in lg:col-span-4 lg:col-start-5"
			class:opacity-0={!overviewState.visible}
		>
			The truth hits harder than a "ERROR: Unhandled exception at 0x000FFDAE": The typical Hiring
			Manager won't read past the first few lines of a Resume and Skills list. As that would require
			the patience of someone who's compiled Rust on a Raspberry Pi. You, dear reader, might be the
			Chosen One. The prophesied Hiring Manager whose coming was foretold in the ancient Agile
			Manifesto. I respect your dedication, and i like to work with People who take their time to do
			their best work. You should ask me about the time i had to rewrite half our codebase. Cheers.
		</p>
	</div>
</section>

<section id="posts" class="container mx-auto mb-40">
	<HackedText
		class="text-muted-foreground col-span-full mb-2 w-max border border-dashed text-base sm:text-base md:col-span-3 md:col-start-1 md:text-xl"
		text="Y'all got any more of them blogposts?"
		scrambled={!postsState.visible}
	/>
	<HackedText
		class="col-span-full mb-8 bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-5xl text-transparent sm:text-6xl md:col-span-3 md:col-start-1 md:text-7xl lg:text-8xl dark:from-white dark:to-white/40"
		text="Content i Love"
		scrambled={!postsState.visible}
	/>

	<p class="mb-16 max-w-lg">
		I love to Program. I really do. And ever since i was a Kid, i liked to nerd out with my Friends.
		And now years later. I get the same feeling i used to get with my Friends, when Nerding out with
		my Coworkers or random People on the Internet who take their time to teach others about what
		they have learned, make Youtube Videos, give Courses, write Blogposts or even Books about
		Programming. I would love to contribute to this discussion. You can find both my Blogposts,
		aswell as any Resource i find worth sharing in my Content collection below. I hope you will
		enjoy this list as much as i did!
	</p>

	<div
		class="mb-16 flex items-center justify-center delay-[200ms] delay-[400ms] delay-[600ms] delay-[800ms]"
	>
		<BentoGrid>
			{#each data.posts.slice(0, 4) as post, index}
				<BentoCard
					name={post.title}
					description={post.description}
					href={post.href || '/'}
					cta="View Post"
					class="col-span-3 {index % 4 === 0 || index % 4 === 3
						? 'lg:col-span-1'
						: 'lg:col-span-2'} transition-all opacity-{postsState.visible ? 1 : 0} delay-[{index *
						200}ms]"
				></BentoCard>
			{/each}
		</BentoGrid>
	</div>

	<a use:useLink href="/c" class="hover:text-accent hover:underline">View All</a>
</section>

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
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ImageProject from '$lib/components/ImageProject.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.config({ ignoreMobileResize: true });
	}

	let { data } = $props();

	const descriptions = [
		'Fullstack Developer.',
		"Works agile, but can't reach his toes",
		'move slow and fix things',
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
			roleKey: '▌',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/FF4136/FFFFFF?text=St.Pauli'
		},
		buerkert: {
			visible: false,
			progress: 0,
			title: 'Buerkert',
			subtitle: 'Eccomerce',
			role: 'Lead Frontend',
			roleKey: '▄',
			alignment: 'right',
			imagePath: 'https://placehold.co/400x400/0074D9/FFFFFF?text=Buerkert'
		},
		hapeko: {
			visible: false,
			progress: 0,
			title: 'Hapeko',
			subtitle: 'Consulting',
			role: 'Frontend & Backend',
			roleKey: '▀',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/2ECC40/FFFFFF?text=Hapeko'
		},
		vw: {
			visible: false,
			progress: 0,
			title: 'VW',
			subtitle: 'ID 4',
			role: 'Frontend',
			roleKey: '▐',
			alignment: 'right',
			imagePath: 'https://placehold.co/400x400/FFDC00/333333?text=VW'
		},
		futurium: {
			visible: false,
			progress: 0,
			title: 'Futurium',
			subtitle: 'Museum',
			role: 'Frontend & Backend',
			roleKey: '▄',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/B10DC9/FFFFFF?text=Futurium'
		},
		zebra: {
			visible: false,
			progress: 0,
			title: 'Zebra',
			subtitle: 'Media Authority NRW',
			role: 'Frontend & Backend',
			roleKey: '▀',
			alignment: 'right',
			imagePath: 'https://placehold.co/400x400/01FF70/333333?text=Zebra'
		},
		obi: {
			visible: false,
			progress: 0,
			title: 'Obi',
			subtitle: 'Machbar',
			role: 'Frontend & Backend',
			roleKey: '▐',
			alignment: 'left',
			imagePath: 'https://placehold.co/400x400/FF851B/FFFFFF?text=OBI'
		}
	};

	const isDesktop = new MediaQuery('(min-width: 1140px)');
	let scrollY = $state(0);

	const desktopPositions = {
		start: { position: [-200, 0, 620], rotation: [0, 0, 0] },
		team: { position: [0, 0, 550], rotation: [0, 0, Math.PI / 12] },
		end: { position: [0, 0, 400], rotation: [0, 0, Math.PI / 2] }
	};

	const mobilePositions = {
		start: { position: [0, 70, 550], rotation: [0, 0, 0] },
		team: { position: [0, 12, 550], rotation: [0, 0, Math.PI / 12] },
		end: { position: [0, 12, 400], rotation: [0, 0, Math.PI / 2] }
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
				scrub: 0.5,
				onUpdate: (self) => {
					let progress = self.progress;
					const midpoint = 0.5;

					if (progress < midpoint) {
						const normalizedProgress = progress / midpoint;
						const startPos = positions.start;
						const endPos = positions.team;

						camera.position = [
							startPos.position[0] +
								(endPos.position[0] - startPos.position[0]) * normalizedProgress,
							startPos.position[1] +
								(endPos.position[1] - startPos.position[1]) * normalizedProgress,
							startPos.position[2] +
								(endPos.position[2] - startPos.position[2]) * normalizedProgress
						];

						camera.rotation = [
							startPos.rotation[0] +
								(endPos.rotation[0] - startPos.rotation[0]) * normalizedProgress,
							startPos.rotation[1] +
								(endPos.rotation[1] - startPos.rotation[1]) * normalizedProgress,
							startPos.rotation[2] +
								(endPos.rotation[2] - startPos.rotation[2]) * normalizedProgress
						];
					} else {
						const normalizedProgress = (progress - midpoint) / (1 - midpoint);
						const startPos = positions.team;
						const endPos = positions.end;

						camera.position = [
							startPos.position[0] +
								(endPos.position[0] - startPos.position[0]) * normalizedProgress,
							startPos.position[1] +
								(endPos.position[1] - startPos.position[1]) * normalizedProgress,
							startPos.position[2] +
								(endPos.position[2] - startPos.position[2]) * normalizedProgress
						];

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

		// Team Dynamic Viewport Bounds
		gsap.timeline({
			scrollTrigger: {
				trigger: `#team`,
				start: 'top 85%',
				end: 'bottom bottom',
				scrub: true,
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
				start: 'top 85%',
				end: 'bottom bottom',
				scrub: true,
				onUpdate: (self) => {
					outlineProgress = self.progress;
				}
			}
		});

		// Projects Mapping
		Object.keys(projectsState).forEach((projectId) => {
			gsap.timeline({
				scrollTrigger: {
					trigger: `#${projectId}`,
					start: 'top 85%',
					end: 'bottom bottom',
					scrub: true,
					onUpdate: (self) => {
						projectsState[projectId].progress = self.progress;
						projectsState[projectId].visible = self.isActive;
					}
				}
			});
		});

		// Animate Image opacity in
		gsap.timeline({
			scrollTrigger: {
				trigger: `#team-done`,
				start: 'top top',
				end: 'bottom center',
				scrub: true,
				onUpdate: (self) => {
					imageFadeIn = self.progress;
				}
			}
		});

		// Core content deck tracking controllers
		gsap.timeline({
			scrollTrigger: {
				trigger: '#content-deck',
				start: 'top 95%',
				end: 'top top',
				scrub: true,
				onUpdate: (self) => {
					imageFadeOut = self.progress * 2;
				}
			}
		});

		ScrollTrigger.create({
			trigger: '#overview',
			start: 'top 75%',
			once: true,
			onEnter: () => {
				overviewState.visible = true;
			}
		});

		ScrollTrigger.create({
			trigger: '#posts',
			start: 'top 75%',
			once: true,
			onEnter: () => {
				postsState.visible = true;
			}
		});

		// fade out the nav-bar
		gsap.to('#intro-nav-bar', {
			scrollTrigger: {
				trigger: 'body',
				start: 'top top',
				end: '200 top',
				scrub: true
			},
			opacity: 0,
			pointerEvents: 'none'
		});

		const handleLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', handleLoad);

		return () => {
			clearInterval(interval);
			window.removeEventListener('load', handleLoad);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<svelte:window bind:scrollY />

<div class="w-full max-w-full overflow-x-hidden text-foreground select-none font-sans">
	<section class="container mx-auto flex flex-col pt-32 pb-60 px-4 sm:px-6 lg:px-8 relative z-10">
		<h3
			class="w-max max-w-full border border-dashed border-border bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text p-4 text-5xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
		>
			Jonas
		</h3>

		<div class="relative h-[120px] max-w-full overflow-hidden mt-4">
			{#each descriptions as description, index}
				{#if index === currentDescIndex}
					<h3
						in:fly={{ y: 20, duration: 300 }}
						out:fade={{ duration: 200 }}
						class="absolute top-0 left-0 z-10 max-w-full bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-5xl font-medium text-transparent sm:text-6xl md:text-7xl lg:text-8xl break-words"
					>
						{description}
					</h3>
				{/if}
			{/each}
		</div>
	</section>

	<section
		id="intro-nav-bar"
		class="fixed bottom-8 left-1/2 container flex w-full -translate-x-1/2 flex-wrap justify-between gap-4 transition-all duration-500 lg:bottom-16 lg:gap-60 px-4 sm:px-6 lg:px-8 z-40"
	>
		<div
			class="md:text-1xl mt-auto mr-auto flex flex-wrap gap-4 text-lg sm:gap-6 sm:text-xl md:gap-10 lg:gap-14 lg:text-2xl"
		>
			<a
				href="/c"
				use:useLink
				class="hover:text-accent transition-colors duration-200 underline decoration-border hover:decoration-accent"
			>
				<HackedText text="blog" scrambled={!loadedPage} />
			</a>
			<a
				href="/"
				use:useLink
				class="hover:text-accent transition-colors duration-200 underline decoration-border hover:decoration-accent"
			>
				<HackedText text="projects" scrambled={!loadedPage} />
			</a>
			<a
				href="/about"
				use:useLink
				class="hover:text-accent transition-colors duration-200 underline decoration-border hover:decoration-accent"
			>
				<HackedText text="about" scrambled={!loadedPage} />
			</a>
		</div>

		<p
			class="text-muted-foreground flex flex-wrap items-center gap-2 text-xs transition-all delay-700 duration-500 before:h-2 before:w-2 before:animate-pulse before:rounded-full before:bg-accent sm:text-base"
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

	<div class="pointer-events-none fixed top-0 left-0 -z-50 h-screen w-full transform-gpu">
		<Canvas>
			{#if scrollY < 3700}
				<Circuit dissolveProgress={imageFadeIn} />
			{/if}

			<ImageOutline outlineProgress={outlineProgress - imageFadeOut} />
			<ImageProject allProjects={projectsState} {imageFadeIn} {imageFadeOut} {scrollY} />

			<T.PerspectiveCamera
				makeDefault
				position={camera.position}
				rotation={camera.rotation}
				fov={50}
			/>
		</Canvas>
	</div>

	<section class="relative container mx-auto h-[200vh] px-4 sm:px-6 lg:px-8" id="team">
		<div
			class="sticky top-0 flex h-screen w-full items-center justify-center transition-opacity duration-300 transform-gpu"
			class:opacity-100={teamState.visible}
			class:opacity-0={!teamState.visible}
		>
			<div class="w-full max-w-7xl mx-auto grid grid-cols-8 overflow-hidden">
				<div
					class="text-muted-foreground col-span-full mx-auto mb-4 border border-dashed border-border font-mono text-sm sm:text-base md:col-span-2 md:col-start-4 md:mb-auto p-2 bg-background/50 backdrop-blur-xs"
				>
					<HackedText text="Roles // 52 6F 6C 65 73" scrambled={!teamState.visible} />
					<HackedText text="& Architecture // QXJjaGl0ZWN0dXJl" scrambled={!teamState.visible} />
				</div>

				<div class="col-span-3 col-start-1 my-auto">
					<HackedText
						class="bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-2xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
						text="Teams,"
						scrambled={!teamState.visible}
					/>
					<HackedText
						class="bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-2xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
						text="Work"
						scrambled={!teamState.visible}
					/>
				</div>

				<div class="col-span-3 col-start-6 mb-auto ml-auto">
					<HackedText
						class="mb-auto bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-right text-2xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
						text="& Projects"
						scrambled={!teamState.visible}
					/>
				</div>

				<AsciiProgressBar
					class="col-span-full mt-6 mb-auto text-sm md:col-span-3 md:col-start-1 md:text-base"
					progress={teamState.progress}
				/>
			</div>
		</div>
	</section>

	<section id="team-done" class="h-screen"></section>

	{#each Object.entries(projectsState) as [projectId, project]}
		{@const progress = Math.min(project.progress * 2, 1)}
		{@const textOpacity =
			project.progress < 0.45 ? 1 : Math.max(0, 1 - (project.progress - 0.45) * 3)}

		<section class="relative h-[200vh] px-4 sm:px-6 lg:px-8" id={projectId}>
			<div
				class="sticky top-0 w-full h-screen flex items-center justify-center transition-opacity duration-150 ease-out transform-gpu"
				style="opacity: {project.visible ? textOpacity : 0}; pointer-events: {project.visible &&
				textOpacity > 0.1
					? 'auto'
					: 'none'};"
			>
				<div
					class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden"
				>
					<div
						class="col-span-full lg:col-span-6 {project.alignment === 'right'
							? 'lg:col-start-7 text-right'
							: 'lg:col-start-1 text-left'}"
					>
						<HackedText
							class="text-muted-foreground mb-2 inline-block border border-dashed border-border p-1 font-mono text-xs md:text-sm bg-background/40 backdrop-blur-xs"
							text={`${project.role} // ${project.roleKey}`}
							scrambled={!project.visible}
						/>
						<HackedText
							class="w-full bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl block overflow-hidden"
							text={project.title}
							scrambled={!project.visible}
						/>
						{#if project.subtitle}
							<HackedText
								class="w-full bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl block mt-1 overflow-hidden"
								text={project.subtitle}
								scrambled={!project.visible}
							/>
						{/if}
						<div class="mt-6 w-full max-w-md {project.alignment === 'right' ? 'ml-auto' : ''}">
							<AsciiProgressBar class="text-xs md:text-sm" {progress} />
						</div>
					</div>
				</div>
			</div>
		</section>
	{/each}

	<div
		id="content-deck"
		class="relative z-30 w-full max-w-full bg-background border-t border-border shadow-[0_-30px_60px_rgba(0,0,0,0.5)] overflow-hidden font-mono"
	>
		<div
			class="absolute top-4 left-6 text-[10px] text-muted-foreground select-none hidden md:block tracking-widest"
		>
			SYS.LOC // <span class="text-accent">CORE_MINIMAL_PROD</span>
		</div>
		<div
			class="absolute top-4 right-6 text-[10px] text-muted-foreground select-none hidden md:block tracking-wider"
		>
			STATUS: <span class="text-primary">● STABLE</span>
		</div>

		<section
			id="overview"
			class="pt-40 pb-20 flex flex-col items-center justify-center relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
		>
			<div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start overflow-hidden">
				<div class="col-span-full lg:col-span-5 max-w-full overflow-hidden">
					<HackedText
						class="text-accent font-mono mb-3 inline-block border border-dashed border-accent/30 bg-accent/5 px-2 py-1 text-xs md:text-sm tracking-wide"
						text="Fullstack // Ts - Rust - C/Cpp - Php - Go - Odin"
						scrambled={!overviewState.visible}
					/>
					<HackedText
						class="w-full bg-gradient-to-r from-neutral-950 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl block overflow-hidden"
						text="And More…"
						scrambled={!overviewState.visible}
					/>
				</div>
				<div class="col-span-full lg:col-span-7 flex items-center max-w-full">
					<p
						class="text-muted-foreground text-base md:text-lg leading-relaxed italic border-l border-border pl-6 transition-all duration-700 ease-out font-sans"
						class:opacity-0={!overviewState.visible}
						class:translate-y-4={!overviewState.visible}
					>
						" I've had the chance to work on some incredible projects throughout my career, a few of
						which are highlighted below. I spend more time building these than updating my website,
						so this isn't an exhaustive list of my latest work - but it gives a great sense of what
						I do. No matter the project, my favorite part is always figuring out how to untangle
						complex problems. "
					</p>
				</div>
			</div>
		</section>

		<div
			class="w-full max-w-full overflow-hidden my-6 transition-all duration-700 ease-out delay-200"
			class:opacity-0={!overviewState.visible}
		>
			<Marqueeck
				class="border-border w-full border-y bg-card/20 backdrop-blur-xs"
				--marqueeck-padding-y="2.5rem"
				options={{ paddingX: 100, gap: 100, speed: 32 }}
			>
				{#each ['FC St. Pauli', 'Buerkert', 'Hapeko', 'Futurium', 'Obi', 'Landesanstalt für Medien NRW', 'Merck', 'Aareal', 'Otto', 'Fintropolis', 'Gambit', 'Wasserried', 'Berenberg', 'Initiative Milch', 'VDP', 'Lufthansa Technik'] as company}
					<div
						class="text-muted-foreground flex items-center gap-3 text-2xl md:text-3xl font-medium tracking-tight hover:text-accent transition-colors duration-200"
					>
						<Home class="w-5 h-5 text-muted-foreground/60 transition-colors duration-200" />
						{company}
					</div>
				{/each}
			</Marqueeck>
		</div>

		<section class="src-layout w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
			<div class="grid grid-cols-1 lg:grid-cols-12">
				<p
					class="col-span-full lg:col-span-7 lg:col-start-6 text-muted-foreground/60 text-sm md:text-base italic transition-all duration-700 ease-out delay-300 font-sans"
					class:opacity-0={!overviewState.visible}
				>
					"A project is really only as good as the team behind it. Thanks so much for working with
					me, it’s been an absolute blast!" - Jonas
				</p>
			</div>
		</section>

		<section id="posts" class="w-full max-w-7xl mx-auto pb-20 pt-20 px-4 sm:px-6 lg:px-8 relative">
			<div class="mb-12 max-w-full overflow-hidden">
				<HackedText
					class="text-muted-foreground font-mono mb-2 inline-block border border-dashed border-border px-2 py-0.5 text-xs md:text-sm"
					text="Y'all got any more of them blogposts?"
					scrambled={!postsState.visible}
				/>
				<HackedText
					class="bg-gradient-to-r from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl block overflow-hidden"
					text="Content i Love"
					scrambled={!postsState.visible}
				/>
				<p class="mt-6 text-muted-foreground text-base max-w-xl leading-relaxed font-sans">
					You can find both my blogposts, as well as any resource i find worth sharing in my content
					collection below. I hope you will enjoy this list as much as i did!
				</p>
			</div>

			<div class="mb-16 w-full max-w-full overflow-hidden">
				<BentoGrid>
					{#each data.posts.slice(0, 4) as post, index}
						<BentoCard
							name={post.title}
							description={post.description}
							href={post.href || '/'}
							cta="View Post"
							style="transition-delay: {index * 150}ms;"
							class="col-span-1 md:col-span-3 {index % 4 === 0 || index % 4 === 3
								? 'lg:col-span-1'
								: 'lg:col-span-2'} transition-all duration-700 bg-card/10 border border-border/80 hover:border-primary/40 backdrop-blur-xs text-foreground {postsState.visible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'}"
						></BentoCard>
					{/each}
				</BentoGrid>
			</div>

			<a
				use:useLink
				href="/c"
				class="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card/10 text-muted-foreground font-mono text-sm uppercase tracking-wider rounded-none hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
			>
				View All Content //
			</a>
		</section>
	</div>
</div>

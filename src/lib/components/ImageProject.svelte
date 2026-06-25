<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Texture, TextureLoader, LinearFilter, Uniform, Raycaster, Vector2, Color } from 'three';
	import type { ProjectState } from '../../routes/+page.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	import consoleVertexShader from '$lib/three/consoleVertex.glsl?raw';
	import consoleFragmentShader from '$lib/three/consoleFragment.glsl?raw';
	import bgCanvasVertexShader from '$lib/three/bgCanvasVertex.glsl?raw';
	import bgCanvasFragmentShader from '$lib/three/bgCanvasFragment.glsl?raw';

	interface Props {
		allProjects: Record<string, ProjectState>;
		imageFadeIn: number;
		imageFadeOut: number;
		scrollY: number;
		isHovered: boolean;
		meshOffsetX: number;
		meshOffsetY: number;
		hoverScaleFactor: number;
	}
	let {
		allProjects = $bindable(),
		imageFadeIn = 0,
		imageFadeOut = 0,
		isHovered = $bindable(false),
		meshOffsetX = $bindable(0),
		meshOffsetY = $bindable(0),
		hoverScaleFactor = $bindable(1.0)
	}: Props = $props();

	const textureLoader = new TextureLoader();
	const { camera: activeCamera, scene } = useThrelte();
	const raycaster = new Raycaster();

	const projectTextureMap = $state<Record<string, Texture[]>>({});
	let loadingSet = new Set<string>();
	let textureTrigger = $state(0);

	let globalElapsedTime = 0;
	let transitionTimeline = $state(1.0);

	let rawMouseX = 0.5;
	let rawMouseY = 0.5;
	const smoothMouseUniform = new Vector2(0.5, 0.5);

	let activeKey = $state<string | null>(null);
	let siblingKey = $state<string | null>(null);

	let previousGalleryTex = $state<Texture | null>(null);
	let activeGalleryTex = $state<Texture | null>(null);

	let lastProcessedKey: string | null = null;
	let lastProcessedImgIdx: number = 0;

	let bgTrackX = $state(0);
	let bgTrackY = $state(0);

	const isDesktop = new MediaQuery('(min-width: 1140px)');
	const startSize = $derived(isDesktop.current ? 135.0 : 90.0);
	const targetSize = $derived(isDesktop.current ? 225.0 : 135.0);

	const currentCardSize = $derived(
		(startSize + (targetSize - startSize) * imageFadeIn) * hoverScaleFactor
	);

	const globalAlpha = $derived(imageFadeIn * (1.0 - imageFadeOut));

	const accentColorUniform = new Uniform(new Color('#ffaa00'));
	const foregroundColorUniform = new Uniform(new Color('#ffffff'));
	const backgroundColorUniform = new Uniform(new Color('#000000'));

	const consoleUniforms = {
		texCurrent: new Uniform<Texture | null>(null),
		texNext: new Uniform<Texture | null>(null),
		scrollMix: new Uniform(0.0),
		galleryFrom: new Uniform<Texture | null>(null),
		galleryTo: new Uniform<Texture | null>(null),
		galleryMix: new Uniform(1.0),
		opacity: new Uniform(0.0),
		uTime: new Uniform(0.0),
		uResolution: new Uniform(new Vector2(1, 1)),
		uMouse: new Uniform(smoothMouseUniform),
		uAccentColor: accentColorUniform
	};

	const bgCanvasUniforms = {
		scrollMix: new Uniform(0.0),
		galleryMix: new Uniform(1.0),
		opacity: new Uniform(0.0),
		uTime: new Uniform(0.0),
		uAspect: new Uniform(1.0),
		uMouse: new Uniform(smoothMouseUniform),
		uAccentColor: accentColorUniform,
		uForegroundColor: foregroundColorUniform,
		uBgColor: backgroundColorUniform
	};

	const { invalidate } = useThrelte();
	let renderAccumulator = 0;
	const INVERSE_TARGET_FPS = 1 / 45; // Caps heavy computations at 45 FPS max during motion

	// Track state mutations to see if things are actually changing
	let lastScrollY = 0;
	let lastMouseX = 0.5;
	let lastMouseY = 0.5;

	useTask(
		(delta) => {
			// 1. Always process internal vector math smoothly so transitions don't break
			globalElapsedTime += delta;
			consoleUniforms.uTime.value = globalElapsedTime;
			bgCanvasUniforms.uTime.value = globalElapsedTime;

			smoothMouseUniform.x += (rawMouseX - smoothMouseUniform.x) * 0.045;
			smoothMouseUniform.y += (rawMouseY - smoothMouseUniform.y) * 0.045;
			consoleUniforms.uMouse.value.copy(smoothMouseUniform);
			bgCanvasUniforms.uMouse.value.copy(smoothMouseUniform);

			const cam = $activeCamera;
			const currentProject = activeKey ? allProjects[activeKey] : null;
			const isProjectInteractive =
				currentProject && currentProject.progress <= 0.75 && imageFadeOut <= 0.05;

			if (
				isDesktop.current &&
				activeGalleryTex &&
				cam &&
				imageFadeIn > 0.95 &&
				isProjectInteractive
			) {
				const raycastMouse = new Vector2(rawMouseX * 2.0 - 1.0, rawMouseY * 2.0 - 1.0);
				raycaster.setFromCamera(raycastMouse, cam);
				const targets = raycaster.intersectObjects(scene.children, true);
				const isHit = targets.some((t) => t.object.name === 'projectCard');

				if (isHit !== isHovered) {
					isHovered = isHit;
					if (typeof document !== 'undefined')
						document.body.style.cursor = isHit ? 'pointer' : 'default';
				}
			} else {
				if (isHovered && typeof document !== 'undefined') document.body.style.cursor = 'default';
				isHovered = false;
			}

			const targetScale = isHovered && isDesktop.current ? 1.06 : 1.0;
			hoverScaleFactor += (targetScale - hoverScaleFactor) * 0.14;

			let targetOffsetX = 0;
			let targetOffsetY = 0;
			if (isDesktop.current && imageFadeIn > 0.95 && isProjectInteractive) {
				targetOffsetX = (smoothMouseUniform.x - 0.5) * 45.0;
				targetOffsetY = (smoothMouseUniform.y - 0.5) * 45.0;
			}

			meshOffsetX += (targetOffsetX - meshOffsetX) * 0.14;
			meshOffsetY += (targetOffsetY - meshOffsetY) * 0.14;

			if (cam) {
				bgTrackX = cam.position.x;
				bgTrackY = cam.position.y;
			}

			if (transitionTimeline < 1.0) {
				transitionTimeline = Math.min(transitionTimeline + delta * 2.0, 1.0);
			}

			// 2. DELTA-THROTTLED INVALIDATION MANAGER
			if (globalAlpha > 0.0) {
				// Check if there has been ANY physical state adjustment since the last cycle
				const hasScrolled = Math.abs(scrollY - lastScrollY) > 0.1;
				const hasMouseMoved =
					Math.abs(rawMouseX - lastMouseX) > 0.001 || Math.abs(rawMouseY - lastMouseY) > 0.001;
				const isAnimatingCard = transitionTimeline < 1.0;

				// Cache current state positions
				lastScrollY = scrollY;
				lastMouseX = rawMouseX;
				lastMouseY = rawMouseY;

				// If an action is actively occurring, handle timing thresholds carefully
				if (hasScrolled || hasMouseMoved || isAnimatingCard || isHovered) {
					renderAccumulator += delta;

					if (renderAccumulator >= INVERSE_TARGET_FPS) {
						invalidate(); // Trigger single frame redraw pass
						renderAccumulator %= INVERSE_TARGET_FPS; // Maintain time precision tracking
					}
				}
			} else {
				// Drop variables if page goes idle to protect memory space
				renderAccumulator = 0;
			}
		},
		{ autoInvalidate: false }
	);

	function handlePointerMove(e: PointerEvent) {
		if (!isDesktop.current) return;
		if (typeof window !== 'undefined') {
			rawMouseX = e.clientX / window.innerWidth;
			rawMouseY = 1.0 - e.clientY / window.innerHeight;
		}
	}

	function handleConsolePanelClick(e: MouseEvent) {
		if (!activeKey || !allProjects[activeKey]) return;

		const currentProject = allProjects[activeKey];

		if (
			imageFadeIn < 0.95 ||
			currentProject.progress > 0.75 ||
			imageFadeOut > 0.05 ||
			globalAlpha < 0.4
		)
			return;

		const cam = $activeCamera;
		if (!cam) return;

		const coords = new Vector2(
			(e.clientX / window.innerWidth) * 2 - 1,
			-(e.clientY / window.innerHeight) * 2 + 1
		);

		raycaster.setFromCamera(coords, cam);
		const hitTargets = raycaster.intersectObjects(scene.children, true);

		if (hitTargets.length > 0) {
			const hitCard = hitTargets.find((hit) => hit.object.name === 'projectCard');
			if (hitCard) {
				const totalGalleryCount = currentProject.imagePaths.length;
				if (totalGalleryCount > 1) {
					currentProject.currentImageIndex =
						(currentProject.currentImageIndex + 1) % totalGalleryCount;
				}
			}
		}
	}

	$effect(() => {
		const projects = Object.entries(allProjects);

		let activeIdx = projects.findIndex(
			([, p]) => p.visible || (p.progress > 0.0 && p.progress < 0.99)
		);
		if (activeIdx === -1 && lastProcessedKey) {
			activeIdx = projects.findIndex(([id]) => id === lastProcessedKey);
		}
		if (activeIdx === -1) activeIdx = 0;

		const [cId, currentProject] = projects[activeIdx] || [];
		const [nId] = projects[activeIdx + 1] || [];

		activeKey = cId;
		siblingKey = nId;

		[cId, nId].forEach((id) => {
			if (id && allProjects[id] && !projectTextureMap[id] && !loadingSet.has(id)) {
				loadingSet.add(id);
				const paths = allProjects[id].imagePaths;
				const localTextures: Texture[] = new Array(paths.length);
				let loadedCount = 0;

				paths.forEach((path, idx) => {
					textureLoader.load(path, (tex) => {
						tex.generateMipmaps = false;
						tex.minFilter = LinearFilter;
						localTextures[idx] = tex;
						loadedCount++;
						if (loadedCount === paths.length) {
							projectTextureMap[id] = localTextures;
							loadingSet.delete(id);
							textureTrigger++;
						}
					});
				});
			}
		});

		let currentScrollMix = 0.0;
		if (cId && nId && currentProject) {
			currentScrollMix =
				currentProject.progress <= 0.75 ? 0.0 : (currentProject.progress - 0.75) / 0.25;
			currentScrollMix = Math.max(0.0, Math.min(currentScrollMix, 1.0));
		}

		const currentTextures = cId ? projectTextureMap[cId] : null;
		const nextTextures = nId ? projectTextureMap[nId] : null;
		const currentImgIdx = cId ? allProjects[cId].currentImageIndex : 0;

		const targetTex = currentTextures ? currentTextures[currentImgIdx] : null;
		const fallbackNextTex = nextTextures ? nextTextures[0] : null;

		if (targetTex) {
			if (cId !== lastProcessedKey) {
				previousGalleryTex = targetTex;
				activeGalleryTex = targetTex;
				transitionTimeline = 1.0;
				lastProcessedKey = cId;
				lastProcessedImgIdx = currentImgIdx;
			} else if (currentImgIdx !== lastProcessedImgIdx) {
				previousGalleryTex = activeGalleryTex || targetTex;
				activeGalleryTex = targetTex;
				transitionTimeline = 0.0;
				lastProcessedImgIdx = currentImgIdx;
			}
		}

		if (typeof window !== 'undefined') {
			const width = window.innerWidth;
			const height = window.innerHeight;

			consoleUniforms.uResolution.value.set(width, height);
			bgCanvasUniforms.uAspect.value = width / (height || 1);

			const isDark =
				document.documentElement.classList.contains('dark') ||
				document.body.classList.contains('dark');
			if (isDark) {
				accentColorUniform.value.setStyle('hsl(26.59, 97.88%, 62.94%)');
				foregroundColorUniform.value.setStyle('hsl(0, 0%, 98%)');
				backgroundColorUniform.value.setStyle('hsl(0, 0%, 3.9%)');
			} else {
				accentColorUniform.value.setStyle('hsl(40.61, 92.52%, 58.04%)');
				foregroundColorUniform.value.setStyle('hsl(0, 0%, 3.9%)');
				backgroundColorUniform.value.setStyle('hsl(0, 0%, 100%)');
			}
		}

		consoleUniforms.texCurrent.value = activeGalleryTex;
		consoleUniforms.texNext.value = fallbackNextTex;
		consoleUniforms.scrollMix.value = currentScrollMix;
		consoleUniforms.galleryFrom.value = previousGalleryTex;
		consoleUniforms.galleryTo.value = activeGalleryTex;
		consoleUniforms.galleryMix.value = transitionTimeline;
		consoleUniforms.opacity.value = globalAlpha;

		bgCanvasUniforms.scrollMix.value = currentScrollMix;
		bgCanvasUniforms.galleryMix.value = transitionTimeline;
		bgCanvasUniforms.opacity.value = globalAlpha;
	});
</script>

<svelte:window onpointermove={handlePointerMove} onclick={handleConsolePanelClick} />

<T.Group position={[meshOffsetX, 13 + meshOffsetY, 0]} rotation={[0, 0, Math.PI / 2]}>
	{#if activeGalleryTex}
		<T.Mesh name="projectCard" position={[0, 0, 0]}>
			<T.PlaneGeometry args={[currentCardSize, currentCardSize, 16, 16]} />
			<T.ShaderMaterial
				transparent
				depthTest={false}
				depthWrite={false}
				vertexShader={consoleVertexShader}
				fragmentShader={consoleFragmentShader}
				uniforms={consoleUniforms}
			/>
		</T.Mesh>
	{/if}
</T.Group>

<T.Mesh position={[bgTrackX, bgTrackY, -180]}>
	<T.PlaneGeometry args={[3200, 3200]} />
	<T.ShaderMaterial
		transparent
		depthTest={false}
		depthWrite={false}
		vertexShader={bgCanvasVertexShader}
		fragmentShader={bgCanvasFragmentShader}
		uniforms={bgCanvasUniforms}
	/>
</T.Mesh>

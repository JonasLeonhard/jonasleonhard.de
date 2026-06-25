<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { T, useTask, useThrelte } from '@threlte/core';
	import vertexShader from '$lib/three/circuitPointVertex.glsl?raw';
	import fragmentShader from '$lib/three/circuitPointFragment.glsl?raw';
	import computedSvg from '$lib/three/precomputedSvg';
	import { Plane, Raycaster, Vector2, Vector3, SplineCurve, CanvasTexture, Uniform } from 'three';
	import Portal from 'svelte-portal';
	import glowUrl from '$lib/assets/three/glow.png';
	import { onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	interface Props {
		dissolveProgress: number;
	}

	const { dissolveProgress }: Props = $props();
	const isDesktop = new MediaQuery('(min-width: 1140px)');

	const CURVE_TIME_OFFSET = 0.2;
	const TARGET_PARTICLE_SPACING = $derived(isDesktop.current ? 0.03 : 0.06);

	const curves = computedSvg.curves.map(
		(curveData) => new SplineCurve(curveData.points.map((point) => new Vector2(point[0], point[1])))
	);

	function getPositions(time: number, curves: SplineCurve[]) {
		const scaleX = computedSvg.metadata.width / 2;
		const scaleY = computedSvg.metadata.height / 2;

		const newPositions = curves.flatMap((curve, curveIndex) => {
			const points: number[] = [];
			const curveLength = curve.getLength();
			const particleCount = Math.max(1, Math.round(curveLength / TARGET_PARTICLE_SPACING));
			const curveOffset = curveIndex * CURVE_TIME_OFFSET;

			for (let i = 0; i < particleCount; i++) {
				const baseT = i / particleCount;
				const t =
					(baseT + ((time * 0.2 + curveOffset) * TARGET_PARTICLE_SPACING) / curveLength) % 1;
				const point = curve.getPoint(t);
				points.push(point.x * scaleX, point.y * scaleY, 0);
			}
			return points;
		});

		return new Float32Array(newPositions);
	}

	function getLineIndex(totalPositions: number) {
		return new Float32Array(totalPositions / 3).fill(0).map((_, i) => {
			let particleSum = 0;
			for (let curveIndex = 0; curveIndex < curves.length; curveIndex++) {
				const curve = curves[curveIndex];
				const curveLength = curve.getLength();
				const particleCount = Math.max(1, Math.round(curveLength / TARGET_PARTICLE_SPACING));
				particleSum += particleCount;
				if (i < particleSum) {
					return curveIndex;
				}
			}
			return curves.length - 1;
		});
	}

	function getOpacity(totalPositions: number) {
		return new Float32Array(totalPositions / 3).fill(0).map(() => Math.random().toFixed(2));
	}

	function getGlowImage() {
		const image = new Image();
		image.src = glowUrl;
		return image;
	}

	// High Performance Setup: Static buffers allocated outside state constraints
	let rawTime = 0;
	const initialPositions = getPositions(rawTime, curves);
	const opacity = getOpacity(initialPositions.length);
	const lineIndex = getLineIndex(initialPositions.length);

	// Direct element binding references to bypass DOM attribute tracking loops
	let materialRef = $state<any>();
	let positionAttrRef = $state<any>();

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let innerWidth = $state(0);

	const fadeoutProgress = new Spring(1, {
		stiffness: 0.03,
		damping: 0.8
	});

	let hasTriggeredFadeout = $state(false);
	let mousePosition = $state(new Vector2(0, 0));
	let planeIntersection: Vector2 | undefined = $state(undefined);
	const raycaster = new Raycaster();
	const { camera, renderer, invalidate } = useThrelte();
	const raycastPlane = new Plane(new Vector3(0, 0, 1), 0);

	let mouseTrailCanvas: HTMLCanvasElement | undefined = $state();
	let mouseTrailCtx: CanvasRenderingContext2D | null = $state(null);
	let glowImage = $state(getGlowImage());
	let mouseTrailCanvasTexture: CanvasTexture | undefined = $state();

	let renderAccumulator = 0;
	const INVERSE_TARGET_FPS = 1 / 45; // Smooth 45 FPS ceiling for core calculation runs

	function handleMouseMove(event: MouseEvent) {
		if (!isDesktop.current || !$camera || !raycastPlane || !renderer || !mouseTrailCanvas) return;

		const rect = renderer.domElement.getBoundingClientRect();
		mousePosition.x = (event.clientX / rect.width) * 2 - 1;
		mousePosition.y = -(event.clientY / rect.height) * 2 + 1;
		raycaster.setFromCamera(mousePosition, $camera);

		const intersection = new Vector3();
		if (raycaster.ray.intersectPlane(raycastPlane, intersection)) {
			const normalizedX = event.clientX / rect.width;
			const normalizedY = event.clientY / rect.height;

			planeIntersection = new Vector2(
				normalizedX * mouseTrailCanvas.width,
				normalizedY * mouseTrailCanvas.height
			);
		}
	}

	$effect(() => {
		fadeoutProgress.set(0);
	});

	onMount(() => {
		if (!mouseTrailCanvas || !isDesktop.current) return;
		mouseTrailCtx = mouseTrailCanvas.getContext('2d');
		mouseTrailCanvasTexture = new CanvasTexture(mouseTrailCanvas);
	});

	useTask(
		(delta) => {
			// Optimization Guard: If section has dissolved completely, drop to 0 FPS instantly
			if (dissolveProgress >= 1.0) return;

			renderAccumulator += delta;
			if (renderAccumulator >= INVERSE_TARGET_FPS) {
				if (!hasTriggeredFadeout) {
					rawTime += renderAccumulator;
				}

				// 1. Fluid Canvas mouse calculations (desktop only)
				if (
					isDesktop.current &&
					mouseTrailCanvas &&
					mouseTrailCtx &&
					glowImage.complete &&
					planeIntersection &&
					mouseTrailCanvasTexture
				) {
					mouseTrailCtx.globalCompositeOperation = 'source-over';
					mouseTrailCtx.globalAlpha = 0.04;
					mouseTrailCtx.fillRect(0, 0, mouseTrailCanvas.width, mouseTrailCanvas.height);

					const glowSize = mouseTrailCanvas.width * 0.1;
					mouseTrailCtx.globalCompositeOperation = 'lighten';
					mouseTrailCtx.globalAlpha = 1;
					mouseTrailCtx.drawImage(
						glowImage,
						planeIntersection.x - glowSize / 2,
						planeIntersection.y - glowSize / 2,
						glowSize,
						glowSize
					);

					mouseTrailCanvasTexture.needsUpdate = true;
				}

				// 2. Direct GPU updates via non-reactive references
				if (positionAttrRef) {
					const nextPositions = getPositions(rawTime, curves);
					positionAttrRef.array = nextPositions;
					positionAttrRef.needsUpdate = true;
				}

				if (materialRef) {
					materialRef.uniforms.time.value = rawTime;
					materialRef.uniforms.scrollY.value = scrollY;
					materialRef.uniforms.fadeoutProgress.value = fadeoutProgress.current;
					materialRef.uniforms.dissolveProgress.value = dissolveProgress;
					if (mouseTrailCanvasTexture) {
						materialRef.uniforms.mouseTrailCanvasTexture.value = mouseTrailCanvasTexture;
					}
				}

				// 3. Clear single step pass invalidation
				invalidate();
				renderAccumulator = 0;
			}
		},
		{ autoInvalidate: false }
	);
</script>

<svelte:window bind:innerHeight bind:innerWidth bind:scrollY on:mousemove={handleMouseMove} />
<T.Points>
	<T.BufferGeometry>
		<T.BufferAttribute
			bind:ref={positionAttrRef}
			args={[initialPositions, 3]}
			attach={({ parent, ref }) => {
				parent.setAttribute('position', ref);
				return () => {};
			}}
		/>
		<T.BufferAttribute
			args={[opacity, 1]}
			attach={({ parent, ref }) => {
				parent.setAttribute('opacity', ref);
				return () => {};
			}}
		/>
		<T.BufferAttribute
			args={[lineIndex, 1]}
			attach={({ parent, ref }) => {
				parent.setAttribute('lineIndex', ref);
				return () => {};
			}}
		/>
	</T.BufferGeometry>
	<T.ShaderMaterial
		bind:ref={materialRef}
		depthTest={false}
		depthWrite={false}
		transparent
		{vertexShader}
		{fragmentShader}
		uniforms={{
			time: new Uniform(0),
			scrollY: new Uniform(0),
			fadeoutProgress: new Uniform(0),
			dissolveProgress: new Uniform(0),
			mouseTrailCanvasTexture: new Uniform(null)
		}}
	/>
</T.Points>

<Portal target="body">
	{#if isDesktop.current}
		<canvas
			class="border-primary fixed top-0 left-0 hidden border"
			bind:this={mouseTrailCanvas}
			width={innerWidth * 0.25}
			height={innerHeight * 0.25}
		></canvas>
	{/if}
</Portal>

<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { T, useTask } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Vector3, TextureLoader, CatmullRomCurve3, Texture } from 'three';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';

	const OUTLINE_COLOR = '#00ffff';
	const OUTLINE_WIDTH = 2;
	const PLANE_WIDTH = 135; // TODO: this should probably be relative to the viewport
	const PLANE_HEIGHT = 135;
	let outlineStartPoint = 0.0; // When outline starts (0-1 scroll progress)
	let outlineEndPoint = 0.66; // When outline completes (0-1 scroll progress)
	let fadeInStartPoint = 0.66; // When image fade-in starts (0-1 scroll progress)
	let fadeInEndPoint = 1.0; // When image fade-in completes (0-1 scroll progress)
	let scrollStartTrigger = 660; // Scroll position where animation begins
	let scrollEndTrigger = 6000; // Scroll position where animation ends

	let time = $state(0);
	let animationPhase = $state(0); // 0: outline animation, 1: image fade in
	let imageOpacity = $state(0);
	const fadeAnimation = new Spring(0, {
		stiffness: 0.05,
		damping: 0.8
	});

	let scrollY = $state(0);
	let pageHeight = $state(0);
	let scrollProgress = $state(0);

	$effect(() => {
		// Calculate scroll progress as a value between 0 and 1
		// Use the custom scroll trigger points
		const scrollRange = scrollEndTrigger - scrollStartTrigger;

		if (scrollY < scrollStartTrigger) {
			scrollProgress = 0;
		} else if (scrollY > scrollEndTrigger) {
			scrollProgress = 1;
		} else {
			scrollProgress = (scrollY - scrollStartTrigger) / scrollRange;
		}
	});

	// TODO: use different curve??
	// Create a spline for a more interesting outline shape
	// Using a rounded rectangle shape with CatmullRom for smooth curves
	const createSplineCurve = () => {
		const w = PLANE_WIDTH / 2;
		const h = PLANE_HEIGHT / 2;
		const cornerRadius = 0.3; // Rounded corners

		// Create control points for rounded rectangle
		const points = [
			// Bottom edge with rounded corners
			new Vector3(-w + cornerRadius, -h, 0),
			new Vector3(0, -h, 0),
			new Vector3(w - cornerRadius, -h, 0),

			// Bottom-right corner
			new Vector3(w, -h + cornerRadius, 0),

			// Right edge
			new Vector3(w, 0, 0),
			new Vector3(w, h - cornerRadius, 0),

			// Top-right corner
			new Vector3(w - cornerRadius, h, 0),

			// Top edge
			new Vector3(0, h, 0),
			new Vector3(-w + cornerRadius, h, 0),

			// Top-left corner
			new Vector3(-w, h - cornerRadius, 0),

			// Left edge
			new Vector3(-w, 0, 0),
			new Vector3(-w, -h + cornerRadius, 0),

			// Back to start (closed curve)
			new Vector3(-w + cornerRadius, -h, 0)
		];

		// Create a closed loop spline
		return new CatmullRomCurve3(points, true);
	};

	const splineCurve = createSplineCurve();
	const splinePoints = 100;

	// Animation progress from 0 to 1
	let outlineProgress = $state(0);

	let imageTexture: Texture | null = $state(null);

	// Load image texture
	onMount(() => {
		const loader = new TextureLoader();
		// Replace with your image URL
		loader.load('https://placehold.co/400x400', (texture) => {
			imageTexture = texture;
		});

		// Get page height for scroll calculations
		pageHeight = document.body.scrollHeight;
	});

	useTask((delta) => {
		// Map the scroll progress to outline progress based on custom start/end points
		if (scrollProgress < outlineStartPoint) {
			outlineProgress = 0;
		} else if (scrollProgress > outlineEndPoint) {
			outlineProgress = 1;
		} else {
			// Normalize progress between start and end points
			const normalizedProgress =
				(scrollProgress - outlineStartPoint) / (outlineEndPoint - outlineStartPoint);
			outlineProgress = normalizedProgress;
		}

		// Check if we should transition to fade-in phase
		if (scrollProgress >= fadeInStartPoint && animationPhase === 0) {
			animationPhase = 1;
		}

		// Image fade in based on custom start/end points
		if (animationPhase === 1) {
			// Map the scroll progress to fade progress based on custom fade-in range
			if (scrollProgress < fadeInStartPoint) {
				fadeAnimation.set(0);
			} else if (scrollProgress > fadeInEndPoint) {
				fadeAnimation.set(1);
			} else {
				// Normalize progress between start and end points
				const normalizedFadeProgress =
					(scrollProgress - fadeInStartPoint) / (fadeInEndPoint - fadeInStartPoint);
				fadeAnimation.set(normalizedFadeProgress);
			}

			imageOpacity = fadeAnimation.current;
		}

		// Still keep a minimal time-based animation for when user isn't scrolling
		time += delta * 0.1;
	});

	function getVisibleLinePoints() {
		if (outlineProgress <= 0) return [];

		const totalPoints = splinePoints;
		const visiblePoints = Math.ceil(totalPoints * outlineProgress);

		const points = [];
		for (let i = 0; i < visiblePoints; i++) {
			const t = i / (totalPoints - 1);
			const point = splineCurve.getPoint(t);
			points.push(point);
		}

		return points;
	}

	const visibleOutline = $derived(getVisibleLinePoints());
</script>

<svelte:window bind:scrollY />

<T.Group position={[0, 13, 0]} rotation={[0, 0, Math.PI / 2]}>
	<!-- TODO: there is probably a better way to update the MeshLineGeometry points each frame. Is there something like Needsupdate for this? -->
	{#key visibleOutline.length}
		{#if visibleOutline.length > 0}
			<T.Mesh>
				<MeshLineGeometry points={visibleOutline} shape="custom" />
				<MeshLineMaterial
					color={OUTLINE_COLOR}
					width={OUTLINE_WIDTH}
					transparent
					opacity={1}
					attenuate={false}
				/>
			</T.Mesh>
		{/if}
	{/key}

	{#if animationPhase === 1 && imageTexture}
		<T.Mesh>
			<T.PlaneGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
			<T.MeshBasicMaterial map={imageTexture} transparent={true} opacity={imageOpacity} />
		</T.Mesh>
	{/if}
</T.Group>

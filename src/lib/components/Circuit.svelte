<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { T, useTask, useThrelte } from '@threlte/core';
	import vertexShader from '$lib/three/circuitPointVertex.glsl?raw';
	import fragmentShader from '$lib/three/circuitPointFragment.glsl?raw';
	import computedSvg from '$lib/three/precomputedSvg';
	import { Plane, Raycaster, Vector2, Vector3, SplineCurve } from 'three';

	const TARGET_PARTICLE_SPACING = 0.03; // Adjust this value to control density
	const CURVE_TIME_OFFSET = 0.2; // give a slight offset to each curve

	const curves = $state(
		computedSvg.curves.map(
			(curveData) =>
				new SplineCurve(curveData.points.map((point) => new Vector2(point[0], point[1])))
		)
	);

	function getPositions(time: number, curves: SplineCurve[]) {
		const scaleX = computedSvg.metadata.width / 2;
		const scaleY = computedSvg.metadata.height / 2;

		const newPositions = curves.flatMap((curve, curveIndex) => {
			const points: number[] = [];
			// Calculate the length of the curve
			const curveLength = curve.getLength();

			// Calculate how many particles this curve should have based on its length
			// and the target spacing between particles
			const particleCount = Math.max(1, Math.round(curveLength / TARGET_PARTICLE_SPACING));

			// Add offset based on curve index
			const curveOffset = curveIndex * CURVE_TIME_OFFSET;

			for (let i = 0; i < particleCount; i++) {
				const baseT = i / particleCount;
				// Add curve offset to create staggered start times
				const t =
					(baseT + ((time * 0.1 + curveOffset) * TARGET_PARTICLE_SPACING) / curveLength) % 1;

				// Get point at the current position
				const point = curve.getPoint(t);

				points.push(point.x * scaleX, point.y * scaleY, 0);
			}
			return points;
		});

		return new Float32Array(newPositions);
	}

	let time = $state(0);
	const positions = $derived(getPositions(time, curves));
	const opacity = $state(
		new Float32Array(positions.length / 3).fill(0).map(() => Math.random().toFixed(2))
	);
	const lineIndex = $state(
		new Float32Array(positions.length / 3).fill(0).map((_, i) => {
			// Find which curve this particle belongs to
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
			return curves.length - 1; // fallback to last curve
		})
	);

	let scrollY = $state(0);
	const fadeoutProgress = new Spring(1, {
		stiffness: 0.03,
		damping: 0.8
	});
	let hasTriggeredFadeout = $state(false);
	let mousePosition = $state(new Vector2(0, 0));
	let mousePlaneIntersection = $state(new Vector3());
	const fadeoutThreshhold = 600;
	const raycaster = new Raycaster();
	const { camera, renderer } = useThrelte();
	let raycastPlane: Plane;

	function handleMouseMove(event: MouseEvent) {
		if (!$camera || !raycastPlane || !renderer) return;
		const rect = renderer.domElement.getBoundingClientRect();
		mousePosition.x = (event.clientX / rect.width) * 2 - 1;
		mousePosition.y = -(event.clientY / rect.height) * 2 + 1;
		raycaster.setFromCamera(mousePosition, $camera);

		const intersection = new Vector3();
		if (raycaster.ray.intersectPlane(raycastPlane, intersection)) {
			mousePlaneIntersection.set(intersection.x, intersection.y, intersection.z);
		}
	}

	$effect(() => {
		if (scrollY >= fadeoutThreshhold && !hasTriggeredFadeout) {
			hasTriggeredFadeout = true;
			fadeoutProgress.set(1);
		} else if (scrollY < fadeoutThreshhold && hasTriggeredFadeout) {
			hasTriggeredFadeout = false;
			fadeoutProgress.set(0);
		}
	});

	$effect(() => {
		if (scrollY < 0) {
			fadeoutProgress.set(1);
		} else if (scrollY >= 0) {
			fadeoutProgress.set(0);
		}
	});

	useTask((delta) => {
		if (!hasTriggeredFadeout) {
			time += delta;
		}
	});
</script>

<svelte:window bind:scrollY on:mousemove={handleMouseMove} />
<T.Plane
	args={[new Vector3(0, 0, 1), 0]}
	visible={false}
	attach={({ ref }) => {
		raycastPlane = ref;
		return () => {
			raycastPlane = undefined;
		};
	}}
/>
<T.Points>
	<T.BufferGeometry>
		<T.BufferAttribute
			args={[positions, 3]}
			needsUpdate
			attach={({ parent, ref }) => {
				parent.setAttribute('position', ref);
				return () => {};
			}}
		/>
		<T.BufferAttribute
			args={[opacity, 1]}
			attach={({ parent, ref }) => {
				parent.setAttribute('opacity', ref);
				return () => {
					// cleanup function called when ref changes or the component unmounts
					// https://threlte.xyz/docs/reference/core/t#attach
				};
			}}
		/>
		<T.BufferAttribute
			args={[lineIndex, 1]}
			attach={({ parent, ref }) => {
				parent.setAttribute('lineIndex', ref);
				return () => {
					// cleanup function called when ref changes or the component unmounts
					// https://threlte.xyz/docs/reference/core/t#attach
				};
			}}
		/>
	</T.BufferGeometry>
	<T.ShaderMaterial
		depthTest={false}
		depthWrite={false}
		transparent
		{vertexShader}
		{fragmentShader}
		uniforms={{
			time: { value: 0 },
			scrollY: { value: 0 },
			fadeoutProgress: { value: 0 }
		}}
		uniforms.time.value={time}
		uniforms.scrollY.value={scrollY}
		uniforms.fadeoutProgress.value={fadeoutProgress.current}
	/>
</T.Points>

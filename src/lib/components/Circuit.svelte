<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { T, useTask, useThrelte } from '@threlte/core';
	import vertexShader from '$lib/three/circuitPointVertex.glsl?raw';
	import fragmentShader from '$lib/three/circuitPointFragment.glsl?raw';
	import computedSvg from '$lib/three/precomputedSvg';
	import { Plane, Raycaster, Vector2, Vector3 } from 'three';

	const positions = $state(new Float32Array(computedSvg.positions));
	const bloomOpacity = $state(new Float32Array(computedSvg.bloomOpacity));
	const lineIndexes = $state(new Float32Array(computedSvg.lineIndexes));
	let scrollY = $state(0);
	let time = $state(0);
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

		// Calculate normalized device coordinates (-1 to +1)
		mousePosition.x = (event.clientX / rect.width) * 2 - 1;
		mousePosition.y = -(event.clientY / rect.height) * 2 + 1;

		raycaster.setFromCamera(mousePosition, $camera);

		// Since we cannot intersect with Point-Particles directly, we intersect with the Ground raycastPlane below, and use that in the Shader for mouse positions
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
			attach={({ parent, ref }) => {
				parent.setAttribute('position', ref);
				return () => {
					// cleanup function called when ref changes or the component unmounts
					// https://threlte.xyz/docs/reference/core/t#attach
				};
			}}
		/>
		<T.BufferAttribute
			args={[bloomOpacity, 1]}
			attach={({ parent, ref }) => {
				parent.setAttribute('bloomOpacity', ref);
				return () => {
					// cleanup function called when ref changes or the component unmounts
					// https://threlte.xyz/docs/reference/core/t#attach
				};
			}}
		/>
		<T.BufferAttribute
			args={[lineIndexes, 1]}
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
			fadeoutProgress: { value: 0 },
			mousePlaneIntersection: { value: mousePlaneIntersection }
		}}
		uniforms.time.value={time}
		uniforms.scrollY.value={scrollY}
		uniforms.fadeoutProgress.value={fadeoutProgress.current}
		uniforms.mousePlaneIntersection.value={mousePlaneIntersection}
	/>
</T.Points>

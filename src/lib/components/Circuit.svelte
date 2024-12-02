<script lang="ts">
	import { spring } from 'svelte/motion';
	import { T, useTask } from '@threlte/core';
	import vertexShader from '$lib/three/circuitPointVertex.glsl?raw';
	import fragmentShader from '$lib/three/circuitPointFragment.glsl?raw';
	import computedSvg from '$lib/three/precomputedSvg';

	const positions = $state(new Float32Array(computedSvg.positions));
	const bloomOpacity = $state(new Float32Array(computedSvg.bloomOpacity));
	const lineIndexes = $state(new Float32Array(computedSvg.lineIndexes));
	let scrollY = $state(0);
	let time = $state(0);
	const fadeoutProgress = spring(1, {
		stiffness: 0.03,
		damping: 0.8
	});
	let hasTriggeredFadeout = $state(false);
	const fadeoutThreshhold = 600;

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

<svelte:window bind:scrollY />

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
			fadeoutProgress: { value: 0 }
		}}
		uniforms.time.value={time}
		uniforms.scrollY.value={scrollY}
		uniforms.fadeoutProgress.value={$fadeoutProgress}
	/>
</T.Points>

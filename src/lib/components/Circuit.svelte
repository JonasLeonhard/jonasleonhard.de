<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import vertexShader from '$lib/three/circuitPointVertex.glsl?raw';
	import fragmentShader from '$lib/three/circuitPointFragment.glsl?raw';
	import { writable } from 'svelte/store';

	export let svgWrapper: HTMLDivElement;

	const count = 20909; // lineIndex amount
	const positions = new Float32Array(count * 3);
	const bloomOpacity = new Float32Array(count);
	const lineIndexes = new Float32Array(count);

	let svgWidth: number | null = null;
	let svgHeight: number | null = null;
	const time = writable(0);

	$: {
		const svg = svgWrapper?.querySelector('svg') as SVGElement | null;
		svgWidth = svg?.getAttribute('width') as number | null;
		svgHeight = svg?.getAttribute('height') as number | null;

		if (svg && svgWidth && svgHeight) {
			const paths = Array.from(svg.querySelectorAll('path'));
			let positionIndex = 0;
			let opacityIndex = 0;
			let lineIndex = 0;
			paths.forEach((path) => {
				const length = path.getTotalLength();
				const numPoints = Math.floor(length / 5);

				for (let i = 0; i < numPoints; i++) {
					const point = path.getPointAtLength((i / numPoints) * length);

					positions[positionIndex++] = point.x - svgWidth! / 2;
					positions[positionIndex++] = point.y - svgHeight! / 2;
					positions[positionIndex++] = 0; // z-coordinate, assuming 2D SVG
					bloomOpacity[opacityIndex++] = Math.random();
					lineIndexes[lineIndex++] = i;
				}
			});
		}
	}

	useTask((delta) => {
		time.update((t) => t + delta);
	});
</script>

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
			time: { value: 0 }
		}}
		uniforms.time.value={$time}
	/>
</T.Points>

<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';

	interface Props {
		outlineProgress: number;
	}

	const { outlineProgress }: Props = $props();

	const OUTLINE_COLOR = '#00ffff';
	const OUTLINE_WIDTH = 1.5; // Clean, thin industrial console wire width
	const PLANE_WIDTH = 135;
	const PLANE_HEIGHT = 135;

	// Generates a completely sharp, squared vector tracking route path
	const createSquarePath = () => {
		const w = PLANE_WIDTH / 2;
		const h = PLANE_HEIGHT / 2;

		return [
			new Vector3(-w, -h, 0), // Bottom Left
			new Vector3(w, -h, 0), // Bottom Right
			new Vector3(w, h, 0), // Top Right
			new Vector3(-w, h, 0), // Top Left
			new Vector3(-w, -h, 0) // Closed path anchor link loop
		];
	};

	const squarePoints = createSquarePath();

	function getVisibleLinePoints() {
		if (outlineProgress <= 0) return [];
		if (outlineProgress >= 1) return squarePoints;

		// Trace linear interpolation steps across the 4 perimeter segments
		const totalSegments = 4;
		const segmentProgress = outlineProgress * totalSegments;
		const currentSegmentIdx = Math.floor(segmentProgress);
		const currentSegmentFactor = segmentProgress - currentSegmentIdx;

		const points = [];

		// Add complete tracking paths for traversed sections
		for (let i = 0; i <= currentSegmentIdx; i++) {
			points.push(squarePoints[i]);
		}

		// Calculate the real-time drawing position vector of the active segment line
		if (currentSegmentIdx < totalSegments) {
			const pStart = squarePoints[currentSegmentIdx];
			const pEnd = squarePoints[currentSegmentIdx + 1];

			const pActive = new Vector3().lerpVectors(pStart, pEnd, currentSegmentFactor);
			points.push(pActive);
		}

		return points;
	}

	const visibleOutline = $derived(getVisibleLinePoints());
</script>

<T.Group position={[0, 13, 0.1]} rotation={[0, 0, Math.PI / 2]}>
	{#if visibleOutline.length > 0}
		<T.Mesh>
			<MeshLineGeometry points={visibleOutline} shape="custom" />
			<MeshLineMaterial
				color={OUTLINE_COLOR}
				width={OUTLINE_WIDTH}
				transparent
				opacity={0.8}
				attenuate={false}
				depthTest={false}
				depthWrite={false}
			/>
		</T.Mesh>
	{/if}
</T.Group>

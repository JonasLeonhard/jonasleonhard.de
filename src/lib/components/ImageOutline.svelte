<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
	import { MediaQuery } from 'svelte/reactivity';

	interface Props {
		outlineProgress: number;
		imageFadeIn: number;
		isHovered: boolean;
		meshOffsetX: number;
		meshOffsetY: number;
		hoverScaleFactor: number;
	}

	const {
		outlineProgress,
		imageFadeIn = 0,
		isHovered = false,
		meshOffsetX = 0,
		meshOffsetY = 0,
		hoverScaleFactor = 1.0
	}: Props = $props();

	const OUTLINE_COLOR = '#00ffff';
	const OUTLINE_WIDTH = 1.5;

	const isDesktop = new MediaQuery('(min-width: 1140px)');
	const startSize = $derived(isDesktop.current ? 135.0 : 90.0);
	const targetSize = $derived(isDesktop.current ? 225.0 : 135.0);

	const currentWidth = $derived(
		(startSize + (targetSize - startSize) * imageFadeIn) * hoverScaleFactor
	);
	const currentHeight = $derived(
		(startSize + (targetSize - startSize) * imageFadeIn) * hoverScaleFactor
	);

	const squarePoints = $derived.by(() => {
		const w = currentWidth / 2.0;
		const h = currentHeight / 2.0;

		return [
			new Vector3(-w, -h, 0),
			new Vector3(w, -h, 0),
			new Vector3(w, h, 0),
			new Vector3(-w, h, 0),
			new Vector3(-w, -h, 0)
		];
	});

	function getVisibleLinePoints(progress: number, pointsSource: Vector3[]) {
		if (progress <= 0) return [];
		if (progress >= 1) return pointsSource;

		const totalSegments = 4;
		const segmentProgress = progress * totalSegments;
		const currentSegmentIdx = Math.floor(segmentProgress);
		const currentSegmentFactor = segmentProgress - currentSegmentIdx;

		const points = [];

		for (let i = 0; i <= currentSegmentIdx; i++) {
			points.push(pointsSource[i]);
		}

		if (currentSegmentIdx < totalSegments) {
			const pStart = pointsSource[currentSegmentIdx];
			const pEnd = pointsSource[currentSegmentIdx + 1];

			const pActive = new Vector3().lerpVectors(pStart, pEnd, currentSegmentFactor);
			points.push(pActive);
		}

		return points;
	}

	const visibleOutline = $derived(getVisibleLinePoints(outlineProgress, squarePoints));
</script>

<T.Group position={[meshOffsetX, 13 + meshOffsetY, 0.1]} rotation={[0, 0, Math.PI / 2]}>
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

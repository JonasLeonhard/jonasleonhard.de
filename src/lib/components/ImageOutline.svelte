<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3, CatmullRomCurve3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';

	interface Props {
		outlineProgress: number;
	}

	const { outlineProgress }: Props = $props();

	const OUTLINE_COLOR = '#00ffff';
	const OUTLINE_WIDTH = 2;
	const PLANE_WIDTH = 135;
	const PLANE_HEIGHT = 135;

	// Create a spline for a more interesting outline shape
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

<T.Group position={[0, 13, 0]} rotation={[0, 0, Math.PI / 2]}>
	<!-- Outline animation -->
	{#if visibleOutline.length > 0}
		<T.Mesh>
			{#key visibleOutline.length}
				<MeshLineGeometry points={visibleOutline} shape="custom" />
			{/key}
			<MeshLineMaterial
				color={OUTLINE_COLOR}
				width={OUTLINE_WIDTH}
				transparent
				opacity={1}
				attenuate={false}
			/>
		</T.Mesh>
	{/if}
</T.Group>

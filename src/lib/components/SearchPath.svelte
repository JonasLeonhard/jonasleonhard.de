<script lang="ts">
	import { onMount } from 'svelte';
	interface Props {
		searchTerm: string;
	}
	let { searchTerm }: Props = $props();
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let isAnimating = $state(false);
	let previousSearchTerm = '';
	let animationFrame: number | undefined;

	const GRID_SIZE = 24;
	const CELL_SIZE = 12;
	const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
	const ANIMATION_DELAY = 25;
	const START_POS: [number, number] = [Math.floor(GRID_SIZE / 2), GRID_SIZE - 4];
	const END_POS: [number, number] = [Math.floor(GRID_SIZE / 2), 2];

	type Position = [number, number];
	type PathSegment = {
		pos: Position;
		type: 'main' | 'dead';
	};

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	function generatePath(): PathSegment[] {
		const segments: PathSegment[] = [];
		let currentPos: Position = [...START_POS];

		while (currentPos[1] > END_POS[1] + 1) {
			// Stop one cell before the end point
			const moveUp = Math.random() < 0.7;
			const newPos: Position = [...currentPos];

			if (moveUp) {
				newPos[1]--;
			} else {
				newPos[0] += Math.random() < 0.5 ? -1 : 1;
				newPos[0] = Math.max(2, Math.min(GRID_SIZE - 3, newPos[0]));
			}

			segments.push({ pos: newPos, type: 'main' });
			currentPos = newPos;

			if (Math.random() < 0.15) {
				const deadPos: Position = [
					currentPos[0] + (Math.random() < 0.5 ? -1 : 1),
					currentPos[1] + (Math.random() < 0.5 ? -1 : 1)
				];

				if (
					deadPos[0] >= 0 &&
					deadPos[0] < GRID_SIZE &&
					deadPos[1] >= 0 &&
					deadPos[1] < GRID_SIZE &&
					!(deadPos[0] === END_POS[0] && deadPos[1] === END_POS[1]) // Don't create dead ends on end point
				) {
					segments.push({ pos: deadPos, type: 'dead' });
				}
			}
		}

		// Add final horizontal segments to align with end point's X position, but stop one cell below
		while (currentPos[0] !== END_POS[0]) {
			const step = currentPos[0] < END_POS[0] ? 1 : -1;
			currentPos = [currentPos[0] + step, currentPos[1]];
			segments.push({ pos: currentPos, type: 'main' });
		}

		return segments;
	}

	function drawEndpoints() {
		if (!ctx) return;
		// Draw start point (red)
		ctx.fillStyle = '#ef4444';
		ctx.shadowColor = '#ef4444';
		ctx.shadowBlur = 4;
		ctx.fillRect(START_POS[0] * CELL_SIZE, START_POS[1] * CELL_SIZE, CELL_SIZE, CELL_SIZE);

		// Draw end point (green)
		ctx.fillStyle = '#22c55e';
		ctx.shadowColor = '#22c55e';
		ctx.shadowBlur = 4;
		ctx.fillRect(END_POS[0] * CELL_SIZE, END_POS[1] * CELL_SIZE, CELL_SIZE, CELL_SIZE);

		ctx.shadowBlur = 0;
		ctx.shadowColor = 'transparent';
	}

	function clearCanvas() {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawEndpoints();
	}

	async function drawDefaultPath() {
		if (!ctx) return;
		clearCanvas();

		const segments = generatePath();
		for (const segment of segments) {
			const [x, y] = segment.pos;
			if (segment.type === 'main') {
				ctx.fillStyle = '#9ca3af'; // gray-400
				ctx.shadowColor = '#9ca3af';
				ctx.shadowBlur = 4;
			} else {
				ctx.fillStyle = '#6b7280'; // gray-500
				ctx.shadowBlur = 0;
			}
			ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			await sleep(ANIMATION_DELAY);
		}

		ctx.shadowBlur = 0;
	}

	async function animatePath() {
		if (isAnimating || !ctx) return;
		isAnimating = true;
		clearCanvas();

		const segments = generatePath();
		for (const segment of segments) {
			const [x, y] = segment.pos;
			if (segment.type === 'main') {
				ctx.fillStyle = '#eab308'; // yellow-500
				ctx.shadowColor = '#eab308';
				ctx.shadowBlur = 4;
			} else {
				ctx.fillStyle = '#ca8a04'; // yellow-600
				ctx.shadowBlur = 0;
			}
			ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			await sleep(ANIMATION_DELAY);
		}

		ctx.shadowBlur = 0;
		isAnimating = false;
	}

	let isDebouncing = false;

	$effect(() => {
		if (searchTerm === previousSearchTerm) return;
		previousSearchTerm = searchTerm;

		if (isDebouncing || isAnimating) return;

		isDebouncing = true;
		setTimeout(() => {
			isDebouncing = false;
			if (searchTerm.trim()) {
				animatePath();
			} else {
				drawDefaultPath();
			}
		}, 50);
	});

	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext('2d', { alpha: true })!;
		if (!ctx) return;

		clearCanvas();
		if (searchTerm?.trim()) {
			animatePath();
		} else {
			drawDefaultPath();
		}

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});
</script>

<canvas bind:this={canvas} width={CANVAS_SIZE} height={CANVAS_SIZE} class="mx-auto mb-4"></canvas>

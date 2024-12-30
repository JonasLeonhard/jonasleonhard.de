<script lang="ts">
	import { onMount } from 'svelte';

	type Position = { x: number; y: number };
	type PathCell = { pos: Position; type: 'main' | 'dead' };
	type Path = {
		cells: PathCell[];
		currentIndex: number;
		isActive: boolean;
	};

	const CONFIG = {
		GRID: {
			SIZE: 24,
			CELL_SIZE: 12
		},
		CANVAS_SIZE: 288, // 24 * 12
		MAX_PATHS: 3,
		ANIMATION_INTERVAL: 10,
		POSITIONS: {
			START: { x: 12, y: 20 } as Position,
			END: { x: 12, y: 2 } as Position
		},
		COLORS: {
			START: '#ef4444',
			END: '#22c55e',
			PATH: {
				ACTIVE: { MAIN: '#eab308', DEAD: '#ca8a04' },
				INACTIVE: { MAIN: '#9ca3af', DEAD: '#6b7280' }
			}
		}
	} as const;

	let { searchTerm } = $props();
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let paths: Path[] = [];
	let animationInterval: Timer | undefined;
	let previousTerm = '';

	function isEndpoint(pos: Position): boolean {
		const { START, END } = CONFIG.POSITIONS;
		return (pos.x === START.x && pos.y === START.y) || (pos.x === END.x && pos.y === END.y);
	}

	function isValidPosition(pos: Position): boolean {
		const { SIZE } = CONFIG.GRID;
		return pos.x >= 0 && pos.x < SIZE && pos.y >= 0 && pos.y < SIZE && !isEndpoint(pos);
	}

	function generatePath(): PathCell[] {
		const cells: PathCell[] = [];
		let pos = { ...CONFIG.POSITIONS.START };

		// Move up first
		pos = { ...pos, y: pos.y - 1 };
		cells.push({ pos: { ...pos }, type: 'main' });

		// Random initial horizontal movement
		if (Math.random() < 0.8) {
			const direction = Math.random() < 0.5 ? -1 : 1;
			const newPos = { x: pos.x + direction, y: pos.y };
			if (!isEndpoint(newPos)) {
				pos = newPos;
				cells.push({ pos: { ...pos }, type: 'main' });
			}
		}

		// Generate main path
		while (pos.y > CONFIG.POSITIONS.END.y + 1) {
			// Decide movement direction
			const moveUp = Math.random() < 0.7;
			const newPos = moveUp
				? { ...pos, y: pos.y - 1 }
				: {
						x: Math.max(2, Math.min(CONFIG.GRID.SIZE - 3, pos.x + (Math.random() < 0.5 ? -1 : 1))),
						y: pos.y
					};

			if (!isEndpoint(newPos)) {
				cells.push({ pos: newPos, type: 'main' });
				pos = newPos;

				// Add occasional dead ends
				if (Math.random() < 0.15) {
					const deadEnd = {
						x: pos.x + (Math.random() < 0.5 ? -1 : 1),
						y: pos.y + (Math.random() < 0.5 ? -1 : 1)
					};
					if (isValidPosition(deadEnd)) {
						cells.push({ pos: deadEnd, type: 'dead' });
					}
				}
			}
		}

		// Align with endpoint
		while (pos.x !== CONFIG.POSITIONS.END.x) {
			const step = pos.x < CONFIG.POSITIONS.END.x ? 1 : -1;
			const newPos = { x: pos.x + step, y: pos.y };
			if (!isEndpoint(newPos)) {
				cells.push({ pos: newPos, type: 'main' });
				pos = newPos;
			}
		}

		return cells;
	}

	function drawCell(pos: Position, color: string, glow = 0) {
		if (!ctx) return;

		ctx.fillStyle = color;
		ctx.shadowColor = glow > 0 ? color : 'transparent';
		ctx.shadowBlur = glow;

		const { CELL_SIZE } = CONFIG.GRID;
		ctx.fillRect(pos.x * CELL_SIZE, pos.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	}

	function drawEndpoints() {
		const { START, END } = CONFIG.POSITIONS;
		const { COLORS } = CONFIG;
		drawCell(START, COLORS.START, 4);
		drawCell(END, COLORS.END, 4);
		ctx.shadowBlur = 0;
	}

	function drawPaths() {
		if (!ctx) return;

		// Clear and draw endpoints
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawEndpoints();

		// Draw all paths
		paths.forEach((path) => {
			path.cells
				.slice(0, path.currentIndex)
				.filter((cell) => !isEndpoint(cell.pos))
				.forEach((cell) => {
					const colors = path.isActive ? CONFIG.COLORS.PATH.ACTIVE : CONFIG.COLORS.PATH.INACTIVE;
					const color = cell.type === 'main' ? colors.MAIN : colors.DEAD;
					const glow = cell.type === 'main' ? (path.isActive ? 4 : 2) : 0;
					drawCell(cell.pos, color, glow);
				});
		});
	}

	function startNewPath() {
		// Clear existing animation
		if (animationInterval) {
			clearInterval(animationInterval);
		}

		// Deactivate existing paths
		paths = paths.map((path) => ({ ...path, isActive: false }));

		const newPath: Path = {
			cells: generatePath(),
			currentIndex: 0,
			isActive: true
		};

		paths = [...paths.slice(-(CONFIG.MAX_PATHS - 1)), newPath];

		// Start animation
		animationInterval = setInterval(() => {
			const activePath = paths.find((p) => p.isActive);
			if (activePath && activePath.currentIndex < activePath.cells.length) {
				activePath.currentIndex++;
				drawPaths();
			} else {
				clearInterval(animationInterval);
			}
		}, CONFIG.ANIMATION_INTERVAL);
	}

	$effect(() => {
		if (searchTerm === previousTerm) return;
		previousTerm = searchTerm;
		startNewPath();
	});

	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext('2d', { alpha: true })!;
		if (!ctx) return;

		startNewPath();

		return () => {
			if (animationInterval) {
				clearInterval(animationInterval);
			}
		};
	});
</script>

<canvas
	bind:this={canvas}
	width={CONFIG.CANVAS_SIZE}
	height={CONFIG.CANVAS_SIZE}
	class="mx-auto mb-4"
></canvas>

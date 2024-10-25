<script lang="ts">
	type Item = {
		text: string;
		href?: string;
	};

	interface Props {
		items: Item[];
	}

	const { items }: Props = $props();
</script>

{#snippet pacMan()}
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="pacman w-5" viewBox="0 0 300 300">
		<!-- Create an arc covering 45°, so there's a little overlap with an animation of 30° -->
		<path
			class="pacman-mouth-bottom"
			d="
    M 150,150
    L 220.4,221.0
    A 100 100 0 0 0 250,150
    Z"
		/>
		<path
			class="pacman-mouth-top"
			d="
    M 150,150
    L 220.4,79.0
    A 100 100 0 0 1 250,150
    Z"
		/>
		<path
			class="pacman-open"
			d="
    M 150,150
    L 236.6,100
    A 100 100 0 1 0 236.6,200
    Z"
		/>
	</svg>
{/snippet}

{#snippet blinky()}
	<svg class="w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<!-- Ghost body -->
		<path
			d="M15,60 Q15,30 50,30 Q85,30 85,60 L85,75 Q85,80 80,80 L75,75 L70,80 L65,75 L60,80 L55,75 L50,80 L45,75 L40,80 L35,75 L30,80 L25,75 L20,80 Q15,80 15,75 Z"
			fill="#FF0000"
		/>
		<!-- Eyes -->
		<circle cx="35" cy="50" r="8" fill="white" />
		<circle cx="65" cy="50" r="8" fill="white" />
		<circle cx="35" cy="50" r="4" fill="blue" />
		<circle cx="65" cy="50" r="4" fill="blue" />
	</svg>
{/snippet}

{#snippet pinky()}
	<svg class="w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<!-- Ghost body -->
		<path
			d="M15,60 Q15,30 50,30 Q85,30 85,60 L85,75 Q85,80 80,80 L75,75 L70,80 L65,75 L60,80 L55,75 L50,80 L45,75 L40,80 L35,75 L30,80 L25,75 L20,80 Q15,80 15,75 Z"
			fill="#FFB8FF"
		/>
		<!-- Eyes -->
		<circle cx="35" cy="50" r="8" fill="white" />
		<circle cx="65" cy="50" r="8" fill="white" />
		<circle cx="35" cy="50" r="4" fill="blue" />
		<circle cx="65" cy="50" r="4" fill="blue" />
	</svg>
{/snippet}

{#snippet inky()}
	<svg class="w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<!-- Ghost body -->
		<path
			d="M15,60 Q15,30 50,30 Q85,30 85,60 L85,75 Q85,80 80,80 L75,75 L70,80 L65,75 L60,80 L55,75 L50,80 L45,75 L40,80 L35,75 L30,80 L25,75 L20,80 Q15,80 15,75 Z"
			fill="#00FFFF"
		/>
		<!-- Eyes -->
		<circle cx="35" cy="50" r="8" fill="white" />
		<circle cx="65" cy="50" r="8" fill="white" />
		<circle cx="35" cy="50" r="4" fill="blue" />
		<circle cx="65" cy="50" r="4" fill="blue" />
	</svg>
{/snippet}

{#snippet clyde()}
	<svg class="w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<!-- Ghost body -->
		<path
			d="M15,60 Q15,30 50,30 Q85,30 85,60 L85,75 Q85,80 80,80 L75,75 L70,80 L65,75 L60,80 L55,75 L50,80 L45,75 L40,80 L35,75 L30,80 L25,75 L20,80 Q15,80 15,75 Z"
			fill="#FFB852"
		/>
		<!-- Eyes -->
		<circle cx="35" cy="50" r="8" fill="white" />
		<circle cx="65" cy="50" r="8" fill="white" />
		<circle cx="35" cy="50" r="4" fill="blue" />
		<circle cx="65" cy="50" r="4" fill="blue" />
	</svg>
{/snippet}

{#snippet liItem(item: Item, index: number)}
	<li class="inline-flex items-center">
		<a
			href={item.href}
			class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400"
			class:dark:hover:text-white={item.href}
			class:hover:text-blue-600={item.href}
		>
			{#if index === 0}
				{@render pacMan()}
			{:else if index === 1}
				{@render blinky()}
			{:else if index === 2}
				{@render pinky()}
			{:else if index === 3}
				{@render inky()}
			{:else if index === 4}
				{@render clyde()}
			{:else}
				/
			{/if}
			{item.text}
		</a>
	</li>
{/snippet}

<nav class="flex" aria-label="Breadcrumb">
	<ol class="pacman inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
		{#each items as item, index}
			{@render liItem(item, index)}
		{/each}
	</ol>
</nav>

<style>
	.pacman-open,
	.pacman-mouth-top,
	.pacman-mouth-bottom {
		fill: gold;
	}

	.pacman-mouth-top,
	.pacman-mouth-bottom {
		transform-origin: calc(300px / 2) 150px;
	}
	.pacman-mouth-top {
		transform: rotate(-30deg);
	}
	.pacman-mouth-bottom {
		transform: rotate(30deg);
	}

	.pacman:hover {
		.pacman-mouth-top,
		.pacman-mouth-bottom {
			animation-duration: 175ms;
			animation-timing-function: linear;
			animation-direction: alternate;
			animation-iteration-count: infinite;
		}
		.pacman-mouth-top {
			animation-name: rotate-counterclockwise;
		}
		.pacman-mouth-bottom {
			animation-name: rotate-clockwise;
		}
	}

	@keyframes rotate-counterclockwise {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-30deg);
		}
	}
	@keyframes rotate-clockwise {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(30deg);
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { useLink } from '$lib';

	type Item = {
		text: string;
		href?: string;
	};

	let items = $derived(generateBreadcrumbs($page.url.pathname));

	function generateBreadcrumbs(path: string): Item[] {
		const segments = path.split('/').filter((el) => el);

		return segments.reduce(
			(acc, segment, index) => {
				acc.push({
					text: segment,
					href:
						index === segments.length - 1 ? undefined : `/${segments.slice(0, index + 1).join('/')}` // the last item is the current page and should not have a href
				});

				return acc;
			},
			[
				{
					text: $page.url.pathname === '/' ? 'hi!' : 'jonas',
					href: segments.length > 0 ? '/' : undefined
				} as Item
			]
		);
	}
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
	<svg class="mr-1 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
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
	<svg class="mr-1 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
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
	<svg class="mr-1 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
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
	<svg class="mr-1 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
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
	<li class="inline-flex flex-wrap items-center">
		{#if item.href}
			<a
				use:useLink
				href={item.href}
				class="inline-flex w-full items-center text-ellipsis text-sm font-medium"
				class:hover:dark:text-accent={item.href}
				class:hover:underline={item.href}
				class:hover:text-accent={item.href}
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
		{:else}
			<div
				class="inline-flex w-full items-center text-ellipsis text-sm font-medium"
				class:hover:dark:text-accent={item.href}
				class:hover:underline={item.href}
				class:hover:text-accent={item.href}
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
			</div>
		{/if}
	</li>
{/snippet}

<nav class="flex" aria-label="Breadcrumb">
	<ol class="pacman inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
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

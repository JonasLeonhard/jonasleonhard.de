<script lang="ts">
	import { MouseDrag } from '$lib';
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';

	// Initialize as undefined to prevent initial render
	let darkMode: boolean | undefined = undefined;

	onMount(() => {
		// Set initial state only after mount
		darkMode =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
	});

	const onSwitchTheme = () => {
		if (darkMode !== undefined) {
			// Type safety check
			darkMode = !darkMode;
			localStorage.setItem('theme', darkMode ? 'dark' : 'light');
			if (darkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	};
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	</script>
</svelte:head>

<MouseDrag>
	<button
		class="flex justify-center items-center h-8 w-8"
		onclick={onSwitchTheme}
		id="theme-toggle"
		title="Toggle Theme"
		aria-label="Change Theme"
	>
		<Moon id="theme-toggle--light" />
		<Sun id="theme-toggle--dark" />
	</button>
	<label for="theme-toggle"></label>
</MouseDrag>

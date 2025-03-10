import type { Action } from 'svelte/action';

/**
 * Options for the stickyProgress action
 */
interface StickyProgressOptions {
	/** Callback function with progress value (0-1) */
	onProgress: (progress: number) => void;
}

/**
 * Svelte action that tracks scroll progress through a sticky section
 *
 * @param node - The sticky element
 * @param options - Configuration options
 * @returns Svelte action object
 */
export const useStickyProgress: Action<HTMLElement, StickyProgressOptions> = (
	node,
	options = { onProgress: () => {} }
) => {
	const calculateProgress = (): void => {
		const stickyParent = node.parentElement;
		if (!stickyParent) return;

		// Get the sticky parent position and dimensions
		const sectionRect = stickyParent.getBoundingClientRect();
		const sectionTop = sectionRect.top;
		const sectionHeight = sectionRect.height;
		const viewportHeight = window.innerHeight;

		// Calculate how much of the section has been scrolled (0-1)
		const rawProgress = -sectionTop / (sectionHeight - viewportHeight);
		const progress = Math.min(Math.max(0, rawProgress), 1);

		options.onProgress(progress);
	};

	$effect(() => {
		calculateProgress();

		window.addEventListener('scroll', calculateProgress);

		return () => {
			window.removeEventListener('scroll', calculateProgress);
		};
	});
};

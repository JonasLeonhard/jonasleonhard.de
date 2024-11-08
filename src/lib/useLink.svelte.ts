import { goto } from '$app/navigation';
import type { Action } from 'svelte/action';

/**
 * Enhances a native link component by providing the following:
 * 1. Navigate on press, not release -> https://x.com/ID_AA_Carmack/status/1787850053912064005
 * 		- this will cause about ~100ms faster response times, you can test your time here: http://instantclick.io/click-test
 */
export const useLink: Action<HTMLAnchorElement> = (link) => {
	const handleMouseDown = (e: Event) => {
		const href = link.getAttribute('href');
		if (!href) return;
		e.preventDefault();

		const url = new URL(String(link.href), window.location.href);
		if (url.origin === window.location.origin) {
			goto(href);
		} else {
			const target = link.getAttribute('target');
			window.open(href, target || undefined, target === '_blank' ? 'noopener noreferrer' : '');
		}
	};

	$effect(() => {
		link.addEventListener('mousedown', handleMouseDown);

		return () => {
			link.removeEventListener('mousedown', handleMouseDown);
		};
	});
};

<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { MouseDrag } from '$lib';
	import { toast } from 'svelte-sonner';

	interface Props {
		clipboard: string;
		copy?: Snippet;
		copied?: Snippet;
		toastMsg?: string;
	}

	const { copy, copied, clipboard, toastMsg }: Props = $props();

	let copiedToClipboard = $state(false);

	const onCopyToClipboard = () => {
		navigator.clipboard.writeText(clipboard);
		copiedToClipboard = true;
		// @ts-expect-error type works
		toast(toastMsg || 'Copied to Clipboard: ', { icon: copy, description: clipboard });

		setTimeout(() => {
			copiedToClipboard = false;
		}, 2000);
	};
</script>

<MouseDrag>
	<button class="relative flex h-8 w-8 items-center justify-center" onclick={onCopyToClipboard}>
		{#if copiedToClipboard}
			<div class="absolute top-[50%] -translate-y-[50%]" transition:scale>
				{@render copied?.()}
			</div>
		{:else}
			<div class="absolute top-[50%] -translate-y-[50%]" transition:scale>
				{@render copy?.()}
			</div>
		{/if}
	</button>
</MouseDrag>

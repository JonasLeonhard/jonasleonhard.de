<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { MouseDrag } from '$lib';

	interface Props {
		clipboard: string;
		copy?: Snippet;
		copied?: Snippet;
	}

	const { copy, copied, clipboard }: Props = $props();

	let copiedToClipboard = $state(false);

	const onCopyToClipboard = () => {
		navigator.clipboard.writeText(clipboard);
		copiedToClipboard = true;

		setTimeout(() => {
			copiedToClipboard = false;
		}, 2000);
	};
</script>

<MouseDrag>
	<button class="flex justify-center items-center relative h-8 w-8" onclick={onCopyToClipboard}>
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

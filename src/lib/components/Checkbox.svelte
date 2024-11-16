<script lang="ts">
	import { scale } from 'svelte/transition';

	interface Props {
		label: string;
		checked?: boolean;
	}

	let { label, checked = $bindable(false), ...rest }: Props = $props();
</script>

<label class="inline-flex cursor-pointer items-center gap-2">
	<input bind:checked {...rest} type="checkbox" class="hidden" />
	<div class="flex h-5 w-5 items-center justify-center border border-muted-foreground">
		{#if checked}
			<div class="h-3 w-3 bg-foreground" transition:scale={{ duration: 150 }}></div>
		{/if}
	</div>

	<span
		class="relative after:absolute after:left-0 after:-z-10 after:h-full after:bg-accent after:transition-[width]"
		class:after:w-full={checked}
		class:after:w-0={!checked}
	>
		{label}
	</span>
</label>

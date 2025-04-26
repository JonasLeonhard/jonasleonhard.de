<script lang="ts">
	import { useLink } from '$lib';
	import { MoveRight } from 'lucide-svelte';
	import { tv } from 'tailwind-variants';

	interface Props {
		class?: string;
		name: string;
		description: string;
		href: string;
		cta: string;
	}
	const bentoCard = tv({
		base: 'group border-muted-foreground/50 hover:border-muted-foreground relative col-span-3 flex max-w-(--breakpoint-lg) flex-col border transition-all duration-1000'
	});

	let { class: className = '', name, description, href, cta }: Props = $props();
</script>

<a {href} use:useLink class={bentoCard({ class: className })}>
	<MoveRight
		class="absolute top-8 right-12 z-10 transition-all duration-500 group-hover:right-8 group-hover:opacity-0"
	/>
	<h3 class="z-10 mb-2 max-w-[calc(100%-32px)] pt-8 pr-8 pl-8 font-mono text-3xl">{name}</h3>

	<div
		class="pointer-events-none z-10 mt-auto flex transform-gpu flex-col gap-1 p-8 transition-all duration-300 group-hover:-translate-y-10"
	>
		<p class="max-h-[200px] max-w-lg overflow-hidden text-neutral-400">
			{description.length > 200 ? description.slice(0, 200) + '…' : description}
		</p>
	</div>

	<div
		class={tv({
			base: 'pointer-events-none absolute bottom-0 z-10 ml-2.5 flex w-max translate-y-10 transform-gpu flex-row items-center justify-center gap-2 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
		})()}
	>
		{cta}
		<MoveRight />
	</div>
</a>

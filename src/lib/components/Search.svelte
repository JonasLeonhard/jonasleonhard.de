<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { MouseDrag } from '$lib';
	import { X } from 'lucide-svelte';

	// INFO: shouldScaleBackground uses data-vaul-drawer-wrapper in our main layout file to scale the whole page
	import * as Drawer from '$lib/components/ui/drawer';

	let isOpen = $state(false);
	let pagefindLoaded = $state(false); // on the first isOpen, load pagefind

	async function loadPagefind(open: boolean, loaded: boolean) {
		if (!open || loaded) {
			return;
		}

		await import('@pagefind/default-ui/css/ui.css');
		// @ts-expect-error error pagefind loading
		const { PagefindUI } = await import('@pagefind/default-ui');
		new PagefindUI({
			baseUrl: import.meta.env.BASE_URL,
			bundlePath: '/pagefind/', // we copy the last pagefind build to the public path. This allows us to use the last pagefind once we ran package.json: postbuild atleast once
			element: '#search__content',
			showSubResults: true
		});
	}

	$effect(() => {
		loadPagefind(isOpen, pagefindLoaded);
	});
</script>

<Drawer.Root shouldScaleBackground onOpenChange={(open) => (isOpen = open)}>
	<Drawer.Trigger>
		<div class="flex h-8 w-8 items-center justify-center">
			<MouseDrag>
				<Search />
			</MouseDrag>
		</div>
	</Drawer.Trigger>

	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
			<Drawer.Description>This action cannot be undone.</Drawer.Description>
		</Drawer.Header>

		<div class="h-[30vh] overflow-y-auto">
			<div id="search__content"></div>
		</div>

		<Drawer.Footer>
			<Drawer.Close class="m-auto flex w-max items-center justify-center gap-2">
				<span>Cancel</span>
				<X />
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>

<script>
	import { page } from '$app/stores';
	import { BatteryWarning } from 'lucide-svelte';
</script>

<div
	class="fixed top-[50%] left-[50%] container mx-auto flex w-full -translate-x-[50%] flex-row justify-center gap-4"
>
	<BatteryWarning />
	<h1><span class="text-accent">{$page.status}</span> {$page.error?.message}</h1>
</div>

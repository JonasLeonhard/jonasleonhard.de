<script>
	import { page } from '$app/stores';
	import { BatteryWarning } from 'lucide-svelte';
</script>

<div
	class="container fixed left-[50%] top-[50%] mx-auto flex w-full -translate-x-[50%] flex-row justify-center gap-4"
>
	<BatteryWarning />
	<h1><span class="text-accent">{$page.status}</span> {$page.error?.message}</h1>
</div>

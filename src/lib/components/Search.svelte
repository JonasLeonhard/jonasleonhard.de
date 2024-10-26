<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { MouseDrag } from '$lib';
</script>

<MouseDrag>
	<div class="flex h-8 w-8 items-center justify-center" title="Search">
		<Search />
	</div>
</MouseDrag>

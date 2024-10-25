<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { MouseDrag } from '$lib';
</script>

<MouseDrag>
	<div class="flex justify-center items-center h-8 w-8" title="Search">
		<Search />
	</div>
</MouseDrag>

<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>Project description</p>
</section>

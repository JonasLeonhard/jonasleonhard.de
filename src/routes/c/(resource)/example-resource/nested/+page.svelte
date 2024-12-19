<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<h2>{data.metadata.title}</h2>
<p>description about subresource here</p>

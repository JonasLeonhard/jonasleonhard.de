<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>{data.metadata.description}</p>

	<a href="https://hero.handmade.network/" target="_blank"> Handmade Hero </a>
</section>

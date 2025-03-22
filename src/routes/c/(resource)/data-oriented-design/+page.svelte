<script lang="ts">
	let { data } = $props();
</script>

<section>
	<p>{data.metadata.description}</p>

	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/IroPQ150F6c?si=wet-osWrAOEjt0pR"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</section>

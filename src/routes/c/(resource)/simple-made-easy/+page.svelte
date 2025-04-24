<script lang="ts">
	let { data } = $props();
</script>

<section>
	<p>{data.metadata.description}</p>

	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/SxdOUGdseq4?si=g7Ief12TiUP9DCJX"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</section>

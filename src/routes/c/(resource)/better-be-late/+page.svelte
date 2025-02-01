<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>{data.metadata.description}</p>

	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/PqUjzXiDQ2A?si=ada4Xg4fO7Wfk58b"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</section>

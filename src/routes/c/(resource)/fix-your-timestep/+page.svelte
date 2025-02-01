<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>{data.metadata.description}</p>

	<a href="https://www.gafferongames.com/post/fix_your_timestep/" target="_blank">
		Fix Your Timestep!
	</a>
</section>

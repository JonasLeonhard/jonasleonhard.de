<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>{data.metadata.description}</p>

	<a href="https://github.com/ocornut/imgui/issues/7892">10 years of Dear ImGui (long post)</a>
</section>

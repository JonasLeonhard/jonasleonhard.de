<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>{data.metadata.description}</p>

	<ul>
		<li></li>
		<li>
			<a href="https://blog.mecheye.net/2020/06/modern-graphics-apis-1-intro/" target="_blank">
				The Missing Guide to Modern Graphics APIs
			</a>
		</li>
	</ul>
</section>

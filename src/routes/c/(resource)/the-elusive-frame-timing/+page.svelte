<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.metadata.title}</h2>
	<p>{data.metadata.description}</p>

	<ul>
		<li>
			<a
				href="https://medium.com/@alen.ladavac/the-elusive-frame-timing-168f899aec92"
				target="_blank"
			>
				The Elusive Frame Timing
			</a>
		</li>
	</ul>
</section>

<script lang="ts">
	let { data } = $props();
</script>

<section>
	<p>{data.metadata.description}</p>

	<ul>
		<li>
			<a href="https://threejs-journey.com/" target="_blank"> Threejs journey </a>
			<p>Course for threejs by Bruno Simon. It covers the following aspects about three.js:</p>
			<ul>
				<li>basics (scene, meshes, materials, animation, optimization)</li>
				<li>lights and shadows</li>
				<li>physics</li>
				<li>raycasting</li>
				<li>shaders</li>
			</ul>
			...and more... you should check out the course. It goes really in depth and is very well structured.
		</li>

		<li>
			<p>Simon also has a youtube channel where he builds his new portfolio:</p>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/sgIv5nlIjGk?si=AWQ17N5CrChbrv1w"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</li>

		<li>
			Another hidden champion in teaching threejs is <a
				href="https://www.youtube.com/@akella_"
				target="_blank">Yuri Artiukh.</a
			>
		</li>
	</ul>
</section>

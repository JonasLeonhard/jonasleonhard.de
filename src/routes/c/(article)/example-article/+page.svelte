<script lang="ts">
	import { MouseDrag, useLink } from '$lib';
	import { Home } from 'lucide-svelte';
	import someStaticImage from '$lib/assets/images/cover.png?enhanced';

	let { data } = $props();
</script>

<section>
	<p>{data.metadata.description}</p>

	<h2>Using a Svelte component</h2>
	<MouseDrag>
		<Home />
	</MouseDrag>
</section>

<section>
	<p># Using a Code prerendered html-code-block - look at +layout.server.ts</p>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.codeExample}
</section>

<section>
	<h1>Headlines</h1>
	<h2>This is a H2 Heading</h2>
	<h3>This is a H3 Heading</h3>
	<h4>This is a H4 Heading</h4>
	<h5>This is a H5 Heading</h5>
	<h6>This is a H6 Heading</h6>
</section>

<section>
	<h2>Horizontal Rules (you can chain them as often as you like to get a thicker line)</h2>
	<hr />
</section>

<section>
	<h2>Emphasis</h2>
	<strong>This is bold text</strong>
	<em>_This is italic text_</em>
	<del>~~Strikethrough~~</del>
</section>

<section>
	<h2>Lists</h2>

	<ul>
		<li>item</li>
		<li>item</li>
		<li>item</li>
		<li>item</li>
	</ul>

	<ol>
		<li>item</li>
		<li>item</li>
		<li>item</li>
		<li>item</li>
	</ol>
</section>

<section>
	<h2>Images</h2>
	<p>
		Images Static Image that will automatically be optimized by enhanced:img: `src/assets/images`
	</p>
	<enhanced:img src={someStaticImage} alt="describe what can be seeon here!" />
</section>

<section>
	<h2>Links</h2>
	<a use:useLink target="_blank" href="https://dyf-tfh.github.io/" referrerpolicy="no-referrer"
		>link</a
	>
</section>

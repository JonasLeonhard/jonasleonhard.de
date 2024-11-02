<script module lang="ts">
	import { type MetaData } from '$lib';

	export const metadata: MetaData = {
		title: 'Example Post',
		author: 'Jonas Leonhard',
		description:
			'Neovim - from basic setup, to advanced functionality, to writing your own config and plugins. The ultimate getting started guide.',
		publishDate: new Date('10 May 2024'),
		tags: ['neovim', 'lua'],
		coverImage: {
			src: '/src/assets/images/cover.png',
			alt: 'Neovim, from zero to hero cover'
		},
		draft: true
	};
</script>

<script lang="ts">
	import { MouseDrag } from '$lib';
	import { Home } from 'lucide-svelte';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<p>// Example markdown file</p>

<div>
	# Using a Svelte component
	<MouseDrag>
		<Home />
	</MouseDrag>
</div>

<div>
	# Using a Code prerendered html-code-block - look at +layout.server.ts
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.rendered.example.c1}
</div>

<h2>## This is a H2 Heading</h2>

<h3>### This is a H3 Heading</h3>

<h4>#### This is a H4 Heading</h4>

<h5>##### This is a H5 Heading</h5>

<h6>###### This is a H6 Heading</h6>

<p>## Horizontal Rules (you can chain them as often as you like to get a thicker line)</p>

<hr />

<p>## Emphasis</p>

<strong>This is bold text</strong>

<em>_This is italic text_</em>

<del>~~Strikethrough~~</del>

<p>
	## References An example containing a clickable reference[^1] with a link to the source. Second
	example containing a reference[^2] with a link to the source. [^1]: Reference first footnote with
	a return to content link. [^2]: Second reference with a link. If you check out this example in
	`src/content/post/markdown-elements/index.md`, you'll notice that the references and the heading
	"Footnotes" are added to the bottom of the page via the
	[remark-rehype](https://github.com/remarkjs/remark-rehype#options) plugin.
</p>

<p>## Lists Unordered</p>

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

<p>## Code</p>

<p>
	## Tables | Option | Description | | ------ |
	------------------------------------------------------------------------- | | data | path to data
	files to supply the data that will be passed into templates. | | engine | engine to be used for
	processing templates. Handlebars is the default. | | ext | extension to be used for dest files. |
	Right aligned columns | Option | Description | | -----: |
	------------------------------------------------------------------------: | | data | path to data
	files to supply the data that will be passed into templates. | | engine | engine to be used for
	processing templates. Handlebars is the default. | | ext | extension to be used for dest files. |
</p>

<p>
	## Images Static Image that will automatically be optimized by enhanced:img: `src/assets/images`
	<enhanced:img src="/src/assets/images/cover.png" alt="describe what can be seeon here!" />
</p>

<p>
	## Links

	<a target="_blank" href="https://dyf-tfh.github.io/" referrerpolicy="no-referrer">link</a>
</p>

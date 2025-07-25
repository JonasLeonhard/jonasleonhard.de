<script lang="ts">
	interface Props {
		src: string;
		title?: string;
		allow?: string;
		allowfullscreen?: boolean;
		referrerpolicy?: string;
		frameborder?: string;
	}

	const {
		src,
		title = 'Embedded video',
		allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
		allowfullscreen = true,
		referrerpolicy = 'strict-origin-when-cross-origin',
		frameborder = '0'
	}: Props = $props();
</script>

<div class="video-responsive">
	<iframe {src} {title} {frameborder} {allow} {referrerpolicy} {allowfullscreen}></iframe>
</div>

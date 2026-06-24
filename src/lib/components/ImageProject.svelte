<script lang="ts">
	import { onDestroy } from 'svelte';
	import { T, useTask, useThrelte } from '@threlte/core';
	import {
		Texture,
		TextureLoader,
		VideoTexture,
		Uniform,
		LinearFilter,
		ShaderMaterial,
		Vector2,
		Color
	} from 'three';
	import type { ProjectState } from '../../routes/+page.svelte';

	import vertexShader from '$lib/three/imageProjectVertex.glsl?raw';
	import fragmentShader from '$lib/three/imageProjectFragment.glsl?raw';
	import bgFragmentShader from '$lib/three/bgGridFragment.glsl?raw';

	interface Props {
		allProjects: Record<string, ProjectState>;
		imageFadeIn: number;
		imageFadeOut: number;
		scrollY: number;
	}
	const { allProjects, imageFadeIn = 0, imageFadeOut = 0, scrollY = 0 }: Props = $props();

	const PLANE_WIDTH = 135;
	const PLANE_HEIGHT = 135;

	// Simple un-warped pass-through vertex shader for fullscreen rendering
	const cleanBgVertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

	const { camera: activeCamera } = useThrelte();
	const textureLoader = new TextureLoader();

	const projectTextures = $state<Record<string, Texture>>({});
	const projectVideos = $state<Record<string, VideoTexture>>({});
	const activeVideoElements: HTMLVideoElement[] = [];

	let imageCurrent = $state<Texture | null>(null);
	let imageNext = $state<Texture | null>(null);
	let videoCurrent = $state<VideoTexture | null>(null);
	let videoNext = $state<VideoTexture | null>(null);
	let mixRatio = $state(0);

	let imageMaterial = $state<ShaderMaterial | null>(null);
	let bgMaterial = $state<ShaderMaterial | null>(null);

	let loadingTextures = $state(new Set<string>());
	let totalElapsedTime = 0;

	// Camera tracker states
	let bgTrackX = $state(0);
	let bgTrackY = $state(0);

	// Dynamic Resolution and Theme Trackers fed directly into WebGL
	const resolutionUniform = new Uniform(new Vector2(1920, 1080));
	const bgColorUniform = new Uniform(new Color('#ffffff'));

	let rawMouseX = 0.5;
	let rawMouseY = 0.5;
	const mouseUniform = new Uniform(new Vector2(0.5, 0.5));

	const placeholderVideos: Record<string, string> = {
		stPauli: 'https://vjs.zencdn.net/v/oceans.mp4',
		buerkert: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
		hapeko: 'https://vjs.zencdn.net/v/oceans.mp4',
		vw: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
		futurium: 'https://vjs.zencdn.net/v/oceans.mp4',
		zebra: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
		obi: 'https://vjs.zencdn.net/v/oceans.mp4'
	};

	function initVideoTexture(id: string, url: string) {
		if (projectVideos[id]) return;

		const video = document.createElement('video');
		video.crossOrigin = 'anonymous';
		video.src = url;
		video.loop = true;
		video.muted = true;
		video.playsInline = true;
		video.autoplay = true;
		video.setAttribute('webkit-playsinline', 'webkit-playsinline');
		video.setAttribute('preload', 'auto');

		activeVideoElements.push(video);

		video
			.play()
			.then(() => {
				const videoTex = new VideoTexture(video);
				videoTex.minFilter = LinearFilter;
				projectVideos[id] = videoTex;
			})
			.catch((err) => console.warn('Video waiting on user interaction: ', err));
	}

	useTask((delta) => {
		totalElapsedTime += delta;

		mouseUniform.value.x = mouseUniform.value.x + (rawMouseX - mouseUniform.value.x) * 0.08;
		mouseUniform.value.y = mouseUniform.value.y + (rawMouseY - mouseUniform.value.y) * 0.08;

		const cam = $activeCamera;
		if (cam) {
			bgTrackX = cam.position.x;
			bgTrackY = cam.position.y;
		}

		// Keep resolution and theme bindings synchronized perfectly without memory leaks
		if (typeof window !== 'undefined') {
			resolutionUniform.value.set(window.innerWidth, window.innerHeight);
			const computedBg = window.getComputedStyle(document.body).backgroundColor;
			bgColorUniform.value.setStyle(computedBg);
		}

		if (imageMaterial) imageMaterial.uniforms.time.value = totalElapsedTime;
		if (bgMaterial) bgMaterial.uniforms.time.value = totalElapsedTime;
	});

	function handlePointerMove(e: PointerEvent) {
		rawMouseX = e.clientX / window.innerWidth;
		rawMouseY = 1.0 - e.clientY / window.innerHeight;
	}

	$effect(() => {
		const projects = Object.entries(allProjects).toReversed();
		const activeProjectIdx = projects.findIndex(([, project]) => project.progress > 0);

		const [cId, currentProject] = projects.at(activeProjectIdx) || [];
		const [nId, nextProject] = projects.at(activeProjectIdx - 1) || [];

		if (cId && currentProject && !projectTextures[cId] && !loadingTextures.has(cId)) {
			loadingTextures.add(cId);
			textureLoader.load(currentProject.imagePath, (loaded) => {
				loaded.generateMipmaps = false;
				loaded.minFilter = LinearFilter;
				projectTextures[cId] = loaded;
				loadingTextures.delete(cId);
			});
		}
		if (nId && nextProject && !projectTextures[nId] && !loadingTextures.has(nId)) {
			loadingTextures.add(nId);
			textureLoader.load(nextProject.imagePath, (loaded) => {
				loaded.generateMipmaps = false;
				loaded.minFilter = LinearFilter;
				projectTextures[nId] = loaded;
				loadingTextures.delete(nId);
			});
		}

		if (cId && placeholderVideos[cId]) initVideoTexture(cId, placeholderVideos[cId]);
		if (nId && placeholderVideos[nId]) initVideoTexture(nId, placeholderVideos[nId]);

		imageCurrent = cId ? projectTextures[cId] || null : null;
		imageNext = nId ? projectTextures[nId] || null : null;
		videoCurrent = cId ? projectVideos[cId] || null : null;
		videoNext = nId ? projectVideos[nId] || null : null;

		if (cId && nId && currentProject) {
			const getMixRatio = (progress: number) => {
				if (progress <= 0.75) return 0;
				if (progress >= 1) return 1;
				return (progress - 0.75) / (1 - 0.75);
			};
			mixRatio = getMixRatio(currentProject.progress);
		} else {
			mixRatio = 0;
		}
	});

	onDestroy(() => {
		activeVideoElements.forEach((vid) => {
			vid.pause();
			vid.src = '';
			vid.load();
		});
	});
</script>

<svelte:window onpointermove={handlePointerMove} />

<T.Group position={[0, 13, 0]} rotation={[0, 0, Math.PI / 2]}>
	<T.Mesh position={[0, 0, 0]}>
		<T.PlaneGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
		<T.ShaderMaterial
			bind:ref={imageMaterial}
			transparent
			depthTest={false}
			depthWrite={false}
			{vertexShader}
			{fragmentShader}
			uniforms={{
				imageCurrent: new Uniform(null),
				imageNext: new Uniform(null),
				mixRatio: new Uniform(0.0),
				fadeIn: new Uniform(0.0),
				fadeOut: new Uniform(0.0),
				scrollY: new Uniform(0.0),
				time: new Uniform(0.0)
			}}
			uniforms.imageCurrent.value={imageCurrent}
			uniforms.imageNext.value={imageNext}
			uniforms.mixRatio.value={mixRatio}
			uniforms.fadeIn.value={imageFadeIn}
			uniforms.fadeOut.value={imageFadeOut}
			uniforms.scrollY.value={scrollY}
		/>
	</T.Mesh>
</T.Group>

<T.Mesh position={[bgTrackX, bgTrackY, -150]}>
	<T.PlaneGeometry args={[3000, 3000]} />
	<T.ShaderMaterial
		bind:ref={bgMaterial}
		transparent={false}
		depthTest={false}
		depthWrite={false}
		vertexShader={cleanBgVertexShader}
		fragmentShader={bgFragmentShader}
		uniforms={{
			time: new Uniform(0.0),
			fadeIn: new Uniform(0.0),
			fadeOut: new Uniform(0.0),
			mixRatio: new Uniform(0.0),
			videoCurrent: new Uniform(null),
			videoNext: new Uniform(null),
			uMouse: mouseUniform,
			uResolution: resolutionUniform,
			uBgColor: bgColorUniform
		}}
		uniforms.fadeIn.value={imageFadeIn}
		uniforms.fadeOut.value={imageFadeOut}
		uniforms.mixRatio.value={mixRatio}
		uniforms.videoCurrent.value={videoCurrent}
		uniforms.videoNext.value={videoNext}
	/>
</T.Mesh>

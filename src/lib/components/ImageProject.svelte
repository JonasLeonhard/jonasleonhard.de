<script lang="ts">
	import { T } from '@threlte/core';
	import { Texture, TextureLoader, Uniform } from 'three';
	import type { ProjectState } from '../../routes/+page.svelte';
	import vertexShader from '$lib/three/imageProjectVertex.glsl?raw';
	import fragmentShader from '$lib/three/imageProjectFragment.glsl?raw';

	interface Props {
		allProjects: Record<string, ProjectState>;
		imageFadeIn: number; // 0 to 1, first project image fade in
		imageFadeOut: number; // 0 to 1, last project image fade out
	}
	const { allProjects, imageFadeIn = 0, imageFadeOut = 0 }: Props = $props();

	// Plane size to match ImageOutline
	const PLANE_WIDTH = 135;
	const PLANE_HEIGHT = 135;

	const textureLoader = new TextureLoader();
	const projectTextures = $state<Record<string, Texture>>({});
	let imageCurrent = $state<Texture | null>(null);
	let imageNext = $state<Texture | null>(null);
	let mixRatio = $state(0); // 0 to 1

	$effect(() => {
		const projects = Object.entries(allProjects).toReversed();
		const activeProjectIdx = projects.findIndex(([_proj_id, project]) => project.progress > 0);

		const [cId, currentProject] = projects.at(activeProjectIdx) || [];
		const [nId, nextProject] = projects.at(activeProjectIdx - 1) || [];

		// 1. Load Textures
		if (cId && currentProject && !projectTextures[cId]) {
			textureLoader.load(currentProject.imagePath, (loaded) => {
				projectTextures[cId] = loaded;
			});
		}

		if (nId && nextProject && !projectTextures[nId]) {
			textureLoader.load(nextProject.imagePath, (loaded) => {
				projectTextures[nId] = loaded;
			});
		}

		if (cId) {
			imageCurrent = projectTextures[cId];
		}

		if (nId) {
			imageNext = projectTextures[nId];
		}

		// 2. Mix Ratio
		if (cId && nId && currentProject) {
			const getMixRatio = (progress: number) => {
				if (progress <= 0.75) {
					return 0;
				}
				if (progress >= 1) {
					return 1;
				}

				return (progress - 0.75) / (1 - 0.75);
			};
			mixRatio = getMixRatio(currentProject.progress);
		}
	});
</script>

<T.Group position={[0, 13, 0]} rotation={[0, 0, Math.PI / 2]}>
	<T.Mesh>
		<T.PlaneGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
		<T.ShaderMaterial
			transparent
			needsUpdate
			depthTest={false}
			depthWrite={false}
			{vertexShader}
			{fragmentShader}
			uniforms={{
				imageCurrent: new Uniform(null),
				imageNext: new Uniform(null),
				mixRatio: new Uniform(0.0),
				fadeIn: new Uniform(0.0),
				fadeOut: new Uniform(0.0)
			}}
			uniforms.imageCurrent.value={imageCurrent}
			uniforms.imageNext.value={imageNext}
			uniforms.mixRatio.value={mixRatio}
			uniforms.fadeIn.value={imageFadeIn}
			uniforms.fadeOut.value={imageFadeOut}
		/>
	</T.Mesh>
</T.Group>

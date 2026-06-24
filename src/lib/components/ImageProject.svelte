<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import {
		Texture,
		TextureLoader,
		LinearFilter,
		ShaderMaterial,
		Uniform,
		Raycaster,
		Vector2,
		Color
	} from 'three';
	import type { ProjectState } from '../../routes/+page.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	interface Props {
		allProjects: Record<string, ProjectState>;
		imageFadeIn: number;
		imageFadeOut: number;
		scrollY: number;
	}
	let { allProjects = $bindable(), imageFadeIn = 0, imageFadeOut = 0 }: Props = $props();

	const textureLoader = new TextureLoader();
	const { camera: activeCamera, scene } = useThrelte();
	const raycaster = new Raycaster();

	const projectTextureMap = $state<Record<string, Texture[]>>({});
	let loadingSet = new Set<string>();
	let textureTrigger = $state(0);

	let globalElapsedTime = 0;
	let transitionTimeline = $state(1.0);

	let rawMouseX = 0.5;
	let rawMouseY = 0.5;
	const smoothMouseUniform = new Vector2(0.5, 0.5);

	let activeKey = $state<string | null>(null);
	let siblingKey = $state<string | null>(null);
	let projectProgress = $state(0);
	let scrollTransitionMix = $state(0);

	let previousGalleryTex = $state<Texture | null>(null);
	let activeGalleryTex = $state<Texture | null>(null);

	let lastProcessedKey: string | null = null;
	let lastProcessedImgIdx: number = 0;

	let bgTrackX = $state(0);
	let bgTrackY = $state(0);

	const isDesktop = new MediaQuery('(min-width: 1140px)');
	const startSize = $derived(isDesktop.current ? 135.0 : 90.0);
	const targetSize = $derived(isDesktop.current ? 225.0 : 135.0);
	const currentCardSize = $derived(startSize + (targetSize - startSize) * imageFadeIn);

	const globalAlpha = $derived(imageFadeIn * (1.0 - imageFadeOut));

	const accentColorUniform = new Uniform(new Color('#ffaa00'));
	const foregroundColorUniform = new Uniform(new Color('#ffffff'));
	const backgroundColorUniform = new Uniform(new Color('#000000'));

	const consoleUniforms = {
		texCurrent: new Uniform(null),
		texNext: new Uniform(null),
		scrollMix: new Uniform(0.0),
		galleryFrom: new Uniform(null),
		galleryTo: new Uniform(null),
		galleryMix: new Uniform(1.0),
		opacity: new Uniform(0.0),
		uTime: new Uniform(0.0),
		uResolution: new Uniform(new Vector2(1, 1)),
		uMouse: new Uniform(smoothMouseUniform),
		uAccentColor: accentColorUniform
	};

	const bgCanvasUniforms = {
		scrollMix: new Uniform(0.0),
		galleryMix: new Uniform(1.0),
		opacity: new Uniform(0.0),
		uTime: new Uniform(0.0),
		uResolution: new Uniform(new Vector2(1, 1)),
		uMouse: new Uniform(smoothMouseUniform),
		uAccentColor: accentColorUniform,
		uForegroundColor: foregroundColorUniform,
		uBgColor: backgroundColorUniform
	};

	const consoleVertexShader = `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(uv.x * 2.0 + uTime * 0.5) * cos(uv.y * 2.0 + uTime * 0.4) * 1.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

	const consoleFragmentShader = `
        uniform sampler2D texCurrent;
        uniform sampler2D texNext;
        uniform float scrollMix;
        uniform sampler2D galleryFrom;
        uniform sampler2D galleryTo;
        uniform float galleryMix;
        uniform float opacity;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uAccentColor;
        varying vec2 vUv;

        float noise(vec2 co) {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec2 uv = vUv;
            vec2 textParallaxOffset = (uMouse - 0.5) * 0.005;
            vec2 affectedUv = uv + textParallaxOffset;

            float imageAspect = 1.0;
            float canvasAspect = uResolution.x / uResolution.y;
            if (canvasAspect > imageAspect) {
                affectedUv.y = 0.5 + (affectedUv.y - 0.5) * (imageAspect / canvasAspect);
            } else {
                affectedUv.x = 0.5 + (affectedUv.x - 0.5) * (canvasAspect / imageAspect);
            }

            float timeStep = floor(uTime * 15.0) / 15.0;
            float transitionWave = sin(galleryMix * 3.14159265);
            float rowSlice = step(0.95, noise(vec2(floor(affectedUv.y * 60.0), timeStep)));
            vec2 finalSampleUv = clamp(affectedUv + vec2((rowSlice * transitionWave * 0.04) + (sin(scrollMix * 3.1415) * rowSlice * 0.02), 0.0), 0.001, 0.999);

            float totalCa = 0.004 + (transitionWave * 0.012);
            vec3 colorBuffer = vec3(
                mix(texture2D(galleryFrom, finalSampleUv + vec2(totalCa, 0.0)), texture2D(galleryTo, finalSampleUv + vec2(totalCa, 0.0)), galleryMix).r,
                mix(texture2D(galleryFrom, finalSampleUv), texture2D(galleryTo, finalSampleUv), galleryMix).g,
                mix(texture2D(galleryFrom, finalSampleUv - vec2(totalCa, 0.0)), texture2D(galleryTo, finalSampleUv - vec2(totalCa, 0.0)), galleryMix).b
            );
            vec3 nextProj = texture2D(texNext, finalSampleUv).rgb;
            vec3 finalWorkColor = mix(colorBuffer, nextProj, scrollMix);

            float fineGridLines = sin(uv.y * 400.0) * cos(uv.x * 400.0);
            finalWorkColor.rgb += fineGridLines * 0.03;

            float outerFrameMask = smoothstep(0.497, 0.493, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
            finalWorkColor = mix(uAccentColor, finalWorkColor, outerFrameMask);

            gl_FragColor = vec4(finalWorkColor, opacity);
        }
    `;

	const bgCanvasFragmentShader = `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float galleryMix;
        uniform float scrollMix;
        uniform float opacity;
        uniform vec3 uAccentColor;
        uniform vec3 uForegroundColor;
        uniform vec3 uBgColor;
        varying vec2 vUv;

        const vec3 CYBER_BLUE_DEEP = vec3(0.0, 0.35, 0.85);
        const vec3 CYBER_BLUE_NEON = vec3(0.0, 0.80, 1.0);
        const vec3 CYBER_CYAN = vec3(0.0, 1.0, 0.85);

        float rand(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        float drawDataBitmask(vec2 uv, float seed) {
            vec2 p = clamp(uv, 0.05, 0.95);
            float customBarsWidth = step(0.3, fract(p.x * 6.0 + sin(seed * 0.5))) * step(0.25, p.y) * step(p.y, 0.75);
            float innerEmptySlot = step(0.45, p.x) * step(p.x, 0.55); 
            return clamp(customBarsWidth - innerEmptySlot, 0.0, 1.0);
        }

        float drawLogicWaveform(vec2 uv, float seed) {
            vec2 p = uv;
            float stepLine = step(0.5, sin(p.x * 3.1415 + seed));
            float normalizedStepHeight = mix(0.3, 0.7, stepLine);
            return step(normalizedStepHeight - 0.04, p.y) * step(p.y, normalizedStepHeight + 0.04);
        }

        void main() {
            vec2 rawUv = gl_FragCoord.xy / uResolution;
            
            // Subdued Barrel Fisheye
            vec2 ndc = rawUv * 2.0 - 1.0; 
            float lensRadiusSq = ndc.x * ndc.x + ndc.y * ndc.y;
            float distortionStrength = 0.08; 
            vec2 distortedNdc = ndc * (1.0 + distortionStrength * lensRadiusSq);
            vec2 screenUv = (distortedNdc + 1.0) * 0.5;

            float aspect = uResolution.x / uResolution.y;
            float slowCrawlTime = uTime * 0.12;
            float isLightMode = step(0.5, (uBgColor.r + uBgColor.g + uBgColor.b) / 3.0);

            // Kinetic Signal Surge Shockwaves
            vec2 cursorDiff = screenUv - uMouse;
            cursorDiff.x *= aspect;
            float distanceToCursor = length(cursorDiff);
            
            float cursorAngle = atan(cursorDiff.y, cursorDiff.x);
            float discreteSpikeNoise = rand(vec2(floor(cursorAngle * 24.0), floor(uTime * 14.0))) * 0.14;
            float irregularEnergyRadius = distanceToCursor + discreteSpikeNoise;

            float interactionActivity = sin(galleryMix * 3.1415) + sin(scrollMix * 3.1415);
            float globalCrackleLine = step(0.84, sin(screenUv.y * 14.0 + screenUv.x * 6.0 - uTime * 8.0 + discreteSpikeNoise * 3.5));
            float globalSurgeWave = globalCrackleLine * discreteSpikeNoise * (0.02 + interactionActivity * 3.2);
            float staticHoverForce = smoothstep(0.45, 0.0, distanceToCursor);

            // FIXED HORIZONTAL MOBILE COMPRESSION: Multiplies screen bounds by step factors to maintain square dimensions
            vec2 busUv = screenUv * vec2(40.0 * aspect, 40.0);
            vec2 busFraction = fract(busUv);
            vec2 busIndex = floor(busUv);
            
            float circuitWireX = step(0.97, busFraction.x) * step(rand(vec2(busIndex.x, 13.0)), 0.38);
            float circuitWireY = step(0.97, busFraction.y) * step(rand(vec2(17.0, busIndex.y)), 0.38);
            float diagonalTrace = step(0.96, 1.0 - abs(busFraction.x - busFraction.y)) * step(rand(busIndex), 0.12);
            float coreSiliconBusses = clamp(circuitWireX + circuitWireY + diagonalTrace, 0.0, 1.0);

            vec2 transistorGrid = screenUv * vec2(42.0 * aspect, 42.0);
            vec2 localGateUv = fract(transistorGrid);
            vec2 gateIdx = floor(transistorGrid);

            float cellSelector = rand(gateIdx);
            float telemetryPatternLayer = 0.0;
            float localCellTimeMultiplier = slowCrawlTime + (uTime * 0.18 * staticHoverForce);

            if (cellSelector < 0.22) {
                telemetryPatternLayer = drawDataBitmask(localGateUv, localCellTimeMultiplier + rand(gateIdx)) * step(rand(gateIdx * 1.5), 0.35);
                coreSiliconBusses = 0.0; 
            } else if (cellSelector > 0.82) {
                telemetryPatternLayer = drawLogicWaveform(localGateUv, localCellTimeMultiplier * 2.0 + rand(gateIdx)) * step(rand(gateIdx * 2.5), 0.3);
                coreSiliconBusses = 0.0; 
            }

            float mixT = fract(gateIdx.x * 0.02 + gateIdx.y * 0.015 + slowCrawlTime * 0.1);
            vec3 dynamicBlueSpectrum = mix(CYBER_BLUE_DEEP, mix(CYBER_BLUE_NEON, CYBER_CYAN, step(0.5, mixT)), mixT);

            float lumaValue = dot(dynamicBlueSpectrum, vec3(0.2126, 0.7152, 0.0722));
            float baselineShimmer = (0.5 + 0.5 * sin(uTime * 3.0 + gateIdx.x * 0.5)) * rand(gateIdx + floor(uTime * 6.0));
            vec3 grayscaleBaseColor = vec3(lumaValue * (0.5 + baselineShimmer * 0.35));

            float activationMixer = clamp(staticHoverForce + (globalSurgeWave * 2.5), 0.0, 1.0);
            vec3 processingColorProfile = mix(grayscaleBaseColor, dynamicBlueSpectrum * 1.65, activationMixer);
            vec3 activeCircuitColor = mix(processingColorProfile, uAccentColor * 1.2, staticHoverForce * 0.3);

            vec3 compositeColor = uBgColor;
            
            vec3 lightModeLineColor = mix(uForegroundColor * 0.16, vec3(0.0, 0.25, 0.70), clamp(globalSurgeWave * 5.0, 0.0, 1.0));
            vec3 linesContrastShade = mix(activeCircuitColor * 2.2, lightModeLineColor, isLightMode);
            compositeColor = mix(compositeColor, linesContrastShade, coreSiliconBusses * 0.12);
            
            float activePatternMask = max(step(0.95, localGateUv.x) * step(0.95, localGateUv.y), telemetryPatternLayer);
            
            vec3 finalPatternElement;
            if (isLightMode > 0.5) {
                vec3 intenseSurgeSapphire = vec3(0.0, 0.22, 0.65);
                vec3 passiveInk = mix(uBgColor, uForegroundColor * 0.38, mix(0.12, 0.48, baselineShimmer));
                finalPatternElement = mix(passiveInk, intenseSurgeSapphire, clamp(globalSurgeWave * 4.5 + staticHoverForce * 0.6, 0.0, 1.0));
            } else {
                float baseGlow = 0.28;
                float glowPower = (baseGlow + globalSurgeWave * 5.5 + staticHoverForce * 1.10);
                finalPatternElement = mix(activeCircuitColor, activeCircuitColor * 1.8, isLightMode) * glowPower;
            }
            
            compositeColor = mix(compositeColor, finalPatternElement, activePatternMask);

            float globalAlphaMultiplier = mix(0.72, 0.45, isLightMode);
            gl_FragColor = vec4(compositeColor, opacity * globalAlphaMultiplier);
        }
    `;

	useTask((delta) => {
		globalElapsedTime += delta;
		consoleUniforms.uTime.value = globalElapsedTime;
		bgCanvasUniforms.uTime.value = globalElapsedTime;

		smoothMouseUniform.x += (rawMouseX - smoothMouseUniform.x) * 0.045;
		smoothMouseUniform.y += (rawMouseY - smoothMouseUniform.y) * 0.045;
		consoleUniforms.uMouse.value.copy(smoothMouseUniform);
		bgCanvasUniforms.uMouse.value.copy(smoothMouseUniform);

		const cam = $activeCamera;
		if (cam) {
			bgTrackX = cam.position.x;
			bgTrackY = cam.position.y;
		}

		if (transitionTimeline < 1.0) {
			transitionTimeline = Math.min(transitionTimeline + delta * 2.0, 1.0);
		}
	});

	function handlePointerMove(e: PointerEvent) {
		if (typeof window !== 'undefined') {
			rawMouseX = e.clientX / window.innerWidth;
			rawMouseY = 1.0 - e.clientY / window.innerHeight;
		}
	}

	function handleConsolePanelClick(e: MouseEvent) {
		if (!activeKey || !allProjects[activeKey] || globalAlpha < 0.2) return;
		const cam = $activeCamera;
		if (!cam) return;

		const coords = new Vector2(
			(e.clientX / window.innerWidth) * 2 - 1,
			-(e.clientY / window.innerHeight) * 2 + 1
		);

		raycaster.setFromCamera(coords, cam);
		const hitTargets = raycaster.intersectObjects(scene.children, true);

		if (hitTargets.length > 0) {
			const hitMesh = hitTargets.find((hit) => hit.object.type === 'Mesh');
			if (hitMesh && hitMesh.uv) {
				const totalGalleryCount = allProjects[activeKey].imagePaths.length;
				if (totalGalleryCount > 1) {
					allProjects[activeKey].currentImageIndex =
						(allProjects[activeKey].currentImageIndex + 1) % totalGalleryCount;
				}
			}
		}
	}

	$effect(() => {
		const trigger = textureTrigger;
		const projects = Object.entries(allProjects);

		// CONTINUOUS TIMELINE INDEX SELECTOR
		// Scans chronological progress to prevent index finders from falling through gaps
		let activeIdx = projects.findIndex(
			([, p]) => p.visible || (p.progress > 0.0 && p.progress < 0.99)
		);
		if (activeIdx === -1 && lastProcessedKey) {
			activeIdx = projects.findIndex(([id]) => id === lastProcessedKey);
		}
		if (activeIdx === -1) activeIdx = 0;

		const [cId, currentProject] = projects[activeIdx] || [];
		const [nId] = projects[activeIdx + 1] || [];

		activeKey = cId;
		siblingKey = nId;

		// FIXED MOBILE OVERSHOOT CLAMP: Defensively locks the float values between 0.0 and 1.0
		const activeProgress = currentProject
			? Math.max(0.0, Math.min(currentProject.progress, 1.0))
			: 0;
		projectProgress = activeProgress;

		[cId, nId].forEach((id) => {
			if (id && allProjects[id] && !projectTextureMap[id] && !loadingSet.has(id)) {
				loadingSet.add(id);
				const paths = allProjects[id].imagePaths;
				const localTextures: Texture[] = new Array(paths.length);
				let loadedCount = 0;

				paths.forEach((path, idx) => {
					textureLoader.load(path, (tex) => {
						tex.generateMipmaps = false;
						tex.minFilter = LinearFilter;
						localTextures[idx] = tex;
						loadedCount++;
						if (loadedCount === paths.length) {
							projectTextureMap[id] = localTextures;
							loadingSet.delete(id);
							textureTrigger++;
						}
					});
				});
			}
		});

		// Compute crossfade values reliably
		let currentScrollMix = 0.0;
		if (cId && nId && currentProject) {
			currentScrollMix = activeProgress <= 0.75 ? 0.0 : (activeProgress - 0.75) / 0.25;
			currentScrollMix = Math.max(0.0, Math.min(currentScrollMix, 1.0)); // Strict normalization clamp
		}

		const currentTextures = cId ? projectTextureMap[cId] : null;
		const nextTextures = nId ? projectTextureMap[nId] : null;
		const currentImgIdx = cId ? allProjects[cId].currentImageIndex : 0;

		const targetTex = currentTextures ? currentTextures[currentImgIdx] : null;
		const fallbackNextTex = nextTextures ? nextTextures[0] : null;

		if (targetTex) {
			if (cId !== lastProcessedKey) {
				previousGalleryTex = targetTex;
				activeGalleryTex = targetTex;
				transitionTimeline = 1.0;
				lastProcessedKey = cId;
				lastProcessedImgIdx = currentImgIdx;
			} else if (currentImgIdx !== lastProcessedImgIdx) {
				previousGalleryTex = activeGalleryTex || targetTex;
				activeGalleryTex = targetTex;
				transitionTimeline = 0.0;
				lastProcessedImgIdx = currentImgIdx;
			}
		}

		if (typeof window !== 'undefined') {
			const width = window.innerWidth;
			const height = window.innerHeight;
			consoleUniforms.uResolution.value.set(width, height);
			bgCanvasUniforms.uResolution.value.set(width, height);

			const isDark =
				document.documentElement.classList.contains('dark') ||
				document.body.classList.contains('dark');
			if (isDark) {
				accentColorUniform.value.setStyle('hsl(26.59, 97.88%, 62.94%)');
				foregroundColorUniform.value.setStyle('hsl(0, 0%, 98%)');
				backgroundColorUniform.value.setStyle('hsl(0, 0%, 3.9%)');
			} else {
				accentColorUniform.value.setStyle('hsl(40.61, 92.52%, 58.04%)');
				foregroundColorUniform.value.setStyle('hsl(0, 0%, 3.9%)');
				backgroundColorUniform.value.setStyle('hsl(0, 0%, 100%)');
			}
		}

		consoleUniforms.texCurrent.value = activeGalleryTex;
		consoleUniforms.texNext.value = fallbackNextTex;
		consoleUniforms.scrollMix.value = currentScrollMix;
		consoleUniforms.galleryFrom.value = previousGalleryTex;
		consoleUniforms.galleryTo.value = activeGalleryTex;
		consoleUniforms.galleryMix.value = transitionTimeline;
		consoleUniforms.opacity.value = globalAlpha;

		bgCanvasUniforms.scrollMix.value = currentScrollMix;
		bgCanvasUniforms.galleryMix.value = transitionTimeline;
		bgCanvasUniforms.opacity.value = globalAlpha;
	});
</script>

<svelte:window onpointermove={handlePointerMove} onclick={handleConsolePanelClick} />

<T.Group position={[0, 13, 0]} rotation={[0, 0, Math.PI / 2]}>
	{#if activeGalleryTex}
		<T.Mesh position={[0, 0, 0]}>
			<T.PlaneGeometry args={[currentCardSize, currentCardSize, 16, 16]} />
			<T.ShaderMaterial
				transparent
				depthTest={false}
				depthWrite={false}
				vertexShader={consoleVertexShader}
				fragmentShader={consoleFragmentShader}
				uniforms={consoleUniforms}
			/>
		</T.Mesh>
	{/if}
</T.Group>

<T.Mesh position={[bgTrackX, bgTrackY, -180]}>
	<T.PlaneGeometry args={[3200, 3200]} />
	<T.ShaderMaterial
		transparent
		depthTest={false}
		depthWrite={false}
		vertexShader={consoleVertexShader}
		fragmentShader={bgCanvasFragmentShader}
		uniforms={bgCanvasUniforms}
	/>
</T.Mesh>

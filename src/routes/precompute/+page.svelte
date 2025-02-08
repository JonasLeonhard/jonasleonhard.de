<script lang="ts">
	import { SplineCurve, Vector2 } from 'three';
	import { onMount } from 'svelte';
	import { ClipboardCopy } from '$lib';
	import { Check, Code } from 'lucide-svelte';

	// Your script section:
	interface PathData {
		curves: SplineCurve[];
		metadata: {
			width: number;
			height: number;
			totalPoints: number;
		};
	}

	let svg: SVGElement | undefined = $state();
	let pathData: PathData | undefined = $state();

	function convertSVGToSplines(svg: SVGElement): PathData {
		const width = parseFloat(svg.getAttribute('width') || '0');
		const height = parseFloat(svg.getAttribute('height') || '0');

		// Get all paths from SVG
		const paths = Array.from(svg.querySelectorAll('path'));
		const curves: SplineCurve[] = [];
		let totalPoints = 0;

		paths.forEach((path) => {
			const points: Vector2[] = [];
			const length = path.getTotalLength();
			// Sample points along the path
			const numPoints = Math.max(20, Math.floor(length / 10)); // Adjust sampling density

			for (let i = 0; i < numPoints; i++) {
				const t = i / (numPoints - 1);
				const point = path.getPointAtLength(t * length);
				// Center and normalize coordinates
				points.push(
					new Vector2((point.x - width / 2) / (width / 2), -(point.y - height / 2) / (height / 2))
				);
			}

			if (points.length >= 2) {
				const curve = new SplineCurve(points);
				curves.push(curve);
				totalPoints += points.length;
			}
		});

		return {
			curves,
			metadata: {
				width,
				height,
				totalPoints
			}
		};
	}

	onMount(() => {
		if (svg) {
			// Compute splines when svg is available
			pathData = convertSVGToSplines(svg);
		}
	});
</script>

<svg
	bind:this={svg}
	version="1.2"
	viewBox="0 0 720 720"
	width="720"
	height="720"
	id="svg1"
	sodipodi:docname="circuit.svg"
	inkscape:version="1.3.2 (091e20e, 2023-11-25)"
	xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
	xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:svg="http://www.w3.org/2000/svg"
>
	<sodipodi:namedview
		id="namedview1"
		pagecolor="#ffffff"
		bordercolor="#000000"
		borderopacity="0.25"
		inkscape:showpageshadow="2"
		inkscape:pageopacity="0.0"
		inkscape:pagecheckerboard="0"
		inkscape:deskcolor="#d1d1d1"
		inkscape:zoom="0.84951023"
		inkscape:cx="231.30975"
		inkscape:cy="384.92768"
		inkscape:window-width="1920"
		inkscape:window-height="1027"
		inkscape:window-x="1512"
		inkscape:window-y="25"
		inkscape:window-maximized="1"
		inkscape:current-layer="layer400"
		showgrid="false"
	>
		<inkscape:grid
			id="grid247"
			units="px"
			originx="0"
			originy="0"
			spacingx="1"
			spacingy="1"
			empcolor="#0099e5"
			empopacity="0.30196078"
			color="#0099e5"
			opacity="0.14901961"
			empspacing="5"
			dotted="false"
			gridanglex="30"
			gridanglez="30"
			visible="false"
		/>
	</sodipodi:namedview>
	<title id="title1">New Project(1)(1)</title>
	<style id="style1">
		.s0 {
			opacity: 0.1;
			fill: #000000;
		}
	</style>
	<g inkscape:groupmode="layer" id="layer1" inkscape:label="path1">
		<path
			style="fill:none;opacity:1;stroke:#fbff5f;stroke-opacity:1"
			d="M 299.58439,418.77071 280.75,436.13365 h -3.23716 l -8.53433,9.12291 -9.1229,-0.29429 -3.53145,3.23716 1.17715,7.65147 -3.23716,2.06001 -4.70859,0.29428 -2.94287,3.82574 v 4.70859 l -3.82574,3.82574 -13.8315,0.58857 -2.94287,3.23716 -0.58857,7.65147 -5.88575,5.29717 -7.06289,0.29429 -57.97458,58.26886 0.29429,35.02018 -9.71148,7.35718 0.58857,20.30582 -113.889151,113.59487"
			id="path1"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer2" inkscape:label="path2">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 64.4489,721.88654 169.80372,617.12029 v -19.12867 l 21.77726,-21.48296 -0.29429,-18.5401 20.01153,-19.71724 V 515.5912 l 10.30005,-9.71148 18.83439,0.58858 19.12866,-19.12867 0.58858,-20.01153 2.94287,-2.3543"
			id="path9"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer3" inkscape:label="path3">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 36.197328,721.59225 112.712002,-112.12343 0.29429,-20.01153 8.53433,-7.35718 v -35.02018 l 53.26598,-53.26598 h 18.83439 l 10.00576,-8.82862 0.58858,-7.06289"
			id="path3"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer4" inkscape:label="path4">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 40.611636,721.59225 152.44078,610.0574 v -18.83438 l 8.24004,-7.65147 v -35.02018 l 52.67741,-51.79455 h 23.24869 l 8.82862,-9.1229 0.29428,-15.00865 5.00289,-5.88575"
			id="path4"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer5" inkscape:label="path5">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 46.203093,721.59225 156.26651,611.23455 v -19.42296 l 20.89439,-19.71724 0.29429,-30.0173 38.84591,-39.1402 h 23.54298 l 16.77437,-17.36294 -0.29429,-25.89728 6.76861,-6.47432"
			id="path5"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer6" inkscape:label="path6">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 49.440252,722.47511 159.50367,612.70598 V 593.8716 l 20.89439,-20.01153 0.29429,-29.13443 15.30294,-14.12579"
			id="path6"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer7" inkscape:label="path7">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 54.148848,722.47511 108.591982,-108.29769 0.29429,-18.5401 20.6001,-20.89439 0.58858,-23.83726 10.88862,-11.18292"
			id="path7"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer8" inkscape:label="path8">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 59.740305,721.59225 106.237685,-106.23768 0.29429,-19.42296 21.18868,-20.30582 V 557.0857 l 17.95152,-17.06866 -0.29429,-8.24004"
			id="path8"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer9" inkscape:label="path9">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 74.748953,722.18083 65.331757,-64.4489 -0.29428,-6.47432 43.84879,-43.55451 v -13.24292 l 31.19445,-30.90016 -0.58858,-45.90881 9.12291,-8.24004 19.42295,-0.29429 20.60011,-20.01153 0.58857,-17.06866 5.00288,-5.59145 v -16.48009 l 3.82574,-3.53144 6.18003,-0.29429 21.48297,-21.77726 4.70859,-2.94287 -0.29428,-5.88574"
			id="path10"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer10" inkscape:label="path10">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 80.34041,722.47511 64.15461,-64.4489 -0.58857,-5.59145 43.55451,-43.55451 -0.29429,-7.65147 14.12579,-13.53721"
			id="path11"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer11" inkscape:label="path11">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 87.109016,722.47511 65.037474,-65.33176 -0.29429,-3.82573 9.12291,-8.82862"
			id="path12"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer12" inkscape:label="path12">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 91.523324,722.47511 79.457546,-78.86897 0.88286,-13.8315 31.78302,-32.07731 0.29429,-4.12002 5.59146,-5.29717 v -13.24292 l 9.71148,-9.71148 -0.58858,-22.66011 8.53433,-8.24005 h 7.35718"
			id="path13"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer13" inkscape:label="path13">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 97.409068,721.88654 77.691822,-77.10325 v -13.53721 l 32.3716,-32.66588 v -4.12002 l 5.29717,-4.7086 v -13.53721 l 12.36006,-12.06578 -0.88286,-18.83438 4.12002,-3.23716"
			id="path14"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer14" inkscape:label="path14">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 168.038,567.68004 0.29429,-21.48297 46.49738,-46.49738 23.24869,-0.29429 12.94863,-12.65435 v -6.47431"
			id="path16"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer16" inkscape:label="path16">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 224.54115,522.65409 10.88862,-9.71147 9.12291,-0.29429 24.72012,-24.42584 -0.58857,-15.59722 6.47432,-5.88575 -0.58858,-11.4772 35.02018,-35.60875"
			id="path17"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer17" inkscape:label="path17">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 25.897275,722.18083 127.72065,621.24031 127.13208,613.58884 137.72642,602.9945"
			id="path18"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer18" inkscape:label="path18">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 20.894392,722.18083 96.526208,-96.23192 -0.29429,-13.24293 34.13732,-33.84303 v -38.25734 l 42.37736,-41.49449"
			id="path19"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer19" inkscape:label="path19">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 1.1771489,722.18083 25.0144131,-25.3087 15.008648,-0.29429 72.68894,-71.21751 v -13.8315 l 34.13732,-33.84303 v -40.31734 l 57.38601,-56.79744 12.06577,-0.29428"
			id="path20"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer20" inkscape:label="path20">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M -2.6485849,721.29797 25.602988,692.75211 h 15.008648 l 51.205975,-50.02883 0.294287,-42.37736 6.474319,-7.06289 0.588575,-46.79167 51.500258,-51.20598 v -19.12867 l 30.90016,-30.01729 h 65.92034 l 4.12002,6.18003"
			id="path21"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer21" inkscape:label="path21">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 97.703356,631.54036 -0.294288,-8.53432 5.885742,-5.88575 v -5.00288 l 22.66012,-22.36583 0.29429,-50.32311 86.52044,-86.52045 h 15.00864"
			id="path22"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer22" inkscape:label="path22">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 107.70912,622.12317 -0.58857,-9.1229 37.08019,-36.7859 -0.29429,-40.02306 71.80608,-70.33465 h 24.72013"
			id="path23"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer23" inkscape:label="path23">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 134.78354,572.09435 -0.29428,-32.3716 78.86897,-78.86897 19.42296,-0.29429 7.65147,-7.65147"
			id="path24"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer24" inkscape:label="path24">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 39.728774,683.6292 85.931867,637.7204 V 610.35168"
			id="path25"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer25" inkscape:label="path25">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 129.19209,722.47511 88.28616,-87.99187 -0.29428,-8.53433 15.00864,-14.12579 h 8.24005"
			id="path26"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer26" inkscape:label="path26">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 133.80347,721.87283 87.60693,-86.77456 -0.20809,-4.78613 11.237,-10.61272"
			id="path27"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer27" inkscape:label="path27">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 139.00578,722.08093 248.67052,612.62428 v -15.60694 l 70.95954,-69.50289 v -18.31214 l -13.9422,-13.94219 v -23.72255 l 5.41041,-6.03468 v -38.7052 l 6.65896,-7.69942"
			id="path28"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer15" inkscape:label="path15">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 176.57233,604.76023 v -9.12291 l 29.13443,-27.95728 -0.29428,-9.1229"
			id="path15"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer28" inkscape:label="path28">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 306.72832,526.0578 7.69943,-5.82659 v -12.06936 l -11.86128,-11.23699 0.2081,-27.05203 4.99422,-5.4104 0.62427,-39.32948 4.99422,-6.03468"
			id="path29"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer29" inkscape:label="path29">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 173.96532,722.08093 v -30.17341 l 43.28324,-42.24278 22.89017,-0.62428 11.65318,-12.06936 0.20809,-37.66474 71.16763,-71.16763 -0.20809,-20.60116 -12.69364,-12.69364 0.20809,-17.27168"
			id="path30"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer30" inkscape:label="path30">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 177.71098,721.66474 -0.20809,-29.13295 41.41041,-39.53757 23.51445,-0.62428 13.10982,-13.31792 0.2081,-38.08092 72.41618,-72 v -9.78035"
			id="path31"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer31" inkscape:label="path31">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 180.83237,721.04046 0.20809,-26.42774 39.12139,-38.49711 h 23.51445 l 15.19075,-15.60694 v -37.66474 l 75.12139,-75.53757 v -14.35838 l -19.14451,-19.3526 -0.20809,-66.17341 7.07514,-7.49133"
			id="path32"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer32" inkscape:label="path32">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 185.20231,721.87283 0.41619,-24.9711 37.24855,-35.58381 22.47399,-0.62428 18.31214,-18.93641 v -37.24856 l 74.91329,-75.74566 -0.20809,-17.89596 -19.56069,-19.56069 0.41618,-63.46821 7.07515,-7.07514 -0.20809,-2.70521"
			id="path33"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer33" inkscape:label="path33">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 209.13295,722.08093 248.25434,684 h 40.57803 l 30.79769,-31.00578 V 625.7341 l -27.05203,-26.63583 v -10.61272 l 5.82659,-6.03468"
			id="path34"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer34" inkscape:label="path34">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 214.75145,721.66474 34.33526,-33.91907 40.99422,-0.41619 33.0867,-33.0867 0.20809,-29.54914 -24.763,-24.763 -0.2081,-7.07515"
			id="path35"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer35" inkscape:label="path35">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 219.53757,721.87283 32.25434,-31.00578 39.53757,-0.41618 35.37572,-34.95954 V 622.82081 L 306.31214,602.63584 V 569.54913 L 324,551.65318"
			id="path36"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer36" inkscape:label="path36">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 225.57225,721.87283 27.8844,-27.6763 39.12138,-0.41618 50.15029,-50.35838 -0.20809,-9.15607 -32.67052,-33.08671 -0.41618,-28.30058 26.84393,-26.21965 -0.41619,-5.20231"
			id="path37"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer37" inkscape:label="path37">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 230.15029,721.87283 24.34682,-24.55491 h 39.12139 l 52.23121,-52.85549 -0.62428,-11.44509 -32.04624,-32.87861 -0.62428,-26.01156 30.38151,-30.3815 -0.2081,-34.95954 L 324,489.64162 v -58.68208 l 5.82659,-5.41041 v -6.65896"
			id="path38"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer38" inkscape:label="path38">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 237.43353,721.45665 18.93641,-18.93642 39.32948,-0.62428 54.31214,-54.93641 v -16.23122 l -33.2948,-33.29479 v -21.64162 l 30.38151,-30.17341 -0.41619,-38.7052 -17.27168,-18.72833 0.2081,-55.3526 5.4104,-5.20231 -0.41618,-9.36416"
			id="path39"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer39" inkscape:label="path39">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 293.4104,721.87283 6.03469,-6.65896 34.33526,-0.20809"
			id="path40"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer40" inkscape:label="path40">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 263.65318,714.79769 30.79769,0.83237 37.66474,-38.7052"
			id="path41"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer41" inkscape:label="path41">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 361.04046,678.17341 -12.06936,11.44509 -5.6185,0.41618 -19.3526,18.72833 -5.20231,0.20809 -3.12139,-3.12139 0.62428,-4.78613 21.43352,-21.64161 v -11.65318 l 17.68787,-17.89596 v -21.43352 l -33.91908,-34.12717 0.20809,-6.03468 6.65896,-5.82659"
			id="path42"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer42" inkscape:label="path42">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 321.50289,703.76879 20.18497,-21.22544 -0.20809,-5.61849 19.3526,-17.47977 -0.41618,-20.80925"
			id="path43"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer43" inkscape:label="path43">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 348.13873,721.66474 V 703.3526 l 12.27746,-12.48555"
			id="path44"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer44" inkscape:label="path44">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 369.15607,713.34104 0.20809,-46.82081 -2.91329,-3.74566 0.20809,-51.19075 -18.52023,-18.72833 h -19.76879"
			id="path45"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer45" inkscape:label="path45">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 376.23121,721.87283 v -11.0289 l -2.91329,-3.32948 0.20809,-42.86705 -3.12139,-3.12139 -0.41618,-51.81503 -27.88439,-27.4682"
			id="path46"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer46" inkscape:label="path46">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 400.36994,708.55491 c -0.83237,-0.20809 -13.52601,-0.41618 -13.52601,-0.41618 l -8.3237,-8.3237 -0.20809,-60.55491 -3.74567,-4.36995 -0.20809,-26.01156"
			id="path47"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer47" inkscape:label="path47">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 400.36994,693.57226 -10.19653,-0.2081 -8.3237,-7.69942 -0.41618,-79.49133 -4.16185,-4.57803 h -4.99422 l -23.93064,-23.09827 v -18.31214"
			id="path48"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer48" inkscape:label="path48">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 330.86705,572.25434 20.18497,-21.64162 -0.41618,-55.5607 -8.3237,-9.15607 v -67.21387"
			id="path49"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer49" inkscape:label="path49">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 379.56069,597.64162 -5.82659,1.45665 -19.76878,-19.76879 -0.20809,-88.43931 -7.07515,-7.07514 v -67.63006"
			id="path50"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer50" inkscape:label="path50">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 400.78613,679.21387 -7.90752,-1.04046 -8.1156,-8.94798 -0.62428,-75.74566 -19.3526,-20.18497"
			id="path51"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer51" inkscape:label="path51">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 400.57804,663.81503 -4.78613,-1.24856 -8.53179,-8.32369 -0.41619,-68.46243 -22.0578,-22.05781"
			id="path52"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer52" inkscape:label="path52">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 400.78613,646.33526 -0.20809,-15.39884 -6.65896,-6.65896 v -31.42197 l 7.07514,-7.07514 v -7.90752 l -2.28902,-3.12138 -8.3237,0.41618 -4.78612,-4.78613"
			id="path53"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer53" inkscape:label="path53">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 396.41619,580.16185 -7.90752,0.20809 -8.94798,-7.69942 v -7.49133 l -14.98265,-14.35838 v -8.73988"
			id="path54"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer54" inkscape:label="path54">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 373.9422,593.47977 -16.23122,-17.06358 -0.41618,-88.8555 -6.24278,-5.82659 -0.20809,-63.4682"
			id="path55"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer55" inkscape:label="path55">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 394.12717,570.5896 -23.72255,-23.72255 -0.20809,-9.57225 -8.94797,-9.36416 v -80.11561 l -6.03469,-5.6185 V 415.3526"
			id="path56"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer56" inkscape:label="path56">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 402.24277,565.59538 h -7.28323 l -21.64162,-22.05781 -0.41619,-10.82081 -8.32369,-8.3237 -0.41619,-78.45086 -4.78613,-5.20232 v -21.84971"
			id="path57"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer57" inkscape:label="path57">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 396.41619,561.64162 -20.39307,-20.60116 0.20809,-9.98844 -7.07514,-6.86705 v -53.68786 l -1.66474,-1.87283 -0.20809,-41.20231 -3.74567,-3.95376 v -5.20231"
			id="path58"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer58" inkscape:label="path58">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 407.44509,721.66474 0.20809,-71.79191 -1.87283,-2.08092 -0.2081,-67.83815"
			id="path59"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer59" inkscape:label="path59">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 411.81503,721.87283 -0.41619,-160.23121 -28.50867,-28.09249 -0.20809,-8.53179 -7.49133,-7.28324 -0.20809,-47.86127 -4.16185,-3.32948 0.41618,-42.45086 -3.74566,-4.99422"
			id="path60"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer60" inkscape:label="path60">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 418.2659,721.66474 V 633.64162"
			id="path61"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer61" inkscape:label="path61">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 425.13295,721.45665 -0.20809,-91.76879 -9.36417,-7.49133 -0.20809,-62.01156 -28.30058,-28.30058 v -7.90751 l -7.07514,-7.90752 0.41618,-71.37572 -4.99422,-4.57803 0.83237,-20.39307"
			id="path62"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer62" inkscape:label="path62">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 385.17919,461.34104 0.83237,-16.6474 -5.20231,-5.20231 -0.20809,-19.97688"
			id="path63"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer63" inkscape:label="path63">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 399.32948,530.42775 v 6.24277 l 19.3526,20.18497 v 64.09249 l 9.57226,7.69942 -0.2081,93.43353"
			id="path64"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer64" inkscape:label="path64">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 384.9711,420.13873 0.20809,15.19075 24.13873,23.51445 0.20809,28.71676 41.6185,41.82659 0.41618,10.82081 -3.53757,2.70521 0.20809,11.0289 5.82659,4.16185"
			id="path65"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer65" inkscape:label="path65">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 465.91908,722.28902 -0.41619,-90.52023 -9.15607,-8.11561 v -36.83237 l 4.57804,-4.16185 -0.62428,-44.53179"
			id="path66"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer66" inkscape:label="path66">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 454.68208,546.65896 V 527.93064 L 412.43931,485.47977 V 457.17919 L 389.54913,434.7052 v -15.81503"
			id="path67"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer67" inkscape:label="path67">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 392.87861,420.34682 0.41619,13.52601 22.26589,22.47399 -0.20809,9.57226 6.65896,8.1156 0.20809,15.81503 45.15607,44.94798 -0.20809,21.43352 8.94798,9.15607 0.41618,156.27746"
			id="path68"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer68" inkscape:label="path68">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 470.27097,570.32862 -5.59146,5.00289 -0.29428,21.48296 5.29717,5.88575 0.29428,119.18632"
			id="path69"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer69" inkscape:label="path69">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 473.0667,721.59225 V 599.46306 l -2.79573,-3.09002 v -16.18579"
			id="path70"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer70" inkscape:label="path70">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 479.83531,721.59225 -0.44144,-158.17938 -8.38718,-8.82861 -0.44143,-23.24869 -11.18292,-10.74149"
			id="path71"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer71" inkscape:label="path71">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 483.36675,721.59225 -0.73572,-159.65081 -7.79861,-8.38719 -0.29428,-35.75589 -8.97576,-7.65147 -18.09867,-0.73572 -21.18868,-20.30582 -0.29429,-17.06866 -5.29717,-5.88574 0.29429,-15.45008 -3.97288,-3.67859 -5.59145,-0.14714 -13.68436,-13.68436 0.14715,-14.12578"
			id="path72"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer72" inkscape:label="path72">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 402.14348,420.53643 0.14714,7.94576 22.36583,21.63011 -0.14714,15.15579 5.44431,5.59146 -0.14714,16.92151 18.98152,18.68724 h 19.12867 l 10.15291,9.41719 v 22.80726 l 20.01153,20.45296 0.14715,32.22445 -11.77149,10.88863 0.44143,99.61622 19.5701,19.86439"
			id="path73"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer73" inkscape:label="path73">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 491.16536,589.16301 0.73572,-28.10443 -10.74148,-10.59434"
			id="path74"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer74" inkscape:label="path74">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 484.83819,531.62986 -0.29429,8.97576 16.92152,17.06865 0.14714,35.31447 -11.18292,11.03577 v 96.23192 l 21.33583,21.48297"
			id="path75"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer75" inkscape:label="path75">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 517.50407,721.59225 -23.83727,-23.54297 -0.14714,-92.1119 12.21292,-11.91864 -0.73572,-41.49449 -11.03577,-11.62435"
			id="path76"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer76" inkscape:label="path76">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 493.81395,531.18842 14.56722,14.42008 0.73571,50.17597 -11.33005,11.18291 -0.29429,89.7576 25.45584,25.45585"
			id="path77"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer77" inkscape:label="path77">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 527.50983,722.03368 -26.19156,-26.48585 -0.58857,-86.66758 11.33006,-10.74148 -0.44144,-55.62029 -38.25733,-39.28734 -23.24869,-0.14714 -17.06866,-16.77438 v -37.08019 l -22.66012,-22.51297 v -7.21003"
			id="path78"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer78" inkscape:label="path78">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 419.21214,420.095 v 10.4472 l 18.24581,18.68723 0.44143,18.39296 6.18003,5.15002 -0.14715,15.74437 8.82862,8.38718 h 22.9544 l 53.11885,52.08884 -0.44143,43.55451 -20.30582,19.27581 -0.29429,80.6347 29.72301,29.42872"
			id="path79"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer79" inkscape:label="path79">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 532.807,721.7394 -28.10443,-28.25158 -0.14714,-83.13613 10.4472,-9.85863 v -59.7403 l -40.61164,-40.75878 -23.24869,-0.29429 -12.94864,-13.09578 -0.14714,-7.06289"
			id="path80"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer80" inkscape:label="path80">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 423.03787,419.21214 v 11.03577 l 26.33871,26.19156 0.44143,29.13444 8.68147,7.94575 18.83438,0.14714 54.00171,53.85456 0.14714,46.64453 -20.30582,19.12867 -0.14714,77.83897 31.19444,30.75301"
			id="path81"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer81" inkscape:label="path81">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 547.22708,721.7394 -32.96017,-32.22445 v -74.45467 l 20.45296,-19.86439 -0.58857,-48.99882 -4.41431,-5.59145"
			id="path82"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer82" inkscape:label="path82">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 537.66274,539.72275 0.29429,57.23887 -19.86439,19.27581 0.14715,72.10037 34.13731,33.54874"
			id="path83"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer83" inkscape:label="path83">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 556.34998,721.59225 -34.87303,-34.72589 -0.29429,-66.36177 13.8315,-13.53721"
			id="path84"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer84" inkscape:label="path84">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 560.91143,721.88654 -36.19732,-36.19733 -0.14715,-63.71318 9.85862,-9.71148 2.94288,0.29429 6.03288,-6.18003 7.50433,-0.29429"
			id="path85"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer85" inkscape:label="path85">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 565.32574,722.18083 -37.52162,-37.66877 -0.14714,-57.53315 7.94575,-8.0929"
			id="path86"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer86" inkscape:label="path86">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 569.74005,722.03368 -37.81591,-38.69877 -0.44143,-50.47025 5.44432,-5.29717 -0.14715,-2.64859 6.47432,-6.03289 8.0929,-0.14714"
			id="path87"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer87" inkscape:label="path87">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 574.00721,721.88654 -39.28734,-40.1702 -0.14714,-47.2331 9.27004,-9.27005"
			id="path88"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer88" inkscape:label="path88">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 578.56867,721.88654 -40.90593,-41.05307 -0.29428,-43.26022 7.35718,-7.21003 6.18003,0.29428"
			id="path89"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer89" inkscape:label="path89">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 582.98297,721.59225 -42.23021,-41.64164 0.14714,-37.81591 3.67859,-4.12002"
			id="path90"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer90" inkscape:label="path90">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 587.103,721.88654 -42.96594,-43.11308 v -31.63587 l 12.21292,-12.21292 -0.14714,-44.43737 -8.38719,-8.0929 -0.29429,-37.96305"
			id="path91"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer91" inkscape:label="path91">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 551.05281,593.8716 -8.38718,-8.68147 V 552.3771"
			id="path92"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer92" inkscape:label="path92">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 550.75852,650.52189 v 29.87015 l 40.90593,41.05307"
			id="path93"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer93" inkscape:label="path93">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 596.66733,721.29797 -36.7859,-37.37448 -0.29429,-93.87762 -6.03289,-6.47432 -0.14714,-18.39295"
			id="path94"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer94" inkscape:label="path94">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 427.59932,419.50643 v 9.85862 l 38.25734,39.1402 11.4772,0.29428 23.98441,24.2787 15.00865,0.44143 49.14596,48.55739 0.44144,60.47602 12.80149,12.8015 -0.14714,32.37159 18.39295,17.95152 76.07324,-0.29429 19.27581,19.12867 0.14715,10.59434 11.33006,10.30006 45.61451,0.73571 16.33295,15.89151"
			id="path95"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer95" inkscape:label="path95">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 760.14388,721.88654 -12.36006,-12.06578 -46.05595,-0.58857 -13.09579,-12.94864 -1.03,-10.88862 -16.92152,-16.03866 -75.77895,-0.88286 -19.86439,-19.71724 -0.29429,-33.10731 -12.06577,-11.47721 -0.73572,-52.08883 -6.18003,-5.7386"
			id="path96"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer96" inkscape:label="path96">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 770.73822,721.7394 -19.27581,-18.83439 -46.05595,-0.58857 -9.56434,-9.1229 -0.44143,-10.74149 -21.18868,-20.30581 -75.9261,-0.29429 -15.89151,-15.15579 -0.29429,-33.54875 -12.94863,-12.65435 -0.44144,-59.7403 -50.17597,-49.88168 -15.45007,-0.73572 -24.86727,-24.57298 -10.4472,-0.29429 -35.46161,-35.16732 -0.58857,-11.47721"
			id="path97"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer97" inkscape:label="path97">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 431.86649,414.50354 3.3843,3.38431 0.44143,10.88862 32.51874,32.96017 11.03577,0.44143 25.01441,25.01442 15.59723,0.73571 52.53026,51.9417 -0.29428,59.00458 14.42007,13.8315 -0.44143,32.22445 13.39007,12.94864 76.07324,0.58858 23.54298,22.9544 0.29429,11.4772 7.79861,6.91575 45.61452,-0.44143 22.51297,22.80726"
			id="path98"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer98" inkscape:label="path98">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 780.30255,722.03368 -26.04442,-26.04441 -45.32023,-0.14715 -6.32717,-5.88574 0.14714,-10.15291 -25.60299,-25.01442 -75.63181,-0.44143 -11.62435,-11.62434 0.14715,-31.63588 -14.86151,-14.27293 0.58858,-58.41601 -54.14885,-53.41313 -15.74437,-0.88286 -25.45584,-25.01441 -10.59434,-0.29429 -31.34159,-31.34159 -0.29429,-11.62434 -4.70859,-3.67859"
			id="path99"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer99" inkscape:label="path99">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 444.66798,424.50931 -0.14714,5.15002 26.04442,26.33871 11.4772,0.14714 25.3087,25.3087 15.59722,0.58858 55.62029,55.17885 v 58.7103 l 14.56721,13.68436 v 9.41719 l 7.79861,6.91575 18.68724,0.44143 24.2787,24.72012 35.02018,0.14715 27.07442,26.3387 0.14714,9.71148 4.7086,4.85574 45.32023,0.29429 28.98729,29.57586"
			id="path100"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer100" inkscape:label="path100">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 630.36322,647.87331 -8.38719,0.44143 -2.79573,-2.94288 -6.91575,0.14715 -15.59722,-13.8315"
			id="path101"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer101" inkscape:label="path101">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 789.42546,721.7394 -32.3716,-32.66588 h -31.63587 l -3.67859,-3.38431 0.14714,-5.15002 -3.97288,-3.97288 -8.38718,-0.14714 -30.16444,-28.84015 -34.13732,-0.29429 -24.27869,-23.83726 -18.68724,-0.44143 -5.44432,-5.59146 -0.58857,-9.27005 -13.97864,-13.97864 -0.58858,-58.41601 -56.94457,-56.65029 -16.03866,-0.44143 -25.3087,-24.86727 -11.62434,-0.44143 -18.68724,-18.98153 -0.14715,-10.59434 -15.8915,-15.00865"
			id="path102"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer102" inkscape:label="path102">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 454.82089,419.21214 1.91287,1.47143 0.29429,13.24293 16.92151,16.62723 h 10.88863 l 25.60299,25.16155 16.18579,0.14715 58.12173,59.29887 0.73572,57.53315 12.65435,12.8015 11.4772,0.73571 36.49161,38.1102 h 35.02018 l 29.42872,28.84015 h 62.68318 l 4.56145,4.56145 0.44143,28.10443 16.77437,16.03865"
			id="path103"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer103" inkscape:label="path103">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 798.98979,721.88654 -17.65723,-17.65723 -0.29429,-28.25158 -6.47432,-6.47431 -62.53603,0.29428 -29.72301,-29.42872 -35.02018,-0.14714 -36.93304,-37.08019 -9.71148,-0.44143 -12.21292,-12.06578 -0.29429,-56.79743 -86.3733,-86.52044 -26.92728,-0.29429 -13.68435,-13.39007 v -14.71436 l -6.76861,-7.21004 -8.0929,0.14715 -7.79861,-6.76861"
			id="path104"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer104" inkscape:label="path104">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 514.5612,470.12383 499.11112,453.4966"
			id="path105"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer105" inkscape:label="path105">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 465.12094,411.26638 -0.29428,21.63011 11.62434,10.88863 27.22157,0.58858 87.99188,88.28616 0.73572,56.20886 9.71147,10.44719 10.00577,0.14715 36.93304,36.7859 53.11885,0.14714 21.18868,20.30582 h 57.23886 l 9.85862,10.00577 0.73572,42.67164 12.80149,12.36007"
			id="path106"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer106" inkscape:label="path106">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 808.84841,721.7394 -14.56721,-14.12579 -0.44144,-42.37736 -12.5072,-12.06577 -57.09172,-0.14715 -20.74725,-20.15867 -53.26599,-0.14715 -37.22733,-37.22733 -9.71148,-0.58857 -7.50432,-7.94576 -0.73572,-55.91457 -90.19903,-90.05189 -19.71724,0.29429 -8.24005,-7.94575 -7.06289,-0.58858 -2.06001,-2.3543 -0.14714,-7.94575 4.56145,-4.26717"
			id="path107"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer107" inkscape:label="path107">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 485.27962,417.59356 -5.59146,5.7386 v 7.35718 l 6.91575,7.21004 20.01153,-0.14715 91.96476,92.55333 v 55.17886 l 6.18003,6.47431 10.44719,0.44144 36.93305,36.7859 52.82456,0.58857 21.18867,19.86439 57.38601,0.14714 14.71436,15.00865 -0.29428,42.08307 15.45007,14.56722"
			id="path108"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer108" inkscape:label="path108">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 771.17965,693.48782 -0.29429,-5.00288 -8.38718,-7.65147 -32.96017,0.14715"
			id="path109"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer109" inkscape:label="path109">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 782.36256,667.59055 -5.15002,-3.97288 h -59.59316 l -18.68724,-18.68724"
			id="path110"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer110" inkscape:label="path110">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 821.35562,669.35627 -0.14714,18.5401 12.21291,12.80149 1.03001,21.48297"
			id="path111"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer111" inkscape:label="path111">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 832.0971,668.7677 -0.14714,24.57298 6.7686,6.32718 0.44144,23.10154"
			id="path112"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer112" inkscape:label="path112">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 842.98573,721.88654 -0.58858,-53.70742"
			id="path113"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer113" inkscape:label="path113">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 826.21136,660.52766 0.29429,-5.44432 c 0,0 -10.59434,-11.4772 -11.18292,-11.62434 -0.58857,-0.14715 -10.59434,-0.29429 -10.59434,-0.29429 l -10.74148,-10.15291 -32.22445,-0.44143 c 0,0 -2.64859,-3.53145 -3.38431,-3.67859 -0.73571,-0.14714 -38.55162,0 -38.55162,0 l -9.41719,-8.97576 -12.21292,-0.29429 -17.51009,-19.12867 -5.29717,0.29429 -25.89727,-26.48585 -0.44144,-9.85862 -7.35718,-7.65147"
			id="path114"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer114" inkscape:label="path114">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 630.21607,543.98992 0.14715,-11.77149 -31.04731,-30.16444 -0.14714,-7.21004 3.3843,-3.82573 -0.44143,-11.62435 -6.7686,-7.21003"
			id="path115"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer115" inkscape:label="path115">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 838.12999,659.79194 c -0.29429,-0.88286 -0.73572,-12.50721 -0.73572,-12.50721 l -23.39583,-24.27869 -74.16038,0.44143"
			id="path116"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer116" inkscape:label="path116">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 641.39899,543.40134 22.07154,22.51298 0.44143,7.94575 45.61452,43.26022 50.76454,-0.14714 9.71148,-8.68148 50.91169,-0.44143 8.82861,9.12291 17.95152,-0.29429 6.32718,7.94576 -0.14714,54.14884 18.98152,17.51009 -0.14714,25.45585"
			id="path117"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer117" inkscape:label="path117">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 612.20809,487.76879 c 0.10405,0.52023 4.68208,5.30636 4.89018,5.82659 0.20809,0.52023 0.52023,10.09248 0.52023,10.09248 0,0 54.10404,53.16763 54.10404,53.68786 0,0.52023 0,13.10983 0,13.10983 0,0 38.70521,37.45665 39.12139,37.45665 0.41619,0 40.47399,-0.31214 40.47399,-0.31214"
			id="path119"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer118" inkscape:label="path118">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 625.10983,504 c 0,0 50.56647,50.56647 50.77456,51.91908 0.2081,1.3526 0.41619,13.31792 0.41619,13.31792 l 32.77457,31.21387 115.69942,-0.20809 8.21965,8.21965 16.6474,-0.10405 11.86127,11.65318 v 55.5607 l 18.20809,17.16763 0.10405,29.44508"
			id="path120"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer119" inkscape:label="path119">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 882.93642,721.45665 -0.10405,-30.69364 -17.89595,-17.16763 0.10404,-55.14451 -27.4682,-26.73989 -122.46243,-0.41618 -17.68786,-16.95954 0.31214,-14.67052 5.30635,-5.72254 -0.10404,-14.35838 -26.42775,-25.49133 -14.87861,-0.10405 -17.06358,-18 -0.62428,-25.28324 -44.53179,-44.3237 -48.38151,-0.20809 -7.38728,7.90752 h -16.12717 l -3.12139,-3.43353"
			id="path121"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer120" inkscape:label="path120">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 485.47977,428.25434 25.69942,-0.62428 11.44509,11.54913 h 22.68208 l 8.21965,-8.01156 43.90752,0.10405 41.72254,41.51445 0.52023,25.38728 c 0,0 18.93642,19.87283 19.3526,19.97688 0.41619,0.10405 16.43931,0.52023 16.43931,0.52023 l 22.57803,23.09827 -0.31213,11.96531 -8.73989,8.5318"
			id="path122"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer121" inkscape:label="path121">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 836.94798,601.90752 c 0,0 -6.34682,-6.03469 -7.28324,-6.13873 -0.93641,-0.10405 -119.34104,-0.41619 -119.34104,-0.41619 l -29.0289,-28.50867 -0.20809,-11.54913 7.90751,-7.80347 -0.10405,-6.13873 -17.16763,-17.68786 -16.4393,-0.31214 -27.15607,-28.30058 -0.83237,-18.31213 -37.87283,-37.66474"
			id="path123"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer122" inkscape:label="path122">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 886.02524,721.96011 -0.36786,-32.44516 -17.43652,-17.14223 -0.66215,-55.326 -28.47229,-28.47229 -122.71776,-0.44143 -15.59723,-14.78793 v -12.36006 l 5.95932,-6.03289 -0.14714,-16.55366 -27.88372,-27.51585 -15.67079,-0.73572 -14.93508,-16.40651 -0.36786,-24.7937 -47.08595,-46.27667 -59.07816,0.51501"
			id="path124"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer123" inkscape:label="path123">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 531.40914,423.25859 12.50721,-12.43364 65.55247,-0.0736 16.1858,17.28938 21.9244,0.14714 4.78217,-5.37074 0.14714,-13.90507 18.39295,-17.95152 24.86727,-0.36786 22.29226,-23.61655 0.29428,-23.39584 -5.81217,-7.21003 -0.58857,-107.04698 9.93219,-10.44719 0.22072,-38.40448 4.48788,-4.12003 -1.17715,-134.857113 -18.52782,-19.436694 -0.41618,-25.1791903"
			id="path125"
		/>
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 889.48311,721.7394 -0.515,-33.47517 -17.73081,-17.21581 -0.80929,-55.76742 -29.64944,-29.64944 -123.01205,-0.29429 -13.53721,-13.24292 -0.29429,-10.88863 5.88574,-4.7086 0.29429,-19.42295 -30.31158,-30.0173 h -14.12579 l -14.42007,-14.71436 0.29429,-25.01441 -5.88575,-5.59146 0.29429,-25.01441 13.8315,-12.94864 -0.88286,-11.18291 12.36006,-11.77149"
			id="path126"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer124" inkscape:label="path124">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 670.68056,412.29639 v 7.06289 l -12.36006,12.06578 0.58858,43.26022 -4.12003,3.53145 0.29429,13.24292 12.65435,12.06578 h 13.24293 l 32.96016,33.84303 -0.29428,20.01153 -5.59146,5.88574 0.29429,8.82862 10.59434,10.00576 123.60063,0.58858 32.0773,31.19444 v 56.20886 l 18.24581,17.65723 v 34.43161"
			id="path127"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer125" inkscape:label="path125">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 896.10457,721.59225 v -35.02018 l -17.95152,-18.54009 -0.88286,-56.20886 -33.54874,-32.66588 -123.01206,-0.58857 -3.53145,-4.12003 -0.29428,-40.02306 -34.43161,-34.4316 h -13.8315 L 658.3205,489.98821 v -9.71147 l 4.7086,-5.00289 -0.58858,-42.67164 12.94864,-13.24293 -0.58857,-13.24292 5.88574,-5.00289"
			id="path128"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer126" inkscape:label="path126">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 680.68633,412.29639 0.29429,8.24004 -15.59723,15.00865 0.58858,42.37736 -4.41431,3.82573 0.29429,6.76861 7.94575,7.65147 14.42008,0.58857 35.90304,37.37448 0.29428,38.84591 4.12002,3.23716 121.24634,-0.88286 35.60875,35.90304 v 55.32599 l 18.24581,18.83438 0.29429,36.49162"
			id="path129"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer127" inkscape:label="path127">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 902.87318,721.29797 902.2846,681.86348 884.0388,664.20625 V 608.58596 L 846.37003,572.09435 H 725.71227 l -2.64858,-2.64859 v -38.25734 l -39.1402,-38.84591 -12.36006,0.29429 -6.18004,-5.88575 v -4.70859 l 4.7086,-3.82573 -0.29429,-42.37736 16.1858,-15.89151 -0.29429,-14.71436 5.59146,-5.00289"
			id="path130"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer128" inkscape:label="path128">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.46175,671.26914 -10.88863,-10.00577 v -55.03171 l -42.37735,-41.49449 -91.52333,-0.29429 -26.78013,-27.36871"
			id="path131"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer129" inkscape:label="path129">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.16746,661.55766 -4.4143,-5.88574 -0.58858,-52.38313 -44.73165,-43.26022 -68.27464,-0.58857 -21.77725,-22.66012"
			id="path132"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer130" inkscape:label="path130">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.46175,597.99162 c 0,0 -40.31735,-40.90592 -42.96593,-41.78878 -2.64859,-0.88286 -67.09749,-0.88286 -67.09749,-0.88286 l -26.48585,-26.19157 -36.7859,0.29429 -56.79743,-57.09172 0.29429,-33.84303 16.48008,-15.89151 10.59434,0.29429 16.1858,-15.30294 -0.29429,-22.66011 8.82862,-8.53433 -0.58858,-36.19733 -5.88574,-6.7686 0.58857,-31.78302 4.12002,-4.7086 -0.88286,-27.36871 2.94287,-3.53145 -0.58857,-22.36583 -5.29717,-4.70859"
			id="path133"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer131" inkscape:label="path131">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 719.82653,258.08989 -0.29429,38.84591 -3.82573,3.82573 0.88286,35.60876 5.29717,5.59145 0.29429,33.54875 -8.53433,8.82861 -0.58858,21.77726 -10.30005,10.30005 h -7.65147 l -5.00288,-6.18003"
			id="path134"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer132" inkscape:label="path132">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.16746,592.98874 -40.61163,-40.02306 -66.8032,-1.17715 -27.663,-25.89728 -37.08019,-0.29428 -53.85456,-54.14885 0.29429,-31.48873 13.24292,-13.53721 h 11.77149 l 17.65724,-17.95152 -0.29429,-22.36583 7.94575,-7.65147 -0.58857,-46.20309 15.89151,-16.1858 -0.88286,-19.42296 -4.7086,-5.00288 v -14.71436 l 7.0629,-7.06289 -1.17715,-33.84303 -12.06578,-11.77149"
			id="path135"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer133" inkscape:label="path133">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 902.57889,577.6858 c 0,0 -30.90016,-31.19444 -32.07731,-31.48873 -1.17715,-0.29429 -9.71147,-0.29429 -9.71147,-0.29429 l -1.47144,-6.47431 11.77149,-11.18292 32.0773,-0.29429"
			id="path136"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer134" inkscape:label="path134">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 902.57889,518.23979 -35.31447,0.29428 -29.42872,27.663 -40.31735,-0.58857 -54.14884,-52.38313 -36.19733,-0.58857 -24.72013,-23.83727 -0.29428,-26.78013 11.18291,-10.30005 12.06578,0.58857 28.54586,-29.72301 -0.88287,-67.68606 20.60011,-22.9544 0.29429,-80.04612 c 0,0 -21.77726,-19.71725 -21.48297,-20.8944 0.29429,-1.17715 -0.88286,-174.512315 -0.88286,-174.512315 L 713.6465,19.717243 713.05792,-3.5314466"
			id="path137"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer135" inkscape:label="path135">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 719.23795,-3.8257338 0.29429,21.1886798 c 0,0 24.42584,22.660115 24.42584,23.837264 0,1.177149 1.17715,164.50655 1.17715,164.50655 l 19.12867,19.12867 0.58857,115.0663 -22.36583,23.24869 0.58858,32.07731 13.53721,14.12579 v 21.77725 l -8.24004,7.65147 -27.95729,0.88286 -7.35718,8.53433"
			id="path138"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer136" inkscape:label="path136">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 739.54377,427.01075 -15.59722,0.29429 -15.00865,12.94863 h -10.59434 l -4.70859,4.41431 -0.58858,13.53721"
			id="path139"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer137" inkscape:label="path137">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 901.99032,510.88261 -37.96306,0.88286 -28.84014,28.54586 -34.13732,-0.29429 c 0,0 -55.03171,-53.26599 -56.50314,-53.56027 -1.47144,-0.29429 -35.31447,0.29428 -35.31447,0.29428 l -13.53721,-13.24292 1.17715,-9.41719 6.7686,-5.88575"
			id="path140"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer138" inkscape:label="path138">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 902.87318,495.57967 -37.08019,0.29429 -6.76861,6.7686 -0.58857,8.24005 -25.01442,25.3087 -32.0773,-0.29429 -54.73742,-53.26599 -34.43161,-0.58857 -8.82861,-9.1229 v -5.88575"
			id="path141"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer139" inkscape:label="path139">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 902.2846,489.39964 c -2.06001,0 -39.1402,0.88286 -39.1402,0.88286 l -17.36294,17.06866 h -35.90304 l -30.60587,-30.0173 c 0,0 -57.97458,1.17715 -58.85745,0 -0.88286,-1.17715 -8.24004,-8.53433 -8.24004,-8.53433"
			id="path142"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer140" inkscape:label="path140">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 833.42139,519.12265 807.52412,518.23979 779.27255,490.2825"
			id="path143"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer141" inkscape:label="path141">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 832.53853,530.01128 -24.42584,0.29428 -42.67164,-40.02306"
			id="path144"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer142" inkscape:label="path142">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 723.94655,448.49372 3.23716,-4.41431 h 22.36583 l 12.06577,-10.88863 -0.88286,-25.89727 -14.42007,-14.12579 0.58857,-27.95729 21.77726,-22.66011 V 223.06971 L 749.25525,203.05818 748.0781,40.023061 723.65226,15.302935 723.35798,-3.2371594"
			id="path145"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer143" inkscape:label="path143">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 727.77228,-2.3542977 V 14.714361 l 24.72013,24.720126 0.29429,49.440252 5.59145,6.180032 -1.47143,13.831499"
			id="path146"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer144" inkscape:label="path144">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 768.97249,108.59198 767.20677,94.760483 759.84959,87.109016 759.26102,39.434487 741.89807,22.071541 V -3.2371594"
			id="path147"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer145" inkscape:label="path145">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 733.36374,6.4743187 0.29429,-10.0057653"
			id="path148"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer146" inkscape:label="path146">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 778.68397,107.12055 778.0954,100.35194 762.49818,84.754718 763.38104,37.963051 745.7238,20.894392 V -3.5314466"
			id="path149"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer147" inkscape:label="path147">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 796.92978,124.48349 796.34121,104.47196 769.85536,78.280399 V 35.608753 l -13.24293,-12.948637 0.29429,-26.1915626"
			id="path150"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer148" inkscape:label="path148">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 835.4814,238.37264 7.0629,-7.06289 -0.58858,-35.90304 -32.96016,-33.54874 -0.58858,-57.09172 -29.13443,-27.957287 -0.29429,-39.434487 -9.71148,-10.300052 V -3.8257338"
			id="path151"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer149" inkscape:label="path149">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 773.09252,-2.0600105 V 27.074424 l 10.00576,8.534329 0.58857,40.317349 29.13444,28.545858 0.29429,57.38601 32.66588,32.07731 0.58857,113.30057 -10.59434,8.24005"
			id="path152"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer150" inkscape:label="path150">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 777.50682,-3.2371594 V 24.720126 l 9.71148,9.711478 v 40.317349 l 29.13444,29.134437 0.58857,56.50314 32.66588,32.96017 0.58858,258.08989 25.3087,24.13155 27.36871,-0.88286"
			id="path153"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer151" inkscape:label="path151">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.16746,467.3281 -18.54009,0.58857 -13.53721,-13.8315 -0.58858,-69.15749 L 857.84723,371.97904 856.08151,188.63811 824.29849,155.97222 822.23848,38.845912 791.63261,8.5343293 791.33832,-3.2371594"
			id="path154"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer152" inkscape:label="path152">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 805.16982,-2.0600105 804.28696,7.9457548"
			id="path155"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer153" inkscape:label="path153">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 816.05845,-2.3542977 0.88286,20.6001047 17.36295,16.185797 1.47143,118.597746 30.60587,30.0173 1.17715,121.83491 11.4772,11.77148 2.06001,116.83203"
			id="path156"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer154" inkscape:label="path154">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 881.6845,450.84801 7.35718,-9.1229 -1.17715,-130.36924 -10.59434,-11.4772 -1.17715,-120.06918 -31.78302,-32.3716 -0.49499,-150.7673698"
			id="path157"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer155" inkscape:label="path155">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 848.18497,-3.1213873 c 0,1.0404624 0.62428,149.6184973 0.62428,149.6184973 l 31.63006,31.63006 1.04046,120.90173 11.0289,10.82081 0.83237,146.9133"
			id="path158"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer156" inkscape:label="path156">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.53757,447.19075 -6.65896,-8.3237 -0.41618,-131.09826 -11.44509,-10.40463 -0.41618,-121.31792 -31.83815,-31.42196 -1.24856,-149.6184997"
			id="path159"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer157" inkscape:label="path157">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 903.53757,441.57225 -2.49711,-4.99421 -0.62427,-130.89018 -11.02891,-11.23699 -1.04046,-120.48555 -31.63006,-31.21387 -1.24855,-146.7052072"
			id="path160"
		/>
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 862.95954,-2.7052023 V 2.4971098"
			id="path161"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer158" inkscape:label="path158">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 864,75.121387 -0.20809,-21.433526 5.82659,-5.410404 -0.20809,-52.2312142"
			id="path162"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer159" inkscape:label="path159">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 875.65318,-2.9132948 0.83237,82.8208098 -13.9422,14.358381 0.2081,42.867054 22.26589,19.97688"
			id="path163"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer160" inkscape:label="path160">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 890.84393,-2.7052023 c 0.20809,1.6647399 0.83237,9.7803468 0.83237,9.7803468 l -9.57225,9.7803465 0.62427,105.710979 11.237,10.82081 1.45665,147.32948 8.1156,7.28324"
			id="path164"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer161" inkscape:label="path161">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 892.86741,97.114781 891.10169,22.365828 904.05033,10.59434"
			id="path165"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer162" inkscape:label="path162">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.74566,400.78613 h 9.15607 l 5.82659,4.57803 20.39307,-0.83237 4.16185,3.74567 8.73988,-0.83237 12.48555,12.06936 h 24.9711 l 10.40462,-12.48555 118.61272,-0.41618 18.72832,-19.97688 h 24.9711 l 20.80925,-21.64162 -0.83237,-22.47399 -5.4104,-4.16185 -0.41619,-111.12139 9.57226,-9.57225 v -36.62428 l -8.73989,-9.15607 -0.41618,-11.23699 -10.40463,-9.15607 0.41619,-18.72832 9.57225,-9.57226 -0.41618,-64.924854 9.15607,-9.572254"
			id="path166"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer163" inkscape:label="path163">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 720.62428,171.05202 -1.04046,-84.693638 -3.32948,-3.953758"
			id="path167"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer164" inkscape:label="path164">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 715.00578,163.97688 v -12.27746 l -4.36994,-3.95376 0.41618,-14.15028 5.82659,-6.24278 V 93.017341 l -4.57803,-0.208092 0.20809,31.421961 -6.65896,7.49133 -0.20809,11.02891"
			id="path168"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer165" inkscape:label="path165">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 710.84393,39.745665 -0.41618,11.028902 -5.6185,5.202312 0.62428,66.589591 -10.19654,9.98844 0.41619,21.01734 9.78035,10.61272 0.20809,9.57226 8.94798,8.94797 0.62427,33.71099 -9.78034,10.19653 0.62427,113.20231 5.41041,5.6185 0.41618,20.18497 -19.1445,18.31214 -25.1792,0.83237 -19.1445,18.93641 -118.40463,0.62428 -10.61272,11.65318 -16.02312,-0.41619 -8.1156,-8.53179"
			id="path169"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer166" inkscape:label="path166">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.53757,396 10.61272,0.20809 4.78613,5.20232 c 0,0 48.06936,-1.04047 48.69364,-0.2081 0.62428,0.83237 3.32948,4.16185 3.32948,4.16185 v 4.36994 l 3.74566,3.53758 11.65318,-0.62428 10.19653,-11.86127 h 118.82081 l 18.72833,-19.14451 25.59537,-0.20809 17.27168,-18.10405 -0.83237,-17.06358 -5.41041,-6.24278 -0.20809,-115.28324 9.98844,-9.98843 -0.62428,-31.42197 -8.73988,-8.11561 -0.83237,-10.19653 -9.78035,-10.19653 -0.41618,-23.93064 9.98844,-9.57225 -0.83237,-54.936417"
			id="path170"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer167" inkscape:label="path167">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 693.78035,75.121387 5.4104,7.49133 v 37.040463 l -9.98844,10.19653 0.62428,26.42775 9.98844,10.19653 -0.20809,10.40462 9.57225,9.57226 -0.20809,27.88439 -9.15607,8.94798 v 117.57225 l 6.03468,7.07515 -0.20809,13.94219 -16.85549,17.27168 -23.72255,0.20809 -19.76878,18.93642 -106.33526,-0.20809 -7.28324,-7.90752 h -5.4104 l -4.57804,4.78613 -68.87861,0.20809 -7.07515,-7.07514 h -11.0289"
			id="path171"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer168" inkscape:label="path168">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 436.78613,392.67052 h 9.15607 l 6.24277,5.41041 53.06359,0.20809 7.90751,8.1156"
			id="path172"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer169" inkscape:label="path169">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 549.57225,392.04624 4.78613,3.53758 89.89596,-0.2081 18.31213,-18.52023 25.1792,-0.62428 14.98265,-15.81502 -0.41618,-12.90174 -6.24278,-4.99422 0.62428,-174.3815 -10.19653,-11.237 v -28.71676 l 10.19653,-10.40462 -0.20809,-23.930639 -11.23699,-9.988439"
			id="path173"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer170" inkscape:label="path170">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 684.62428,96.138728 7.69942,7.283242 0.62428,14.15028 -9.57226,10.40463 -0.20809,31.42196 10.19653,10.40463 0.41619,64.71676 -10.61272,10.61272 -30.3815,-1.66474 -30.17341,29.75722 -29.13295,0.62428 -31.42197,31.21387 -49.7341,0.2081 c 0,0 -12.90173,13.7341 -13.7341,13.52601 -0.83237,-0.20809 -10.82081,-0.20809 -10.82081,-0.20809 l -3.32948,4.99422"
			id="path174"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer171" inkscape:label="path171">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 538.75145,385.17919 h -11.86128 l -7.28323,6.24278 -65.96532,0.41618 -7.28324,-7.69942 h -9.36416"
			id="path175"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer172" inkscape:label="path172">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 438.86705,376.02312 4.57804,-0.20809 11.65318,12.48555 h 63.88439 l 10.19653,-9.78035 -0.20809,-7.28324 7.69942,-6.86705"
			id="path176"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer173" inkscape:label="path173">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.32948,371.0289 14.35838,-0.20809 3.32948,2.08092 58.68208,-0.83237 22.2659,-22.68208 28.09248,0.2081 33.2948,33.91907 35.58382,0.41619 10.61271,-11.65318 -0.41618,-5.41041"
			id="path177"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer174" inkscape:label="path174">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 485.27168,383.09827 4.78612,-7.28324 22.68208,-0.41619 22.47399,-22.26589 25.17919,-0.41619 34.33526,34.12717 38.08093,0.20809 18.31214,-18.52023 25.17919,-0.20809 8.11561,-8.11561 0.62427,-6.65896"
			id="path178"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer175" inkscape:label="path175">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 507.74567,382.47399 4.36994,-0.20809 26.01156,-24.55492 h 21.84971 l 33.50289,32.25434 h 40.57803 l 18.52024,-18.31214 h 26.01156 l 13.94219,-15.19075 6.45087,0.20809"
			id="path179"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer176" inkscape:label="path176">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 437.41041,367.07514 c 0.83237,0 39.32947,0.2081 39.32947,0.2081 l 8.3237,-8.94798"
			id="path180"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer177" inkscape:label="path177">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 434.08093,362.08093 34.33526,-0.2081 17.06358,-16.02312"
			id="path181"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer178" inkscape:label="path178">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 436.78613,358.54335 26.01156,-0.83237 17.89595,-17.27167 6.03468,-0.2081 6.24278,5.20232 8.94798,0.41618 19.97687,-19.76878 82.19654,-0.2081 35.16763,34.54336 19.76878,0.83237"
			id="path182"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer179" inkscape:label="path179">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 671.09827,362.28902 -9.36417,-9.15607 -23.09826,-0.62428 -32.46243,-31.21387 -85.9422,-0.20809 -18.31213,17.47976 -5.20232,0.41619"
			id="path183"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer180" inkscape:label="path180">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 436.36994,349.80347 21.22544,-0.62428 9.36416,-9.36416 7.90751,0.41618 4.16185,-4.57803 11.0289,-0.20809 6.86706,-6.86705 8.1156,-0.2081 13.52601,-12.90173 90.52024,-0.20809 31.42196,31.63005 h 31.83815"
			id="path184"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer181" inkscape:label="path181">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 651.32948,318.3815 0.41619,7.07515 -7.07515,7.49133 -10.82081,-0.2081 -22.47399,-21.43352 h -96.13873 l -13.31791,13.31792 h -6.03469 l -7.49133,7.28323 -11.44508,-0.41618 -4.16185,4.57803 h -7.90752 l -9.57225,9.36417 -19.56069,0.62427"
			id="path185"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer182" inkscape:label="path182">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 436.36994,341.47977 c 1.24856,0 17.68786,0 17.68786,0 l 12.69365,-12.69364 20.60115,-0.20809 6.86705,-6.24278 7.07515,-0.62428 c 0,0 11.44508,-13.31792 12.48555,-13.10982 1.04046,0.20809 51.39884,-0.2081 51.39884,-0.2081 l 31.21387,-31.42196 h 28.71677 c 0,0 8.73988,-9.78035 9.57225,-9.78035 0.83237,0 16.43931,0 16.43931,0"
			id="path186"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer183" inkscape:label="path183">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.74567,337.9422 15.60693,-0.83237 51.81503,-50.77457 48.69364,0.62428 55.5607,-55.76879 -0.41619,-126.31214 13.9422,-14.150286"
			id="path187"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer184" inkscape:label="path184">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 685.24856,109.66474 -9.78035,9.57225 0.62428,30.79769"
			id="path188"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer185" inkscape:label="path185">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 671.51445,219.53757 670.68208,84.485549 703.56069,50.566474 703.14451,39.32948 708.9711,33.50289"
			id="path189"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer186" inkscape:label="path186">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 704.80925,26.635838 -4.57804,3.953757 -0.41618,18.936417 -32.25434,33.710982 0.83237,125.687866 -3.74566,3.32948 1.45665,14.98265"
			id="path190"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer187" inkscape:label="path187">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 661.10983,218.9133 0.20809,-7.28324 3.53757,-4.57804 -0.62428,-125.687858 32.67052,-33.086705 -0.20809,-28.924856 4.78613,-4.578035 -0.20809,-18.1040458"
			id="path191"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer188" inkscape:label="path188">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 695.44509,2.2890173 0.20809,10.4046247 -2.08092,2.080924 0.20809,32.462428 -32.46243,33.50289 0.41618,125.479766 -5.4104,6.45087 v 13.52601"
			id="path192"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer189" inkscape:label="path189">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 651.74567,219.12139 -0.2081,-5.20231 7.07515,-8.73989 -0.62428,-126.312138 32.67052,-33.086705 -0.41618,-36.6242776"
			id="path193"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer190" inkscape:label="path190">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 685.24856,1.6647399 -0.2081,9.3641621 2.08093,2.705202 0.20809,31.213873 -31.63006,32.462428 -0.41618,126.520235 -8.3237,9.57225 v 13.31792"
			id="path194"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer191" inkscape:label="path191">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 641.54913,219.32948 v -5.20231 l 11.02891,-12.48555 -0.2081,-125.271678 31.42197,-32.046243 -0.41619,-31.83815 -3.32948,-4.3699421"
			id="path195"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer192" inkscape:label="path192">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 680.04624,8.3236994 0.2081,34.5433526 -31.21388,31.83815 0.41619,126.312138 -13.52601,14.15029 v 11.65318"
			id="path196"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer193" inkscape:label="path193">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 632.39306,219.12139 v -4.16185 l 14.56648,-15.81503 -0.62428,-126.728325 31.00578,-31.213873 -0.83237,-28.716763 3.95376,-3.9537571"
			id="path197"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer194" inkscape:label="path194">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 626.56647,226.61272 c 0,-1.04047 0.41619,-11.65318 0.41619,-11.65318 l 16.6474,-16.85549 -0.20809,-126.728327 30.79768,-30.797688 -0.62427,-32.2543356 6.45086,-6.0346821 v -5.6184971"
			id="path198"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer195" inkscape:label="path195">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 622.40463,219.32948 0.10404,-4.89017 18.31214,-17.89596 -0.72832,-126.624275 30.58959,-30.797688 V 4.9942197 l 3.74567,-3.1213873"
			id="path199"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer196" inkscape:label="path196">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 616.99422,226.82081 v -11.65318 l 20.60116,-19.76879 V 68.462428 l 30.3815,-30.381503 V 2.4971098 l 6.24277,-5.8265896"
			id="path200"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer197" inkscape:label="path197">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 612.83237,218.7052 v -4.57803 l 22.0578,-20.80925 -0.83237,-126.728325 30.17341,-30.17341 -0.62427,-34.5433526 5.82659,-5.4104047"
			id="path201"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer198" inkscape:label="path198">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.95376,332.73988 15.39884,-0.20809 50.35838,-49.52601 48.90174,0.41619 53.47977,-53.68787 -0.21512,-135.562191 16.48008,-16.480084"
			id="path202"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer199" inkscape:label="path199">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 434.66222,328.42453 16.48008,-0.58857 49.14597,-47.96882 48.85167,-0.29429 51.79455,-50.91168 V 77.397538 l 8.53433,-8.240042 16.77437,0.294287 34.43161,-33.84303 V 0.58857443 l 4.41431,-4.41430823"
			id="path203"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer200" inkscape:label="path200">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.83937,324.30451 h 14.42007 l 48.55739,-47.38024 48.2631,-0.29429 50.32312,-50.6174 V 75.926102 l 10.30005,-10.005766 17.95152,0.294287 31.48873,-32.077306 V -0.29428722 l 2.94287,-3.23715938"
			id="path204"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer201" inkscape:label="path201">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 434.07364,319.8902 15.30294,0.29429 12.36006,-12.06578 0.58858,-12.06577 6.47431,-6.76861 6.76861,-0.29428 20.01153,-20.30582 48.85168,0.58857 45.61452,-47.08595 V 73.571804 L 607.7031,55.914571 h 12.06578"
			id="path205"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer202" inkscape:label="path202">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.54508,316.06447 13.8315,-0.29429 9.1229,-9.1229 0.29429,-26.19156 19.42296,-19.42296 13.53721,-0.29429 5.00288,5.29717 h 45.90881 l 44.43736,-45.9088 -0.29428,-147.437898 22.07154,-22.660115 h 23.54298 l 17.65723,-18.245808 -0.58858,-35.3144656"
			id="path206"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer203" inkscape:label="path203">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 654.49477,-2.9428722 -0.88286,36.1973272 -30.0173,29.134435 -16.77437,0.588574 -13.24293,12.65435 0.58858,149.497906 -48.85168,47.67453 -47.38024,0.58857 -21.48297,20.8944 -5.59146,0.29428 -3.53144,4.41431"
			id="path207"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer204" inkscape:label="path204">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 434.36793,311.35587 c 1.47144,0 14.42007,0 14.42007,0 l 6.18004,-5.59145 0.58857,-26.48585 21.18868,-21.77726 15.89151,-0.29428 5.29717,4.70859 43.26022,0.29429 42.37736,-42.67165 V 72.100368 L 607.7031,46.791667 h 23.24869 L 646.25473,30.60587 V -3.5314466"
			id="path208"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer205" inkscape:label="path205">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.83937,307.23585 12.06577,0.58858 5.00288,-4.41431 -0.29428,-25.89728 22.66011,-22.66011 17.65724,-0.29429 6.47431,4.12002 h 39.43449 l 41.20021,-40.61163 0.29429,-52.08884 -5.00288,-4.7086"
			id="path209"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer206" inkscape:label="path206">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.54508,299.2901 h 6.18003 l 7.65147,-7.06289 -0.29429,-16.1858 30.60587,-28.84015 37.37448,-0.88286 -0.88286,-3.23716 h -13.53722 l -0.29428,-3.23716 14.71436,-0.29429 -0.29429,-3.82573 -13.24292,-0.29429 -0.29429,-3.53144 14.71436,-0.58858 -0.58858,-3.23716 -7.94575,-0.29429 -0.58857,-2.94287 8.82861,-0.58857 -0.29429,-7.35718 24.42584,-24.13155 20.8944,-0.29429 13.8315,-14.71436 v -7.06289"
			id="path210"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer207" inkscape:label="path207">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 435.54508,290.46148 5.00288,0.29429 4.41431,-5.88575 -0.58857,-11.77148 37.96305,-38.84592 11.18291,-0.58857 59.44602,-57.6803 h 14.42007"
			id="path211"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer208" inkscape:label="path208">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 434.9565,281.92715 5.29717,-0.58857 -0.29428,-2.3543 0.58857,-9.41719 4.12002,-3.82573 -0.29428,-5.29717 11.4772,-10.88863 -0.29429,-11.18292 -2.94287,-2.94287 0.58857,-11.4772 23.24869,-22.07154 17.65723,0.29429 82.989,-83.57757 0.29429,-48.85168 28.54586,-29.428721 h 23.83726 l 11.18292,-12.654351 -0.29429,-31.4887318"
			id="path212"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer209" inkscape:label="path209">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 432.60221,278.39571 c 1.47143,-0.58858 4.12002,-3.82574 4.12002,-3.82574 l -0.29429,-6.47432 3.53145,-3.53144 -0.29429,-14.71436 3.82573,-3.53145 -0.88286,-20.30582 31.19445,-30.90016 17.65723,-0.29428 79.75184,-80.34041 V 67.68606 l 33.25445,-33.254456 22.07154,-0.294287 7.94576,-8.240042 0.29428,-30.017296"
			id="path213"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer210" inkscape:label="path210">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 644.19471,-2.9428722 -0.58857,33.5487422 -13.24292,12.948638 -23.54298,0.294287 -27.07443,27.368711 0.58858,52.088834 -23.54298,22.36583 v 9.41719 l -3.82573,4.12002 h -7.35718 l -53.56028,53.26599 -21.77725,-0.29429 -14.71436,14.42008 0.29429,9.41719 4.70859,4.12002"
			id="path214"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer211" inkscape:label="path211">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 563.26573,81.811846 -0.58857,29.428724"
			id="path215"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer212" inkscape:label="path212">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 637.42611,-3.5314466 -0.29429,30.3115836 -9.71148,10.888627 -21.48296,0.588574 -32.3716,30.900158 0.88286,47.085954 -81.51755,82.10613 -17.65724,0.88286 -27.95728,28.84015"
			id="path216"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer213" inkscape:label="path213">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 483.21961,206.88391 8.24004,-0.58857 54.73742,-52.38313 h 5.88575"
			id="path217"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer214" inkscape:label="path214">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 472.91956,217.77254 17.95152,-0.88286 c 0,0 54.73742,-55.91457 56.79743,-55.62029 2.06001,0.29429 8.24004,0.29429 8.24004,0.29429 l 3.82573,-5.88574 0.29429,-8.82862 6.18003,-6.18003 5.59146,0.88286 3.82573,4.41431 0.29429,6.7686"
			id="path218"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer215" inkscape:label="path215">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 461.73664,228.66117 h 3.23716 l 4.41431,-5.00289 4.70859,-0.29428 2.94288,-3.82574 17.06865,0.58858 55.326,-55.91457 7.35718,0.58857 5.29717,-5.88574 0.58858,-6.18004 5.29717,-4.70859"
			id="path219"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer216" inkscape:label="path216">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 473.21384,228.95545 4.41431,-5.59145 15.59722,-0.29429 57.09172,-55.62028 h 8.82862 l 9.1229,-10.88863"
			id="path220"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer217" inkscape:label="path217">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 484.39676,228.36688 8.24004,0.29429 58.56315,-57.38601 12.65435,-0.88286 5.59146,-5.29717"
			id="path221"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer218" inkscape:label="path218">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 620.94602,-2.0600105 -0.58857,28.8401475 -6.18003,5.297169 -11.77149,0.882862 -35.31447,34.431604 0.88287,46.497378 -78.2804,77.98611 -16.48009,0.58858 -36.49161,35.31446"
			id="path222"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer219" inkscape:label="path219">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 445.84513,211.00393 24.42584,-24.72012 16.48008,-0.88286 12.06578,-12.06578"
			id="path223"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer220" inkscape:label="path220">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 438.19366,218.06683 -6.18003,7.65146 0.29429,49.14597"
			id="path224"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer221" inkscape:label="path221">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 427.59932,271.6271 -0.58857,-7.94575 2.3543,-2.3543 -0.29429,-42.67165 40.31735,-40.31735 14.71436,-0.58857 6.47432,-5.59146"
			id="path225"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer222" inkscape:label="path222">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 419.06499,271.6271 0.29429,-20.89439 6.76861,-7.65147 -0.29429,-24.42584 -4.12002,-4.70859 0.29429,-5.59146 4.70859,-2.94287 55.326,-53.56028 35.02018,0.29429 14.42007,-14.42007 -0.58857,-22.66012 9.71147,-9.1229 -0.29428,-15.597225 -8.82862,-8.828616 -0.29429,-16.185797 29.42873,-28.840147 9.1229,-0.588575 20.01153,-20.894392 -0.29429,-18.2458074"
			id="path226"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer223" inkscape:label="path223">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 543.54849,127.72065 5.29717,-5.59146 0.58857,-39.72877 51.79455,-52.971698 11.18292,0.588574 5.29717,-5.591457 V -3.5314466"
			id="path227"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer224" inkscape:label="path224">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 614.76599,-2.3542977 -0.29428,25.6029877 -4.12003,3.237159 -10.00576,-0.294287 -35.90304,35.314466 -7.06289,-0.294287 -7.65147,7.062893"
			id="path228"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer225" inkscape:label="path225">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 562.38287,56.208858 h 3.82573 l 37.37448,-37.374476 -0.29429,-21.1886797"
			id="path229"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer226" inkscape:label="path226">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 594.46018,-2.9428722 c 0,1.1771489 0.58857,18.8343822 0.58857,18.8343822 l -24.13155,24.425839 -8.82862,-0.588575 -26.48585,27.662998 v 12.360063 l 9.71148,7.357181 0.29429,21.482964 -10.00577,10.30006 -0.88286,19.71724 -15.59722,18.54009 -35.31447,0.29429 -55.91457,54.73742"
			id="path230"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer227" inkscape:label="path227">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 409.94209,272.21567 v -33.84303 l -4.41431,-5.59145 c 0,0 0.29429,-49.73454 0.88286,-51.20598 0.58858,-1.47143 36.78591,-36.7859 36.78591,-36.7859 h 15.00864 l 25.01442,-25.3087 0.58857,-41.494498 16.77437,-15.302935 11.77149,-0.294287 49.73454,-49.73454 -0.58857,-15.3029349"
			id="path231"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer228" inkscape:label="path228">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 535.01416,104.47196 -8.82862,-10.888625 -0.58857,-30.017296 32.37159,-33.548743 h 9.41719 l 16.1858,-17.657233 -0.58858,-16.1857968"
			id="path232"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer229" inkscape:label="path229">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 536.19131,93.289047 -6.76861,-5.29717 -0.29429,-24.425838 30.90016,-30.311584 8.82862,-0.588574 18.54009,-19.717244 -0.88286,-16.4800836"
			id="path233"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer230" inkscape:label="path230">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 557.67427,-2.9428722 V 10.888627 l -46.79166,46.203093 -12.94864,0.588574 -19.12867,19.422956 0.29429,40.02306 -22.36583,23.24869 -15.59722,0.58858 -10.00577,9.1229 -4.70859,0.29429 -25.01442,25.3087 0.29429,61.21174 3.82573,3.53145 v 32.96016"
			id="path234"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer231" inkscape:label="path231">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 415.23926,273.09854 c 0.29429,-2.64859 -0.29429,-22.36583 -0.29429,-22.36583 l 7.65147,-9.12291 -0.29429,-22.07154 -5.00288,-5.29717 1.17715,-8.53433 5.59146,-2.94287 55.91457,-53.85456 c 0,0 33.84303,1.47144 35.31446,0 1.47144,-1.47144 13.53722,-14.12579 13.53722,-14.12579 l -1.17715,-23.83726"
			id="path235"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer232" inkscape:label="path232">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 402.29062,271.03853 v -17.95152 l -5.88574,-5.88575 0.58857,-49.44025 -9.41719,-8.24004 -1.17715,-15.89151 75.33753,-73.27752 1.47144,-35.314465"
			id="path236"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer233" inkscape:label="path233">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 443.19655,131.84067 c 1.17715,-1.17715 26.19156,-26.19156 26.19156,-26.19156 l -1.47144,-35.314465 24.72013,-22.954403 12.06577,0.588574 39.72878,-39.728774 -0.29429,-11.4772014"
			id="path237"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer234" inkscape:label="path234">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 432.30792,139.78643 4.41431,-2.94287 18.24581,-0.58858 19.71724,-20.89439 0.29429,-41.200212 21.77725,-20.01153 12.36006,-0.294288 c 0,0 43.55451,-44.1430819 44.14309,-45.614518 0.58857,-1.471436 -0.88287,-12.360063 -0.88287,-12.360063"
			id="path238"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer235" inkscape:label="path235">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 398.46489,273.68711 -0.88286,-21.18868 -4.41431,-4.70859 0.29429,-47.96882 -9.41719,-8.53433 -0.58858,-18.24581 4.7086,-6.47432 0.29428,-8.53433 26.19157,-24.42583 -0.58858,-27.95729 -31.78302,-32.371593 v -9.711478 l 48.55739,-49.145965 39.72878,0.294287 17.06866,-17.6572332"
			id="path239"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer236" inkscape:label="path236">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 400.23061,155.97222 17.95152,-19.42295 -0.58857,-32.07731 -20.60011,-20.894391 0.88287,-30.60587 34.4316,-35.314466 h 40.02306 L 492.6368,-3.5314466"
			id="path240"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer237" inkscape:label="path237">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 425.53931,124.1892 5.00289,-5.88574 0.58857,-10.30005 -26.78014,-26.780139 V 55.031709 l 30.31159,-30.311583 40.90592,-0.294287 27.07442,-27.3687112"
			id="path241"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer238" inkscape:label="path238">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 424.65645,113.30058 0.58858,-6.47432 -24.42584,-24.131552 V 53.560273 l 32.96017,-31.783019 40.31734,-0.294287 24.13156,-25.3087008"
			id="path242"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer239" inkscape:label="path239">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 482.63103,-3.2371594 467.91667,10.59434 429.65933,11.182914 378.74765,62.094602 v 12.654351 l 31.78302,33.548747 v 24.42583 l -27.663,27.663"
			id="path243"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer240" inkscape:label="path240">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 478.21673,-2.9428722 C 477.03958,-2.3542977 465.56237,7.6514676 465.56237,7.6514676 L 427.30504,8.240042 374.92191,60.917454 v 16.774371 l 32.66588,32.960165 v 20.30582 l -9.1229,9.71148 -5.88574,-0.58858 -16.48009,17.36295 0.88286,52.08884 8.82862,9.71148 -1.17715,51.50026"
			id="path244"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer241" inkscape:label="path241">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 394.34487,270.15566 -0.29429,-15.00864 -4.70859,-5.59146 1.17715,-22.36583"
			id="path245"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer242" inkscape:label="path242">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 376.98192,270.74424 0.29429,-28.84015 5.29717,-7.94575 0.58857,-13.8315 -10.30005,-8.82862 0.58858,-56.50314 19.42295,-20.01154"
			id="path246"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer243" inkscape:label="path243">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 366.68187,270.44995 0.88286,-24.42584 9.71148,-10.59434 v -12.65435 l -7.06289,-7.65147 -0.29429,-88.28616 c 0,0 -18.24581,-19.12867 -19.42296,-19.12867 -1.17715,0 -7.35718,0.88286 -7.35718,0.88286"
			id="path247"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer244" inkscape:label="path244">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 359.61898,272.50996 0.29428,-25.3087 11.47721,-13.53721 0.58857,-10.00577 -6.47432,-6.18003 c 0,0 1.47144,-87.4033 0.29429,-87.99188 -1.17715,-0.58857 -15.59722,-16.18579 -15.59722,-16.18579"
			id="path248"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer245" inkscape:label="path245">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 355.79324,272.80425 v -27.95729 l 8.82862,-9.1229 -0.29429,-7.94576"
			id="path249"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer246" inkscape:label="path246">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 351.08465,271.03853 -1.47144,-28.25158 5.00288,-5.29717 v -51.50026 l -7.94575,-7.65147"
			id="path250"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer247" inkscape:label="path247">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 343.13889,270.15566 -1.47143,-27.95728 7.06289,-6.76861 -0.88286,-47.67453 -7.06289,-5.88574 V 171.56945 L 313.41588,144.78931 312.23874,-4.120021"
			id="path251"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer248" inkscape:label="path248">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 319.59592,127.13208 c -0.29429,-1.17715 -0.88287,-67.686062 -0.88287,-67.686062 l -2.35429,-3.23716 V -3.5314466"
			id="path252"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer249" inkscape:label="path249">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 376.09906,146.55503 -0.29429,-18.2458 -24.42583,-23.83727 h -5.00289 l -4.12002,-4.12002 -0.29429,-78.868973 -7.65146,-6.180032 -10.30006,0.294287"
			id="path253"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer250" inkscape:label="path250">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 382.86767,124.1892 -28.84015,-27.368706 0.29429,-50.911688 -4.12002,-4.120021 -0.58858,-44.7316572"
			id="path254"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer251" inkscape:label="path251">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 350.49607,98.586217 V 72.100368 l -4.70859,-5.002883 -0.29429,-57.9745813 -7.35718,-8.82861648 h -15.30293"
			id="path255"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer252" inkscape:label="path252">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 396.69917,124.77778 6.7686,-5.88574 -1.76572,-7.0629 -33.25446,-33.843028 V 56.797433 L 386.10483,38.845912 V 28.251573 c 0,0 21.77725,-20.6001054 21.48296,-22.0715415 -0.29428,-1.4714361 -0.58857,-6.47431872 -0.58857,-6.47431872 L 400.23061,-1.1771489 381.69052,17.362946 375.51049,18.245807 363.739,30.311583"
			id="path256"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer253" inkscape:label="path253">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 364.03329,17.95152 374.62763,5.8857443 375.2162,-4.4143082"
			id="path257"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer254" inkscape:label="path254">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 396.11059,114.77201 -19.12867,-1.47143 -19.42295,-17.362948 -0.88286,-52.088837 -1.76573,-3.531446 -0.29429,-44.43737"
			id="path258"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer255" inkscape:label="path255">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 391.99057,30.60587 424.65645,-2.3542977"
			id="path259"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer256" inkscape:label="path256">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 363.44471,69.157496 362.85614,47.085954 381.98481,31.194445 V 24.425839 L 402.58491,4.7085954"
			id="path260"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer257" inkscape:label="path257">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 334.60456,271.03853 -0.29428,-20.01154 -2.94288,-3.53144 1.47144,-27.663 -25.89727,-24.72013 -0.29429,-23.54297 -11.4772,-11.77149 v -17.36295 l -8.53433,-8.53433 -0.29429,-7.94575 -3.23716,-3.53145 0.29429,-45.025942 -9.71148,-9.417191 0.29429,-71.5117936"
			id="path261"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer258" inkscape:label="path258">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 299.87867,129.48637 -0.29428,-22.07154 -6.76861,-7.651464 -0.29429,-59.15173 -3.23716,-6.768606 0.58858,-35.9030405"
			id="path262"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer259" inkscape:label="path259">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 307.82443,72.983229 306.64728,-2.9428722"
			id="path263"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer260" inkscape:label="path260">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 330.77883,273.68711 -1.17715,-19.42296 -3.23716,-3.53144 0.58858,-29.72301 -46.49738,-46.79167 -0.29429,-5.29717 4.12002,-2.64858 -1.17715,-18.83439 -11.18291,-11.77148 0.29428,-8.82862 4.12003,-4.12002 V 80.634697 l -9.4172,-9.122904 -0.29428,-75.631814"
			id="path264"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer261" inkscape:label="path261">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 270.74424,-2.6485849 270.15566,69.74607 280.75,80.634697 l -0.88286,42.965933 -4.41431,5.59146 0.29429,5.29717 12.94864,11.4772 -1.17715,21.18868 5.59146,5.88574 -1.47144,5.88575 9.41719,9.41719"
			id="path265"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer262" inkscape:label="path262">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 335.48743,175.98375 309.00158,146.84932 308.413,86.226154 299.87867,77.691825 V -3.2371594"
			id="path266"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer263" inkscape:label="path263">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 296.9358,-2.9428722 -0.58857,83.2832822 8.53433,8.534329 0.88286,62.094601 18.2458,18.83438 0.29429,6.18003"
			id="path267"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer264" inkscape:label="path264">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 312.82731,188.34382 6.18003,-5.88575 -0.88286,-13.53721 -15.00865,-15.30293 -0.29429,-13.8315 -10.30005,-9.12291 0.29429,-7.35718 -2.06001,-2.94287 -0.29429,-45.32023 -9.1229,-9.711478 0.58857,-68.2746342"
			id="path268"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer265" inkscape:label="path265">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 313.1216,175.39518 -1.17715,-5.59146 -12.65435,-11.18291 -0.29429,-17.06866 -9.1229,-10.00576 -0.88286,-8.24005 -2.64859,-1.76572 0.58858,-45.908806 -8.82862,-7.651467 -0.29429,-71.8060808"
			id="path269"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer266" inkscape:label="path266">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 263.97563,168.62657 0.58858,-45.61451 4.12002,-3.53145 -0.88286,-35.314466 -8.53433,-9.122904 V -3.5314466"
			id="path270"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer267" inkscape:label="path267">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 263.68135,-2.0600105 -0.29429,76.2203885 9.1229,7.945755 0.58858,39.140197 -4.7086,4.41431 0.29429,12.94864 11.77149,10.88863 v 15.89151 l -4.12002,3.82573 0.29428,6.47432 44.73166,43.84879 0.29429,10.30006"
			id="path271"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer268" inkscape:label="path268">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 325.18737,271.6271 0.58858,-14.71436 -10.30005,-9.71148 -0.29429,-28.25157 -42.08307,-42.08307 v -10.59434 l 3.82573,-2.94288 -0.58857,-9.41719 -7.0629,-5.59145"
			id="path272"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer269" inkscape:label="path269">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 316.65304,272.21567 0.29429,-17.06865 -4.12002,-3.82574 0.29429,-15.59722 -3.82574,-4.7086 -0.58857,-13.24292 -39.1402,-39.43449 v -18.2458"
			id="path273"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer270" inkscape:label="path270">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 301.93868,175.68947 -10.00576,-10.30005 -0.29429,-22.36583 -11.4772,-11.77149"
			id="path274"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer271" inkscape:label="path271">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 311.35587,272.21567 0.88287,-15.59722 -4.12003,-4.41431 1.17715,-12.06577 -7.06289,-8.82862 v -16.1858 L 262.5042,177.1609"
			id="path275"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer272" inkscape:label="path272">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 309.59015,272.21567 -1.17715,-12.65435 -5.00288,-4.4143 0.29429,-16.48009 -5.88575,-5.59146 0.58858,-17.36294 -21.48297,-19.12867 h -14.12579 l -6.18003,-5.59146"
			id="path276"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer273" inkscape:label="path273">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 298.99581,271.33281 v -17.95152 l -7.94575,-7.65147 0.29428,-26.48584 -17.06866,-16.48009 h -24.13155 l -36.49161,-38.55162 -0.58858,-56.79744 11.18292,-9.711474 V 12.65435 L 207.1782,-4.120021"
			id="path277"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer274" inkscape:label="path274">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 248.08412,48.263103 6.76861,-7.945754 V -3.2371594"
			id="path278"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer275" inkscape:label="path275">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 249.55556,32.665881 248.96698,-3.8257338"
			id="path279"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer276" inkscape:label="path276">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 243.08124,55.031709 242.49267,-3.5314466"
			id="path280"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer277" inkscape:label="path277">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 297.81866,240.13837 -2.94287,-3.23716 -0.29429,-19.12867 -19.12867,-18.24581 -18.54009,0.58858 -10.59434,-10.00577 -0.29429,-23.54298 c 0,0 -18.83438,-18.83438 -18.83438,-20.01153 0,-1.17715 0,-32.0773 0,-32.0773 L 238.96122,103.5891 238.66693,6.4743187 227.18973,-4.4143082"
			id="path281"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer278" inkscape:label="path278">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 241.31552,174.51232 -0.88286,-8.53433 -17.06866,-17.06866 0.29428,-35.02018 12.36007,-11.4772 -0.88286,-94.171908 -12.06578,-11.7714886"
			id="path282"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer279" inkscape:label="path279">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 297.81866,273.39282 -10.00576,-10.88862 4.41431,-5.00289 -0.29429,-9.1229 -2.94287,-2.3543 -5.00289,0.88286 -2.64858,-4.12002 v -4.41431 l -3.82574,-4.4143 -13.53721,0.58857 -2.64858,-3.23716 -0.88286,-7.65147 -6.47432,-6.18003 -6.47432,0.29429 -57.38601,-57.09172 0.58858,-50.02883 20.30581,-18.540092 -0.58857,-73.571803 -22.07154,-21.7772544"
			id="path283"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer280" inkscape:label="path280">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 230.72118,165.97799 220.12684,154.2065 v -42.08307 l 11.4772,-11.4772 -0.29429,-90.640465 -14.12578,-14.125786"
			id="path284"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer281" inkscape:label="path281">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 231.30975,175.68947 216.88968,160.38653 216.59539,110.65199 228.36688,99.174792 227.7783,10.888627 213.35823,-3.5314466"
			id="path285"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer282" inkscape:label="path282">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 286.93004,227.7783 -1.47144,-9.41719 -12.36006,-11.77148 -23.83727,-0.58858 -39.43449,-39.72877 v -60.0346 L 220.42112,95.643345 V 14.714361 L 201.58674,-4.120021"
			id="path286"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer283" inkscape:label="path283">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 286.93004,240.13837 -6.47432,-6.47432 -0.88287,-16.1858 -7.94575,-7.94575 -22.66012,-0.58858 -52.67741,-50.91169 0.29429,-43.84879 20.89439,-19.422957 -0.29428,-79.163261 -19.12867,-19.717243"
			id="path287"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer284" inkscape:label="path284">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 273.9814,228.36688 0.58857,-7.06289 -8.53433,-8.24005 -17.65723,-0.58857 -54.73742,-53.26599 -0.29429,-46.79166 20.89439,-18.540098 -0.29428,-77.103251 -20.60011,-20.6001048"
			id="path288"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer285" inkscape:label="path285">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 295.28324,274.0578 -36.62428,-36.20809 -11.44509,-0.41618 -23.72254,-24.13873 -15.19075,-0.41619 -48.69364,-48.69364 0.20809,-59.30636 L 147.12139,91.976879 146.7052,59.930636 129.01734,42.034682 53.479769,41.82659 35.375723,23.722543 35.583815,14.774566 23.722543,2.7052023 h -46.196531 l -6.65896,-6.0346821"
			id="path289"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer286" inkscape:label="path286">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 172.71676,142.54335 -1.45664,-20.18497 -5.41041,-6.24277 L 165.43353,23.514451 143.37572,2.0809249 H 42.242775 l -5.202313,-5.4104047"
			id="path290"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer287" inkscape:label="path287">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 174.5896,101.34104 7.28323,-0.20809 5.41041,-6.450869 4.57803,-0.208092 8.94798,-9.364162 -0.20809,-62.635839 -26.01156,-26.2196527"
			id="path291"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer288" inkscape:label="path288">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 191.65318,100.71676 12.48555,-13.942193 0.20809,-66.381503 -24.9711,-23.5144513"
			id="path292"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer289" inkscape:label="path289">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 190.19653,88.439306 6.86705,-7.907514 V 23.930636 l -27.6763,-28.0924857"
			id="path293"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer290" inkscape:label="path290">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 175.00578,88.855491 7.28324,-0.416185 6.45086,-7.075144 5.41041,-7.907515 -0.20809,-48.901734 -28.09249,-27.8843928"
			id="path294"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer291" inkscape:label="path291">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 182.28902,81.572254 9.15607,-9.364161 -0.62428,-45.98844 -29.75723,-29.9653177"
			id="path295"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer292" inkscape:label="path292">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 174.3815,76.369942 6.24278,0.416185 7.69942,-7.491329 -0.62428,-42.242775 -30.3815,-30.5895953"
			id="path296"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer293" inkscape:label="path293">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 182.28902,69.294798 3.12138,-4.16185 -1.04046,-37.66474 -31.21387,-30.5895953"
			id="path297"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer294" inkscape:label="path294">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 175.00578,55.768786 174.5896,26.843931 144.41619,-3.5375723 45.572254,-2.7052023 42.65896,-5.2023121"
			id="path298"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer295" inkscape:label="path295">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 293.6185,276.55491 c 0,0 -36,-35.37572 -36.83237,-35.7919 -0.83237,-0.41619 -10.82081,-0.2081 -10.82081,-0.2081 0,0 -23.72255,-25.17919 -24.55492,-25.17919 -0.83237,0 -15.60693,-0.20809 -15.60693,-0.20809 L 156.90173,166.68208 156.27746,106.54335 143.79191,93.849711 143.16763,60.763006 127.97688,45.572254 H 52.231214 L 31.421965,24.971098 V 14.774566 L 21.017341,6.0346821 -23.930636,4.9942197 -32.67052,-3.1213873"
			id="path299"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer296" inkscape:label="path296">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 292.36994,278.21965 -36.20809,-33.91907 h -10.82081 l -25.17919,-25.80347 -16.02312,-0.62428 -51.19075,-50.77456 V 108.41619 L 140.04624,95.306358 139.42197,62.843931 126.10405,50.150289 50.566474,49.109827 28.092486,26.843931 27.676301,16.231214 19.560694,9.1560694 -25.179191,8.5317919 -37.872832,-3.1213873"
			id="path300"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer297" inkscape:label="path297">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 289.04046,281.75723 c -0.83237,-0.41619 -33.71098,-34.12717 -33.71098,-34.12717 l -11.44509,-0.83237 -24.97109,-24.55492 -15.81503,-0.83237 -53.27168,-52.85549 -0.83237,-58.89017 -12.90173,-13.734104 -0.83237,-31.83815 -10.40463,-10.82081 H 49.317919 L 24.346821,28.716763 24.138728,18.312139 17.895954,12.901734 -26.427746,12.693642 -42.65896,-3.1213873"
			id="path301"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer298" inkscape:label="path298">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 292.16185,285.71098 h -6.03468 l -3.32948,-3.32948 -0.41619,-4.16185 -28.71676,-28.30057 -11.0289,-0.41619 -25.38728,-24.34682 -15.39885,-0.83237 -55.3526,-54.72832 -0.20809,-57.64162 -14.15029,-14.982662 -0.41619,-7.907514 -6.86705,-8.3237 H 106.12717 L 81.364162,55.976879 47.653179,56.184971 21.641619,31.00578 20.601156,21.433526 15.398844,15.815029 H -28.300578 L -47.653179,-3.3294798"
			id="path302"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer299" inkscape:label="path299">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 288.62428,291.32948 -8.11561,-5.82659 -1.45665,-5.82659 -26.84393,-27.05202 H 241.38728 L 216,227.44509 199.56069,227.23699 143.16763,170.63584 V 111.95376 L 128.60116,99.052023 128.80925,89.479769 122.35838,84.069364 104.04624,83.445087 81.156069,60.138728 47.028902,59.514451 17.687861,32.046243 9.7803468,31.421965 5.4104046,27.468208 V 22.057803 L 1.4566474,19.144509 H -29.757225 L -51.606936,-2.7052023"
			id="path303"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer300" inkscape:label="path300">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 292.57803,294.24277 c -1.04046,-0.20809 -7.49132,0 -7.49132,0 l -8.73989,-8.32369 -0.41618,-5.20232 -24.9711,-25.38728 h -10.82081 l -26.21965,-25.38728 -16.02313,-0.2081 -57.84971,-58.26589 -0.41618,-57.01734 -13.73411,-13.31792 h -9.36416 l -37.664738,-37.248557 -34.33526,-0.83237 -28.924856,-27.6763 -61.803468,-0.624278 -4.16185,-3.745665 -0.416185,-28.9248551 -6.034682,-4.9942197"
			id="path304"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer301" inkscape:label="path301">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 287.37572,299.44509 -24.13873,-22.47399 -0.20809,-5.41041 -13.7341,-12.69364 -26.01156,-0.62428 -86.56648,-85.10982 0.2081,-56.39307 -12.48555,-12.27745 -8.5318,-0.41619 L 78.450867,67.421965 43.907514,67.00578 14.358382,38.49711 l -62.011561,-0.416185 -6.242775,-6.034682 -0.416185,-27.6763008 -8.739884,-7.699422"
			id="path305"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer302" inkscape:label="path302">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M -2.0809249,27.052023 -34.959538,27.676301 -43.907514,15.815029"
			id="path306"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer303" inkscape:label="path303">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 39.953757,6.4508671 29.132948,-1.4566474 c 0,0 -33.9190752,1.04046243 -34.5433526,-0.2080925 -0.6242775,-1.2485549 -2.9132948,-5.4104046 -2.9132948,-5.4104046"
			id="path307"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer304" inkscape:label="path304">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 286.54335,254.49711 c -1.04046,-0.20809 -8.3237,-0.62428 -8.3237,-0.62428 l -21.22543,-21.64162 -1.04046,-6.24277 -3.74567,-3.32948 -9.98844,-0.83237 -3.32948,-4.36994"
			id="path308"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer305" inkscape:label="path305">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 292.57803,302.56647 c -1.04046,0 -6.65895,0.62428 -6.65895,0.62428 l -7.07515,-6.24277 -31.42196,-1.04047 -7.49133,-7.28323"
			id="path309"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer306" inkscape:label="path306">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 253.45665,287.37572 2.91329,-4.57803 -0.41618,-7.28324 -2.28902,-3.12139 h -6.45087 l -8.3237,-7.69942 -18.93641,0.41619 -89.47977,-89.68786 -0.62428,-55.5607 -8.94798,-7.69942 -8.3237,-0.62428 L 75.953757,75.121387 21.641619,74.289017 1.6647399,54.728324 -54.728324,54.936416 c 0,0 -11.653179,-11.861271 -11.653179,-12.693641 0,-0.83237 -0.624277,-41.2023126 -0.624277,-41.2023126 l -3.537573,-4.3699422"
			id="path310"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer307" inkscape:label="path307">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -66.17341,-3.3294798 3.329479,3.74566477 -0.624277,40.57803503 8.947977,9.780347 L 4.5780347,51.606936 23.098266,70.751445 77.410405,72 l 37.040465,36.83237 8.53179,-0.41618 8.94798,8.94797 1.45664,56.80925 87.81503,86.77457 24.76301,0.62427 4.99422,6.24278"
			id="path311"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer308" inkscape:label="path308">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 226.19653,252.62428 c -0.41618,-0.83237 -15.39884,-16.23122 -15.39884,-16.23122"
			id="path312"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer309" inkscape:label="path309">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 249.71098,280.30058 235.3526,268.43931 h -18.72832 l -90.93642,-91.5607 c 0,0 0.83237,-54.52023 0,-55.14451 -0.83237,-0.62427 -4.99422,-4.99422 -5.82659,-5.4104 -0.83237,-0.41619 -10.19653,0.20809 -10.19653,0.20809 L 73.248555,79.49133 21.225434,78.867052 -0.41618497,58.890173 -55.560694,59.306358 -70.543353,43.699422 -70.127168,1.6647399 -76.16185,-3.1213873"
			id="path313"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer310" inkscape:label="path310">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M -87.398844,48.485549 -64.508671,72 l 31.421966,-0.208092 3.537572,3.537572 37.8728324,0.208092 10.8208096,9.780347 22.473988,-0.208092 4.786127,4.369942 v 7.283237 l 2.913295,4.786124 7.907515,-1.04046 3.121387,-5.202312 1.66474,-6.242774 7.491329,1.040462 26.635838,26.843934 -1.040462,21.43352"
			id="path314"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer311" inkscape:label="path311">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 26.427746,62.427746 C 25.387283,61.387283 7.9075145,44.115607 7.9075145,44.115607 l -59.3063585,-0.416185 -2.913295,-3.745665"
			id="path315"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer312" inkscape:label="path312">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 287.22432,306.94157 c 0,0 -9.41719,-6.76861 -10.30005,-7.0629 -0.88286,-0.29428 -36.7859,-1.61858 -36.7859,-1.61858 0,0 -12.06578,-11.03577 -12.65435,-11.18291 -0.58858,-0.14714 -24.2787,0.29429 -24.2787,0.29429 l -9.71148,10.59434 -119.480605,0.88286 -17.95152,19.12867 -26.191563,0.88286 -20.3058175,20.6001 -0.2942872,21.77726 5.5914567,5.7386 -0.147143,113.00629 -9.7114783,8.53433 v 37.08019 l 9.1229033,9.1229 -0.882861,10.30005 10.594339,9.12291 0.294288,20.01153 -8.240042,8.53433"
			id="path316"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer313" inkscape:label="path313">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 292.57803,311.09827 -10.61271,-0.2081 c 0,0 -7.28324,-7.07514 -8.11561,-7.28323 -0.83237,-0.2081 -48.27746,0.83237 -48.27746,0.83237 l -3.53757,-3.32948 -1.24855,-4.57804 -5.41041,-4.16185 -8.1156,0.83237 -11.02891,11.86127 -116.531788,1.87284 -20.601156,18.93641 -23.722543,0.83237 -17.063584,17.27168 v 15.60694 l 5.826589,5.4104 -0.83237,118.40462 -9.156069,8.73989 -0.624277,29.96532 8.947976,8.1156 0.83237,9.78035 9.780347,11.23699 -0.208092,26.42775 -9.572255,9.57225 -0.208092,40.78613 -31.2138729,30.5896 -73.2485551,1.24855 -43.075148,41.20231 -59.93063,-0.41618"
			id="path317"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer314" inkscape:label="path314">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 290.49711,328.36994 h -6.24277 l -13.73411,-12.90173 -69.50289,-0.83237 -4.99422,1.66474 -3.32948,-0.83237 -9.98844,-7.90752 -102.173408,-0.41618"
			id="path318"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer315" inkscape:label="path315">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 287.58382,315.6763 -6.65896,-0.20809 c 0,0 -6.24278,-7.07515 -7.69943,-7.07515 -1.45664,0 -53.89595,-0.62427 -53.89595,-0.62427 l -6.86705,-7.28324"
			id="path319"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer316" inkscape:label="path316">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 289.66474,330.45087 -7.07514,1.66474 -13.73411,-13.73411 -17.27167,0.83237 -7.07515,5.41041"
			id="path320"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer317" inkscape:label="path317">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 288,341.06358 -20.60116,-0.20809 c 0,0 -4.78612,-5.6185 -6.03468,-5.82659 -1.24855,-0.20809 -7.90751,0 -7.90751,0 l -4.16185,3.32948 -33.91908,-1.04046 -24.763,22.47399 -39.53758,1.04046 -5.82658,-5.82659"
			id="path321"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer318" inkscape:label="path318">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 288.20809,350.01156 c -1.04046,0 -6.45086,-0.20809 -6.45086,-0.20809 l -3.53758,-3.74567 -16.4393,-1.04046 -4.57804,-3.32948"
			id="path322"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer319" inkscape:label="path319">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 287.16763,358.33526 h -14.56647 l -3.74567,-3.32948 -11.0289,0.20809 -11.86127,-13.10982 -29.34104,0.83237 -23.30636,20.80925 c 0,0 -59.09827,1.24855 -59.72254,0.41618 -0.62428,-0.83237 -1.04047,-8.94798 -1.04047,-8.94798"
			id="path323"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer320" inkscape:label="path320">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 126.52023,342.10405 v 27.4682 l 70.54335,0.62428 21.43353,-21.22543 20.60116,-0.62428"
			id="path324"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer321" inkscape:label="path321">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 288.41619,367.28324 c -1.45665,-0.2081 -22.2659,0.20809 -23.09827,0 -0.83237,-0.2081 -4.16185,-5.82659 -6.24278,-5.82659 -2.08092,0 -12.48554,0.62428 -12.48554,0.62428 l -3.95376,4.36994 -6.03468,-0.2081 L 229.9422,360 l -6.86706,0.83237 -22.0578,17.47977 -80.11561,1.87283 -36.832366,-35.79191 -17.479769,0.41619"
			id="path325"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer322" inkscape:label="path322">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 239.30636,359.58382 -4.57804,-3.74567 -14.77456,0.20809 -22.05781,18.31214 -75.32948,0.83237 -32.254331,-33.71098 1.66474,-6.65896 6.242774,-5.20231 11.861267,0.62427 7.90752,7.28324 -0.62428,13.73411"
			id="path326"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer323" inkscape:label="path323">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 288,374.56647 -22.2659,0.2081 c 0,0 -6.45086,-8.11561 -7.28323,-8.3237 -0.83237,-0.2081 -8.73989,-0.41619 -8.73989,-0.41619 l -4.16185,4.36994 c 0,0 -7.28323,0.2081 -8.3237,0.2081 -1.04046,0 -10.61271,7.69942 -10.61271,7.69942 l -7.07515,-0.41619 -12.69364,13.52602 -90.93642,-1.45665 -31.421961,-30.17341 h -31.83815"
			id="path327"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer324" inkscape:label="path324">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 228.27746,367.07514 -6.65896,0.62428 -18.31214,16.85549 h -85.9422 l -31.213871,-30.79768 -24.763006,-1.04047 -6.450867,-7.49133"
			id="path328"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer325" inkscape:label="path325">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 287.37572,392.04624 -25.38728,0.2081 -7.07514,-8.11561 -7.28324,0.20809 -6.24278,6.65896 -11.86127,-0.20809 -14.35838,12.90173 -51.39884,0.83237 -32.04625,31.63006 -25.17919,0.20809 -15.606934,16.23122"
			id="path329"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer326" inkscape:label="path326">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 292.78613,396.62428 -10.19653,0.41618 c 0,0 -8.5318,8.11561 -9.78035,8.3237 -1.24856,0.20809 -9.15607,0 -9.15607,0 l -6.45087,-5.82659 -0.83237,-8.1156 -4.16185,-3.74567 -5.4104,0.83237 -3.32948,6.03468 -14.77457,1.24856 -11.44508,12.06936 -52.23122,0.62428 -31.63006,31.83815 -22.89017,0.20809 -20.393064,18.52023 -5.618497,-0.20809"
			id="path330"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer327" inkscape:label="path327">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 288.83237,401.41041 -14.56647,9.78034 -24.13873,0.20809 -5.6185,-4.99422 -9.98844,0.62428 c 0,0 -13.10983,12.90174 -13.9422,12.90174 -0.83237,0 -47.65317,-0.2081 -47.65317,-0.2081 l -61.38729,60.13873 -0.41618,6.65896"
			id="path331"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer328" inkscape:label="path328">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 287.37572,409.31792 -6.24277,7.90751 -0.20809,13.52602 -3.95376,3.32948 h -46.40463 l -2.7052,2.49711 -48.90173,-0.2081 -49.10983,50.56648 0.20809,9.15607 c 0,0 -24.34682,23.93063 -25.17919,24.13872 -0.83237,0.2081 -11.028899,0 -11.028899,0 l -7.699422,8.5318 -0.83237,58.47398 -18.728324,18.52024 -0.624277,5.20231"
			id="path332"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer329" inkscape:label="path329">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 289.45665,404.73988 c -0.83237,0.2081 -4.36994,1.45665 -4.36994,1.45665 l -2.70521,4.36994 -5.20231,4.36995 v 13.31792 l -2.49711,2.49711 -22.89017,-0.2081 -6.86705,-7.07514 -9.15607,0.83237 -9.36417,8.53179 -49.31791,-0.41618 -50.98266,52.64739 -0.2081,9.36417 -8.1156,7.69942 H 99.260116 L 86.358382,490.2659 86.566474,479.86127"
			id="path333"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer330" inkscape:label="path330">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 263.44509,418.47399 c -0.83237,0.20809 -11.86127,-0.62428 -11.86127,-0.62428 0,0 -7.07515,-7.90751 -7.90752,-7.90751 -0.83237,0 -8.11561,0.62427 -8.11561,0.62427 l -13.31792,11.86128 -48.48554,0.20809 -57.22544,56.80925 0.41619,9.78034 -4.36995,3.95376 -8.53179,-0.41618 -3.53757,-5.20232"
			id="path334"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer331" inkscape:label="path331">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 269.68786,425.54913 -4.36994,2.08093 -13.7341,-0.62428 -9.36417,-10.40462 -3.95375,-0.2081 -14.15029,12.69365 -47.0289,0.41618 -54.31214,53.06358 v 9.98844 l -6.24278,6.24278 -14.98266,0.41618 -10.404621,-10.40462"
			id="path335"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer332" inkscape:label="path332">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 257.4104,423.46821 h -4.78612 l -10.40463,-10.19653 -6.03468,0.83237 -13.10983,11.44508 -48.27745,0.83237 -54.52023,54.52023 -0.41619,9.78035 -5.20231,5.41041 h -11.0289 l -7.075147,-6.45087 0.208093,-9.15607"
			id="path336"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer333" inkscape:label="path333">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 252,406.40462 -4.78613,-3.95375 -16.23121,1.24855 -11.65318,11.65318 -49.9422,1.04046 -64.09248,64.09249"
			id="path337"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer334" inkscape:label="path334">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 250.12717,393.50289 c -0.83237,0.83237 -5.20231,5.41041 -5.20231,5.41041 l -12.90174,-0.2081 c 0,0 -13.7341,12.48555 -14.56647,12.48555 -0.83237,0 -50.56648,0.83237 -50.56648,0.83237 l -59.51445,58.89018 -53.063581,1.04046 -13.109827,12.27745 -0.83237,8.3237"
			id="path338"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer335" inkscape:label="path335">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 118.40462,447.81503 -19.560689,18.31214 -52.855492,0.83237 -5.826589,4.99422"
			id="path339"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer336" inkscape:label="path336">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 290.28902,388.09249 h -26.01156 l -8.53179,-8.5318 h -8.5318 l -8.1156,7.28324 -13.10983,0.20809 -12.69364,12.69365 -51.81503,0.62427 -31.21387,30.5896 -30.17341,1.45665 -29.549137,29.75722 H 38.49711 l -9.780347,9.78035 -0.416185,65.13295 10.820809,10.82081 0.208093,32.46242 -9.15607,8.73989 -1.040462,43.90751 -33.9190752,33.91908 -57.8497108,-0.2081 -40.786132,40.99422 -80.94797,0.2081"
			id="path340"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer337" inkscape:label="path337">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 240.34682,440.94798 -59.09826,-0.41619 -34.33527,34.54336 -0.83236,17.89595 -50.566479,50.98266 0.208092,47.23699 -17.271676,16.23122 0.208093,27.6763 -67.630058,67.63005 -59.514451,1.04047 -20.809249,19.3526"
			id="path341"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer338" inkscape:label="path338">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -51.398844,716.04624 c 0.83237,-0.62427 4.786127,-4.99422 4.786127,-4.99422 l 2.705203,0.2081 v 10.19653 l 2.913294,-0.20809 0.83237,-10.82081 3.32948,0.62427 c 0,0 -0.624277,9.98844 0.208093,10.19654 0.832369,0.20809 3.537572,-0.2081 3.537572,-0.2081 l -0.208093,-9.98844 3.121388,-0.20809 -0.208093,10.82081 3.745665,-0.62428 0.624277,-10.19653 h 2.705203 v 10.61272 l 4.161849,-0.20809 v -9.36417 l 13.9421969,-0.62427"
			id="path342"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer339" inkscape:label="path339">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -71.375723,721.04046 20.809249,-20.60115 59.3063584,-0.41619 66.1734106,-66.58959 0.416185,-27.26012 16.855491,-16.6474 0.624278,-47.0289 c 0,0 45.572251,-44.53179 45.364161,-45.57225 -0.20809,-1.04047 -0.41618,-8.11561 -0.41618,-8.11561"
			id="path343"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer340" inkscape:label="path340">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 96.138728,528.55491 -7.283237,6.86706 -0.416185,52.64739 c 0,0 -17.271676,16.23122 -17.063583,17.06359 0.208092,0.83237 0.208092,26.42774 0.208092,26.42774 l -63.884393,64.30058 -58.890173,0.41619 -26.843931,25.17919"
			id="path344"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer341" inkscape:label="path341">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -81.572254,721.87283 c 0,0 28.50867,-29.54913 29.965318,-29.54913 1.456647,0 56.3930632,0.20809 56.3930632,0.20809 L 66.797688,630.93642 v -7.49133"
			id="path345"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer342" inkscape:label="path342">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 73.040463,592.85549 8.947976,-8.53179 -0.208092,-97.38728"
			id="path346"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer343" inkscape:label="path343">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 76.99422,481.31792 -0.416185,89.27168 -3.32948,5.20231"
			id="path347"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer344" inkscape:label="path344">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 72.416185,487.14451 -1.248555,78.86705 -3.745665,5.20231 0.208093,24.9711 -7.075145,7.90752 -0.624277,28.30057 -55.9768788,55.76879 -57.2254332,0.62428 -33.919076,33.0867"
			id="path348"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer345" inkscape:label="path345">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -92.601156,722.28902 37.040462,-37.66474 58.0578038,0.20809 53.6878612,-54.10405 0.208093,-28.71676 7.491329,-6.65896 -0.624277,-25.80347 4.994219,-4.57803 -1.456647,-85.10983"
			id="path349"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer346" inkscape:label="path346">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 62.427746,486.93642 c 0,0.83237 0.208092,5.20231 0.208092,5.20231 l -8.115607,8.73988 0.624278,22.05781 5.202312,3.74566 0.208092,35.37572 -4.994219,5.41041 0.416185,24.55491 -6.867052,6.45087 v 30.17341 l -49.94219694,48.90173 -57.84971106,0.2081 -40.16185,39.74566 -85.734099,0.62428"
			id="path350"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer347" inkscape:label="path347">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -98.635838,722.08093 41.410404,-40.78613 58.4739889,-0.62428 51.3988441,-51.39884 0.208092,-28.92486 6.242775,-6.45087 -0.208093,-25.80346 5.618498,-4.36995 -1.040463,-38.7052 -4.578035,-4.57803 0.416185,-14.56648"
			id="path351"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer348" inkscape:label="path348">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 57.849711,479.86127 -0.416185,11.65318 -6.658959,8.11561 v 23.09826 l 5.826589,6.24278 0.208093,32.67052 -4.786128,4.57803 0.83237,24.34682 -6.450867,6.45087 -1.248555,30.17341 -46.8208089,46.40463 -58.2658961,0.41618 -40.578034,40.78613 -83.44509,0.20809"
			id="path352"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer349" inkscape:label="path349">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.16185,711.6763 82.19653,-0.20809 40.994222,-40.99422 57.6416182,-0.20809 40.9942198,-39.95376 v -6.24278"
			id="path353"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer350" inkscape:label="path350">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 38.080925,612 0.208092,-5.6185 4.786128,-4.57803 -0.416185,-6.45087 6.242774,-5.6185 0.416185,-25.17919 3.745665,-3.53757 -0.416185,-31.21387 -6.034682,-6.65896 1.040462,-31.42197 4.16185,-4.36994"
			id="path354"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer351" inkscape:label="path351">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 46.404624,542.49711 V 528.9711 l -5.202312,-5.41041 v -20.18497"
			id="path355"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer352" inkscape:label="path352">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 37.248555,597.01734 9.572254,-9.15607 -0.83237,-31.42196"
			id="path356"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer353" inkscape:label="path353">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 240.13837,278.68999 -27.07443,-0.88286 c 0,0 -10.00576,-10.30005 -11.18291,-10.30005 -1.17715,0 -21.77725,-0.29429 -21.77725,-0.29429 l -9.71148,7.06289 -42.37736,0.88287 -42.083073,-40.61164 -0.588574,-27.07442 -19.717244,-19.71725 h -15.89151 l -22.071541,-22.66011 -0.294287,-11.4772 9.122904,-8.82862"
			id="path357"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer354" inkscape:label="path354">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 199.82102,275.15855 -3.53145,-3.82574 h -15.00865 l -7.65146,8.82862 -48.85168,-1.17715 L 81.517559,235.72406 80.634697,210.12107 62.977464,191.87526 H 48.557391 l -25.897275,-25.01441 0.294287,-14.42007 5.885744,-6.47432 -0.294287,-13.8315 -18.245807,-16.77437 -120.952043,-0.29429 -26.48585,-26.191561 0.29428,-54.443135 -17.95152,-17.657233 0.29429,-20.6001048"
			id="path358"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer355" inkscape:label="path355">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 193.3467,283.69288 -12.65435,11.77148 -65.33176,0.29429 -17.657234,-18.54009 -19.128669,0.88286 -6.768606,4.41431 c 0,0 1.471436,12.65435 0.294287,13.8315 -1.177149,1.17714 -17.657233,18.54009 -17.657233,18.54009 H 29.134434 l -23.8372641,22.9544 0.2942872,24.72013 6.7686059,7.06289 -1.471436,107.70912 -10.00576535,10.59434 0.29428725,38.55163 -4.4143083,3.82573 -0.5885744,90.05189 -13.2429252,12.36006"
			id="path359"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer356" inkscape:label="path356">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 6.4743187,625.65462 -4.120021,-5.00288 0.2942872,-85.93187"
			id="path360"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer357" inkscape:label="path357">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 7.9457548,544.43135 -0.8828616,9.71148 4.1200208,5.59145 0.294287,12.06578 -5.8857439,7.35718 -0.5885744,35.31447 5.0028823,0.29428 0.588575,-32.66588 6.474319,-6.7686 V 563.8543"
			id="path361"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer358" inkscape:label="path358">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -23.837264,642.1347 10.300052,0.29429 11.7714887,-11.77149"
			id="path362"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer359" inkscape:label="path359">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -29.723009,651.5519 c 1.765724,0 19.717244,-0.29429 19.717244,-0.29429 L 15.89151,623.8889 17.362946,584.7487 27.074424,573.86007 26.780137,553.55425 17.362946,543.2542 17.068659,532.65986 7.3571804,523.24267 8.240042,489.39964 17.95152,479.39387 V 365.79901 l -5.29717,-5.59146 v -20.30582 l 19.128669,-18.54009 h 25.602988 l 18.540095,-19.42296 118.892038,-1.17715 10.59434,-10.30005 15.00864,-0.88286 9.71148,9.41719"
			id="path363"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer360" inkscape:label="path360">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.92951,697.4607 c 1.17715,0 59.15173,-0.58857 59.15173,-0.58857 l 41.200211,-40.31735 73.571804,-0.88286 31.194445,-30.90016 -0.588575,-38.84591 9.122904,-10.88863 -0.294287,-22.9544 -9.711479,-11.18292 v -9.71148 l -9.711478,-9.41719 0.882862,-31.48873 10.005765,-8.82862 V 365.50472 l -5.29717,-6.47432 0.588575,-17.65723 16.480084,-16.1858 25.3087,-1.17715 19.422957,-18.83438 118.009172,-2.06001 11.4772,-10.00576"
			id="path364"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer361" inkscape:label="path361">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 175.10089,314.29875 -5.29717,-4.41431 -88.874736,1.17715 -19.128669,17.95152 -24.425839,0.58857 -16.185796,15.59722 -0.294288,12.36007 7.062893,7.35718 -2.354297,174.21803 10.59434,10.30005 0.294287,30.31158 -9.711478,9.12291 -1.471436,41.20021 -32.077307,32.66588 -57.974581,0.29429 -41.200213,42.08307 h -79.16326"
			id="path365"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer362" inkscape:label="path362">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -108.00341,697.75499 29.723011,-30.60587"
			id="path366"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer363" inkscape:label="path363">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -186.57809,693.92925 h 54.44313 l 31.48873,-31.19444"
			id="path367"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer364" inkscape:label="path364">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.2238,691.28067 c 1.76573,0 43.8488,0 43.8488,0 l 40.31735,-41.20021"
			id="path368"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer365" inkscape:label="path365">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.2238,684.21778 c 1.47144,0 37.08019,-1.17715 37.08019,-1.17715 0,0 45.02595,-41.78879 44.73166,-44.14309 -0.29429,-2.35429 0.88286,-89.46331 0.88286,-89.46331 l -33.84303,-32.37159 2.64859,-185.40095 -12.94864,-12.06577 1.17715,-66.50891 c 0,0 -14.12579,-14.42008 -15.30294,-14.71437 -1.17715,-0.29428 -24.13155,0 -24.13155,0"
			id="path369"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer366" inkscape:label="path366">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.34094,670.97485 31.48874,-0.29429 38.55162,-38.25733 -0.88286,-79.45755 -30.31158,-30.0173 0.88286,-121.54062 -13.53721,-11.18291 2.06001,-119.18632"
			id="path370"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer367" inkscape:label="path367">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -155.08936,256.02988 -7.94576,7.65147 -1.47143,131.54638 10.88862,9.71148 -0.29428,122.12919 32.66588,33.25446 -0.88286,70.04036 -32.66589,32.0773 -28.84014,-0.58857"
			id="path371"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer368" inkscape:label="path368">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.92951,658.02621 h 27.36871 l 30.0173,-30.60587 -0.58858,-67.98034 -31.48873,-31.78302 0.29429,-121.54062 -10.00577,-9.41719 0.88286,-147.14361"
			id="path372"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer369" inkscape:label="path369">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.34094,251.61557 10.88863,14.42007 v 133.01782 l 10.88863,9.12291 -0.88286,123.01205 32.0773,31.48874 -0.58857,62.68317 -27.36871,26.78014 -26.78014,0.88286"
			id="path373"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer370" inkscape:label="path370">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.92951,648.60902 h 22.9544 l 25.60299,-25.89727 0.29429,-59.44602 -31.19445,-31.78302 0.88286,-121.83491 -11.4772,-10.00576 1.17715,-131.2521 -8.82861,-10.00576"
			id="path374"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer371" inkscape:label="path371">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.36994,640.92486 20.39306,1.24855 8.73989,-7.90751 0.83237,-7.49133 13.7341,-14.15029 c 0,0 0.41618,-39.53757 -1.24856,-42.03468 -1.66474,-2.49711 -20.80924,-22.89018 -20.80924,-22.89018"
			id="path375"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer372" inkscape:label="path372">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.95376,635.51445 c 2.08093,0.41619 7.90752,0.83237 7.90752,0.83237 l 24.9711,-24.9711"
			id="path376"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer373" inkscape:label="path373">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.36994,630.52023 7.49133,-0.83237 c 0,0 14.98266,-15.81503 14.98266,-17.89595 0,-2.08093 0.41618,-28.71677 0.41618,-28.71677 l -11.23699,-10.40462 0.41618,-147.74566 -12.06936,-12.06937"
			id="path377"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer374" inkscape:label="path374">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -92.601156,642.17341 0.83237,-6.24277 -2.705203,-2.28902 0.416185,-88.02312 -32.254336,-32.25434 1.24856,-258.65896 -23.09827,-22.68208 -35.16763,-0.20809"
			id="path378"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer375" inkscape:label="path375">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M -143.58382,386.21965 -144,338.56647"
			id="path379"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer376" inkscape:label="path376">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -70.33526,649.66474 -1.040463,-30.3815 -11.445086,-12.06937 -0.416185,-52.85549 29.965318,-28.30058 -0.208093,-128.18497 -8.739884,-10.19653"
			id="path380"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer377" inkscape:label="path377">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -83.236994,536.67052 c 0.83237,-0.41618 14.982659,-1.45665 14.982659,-1.45665 l 10.404624,-10.82081 0.624277,-49.7341 L -62.843931,468"
			id="path381"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer378" inkscape:label="path378">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -62.427746,309.84971 c 1.040463,0.62428 13.942197,13.9422 13.942197,13.9422 l -0.624278,204.763 -29.549133,29.54914 -0.624277,44.73988 c 0,0 14.358381,14.77457 15.190751,15.60694 0.83237,0.83237 -0.208092,23.51445 -0.208092,23.51445"
			id="path382"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer379" inkscape:label="path379">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -57.849711,650.49711 0.624277,-16.6474 31.005781,-31.63006 -0.624278,-100.09248 -18.728323,-18.93642 1.040462,-119.86127 22.473989,-22.2659 0.208092,-28.71676 L -36,298.19653 l 0.208092,-25.38728 11.445087,-10.61272 h 21.4335262 l 5.6184971,-4.78613"
			id="path383"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer380" inkscape:label="path380">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 11.445087,259.07514 c -0.83237,0.41619 -7.2832373,8.3237 -7.2832373,8.3237 l -28.0924857,-0.20809 -7.075144,7.69942 -1.66474,21.84971 13.942196,13.73411 0.416185,33.0867 -23.306358,21.84972 -0.208093,116.53179 17.895954,18.52023 0.83237,104.25433 -27.260116,27.46821 v 9.78035"
			id="path384"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer381" inkscape:label="path381">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -42.242775,651.12139 -0.416185,-20.60116 24.138729,-24.34682 -0.416185,-106.75144 c 0,0 -19.560694,-17.68787 -19.352601,-18.93642 0.208092,-1.24856 0.624277,-112.36994 0.624277,-112.36994 l 23.098266,-23.30636 V 301.7341 l 32.462428,-32.46242 10.820809,-0.62428 8.947977,-7.90752 -0.624278,-22.68208 -24.971098,-23.51445 -26.84393,-0.41618 -17.479769,-17.47977 -0.208093,-6.86705"
			id="path385"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer382" inkscape:label="path382">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -14.566474,279.6763 15.19075146,-2.08092 14.15028854,-12.06937 11.445087,-0.20809 6.65896,-6.24278 -0.416185,-12.48554"
			id="path386"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer383" inkscape:label="path383">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 33.50289,294.86705 -4.786127,-5.20231 h -6.867052 l -9.988439,9.15607 -1.040463,22.89017 -8.7398841,8.94798 0.2080924,33.50289 4.7861272,4.78613 0.6242775,36.41618 -3.9537573,4.36994 0.2080925,38.9133"
			id="path387"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer384" inkscape:label="path384">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 3.5375723,467.16763 -4.5780347,-4.99422 -0.416185,-23.93063 2.7052023,-3.12139 -0.83236993,-27.46821 4.36994223,-4.99422 -1.0404625,-32.67052 -4.9942196,-4.78613 0.2080925,-36.83237 8.7398844,-8.1156 -0.416185,-22.68209 16.855491,-14.35838 11.028902,-0.20809 16.439306,-15.81503 V 233.27168 L -3.9537572,177.08671 H -41.410405 l -26.219653,-25.80347 -66.797692,-0.41619 -50.15028,-50.15029"
			id="path388"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer385" inkscape:label="path385">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.99422,119.23699 41.20231,41.82659 9.78035,-0.41618 0.83237,6.45087 -11.86127,10.40462 -39.12139,0.20809"
			id="path389"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer386" inkscape:label="path386">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -7.699422,169.59538 -25.387283,-26.84393 -90.936415,-1.04047 -40.78613,-40.78612 -0.62428,-53.895958 -18.10404,-19.144509"
			id="path390"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer387" inkscape:label="path387">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -183.95376,38.080925 11.237,12.069364 1.66474,53.895951 41.61849,42.65896 69.919079,0.20809 21.641619,22.47399"
			id="path391"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer388" inkscape:label="path388">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 53.85456,304.88156 66.214623,293.40435 66.508911,280.75 79.457548,267.50708 78.280399,243.66981 73.571804,238.07836 72.100368,212.18108 59.446018,199.52673 45.908806,198.64387 16.185797,169.50944 15.89151,149.79219 l 6.180031,-5.59145 -0.588574,-9.71148 -13.242925,-13.24293 -121.540622,0.58858 -30.31158,-30.017299 0.88286,-54.443135 -18.24581,-18.540094 0.29429,-22.6601158"
			id="path392"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer389" inkscape:label="path389">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -158.32652,-2.3542977 0.88286,20.8943927 17.06866,17.068658 -0.58858,55.620284 27.663,27.074423 123.89492,0.58858 16.185797,15.8915 -2.648585,10.30006 -4.708596,7.35718 -0.882861,15.89151 c 0,0 27.957285,25.60299 29.428721,26.19156 1.471436,0.58857 15.89151,1.76572 15.89151,1.76572 l 13.537212,16.48009 0.588574,26.48585 46.203088,43.84879 59.15174,-0.88286"
			id="path393"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer390" inkscape:label="path390">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="M 170.09801,288.69576 H 116.53774 L 97.997643,267.21279"
			id="path394"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer391" inkscape:label="path391">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 54.443135,295.17008 0.882862,-9.71148 10.888626,-10.30005 0.294288,-45.32023 4.414308,-5.88575 -1.765723,-10.30005 -12.065776,-10.88863 -9.122904,-0.58857 -5.29717,-0.58858 -30.900157,-31.78302 1.177148,-21.48296 6.180032,-4.41431 -2.354298,-8.53433 L 6.768606,124.77778 H -115.65488 l -31.48873,-32.077307 0.58858,-54.443135 -17.36295,-17.362946 V -2.9428722"
			id="path395"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer392" inkscape:label="path392">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -167.74371,-3.5314466 -0.29429,26.1915626 18.24581,17.657233 -0.58858,56.208858 33.84303,32.960163 122.4234843,-0.58857 4.1200207,5.29717 -0.2942869,38.25734 34.7258919,34.13732 h 12.360063 l 9.41719,9.41719 0.588575,10.00576 -4.414308,4.7086 0.294287,42.08307 -12.948638,13.8315 0.294288,13.53721 -6.180032,5.59146"
			id="path396"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer393" inkscape:label="path393">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 43.848795,294.28722 0.588575,-8.53433 14.71436,-15.59723 v -41.78878 l 5.29717,-3.82573 -0.294287,-7.65147 -8.828616,-7.65147 -13.8315,-0.29429 L 5.5914571,172.45231 V 134.48926 L 2.3542977,130.95781 -119.48061,131.2521 -153.61793,96.526207 V 42.377359 L -170.98087,23.837264 V -3.8257338"
			id="path397"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer394" inkscape:label="path394">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -174.21803,-2.3542977 -0.29429,29.1344347 17.65723,17.068658 -0.58857,55.914571 35.60875,34.725894 121.54062278,0.58857 3.23715942,3.53145 v 36.7859 l 38.5516248,39.1402 12.065776,-0.29429 7.062893,6.18003 -0.294287,5.00289 -5.591457,3.82573 0.588575,41.20021 -17.068659,16.1858 1.177149,12.94864 -5.591457,5.59145"
			id="path398"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer395" inkscape:label="path395">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.78613,216.83237 c 2.08093,0.41619 45.36416,-1.66474 45.36416,-1.66474 l 19.5607,-17.06358 c 0,0 29.965316,-2.08093 32.046241,0 2.080925,2.08092 34.543353,32.87861 34.543353,32.87861 l 57.4335257,-2.08093 6.2427743,5.82659"
			id="path399"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer396" inkscape:label="path396">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m 22.890173,236.39306 -2.080924,-4.57803 c 0,0 -7.907515,-9.15607 -9.98844,-8.73989 -2.0809246,0.41619 -33.294797,-0.41618 -33.294797,-0.41618 0,0 -51.606937,-51.60694 -53.271677,-51.60694 -1.66474,0 -28.716765,-0.41618 -31.213875,0.83237 -2.49711,1.24856 -23.72254,21.64162 -24.55491,23.30636 -0.83237,1.66474 -1.24856,9.98844 -1.24856,9.98844 l -6.24277,4.99422 -44.94798,0.83237"
			id="path400"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer397" inkscape:label="path397">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -185.6185,193.9422 48.69364,0.41618 27.05203,-27.88439 h 34.959535 l 54.936416,54.10404 33.294798,0.41619 13.734104,12.06936 -0.416185,7.90752 -5.410404,7.07514"
			id="path401"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer398" inkscape:label="path398">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.36994,183.12139 c 3.32948,0 41.20231,-0.41619 41.20231,-0.41619 l 26.21965,-25.80347 43.699425,1.24856 28.716763,26.21965 37.8728325,0.41619 50.7745665,51.19075 -0.416185,29.13295 -9.572254,9.98844 -12.069365,0.83237 -28.7167625,29.13294 -0.416185,66.17341 -21.2254335,22.05781 1.248555,81.15607 20.8092484,17.47977 -1.2485549,120.27745 -23.3063585,22.05781"
			id="path402"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer399" inkscape:label="path399">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -35.791908,640.92486 0.416185,-9.15607 19.976879,-21.22544 -0.83237,-112.78612 -17.479769,-19.5607 1.248555,-108.62428 20.393064,-22.89017 1.66474,-44.11561 29.549133,-30.79768 12.901734,0.83237 8.739884,-9.57226 V 236.39306 L 12.485549,209.34104 7.4913295,208.92486 2.9132948,203.09827"
			id="path403"
		/>
	</g>
	<g inkscape:groupmode="layer" id="layer400" inkscape:label="path400">
		<path
			style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
			d="m -184.78613,106.12717 49.10983,49.10982 h 66.17341 l 25.803468,23.72255 38.7052023,2.91329 51.6069367,52.85549 v 30.79769 l -12.485549,14.98266 h -11.65318 l -17.8959533,16.6474 -0.416185,22.89017 -7.4913295,9.15607 -0.8323699,45.78035 -14.9826593,15.81503 v 17.47977 l 4.99422,6.24277 v 13.73411 l -7.49133,7.49132 0.416185,33.2948 14.1502895,14.15029"
			id="path404"
		/>
	</g>
	<path
		style="opacity:1;fill:none;stroke:#fbff5f;stroke-opacity:1"
		d="m 876.5896,721.66474 -0.31214,-27.26011 -18.93642,-17.68787 0.31214,-54.10404 -9.78035,-9.98844 -16.95953,-0.20809 -8.63584,-7.80347 -55.24856,0.41618 -8.73988,7.80347 -47.237,0.31214 -42.97109,-41.72254 -0.41619,-12.06937 -47.54913,-46.82081 -4.36994,-0.62427 -6.65896,-8.11561"
		id="path118"
	/>
</svg>

<div>
	<p>Copy Precomputed pathData:</p>
	{#if pathData}
		<ClipboardCopy
			clipboard={`export default ${JSON.stringify(pathData)};`}
			toastMsg="Copied precompute to clipboard:"
		>
			{#snippet copy()}
				<div title="Precompute copy to clipboard"><Code /></div>
			{/snippet}
			{#snippet copied()}
				<div title="Precompute copied!"><Check /></div>
			{/snippet}
		</ClipboardCopy>
	{/if}
</div>

<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { ClipboardCopy, MouseDrag, GridPattern, useLink } from '$lib';
	import { Rss, Check } from 'lucide-svelte';
	import Marqueeck from '@arisbh/marqueeck';
	import { tv } from 'tailwind-variants';

	const currentGitHash = import.meta.env.VITE_CURRENT_GIT_HASH;
	const date = new Date().getFullYear();

	let outerWidth = $state(0);
	let clientX = $state(0);
	let ferrisX = new Spring(10, {
		stiffness: 0.002,
		damping: 0.5
	});

	$effect(() => {
		const percentage = (clientX / outerWidth) * 100;
		ferrisX.set(percentage);
	});
</script>

<svelte:window bind:outerWidth onmousemove={(e) => (clientX = e.clientX)} />

{#snippet GithubIcon()}
	<svg
		class="h-6 w-6 translate-y-1"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 20 20"
	>
		<path
			fill-rule="evenodd"
			d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
			clip-rule="evenodd"
		></path>
	</svg>
{/snippet}

{#snippet FerrisRustIcon()}
	<svg
		class="h-6 w-6"
		width="100%"
		height="100%"
		viewBox="0 0 4417 3259"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xml:space="preserve"
		style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
	>
		<g transform="matrix(4.16667,0,0,4.16667,0,0)">
			<path
				d="M525.403,293.05C393.77,293.05 274.175,308.875 185.633,334.665L185.633,554.963C274.175,580.753 393.77,596.577 525.403,596.577C676.06,596.577 810.938,575.848 901.537,543.175L901.537,346.457C810.938,313.781 676.06,293.05 525.403,293.05Z"
				style="fill:rgb(143,30,28);fill-rule:nonzero;"
			/>
			<path
				d="M907.423,492.442C903.566,481.779 902.794,468.288 906.062,455.28C911.912,431.991 928.483,419.082 943.075,426.447C946.693,428.274 949.849,431.178 952.462,434.865C952.701,434.864 952.94,434.865 953.177,434.881C953.177,434.881 997.729,487.987 956.49,550.884C955.595,554.453 879.956,642.602 862.447,645.408C850.987,647.244 877.338,555.41 907.423,492.442Z"
				style="fill:rgb(143,30,28);fill-rule:nonzero;"
			/>
			<path
				d="M176.479,482.021C181.779,472.391 183.637,459.233 180.696,445.596C175.43,421.18 156.786,404.486 139.054,408.311C134.656,409.259 130.729,411.383 127.388,414.409C127.106,414.351 126.824,414.296 126.543,414.256C126.543,414.256 70.251,456.208 114.486,528.18C115.291,531.921 198.337,637.018 218.797,643.943C232.188,648.475 207.55,551.418 176.479,482.021Z"
				style="fill:rgb(143,30,28);fill-rule:nonzero;"
			/>
			<path
				d="M97.467,488.066L97.474,488.081C97.659,488.226 97.831,488.357 97.467,488.066Z"
				style="fill:rgb(227,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M993.119,412.903C992.239,409.839 991.363,406.777 990.457,403.741L1021.14,359.29C1024.27,354.768 1024.91,348.892 1022.87,343.735C1020.83,338.605 1016.38,334.925 1011.11,334.025L959.224,325.22C957.216,321.118 955.108,317.078 952.994,313.07L974.791,263.167C977.034,258.08 976.56,252.172 973.588,247.559C970.627,242.923 965.598,240.215 960.239,240.426L907.583,242.339C904.856,238.789 902.087,235.271 899.261,231.818L911.362,178.328C912.587,172.895 911.04,167.21 907.259,163.264C903.497,159.332 898.03,157.705 892.833,158.981L841.544,171.589C838.223,168.654 834.845,165.756 831.43,162.916L833.278,108.002C833.476,102.443 830.885,97.161 826.434,94.077C821.988,90.973 816.341,90.504 811.478,92.811L763.631,115.558C759.777,113.348 755.903,111.158 751.987,109.041L743.532,54.926C742.675,49.444 739.147,44.788 734.206,42.661C729.283,40.523 723.638,41.213 719.315,44.469L676.656,76.476C672.456,75.08 668.237,73.743 663.964,72.465L645.578,21.148C643.708,15.919 639.397,12.077 634.14,10.997C628.901,9.926 623.51,11.74 619.877,15.799L583.97,55.971C579.628,55.471 575.285,55.015 570.927,54.639L543.204,7.926C540.394,3.194 535.434,0.314 530.088,0.314C524.754,0.314 519.784,3.194 516.998,7.926L489.265,54.639C484.907,55.015 480.543,55.471 476.209,55.971L440.299,15.799C436.663,11.74 431.252,9.926 426.031,10.997C420.776,12.089 416.458,15.919 414.598,21.148L396.196,72.465C391.936,73.743 387.715,75.092 383.505,76.476L340.861,44.469C336.525,41.203 330.881,40.514 325.945,42.661C321.026,44.788 317.484,49.444 316.632,54.926L308.171,109.041C304.257,111.158 300.382,113.335 296.518,115.558L248.676,92.811C243.818,90.496 238.147,90.973 233.722,94.077C229.277,97.161 226.68,102.443 226.882,108.002L228.717,162.916C225.312,165.756 221.943,168.654 218.605,171.589L167.326,158.981C162.115,157.716 156.656,159.332 152.885,163.264C149.09,167.21 147.553,172.895 148.772,178.328L160.851,231.818C158.049,235.285 155.276,238.789 152.558,242.339L99.903,240.426C94.588,240.269 89.516,242.923 86.547,247.559C83.572,252.172 83.122,258.08 85.336,263.167L107.15,313.07C105.031,317.078 102.926,321.118 100.901,325.22L49.018,334.025C43.747,334.913 39.304,338.591 37.254,343.735C35.217,348.892 35.878,354.768 38.989,359.29L69.679,403.741C69.442,404.525 69.224,405.317 68.989,406.105L52.126,424.017L97.467,488.066C97.467,488.066 532.619,688.798 936.264,491.462C982.372,483.189 993.119,412.903 993.119,412.903Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M608.303,376.759C608.303,376.759 656.46,324.03 704.618,376.759C704.618,376.759 742.458,447.071 704.618,482.222C704.618,482.222 642.701,531.439 608.303,482.222C608.303,482.222 567.024,443.55 608.303,376.759Z"
				style="fill:rgb(3,4,4);fill-rule:nonzero;"
			/>
			<path
				d="M664.057,396.32C664.057,416.853 651.954,433.499 637.027,433.499C622.103,433.499 610,416.853 610,396.32C610,375.788 622.103,359.14 637.027,359.14C651.954,359.14 664.057,375.788 664.057,396.32Z"
				style="fill:white;fill-rule:nonzero;"
			/>
			<path
				d="M393.365,362.361C393.365,362.361 475.973,325.785 498.519,407.423C498.519,407.423 522.137,502.577 430.682,507.948C430.682,507.948 314.06,485.486 393.365,362.361Z"
				style="fill:rgb(3,4,4);fill-rule:nonzero;"
			/>
			<path
				d="M434.855,397.668C434.855,418.841 422.375,436.014 406.978,436.014C391.587,436.014 379.104,418.841 379.104,397.668C379.104,376.49 391.587,359.322 406.978,359.322C422.375,359.322 434.855,376.49 434.855,397.668Z"
				style="fill:white;fill-rule:nonzero;"
			/>
			<path
				d="M111.602,499.216C122.569,486.753 149.213,471.659 147.172,452.934C143.519,419.407 115.716,394.935 85.073,398.275C77.473,399.103 70.415,401.567 64.149,405.311C63.687,405.204 63.224,405.1 62.761,405.017C62.761,405.017 -40.87,455.89 18.197,557.674C18.754,562.811 136.045,713.342 168.985,724.805C190.544,732.307 149.074,596.165 111.602,499.216Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M953.549,494.673C940.856,483.973 907.387,474.255 906.629,455.435C905.273,421.737 929.141,393.414 959.941,392.175C967.579,391.867 974.925,393.258 981.676,396.032C982.118,395.858 982.56,395.686 983.005,395.535C983.005,395.535 1093.03,430.486 1049.7,539.901C1049.91,545.064 956.232,711.317 925.355,727.536C905.146,738.151 930.861,596.105 953.549,494.673Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M191.142,495.558C191.142,495.558 189.759,632.854 324.308,663.49L352.362,607.127C352.362,607.127 254.867,616.558 247.367,495.558L191.142,495.558Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M876.362,495.558C876.362,495.558 877.744,632.854 743.195,663.49L715.141,607.127C715.141,607.127 812.636,616.558 820.136,495.558L876.362,495.558Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M779.167,635.591C758.917,586.649 693.572,567.218 633.216,592.191C580.09,614.172 548.579,663.223 555.592,708.036C597.538,707.384 642.532,704.665 686.328,698.318C686.328,698.318 660.491,740.081 622.471,776.529C648.037,783.128 677.854,781.297 706.547,769.425C766.904,744.452 799.417,684.532 779.167,635.591Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
			<path
				d="M404.746,695.984C404.746,695.984 459.949,703.279 535.416,705.14C542.026,657.629 506.036,607.348 448.615,587.897C385.177,566.409 319.626,590.689 302.201,642.129C284.776,693.569 322.077,752.689 385.515,774.178C413.636,783.704 442.168,784.227 466.744,777.385C429.833,740.88 404.746,695.984 404.746,695.984Z"
				style="fill:rgb(228,58,37);fill-rule:nonzero;"
			/>
		</g>
	</svg>
{/snippet}

<div class="w-full overflow-hidden">
	<Marqueeck
		class="border-muted w-full border border-dashed"
		--marqueeck-padding-y="2rem"
		options={{ paddingX: 200, gap: 10, speed: 5 }}
	>
		<div class="text-foreground mr-auto flex w-max pr-4 pl-4 text-sm">
			<span class="text-muted-foreground w-max text-sm">{date} Jonas Leonhard -</span>
			<a
				use:useLink
				class="text-muted-foreground hover:text-accent pl-2"
				href={`https://github.com/JonasLeonhard/jonasleonhard.de/commit/${currentGitHash}`}
				target="_blank"
				>{currentGitHash?.slice(0, 7)}
			</a>
		</div>
		{#snippet separator()}
			<span class="text-muted-foreground">©</span>
		{/snippet}
	</Marqueeck>
</div>

<div class="@container/footer">
	<div
		class="relative h-[570px] @xl/footer:h-[360px]"
		style="clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"
	>
		<div class="fixed bottom-0 h-[570px] w-full @xl/footer:h-[360px]">
			<footer class="relative">
				<div
					class="mt-px-4 relative container mx-auto pt-12 pb-2 md:items-center @lg/footer:flex @lg/footer:justify-between"
				>
					<div class="mt-4 flex space-x-5 sm:justify-center @lg/footer:mt-0 rtl:space-x-reverse">
						<MouseDrag>
							<a
								use:useLink
								href="https://github.com/JonasLeonhard"
								target="_blank"
								class="text-foreground"
							>
								{@render GithubIcon()}
								<span class="sr-only">GitHub account</span>
							</a>
						</MouseDrag>

						<ClipboardCopy clipboard={`TODO->rss.xml`}>
							{#snippet copy()}
								<div title="Rss copy to clipboard"><Rss /></div>
							{/snippet}
							{#snippet copied()}
								<div title="Rss copied!"><Check /></div>
							{/snippet}
						</ClipboardCopy>
					</div>
				</div>
				<div class="container mx-auto mt-4 w-full">
					<div class="grid grid-cols-2 gap-8 py-6 @xl/footer:grid-cols-4 @xl/footer:py-8">
						<div>
							<h2 class="text-foreground/80 mb-6 font-mono text-2xl font-semibold uppercase">
								About Me
							</h2>
							<ul class="text-foreground/60 font-medium">
								<li class="mb-4">
									<a use:useLink href="/about" class=" hover:text-accent hover:underline">About</a>
								</li>
								<li class="mb-4">
									<a use:useLink href="/about#career" class="hover:text-accent hover:underline"
										>Career</a
									>
								</li>
								<li class="mb-4">
									<a use:useLink href="/about#projects" class="hover:text-accent hover:underline"
										>Projects</a
									>
								</li>
							</ul>
						</div>

						<div>
							<h2 class="text-foreground/80 mb-6 font-mono text-2xl font-semibold uppercase">
								Contact
							</h2>
							<ul class="text-foreground/60 font-medium">
								<li class="mb-4">
									<a
										use:useLink
										href="https://discord.com/users/519622137351372816"
										target="_blank"
										class="hover:text-accent hover:underline">Write me on Discord</a
									>
								</li>
								<li class="mb-4">
									<a
										use:useLink
										href="mailto:mail@jonasleonhard.de"
										class="hover:text-accent hover:underline">Or send me a Mail</a
									>
								</li>
							</ul>
						</div>

						<div>
							<h2 class="text-foreground/80 mb-6 font-mono text-2xl font-semibold uppercase">
								Boring
							</h2>
							<ul class="text-foreground/60 font-medium">
								<li class="mb-4">
									<a use:useLink href="/credits" class="hover:text-accent hover:underline"
										>Credits</a
									>
								</li>
								<li class="mb-4">
									<a use:useLink href="/impressum" class="hover:text-accent hover:underline"
										>Impressum</a
									>
								</li>
							</ul>
						</div>

						<div>
							<h2 class="text-foreground/80 mb-6 font-mono text-2xl font-semibold uppercase">
								Read More
							</h2>
							<ul class="text-foreground/60 font-medium">
								<li class="mb-4">
									<a use:useLink href="/c?q=articles" class="hover:text-accent hover:underline"
										>Blog</a
									>
								</li>
								<li class="mb-4">
									<a use:useLink href="/c?q=resources" class="hover:text-accent hover:underline"
										>Resources</a
									>
								</li>
								<li class="text-accent mb-4">
									<a use:useLink href="/rss" class="hover:text-accent hover:underline">Rss Feed</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="relative w-full">
						<div
							class="absolute -top-[10px]"
							style="
							left: {ferrisX.current}%;
							transform: translateY({Math.sin(ferrisX.current * 3)}px)
												rotate({Math.sin(ferrisX.current * 1.5) * 5}deg)
					"
						>
							{@render FerrisRustIcon()}
						</div>
					</div>
				</div>

				<GridPattern
					width={35}
					height={35}
					class={tv({
						base: 'mx-auto opacity-30 [mask-image:linear-gradient(to_top_right,white,transparent,transparent)] '
					})()}
				/>
			</footer>
		</div>
	</div>
</div>

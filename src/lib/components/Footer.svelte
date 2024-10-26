<script lang="ts">
	import { ClipboardCopy, MouseDrag } from '$lib';
	import { Rss, Check } from 'lucide-svelte';

	const currentGitHash = import.meta.env.VITE_CURRENT_GIT_HASH;
	const date = new Date().getFullYear();
</script>

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
<footer class="bg-background">
	<div
		class="border border-b-muted-foreground border-t-muted-foreground/10 bg-muted px-4 py-2 md:flex md:items-center md:justify-between"
	>
		<div class="text-foreground/30">
			© {date} Jonas Leonhard - Build Version: -
			<a
				class="hover:text-accent"
				href={`https://github.com/JonasLeonhard/jonasleonhard.de/commit/${currentGitHash}`}
				target="_blank"
				>{currentGitHash?.slice(0, 7)}
			</a>
		</div>
		<div class="ml-auto mt-4 flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
			<MouseDrag>
				<a
					href="https://github.com/JonasLeonhard"
					target="_blank"
					class="text-foreground hover:text-accent"
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
	<div class="container mx-auto w-full">
		<div class="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-foreground/80">About Me</h2>
				<ul class="font-medium text-foreground/60">
					<li class="mb-4">
						<a href="/about" class=" hover:text-accent hover:underline">About</a>
					</li>
					<li class="mb-4">
						<a href="/about#career" class="hover:text-accent hover:underline">Career</a>
					</li>
					<li class="mb-4">
						<a href="/about#projects" class="hover:text-accent hover:underline">Projects</a>
					</li>
				</ul>
			</div>

			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-foreground/80">Contact</h2>
				<ul class="font-medium text-foreground/60">
					<li class="mb-4">
						<a
							href="https://discord.com/users/519622137351372816"
							target="_blank"
							class="hover:text-accent hover:underline">Write me on Discord</a
						>
					</li>
					<li class="mb-4">
						<a href="/contact" class="hover:text-accent hover:underline">Contact Form</a>
					</li>
				</ul>
			</div>

			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-foreground/80">Boring</h2>
				<ul class="font-medium text-foreground/60">
					<li class="mb-4">
						<a href="/credits" class="hover:text-accent hover:underline">Credits</a>
					</li>
					<li class="mb-4">
						<a href="/impressum" class="hover:text-accent hover:underline">Impressum</a>
					</li>
				</ul>
			</div>

			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-foreground/80">Read More</h2>
				<ul class="font-medium text-foreground/60">
					<li class="mb-4">
						<a href="/blog" class="hover:text-accent hover:underline">Blog</a>
					</li>
					<li class="mb-4">
						<a href="/resources" class="hover:text-accent hover:underline">Resources</a>
					</li>
					<li class="mb-4 text-accent">
						<a href="/rss" class="hover:text-accent hover:underline">Rss Feed</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>

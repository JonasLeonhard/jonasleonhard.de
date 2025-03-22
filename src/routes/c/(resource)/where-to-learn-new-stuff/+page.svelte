<script lang="ts">
	let { data } = $props();
</script>

<section>
	<p>{data.metadata.description}</p>

	<ul>
		<li>
			<a href="https://news.ycombinator.com/newest" target="_blank">Hackernews</a> is a list where people
			often discuss technologies and interesting topics about technologies.
		</li>

		<li>
			<a href="https://lobste.rs/" target="_blank"> Lobste.rs </a>
			is similar to Hackernew with people posting topics regularly.
		</li>

		<li>
			<a href="https://www.youtube.com/@Fireship" target="_blank">Fireship</a> both posts about new topics
			about new technologies, aswell a summarizations of topics in 100 seconds.
		</li>

		<li>
			You can find interesting posts in <a
				href="https://www.reddit.com/r/theprimeagen/"
				target="_blank">The Primages subreddit</a
			> regularly.
		</li>

		<li>
			I also recommend checking out the about section on various Subreddits for your technology. Eg
			the <a
				href="https://www.reddit.com/r/GraphicsProgramming/comments/1hry6wx/want_to_get_started_in_graphics_programming_start/"
				target="_blank">GraphicsProgramming subreddit</a
			>
		</li>

		<li>
			You can often find some good courses like these if you look around:

			<ul>
				<li>
					<a
						href="https://www.0de5.net/stimuli/a-reintroduction-to-programming/essentials/about-0de5-and-the-core-ideas"
						target="_blank"
					>
						05E5
					</a>
				</li>

				<li>
					<a href="https://guide.handmadehero.org/" target="_blank"> Handmade Hero </a>
				</li>

				<li>
					<a href="https://threejs-journey.com/" target="_blank"> threejs-journey </a>
				</li>
			</ul>
		</li>

		<li>
			Have you ever tried reading a book on your topic. There are a bunch of wonderful programming
			books. Here are some that i've read and would recommend:

			<ul>
				<li>
					I think every programmer should be able to write a basic parser and understand how a
					programming language compiler works. For that i recommend:
					<a
						href="https://www.amazon.com/Writing-Compiler-Go-Thorsten-Ball/dp/398201610X"
						target="_blank"
					>
						"Writing An Interpreter in Go"
					</a>
					... and its second part "Writing a Compiler in Go". If you want to go even deeper and build
					a statically typed language, maybe checkout
					<a
						href="https://www.amazon.com/Crafting-Interpreters-Robert-Nystrom/dp/0990582930?crid=343ALEMGOCT41&dib=eyJ2IjoiMSJ9.ZO7Jscf8AVSGgaY0lk3GoQafaLU-5wUprV0naZTPqZgPt9kA8rKa_VE2o-riVNrf8y2XBEqQ9T_bTFt46jVhHmq-tfslrxBgxg5kElZaZmiHfFovc0M5NVCV-LEUgunm7gKLJKo8bjVvUSsjpWRpP7v-Kqshb4qRev8wVklKH0ffF0JxAgC3oXWaToUKlt8E2Unk3YAz4HkIHPgMEARyO2E63hBrn8WYTtAriIQNoDI.seY0-uaPjkvUZEA4sv1EKLzqYOmp0HrYEkHGBmWnOt0&dib_tag=se&keywords=crafting+interpreters&qid=1738425263&s=books&sprefix=crafting+interpreter%2Cstripbooks-intl-ship%2C187&sr=1-1"
						target="_blank">Crafting Interpreters</a
					>
					and
					<a
						href="https://www.amazon.com/Engineering-Compiler-Keith-D-Cooper/dp/0128154128?crid=14P4X02XS1JXO&dib=eyJ2IjoiMSJ9.lj1p0qO3PcWVmOjqrZurRbo4tfhUqq4xhPiBX6Gk8zW6qDSL_su1vG55EnBIKj-YU1DHxtSUxPaFK2mXCAbFoJgptT-2geSTn1tYXxEhjyZUvHLX8t3CDthXk9GpMjMhTJwuNHlR95kg23k8BoXaERhBy0GCK9oDPvre5nD509aHHkOMLdTYVMUHg6-6NEmjg6iM8LaWvBuY0jy5MwbqaP9yxEHNeYHn1dIxcRjC3cM.ec1OTPW9FapKVUyyZsPCJXxWlBpk7YusiIskQuFqaoQ&dib_tag=se&keywords=engineering+a+compiler&qid=1738425302&s=books&sprefix=engeneering+a+compil%2Cstripbooks-intl-ship%2C177&sr=1-1"
					>
						Engeneering a Compiler
					</a>. Which i think are both excellent.
				</li>
				<li>
					<a
						href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882?crid=2AGE7YGAZMT4Y&dib=eyJ2IjoiMSJ9.eUeDq4BPqNYI52SOU-OcJxFxSsYuG75qnwKh2Q1vEf2RPgQp_SsISCnxR9XvBj4k0bwFAdrWX4QvnuOBAKOK7vUJ2OnroCfw2n2jQa6dnLXeBf3yOoKGEOCYB9UkHAKzENmCCMftGylb4s2_9kmRDi3lWfkRHZBtITdXYD6n37e6jRCxIvzCu7irrahunosSULi5gSnQ_jPug4uXW12i5QcV8QNYmyj1iYht8Ga5P70.C822CJiFDR8iK0WcDontY188a-8BWQ__irIx5ETauoc&dib_tag=se&keywords=Clean+code&qid=1738424969&s=books&sprefix=clean+co%2Cstripbooks-intl-ship%2C223&sr=1-1"
						target="_blank"
					>
						Clean Code
					</a>
					is a book that is considered a classic by some, and hated by others. As always the truth lies
					somewhere inbetween. You can definetly get some decent advice out of it, but don't blindly
					do everything bob says. Otherwise you'll have 10 levels of indirection and five line functions
					everywhere.
				</li>
				<li>
					I found <a
						href="https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary-dp-0135957052/dp/0135957052"
						target="_blank">the Pragmatic Programmer</a
					> to be a worthwhile read.
				</li>

				<li>
					<a
						href="https://www.amazon.com/Game-Programming-Patterns-Robert-Nystrom/dp/0990582906?crid=YJXDW7SCU1WC&dib=eyJ2IjoiMSJ9.pw6eEzGm7ye5jPn312WbptHA_5yAtJtW0pBOr5tCdjyg-TMLSh0th_L8AuWfoi3Jdt5SRUE0CfCCD77XFx2HGKqI1t6COa-yT3OChxxKyKY3fw_LQiXKhKmDmInIRzBzLPW8hPztYMMDc2WxoKnt3Tb3H2eRaFlnjupeb_zEb5vKfjKLoCzxy5gi7pSdTVJ4DAvuF39qiSUWAugGSJ8-17gozveneZ875wPlOYttuoY.qXec0TTGCqjQtCSigH7wDxsi84z00sfylT_LHkrBUHs&dib_tag=se&keywords=Game+programming+patterns&qid=1738425409&s=books&sprefix=game+programming+patter%2Cstripbooks-intl-ship%2C189&sr=1-1"
						target="_blank">Game Programming Patterns</a
					> is a good read if you are interested in Gamedev related design patterns.
				</li>
			</ul>
		</li>

		<li>
			I think <a href="https://www.youtube.com/@t3dotgg">Theo's</a> videos on Web Development are excellent
			and you should check them out.
		</li>

		<li>
			If i want to learn about a topic, i often checkout awesome lists on github for any given
			topic. you can often find well maintained resource lists like this:

			<a href="https://github.com/codecrafters-io/build-your-own-x" target="_blank"
				>Build your own x</a
			>
			<a href="https://github.com/rockerBOO/awesome-neovim/blob/main/README.md" target="_blank"
				>Awesome Neovim</a
			>
		</li>

		<li>
			Conference talks are also an excellent way to learn.
			<ul>
				<li>
					<a href="https://www.youtube.com/watch?v=UegUi2fWBaU" target="_blank"
						>Svelte 5, Rich Harris at North Start 2024</a
					>
				</li>
			</ul>
		</li>
	</ul>
</section>

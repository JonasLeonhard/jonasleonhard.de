<script lang="ts">
	let { data } = $props();
</script>

<h2>Why Neovim</h2>

<p>
	Starting with <a href="https://github.com/neovim/neovim">Neovim</a>can feel overwhelming.
	Therefore i am writing this guide. A guide i wish i had when i first started out with this
	wonderful editor. In this rather long post (im sorry, but i couldnt stop yapping about neovim.),
	we will rebuild most of
	<a href="https://github.com/JonasLeonhard/neovim-config">my personal Neovim config</a>
	from scratch. Yes you heard that right! We wont be using some of those bloated prebuild config distributions
	like <a href="https://www.lazyvim.org/">Lazy.nvim</a> or NvChad. Now if your coming from doom emacs,
	you will think: Building your own config? This seems crazy! Are you building your own plugins aswell?
	Well ... yes, yes and yes. And i can assure you that this is not only pretty straightforward, but has
	also other added benifits. You know exacly what is running in your editor, and you know how to change
	it to your liking. This is the real benifit of neovim. Adaptability. And we will play fully into it!
	Ready? Buckle up ... were about to descend into the core of the rabbithole that is neovim...
</p>

<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/8n-ylg-pw6s?si=ZIqhOydCA9TODvgO"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
></iframe>

<h2>Basics & Getting Started</h2>

<p>
	HELLO AND WELCOME TO THE CORE OF NEOVIM. DOWN HERE, WE WILL LOOK AT THE BASICS. THE CLOCKWORK THAT
	MAKES NEOVIM TICK. NOW, I DONT WANT TO SPEND TOO MUCH TIME IN THE HEAT, PLEASE JUST RUN <code
		>:tutor</code
	>
	AND LETS GET OUT OF HERE... WHAT DO YOU MEAN YOU DONT KNOW WHAT <code>:tutor</code> IS AND HOW TO RUN
	IT?... OK... FOLLOW THIS GETTING STARTED GUIDE AND MEET ME UP AT THE SURFACE!
</p>

<h3>Neovim overview in 100 Seconds</h3>

<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/c4OyfL5o7DU?si=rqeMYhyfhUl6GmPf"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
></iframe>

<h4>Setup</h4>

<p>
	Soooo. Where do we start? The first thing of course is <a
		href="https://github.com/neovim/neovim/blob/master/INSTALL.md">installing neovim</a
	>. Once you have done that. You should be able to start neovim by running
	{@html data.startExample}
	If we ran nvim without any option, we will be greeting by the iconic starting screen:
</p>

![NvimTutor](./NvimTutor.webp)

<p>
	Congratulations. You now entered neovim! Before we go into configuration, we should learn the
	basics of neovim. If you press `:` and write `Tutor` and press enter, you will be greeted by
	neovims tutorial that will teach you the basics of neovim.
</p>

<h3>Leaving Neovim</h3>

<p>
	TODO: insert neovim leave meme here. People often joke about not beeing able to leave neovim. You
	should know how to do it by now. it is simple. If you press `:`. You will enter 'command mode'.
	You can now type `q` to quit neovim.
</p>

<h3>Learning More</h3>

<p>
	Honestly. You want to write code. So i'll teach you how to get started and where to find more
	about neovim. Honestly, watch this getting started guide by <a href="https://github.com/tjdevries"
		>TJDevries</a
	>, and you should have a functional neovim setup. Come back after. I have a couple of points that
	TJ skipped.
</p>

<h4>Command Mode</h4>

<p>
	You have already learned about this mode when doing "Leaving Neovim". I know it's would be better
	to have autocompleted commands, but you will learn how to autocomplete soon enough. If you press
	`Ctrl-f` you can edit the command mode like a buffer, and use your familiar vim motions. You can
	run lua inside of the command mode. Eg running `:lua print("hi")`. Print the output of the
	command. There is also a shorthand for this: `:= "hi"`, which prints the output of the given lua
	expression after the equal sing. Now lets say we want to insert the output of a command line
	command in our current buffer. We could type `:r! ls` to insert the output of the ls command into
	our current buffer at the cursor postion. If you press `:e FILEPATH` we open a buffer of the
	filepath.
</p>

<h4>Netrw & Files (basics)</h4>

<p>
	Ok. but how do we navigate files? Surely we don't have to know each filepath? Thats where neovims
	file explorer "Netrw" comes into play. Think of it as the equivalent of a Filetree that other
	editors usually have. If you type `:Explore`, you open netrw in the directory you opened neovim
	from (this is called the current working directory "cwd"). You can also open Netrw in a split by
	using `:Hexplore` or `:Vexplore`. Netrw has a quickhelp by pressing `F1`. Otherwise, you should
	have learned about the help command by now. Press `:h netrw` and you will open the help page for
	netrw. In netrw you can mark, move, create, do commands and delete directories and files. Most
	people i see using neovim install a vscode like filetree plugin. But i think netrw is the best
	thing since sliced bread, and you really don't need anything else. You should really give it a try
	before installing something else. Dont worry. You dont have to type `:Hexplore
	path_of_current_file` anytime you want to open netrw in the current dir. We will create a keybind
	for it in the configuration section.
</p>

<h4>Opening Files</h4>

<p>
	You can create a file in two ways. Either by using the `:e file/dir path` command to create a
	buffer at the given path. If you type `:e README.md`, you will open a new README.md buffer. If you
	safe the buffer using `:w` for writing, the file will be created with the contents of the buffer.
	If you press "tab" while typing, neovim will open its builtin autocomplete window, and will
	autofill directories and files of your current working directory. To create a new file from netrw,
	you will have to press `%` and enter the filename. To create a directory from netrw, press `d` and
	enter a dirname.
</p>

<h4>File Name Modifiers</h4>

<p>
	Still, it might be worth to know that vim has file name modifiers. If we type `:=
	vim.fn.expand('%')`. ':=' means the following will be evaluated in lua and then printed. You can
	also write `:lua print(vim.fn.expand('%'))`. '%' will get the current file path of our open
	buffer. Now there are a bunch of modifiers we can use on these paths. Eg: `:=
	vim.fn.expand('%:h')` for the dirname (head) of the file path. Or `:= vim.fn.expand('%:t')` for
	the filename (tail) of the filepath. See `:h %:`. That means we can open a file using netrw, and
	then open netrw in the directory of the filepath instead of the cwd that you opened netrw from.
	You can do this by typing `:Hexplore %:h` to open the directory of the current buffer (% =>
	filepath, :h => head of filepath).
</p>

<h4>Normal Mode</h4>

<p>
	A short list of things you should try in normal mode I recommend thinking of something you might
	want to do from your cursor position. How do i move to word x from my current position? - maybe
	you move n lines down via `number j` to move to the line. Something like 5j will move your Cursor
	5 lines downwards. Or maybe you want to move to a specific line. That can be done in the command
	mode via `:yourlinenumberhere`. From this position you want to move horizontally? - you could use
	`f YourCharToJumpToInLine` to jump to a specific character in a line. Or press `w` to jump over
	words. Opening a new Line? - `o` and `O` Entering Insert mode? - `i` Delete to Char? - `dt
	YourCharToDeleteTo` Change Word? - `cw` . This will do the same a delete word `dw`, but also enter
	insert mode. Copy & Paste? - yy (called yankinig in vim). This yanks (copies to clipboard) the
	current line. You can also yank words `yw`, or `yt YourCharToYankToHere`. - p (paste) Yanking
	always yanks the text to registers. What is a register you might ask? A register is just some text
	that is saved in a name somewhere. If you type `:registers` , nvim will list all registers and
	their current contents. You will find the line you yanked in a register called '"'. The '"'
	register always contains the last yanked line. There are also numbered registers, that contain
	your undo history... TODO
</p>

<h45> Searching </h45>
<p>
	- if you press `/` you will enter search mode. Now you can type what you want to search and jump
	to the next occurance using `n` or backwards using `N`.
</p>

<h4>Insert Mode</h4>

<p>... todo</p>

<h4>Visual Mode</h4>

<p>... todo</p>

<h4>Visual Block Mode</h4>

<p>Multi line editing... Why no multicursor? ... todo</p>

<h3>Movement</h3>

<h3>Splits and Windows</h3>

<h3>Motions</h3>

<p>... todo</p>

<h2>Basic Configuration</h2>

<p>... todo</p>

<h2>Plugin Management</h2>

<p>... todo</p>

<h2>Advanced Configuration & Features</h2>

<p>... todo</p>

<h3>Autocomplete</h3>

<h3>LSP</h3>

<p>
	- how the buildin lsp works - why everyone uses lspconfig - a semi automatic setup with mason
	lspconfig.
</p>

<h3>Formatting</h3>

<h3>Linting</h3>

<h3>Tree Sitter</h3>

<h3>Custom Status Bar</h3>

<h3>WinBar</h3>

<h3>Sign Column</h3>

<h3>Working with Git</h3>

<h2>Advanced Features</h2>

<h3>Macros</h3>

<h3>Quickfix Lists & Location List</h3>

<h3>Global Search and Fuzzy finding</h3>
<p>Native? Telescope? Fzf lua?</p>

<h3>Buffer Search and Replace</h3>
<p>
	If you press "/" you go into search mode. You can now use regex to search for stuff. Replace with
	":s/searchtxt/replacetxt/gc" in visual mode or ":%/../../gc" for the whole buffer the 'g' is for
	global - meaning the whole line. 'c' asks you to confirm each replacement.
</p>

<h3>Go to definition</h3>

<h3>Terminal Buffers</h3>

<h3>Executing Shell commands</h3>

<h3>Motions in Prompts</h3>
<p>- press `ctrl-f` in command mode to be able to use motions and see your command history.</p>

<h3>Performance Profiling</h3>

<p>- builtin - using plenary - using perfanno - using snacks</p>

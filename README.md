
## Developing

Once you've created a project and installed dependencies with `bun install`), start a development server:
```bash
bun run dev
```

## Search (Pagefind)
In order for the search functionality to work. pagefind needs to build a search index, that will be copied to static/pagefind.
```
bun run build
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.


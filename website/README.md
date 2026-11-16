# Documentation website

This folder contains the Fumadocs/Next.js website. The Markdown content stays
in the repository's top-level `cli/` and `mgmt/` folders.

## Local preview

Requires Node.js 22 or newer.

```sh
cd website
npm ci
npm run dev
```

- CLI: http://127.0.0.1:3000/docs/cli/
- Management placeholder: http://127.0.0.1:3000/docs/mgmt/

The CLI overview is sample copy for reviewing the design. The Management
content folder is not connected yet; its selector entry shows a placeholder.

## Structure

- `../cli/`: CLI Markdown/MDX content and menu order (`meta.json`).
- `../mgmt/`: reserved for the later Management documentation.
- `src/app/`: page routes, the visual theme, and the static search/Markdown endpoints.
- `src/components/`: shared layout, section selector, search and page actions.
- `src/lib/source.ts`: connects the CLI content to the website.

Dependencies, caches and build output are ignored by Git. Fonts are bundled
locally; the build does not need to fetch Google Fonts.

## Checks

```sh
npm run check
npm run build
```

The static output is written to `out/`, ready for GitHub Pages under `/docs/`.
The production build uses Webpack so Markdown outside this folder can resolve
its imports from this project's dependencies.

This step adds no publishing workflow and changes no GitHub Pages settings.
Nothing publishes automatically.

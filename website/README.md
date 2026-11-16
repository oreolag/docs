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
- Management: http://127.0.0.1:3000/docs/mgmt/

The CLI overview is sample copy for reviewing the design. Management pages
are connected from `mgmt/` and contain placeholders to fill in later.

## Structure

- `../cli/`: CLI Markdown/MDX content and menu order (`meta.json`).
- `../mgmt/`: Management content, including separate Introduction, odev and System management sections.
- `src/app/`: page routes, the visual theme, and the static search/Markdown endpoints.
- `src/components/`: shared layout, section selector, search and page actions.
- `src/lib/source.ts`: connects the CLI and Management content to the website.

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

## Publishing

`.github/workflows/pages.yml` checks and builds pull requests targeting `main`.
Pushes to `main` publish the static output to GitHub Pages after the checks pass.
The workflow can also be started manually from the Actions tab on `main`.

Before the first deployment, open the repository's **Settings → Pages** and
select **GitHub Actions** as the source. This workflow does not enable Pages
itself or change repository settings.

Published addresses:

- CLI: https://oreolag.github.io/docs/cli/
- Management: https://oreolag.github.io/docs/mgmt/

Review, commit and push changes when ready to publish. Local edits alone do
not update the public website.

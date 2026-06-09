# Site Generator

This folder contains the Next.js static site generator for the CVA6 roadmap.

For normal roadmap maintenance, edit Markdown files under
`../roadmap-source/input/` instead. The generator writes
`../roadmap-source/generated/*.yml`; the app reads those generated files at build
time through `lib/roadmap-source.ts`, and the `data/*.ts` files are thin adapters
for the UI.

Use this folder only when changing rendering, routes, validation, styling, or
deployment behavior.

```bash
npm install
npm run generate:data
npm run validate:data
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

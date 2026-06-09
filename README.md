# CVA6 Roadmap

Public roadmap portal for the OpenHW CVA6 RISC-V core.

The site turns typed roadmap data into a static, searchable Next.js portal for community review. It is intended as a pilot for an OpenHW-friendly roadmap protocol: public strategy, project-level context, feature detail, release windows, organizational attribution, and a contribution path.

## Live site

- Production: https://cva6-roadmap-dev.vercel.app
- Repository: https://github.com/AlexChenIC/cva6-roadmap-dev

## Pages

- `/` — overview, strategic pillars, featured roadmap items, organizations, release windows
- `/roadmap` — public roadmap board with lane, organization, theme, and text filters
- `/projects` — project-level protocol view for the CVA6 pilot
- `/features` — searchable feature catalog
- `/features/[id]` — feature and roadmap item detail pages
- `/releases` — release-oriented roadmap view
- `/organizations` — contributing organization attribution
- `/contribute` — proposal and PR workflow

## Data model

Roadmap content lives in typed modules under `data/`.

- `data/roadmap.ts` contains `RoadmapItem[]`
- `data/organizations.ts` contains organization metadata
- `data/projects.ts` contains project-level metadata
- `data/releases.ts` connects roadmap items to release windows
- `data/pillars.ts` defines strategic themes

Lane grouping is derived from lifecycle status in `lib/lanes.ts`.

## Add a roadmap item

1. Add a `RoadmapItem` object in `data/roadmap.ts`.
2. Use an existing `Theme` and lifecycle status from `lib/types.ts`.
3. Include `proposingOrgs`, `owner`, `targetWindow` when known, `tags`, `userValue`, and `lastUpdated`.
4. Add public links to issues, specs, repositories, or discussions when useful.
5. Run validation before opening a PR.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

For discussion-first proposals, use the GitHub issue template.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static data modules, no database, no auth, no runtime API dependency
- Vercel deployment target

## Status

The current dataset is an illustrative starting point seeded by the portal team. Real ownership, target windows, and scope should be refined by the organizations doing the work through public review.

## License

Apache License 2.0. CVA6 Roadmap is a project of the OpenHW Group.

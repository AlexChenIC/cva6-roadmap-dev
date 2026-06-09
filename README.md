# CVA6 Roadmap

Public roadmap portal for the OpenHW CVA6 RISC-V core.

The website is the display surface. The roadmap source lives in `roadmap-source/`.
Think of `roadmap-source/` as the flight plan and the website as the public
departure board: partners propose changes to the plan, maintainers approve the
plan, and the site renders the approved state automatically.

## Live Links

- Production site: https://cva6-roadmap-dev.vercel.app
- GitHub repository: https://github.com/AlexChenIC/cva6-roadmap-dev

## What This Repo Is For

This repo is a pilot for an OpenHW-friendly roadmap protocol:

- show what CVA6 already has
- show what is being implemented or verified
- show planned and exploratory work
- separate partner requests from official commitments
- connect roadmap items to owners, organizations, releases, and evidence
- let partners propose updates through GitHub pull requests

It is not a Jira replacement, a CI dashboard, or a place for private planning.

## The Source Of Truth

All public roadmap content is maintained in `roadmap-source/`.

```text
roadmap-source/
  strategy.yml              # organization-level roadmap framing
  organizations.yml         # partner and maintainer organization metadata
  pillars.yml               # strategic themes used by filters
  projects.yml              # project-level metadata
  roadmap-items.yml         # accepted public roadmap items
  releases.yml              # release windows and included roadmap items
  partner-needs.yml         # partner expectations not yet official commitments
  updates/                  # public update notes
  meeting-notes/            # monthly CVA6 roadmap meeting notes
  schemas/                  # validation notes
```

The app reads these files during the Next.js build through `lib/roadmap-source.ts`.
The `data/*.ts` files are now thin adapters, not the source data.

## How To Use This Repo

### I am a partner and want to propose a need

Start in `roadmap-source/partner-needs.yml`.

Use this when the request is important, but not yet an OpenHW/CVA6 commitment.
Examples:

- "We need stronger virtualization support."
- "We need safety collateral and traceability."
- "We want a clean accelerator extension path."

Add a new object with:

- stable `id`
- `title`
- `summary`
- `sourceType`
- `status`
- `proposingOrgs`
- `relatedRoadmapItems`
- `requestedCapabilities`
- `owner` when known
- public `evidence` links when available

Then open a pull request. Maintainers will review whether it should remain a
partner need, be refined, or be promoted into `roadmap-items.yml`.

### I am a maintainer and want to accept a roadmap item

Edit `roadmap-source/roadmap-items.yml`.

Use this file only for items that the roadmap maintainers are willing to show as
official public roadmap content.

Every accepted item should include:

- `id`
- `title`
- `summary`
- `theme`
- `status`
- `proposingOrgs`
- `owner`
- `targetWindow` or `targetRelease` when known
- `tags`
- `userValue`
- `links`
- `lastUpdated`

If the item belongs to a release, also update `roadmap-source/releases.yml`.

### I want to update a release target

Edit `roadmap-source/releases.yml`.

Use `includedRoadmapItems` to connect a release to accepted roadmap item IDs:

```yaml
includedRoadmapItems:
  - hypervisor-h
  - formal-verif
  - rva23-profile
```

The validator checks that every referenced roadmap item exists.

### I want to add a new organization

Edit `roadmap-source/organizations.yml` first, then reference the new org ID from
`roadmap-items.yml`, `partner-needs.yml`, or `projects.yml`.

Use a short, URL-safe `id` such as `openhw`, `thales`, or `unibo`.

### I want to record the monthly CVA6 roadmap meeting

Add a note under `roadmap-source/meeting-notes/`.

Recommended naming:

```text
roadmap-source/meeting-notes/2026-07-cva6-roadmap.md
```

Use the note to explain what changed and why. If the meeting changes official
roadmap data, open a pull request that updates both the meeting note and the
relevant YAML file.

## Maintainer Workflow

The monthly maintenance loop is:

1. Discuss roadmap changes in the CVA6 roadmap meeting.
2. Capture decisions in `roadmap-source/meeting-notes/`.
3. Update `partner-needs.yml`, `roadmap-items.yml`, or `releases.yml`.
4. Run validation locally.
5. Open a pull request.
6. Review the Vercel preview.
7. Merge only after owner, status, target window, and evidence are clear.
8. Production updates automatically after merge.

## Validation

Run this before opening a pull request:

```bash
npm run validate:data
npm run lint
npx tsc --noEmit
npm run build
```

`npm run validate:data` checks the roadmap source for common governance mistakes:

- duplicate IDs
- invalid theme or status values
- missing owners
- broken organization references
- release entries pointing at nonexistent roadmap items
- partner needs pointing at nonexistent roadmap items
- malformed URLs
- malformed `lastUpdated` dates

GitHub Actions runs the same checks on pull requests.

## Pages Generated From The Source

- `/` - overview, strategy, partner signals, highlights, organizations, release windows
- `/roadmap` - public roadmap board with lane, organization, theme, and text filters
- `/projects` - project-level protocol view for the CVA6 pilot
- `/features` - searchable feature catalog
- `/features/[id]` - roadmap item detail pages
- `/releases` - release-oriented roadmap view
- `/organizations` - organization attribution
- `/contribute` - contribution and PR workflow

## Governance Rule

Partner needs are welcome, but they are not automatically official roadmap
commitments.

A partner need becomes an official roadmap item only after maintainers agree on:

- owner or responsible team
- lifecycle status
- target window or release
- scope
- public evidence links
- risk or validation notes

This keeps the roadmap open to partner input without turning every request into
an OpenHW delivery promise.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- YAML roadmap source
- Static build, no database, no auth, no runtime API dependency
- Vercel deployment target

## License

Apache License 2.0. CVA6 Roadmap is a project of the OpenHW Group.

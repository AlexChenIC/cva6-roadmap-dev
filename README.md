# CVA6 Roadmap

Public roadmap portal for the OpenHW CVA6 RISC-V core.

This repository is intentionally split into three visible parts:

```text
README.md        You are here: how to maintain and review the roadmap.
roadmap-source/  The daily editing area for roadmap data and meeting notes.
site/            The static website generator. Edit only when changing rendering.
```

Hidden folders such as `.github/`, `.vercel/`, and `.git/` contain automation,
deployment, and repository metadata.

## Live Links

- Production site: https://cva6-roadmap-dev.vercel.app
- GitHub repository: https://github.com/AlexChenIC/cva6-roadmap-dev
- Upstream CVA6 releases: https://github.com/openhwgroup/cva6/releases

## The Maintenance Model

Partners and maintainers should not need to touch the website implementation for
normal roadmap updates. The repository uses a two-layer source model:

```text
roadmap-source/input/      Human-edited Markdown files for normal PRs
roadmap-source/templates/  Copyable starting points for new entries
roadmap-source/generated/  Machine-generated YAML read by the website
site/                      Static website renderer and validation scripts
```

Think of it as a public departure board:

- `input/` is the simple form partners fill in.
- `generated/` is the timetable produced from those forms.
- `site/` is the screen that displays the timetable.
- Pull requests are the control gate.

This is a good fit for an open-source organization because partners can propose
changes openly, while OpenHW maintainers still decide what becomes official.

## What Partners Usually Edit

Most updates should touch one Markdown file under `roadmap-source/input/`:

```text
roadmap-source/input/partner-needs/*.md    Partner expectations before commitment
roadmap-source/input/roadmap-items/*.md    Accepted roadmap items and feature plans
roadmap-source/input/releases/*.md         Real releases and planned release windows
roadmap-source/input/organizations/*.md    Organization names, labels, and logos
roadmap-source/input/meeting-notes/*.md    Reviewed CVA6 meeting summaries
```

Examples:

- A partner asks for virtualization readiness: add or edit one file in
  `input/partner-needs/`.
- Maintainers accept a feature into the public roadmap: add or edit one file in
  `input/roadmap-items/`.
- A new upstream CVA6 release is published: add or edit one file in
  `input/releases/`.
- A new organization starts participating: add or edit one file in
  `input/organizations/`, then refer to its `id` from roadmap items or partner
  needs.
- Organization logos are referenced from the organization Markdown file. Logo
  assets should live under `site/public/org-logos/` and render through the
  shared `OrganizationLogo` component in chip, medium, and large sizes.

## Source Files

```text
roadmap-source/
  README.md                 Source-folder guide
  input/                    Daily editing area for partners and maintainers
  templates/                Copyable Markdown templates
  generated/                YAML generated from input; do not hand-edit
  strategy.yml              Roadmap framing and governance policy
  pillars.yml               Strategic themes used by filters
  projects.yml              Project-level metadata
  updates/                  Public changelog-style notes
  schemas/                  Validation notes
```

The current release data includes real entries from
https://github.com/openhwgroup/cva6/releases. Planned entries are explicitly
tagged as examples, not commitments.

## Promotion Rule

Partner needs are welcome, but they are not automatically official roadmap
commitments.

A partner need becomes an official roadmap item only after maintainers agree on:

- owner or responsible team
- lifecycle status
- target window or release
- scope and risk notes
- public evidence links
- verification or validation expectations

This lets the website show partner demand without turning every request into an
OpenHW delivery promise.

## Monthly Workflow

1. Discuss roadmap changes in the CVA6 roadmap meeting.
2. Capture reviewed decisions in `roadmap-source/input/meeting-notes/`.
3. Copy a template from `roadmap-source/templates/` when adding a new entry.
4. Update the relevant Markdown file under `roadmap-source/input/`.
5. Run validation locally; it regenerates `roadmap-source/generated/*.yml`.
6. Open a pull request.
7. Review the Vercel preview.
8. Merge only after owner, status, target window, and evidence are clear.
9. Production updates automatically after merge or manual deployment.

## Local Review

The implementation lives under `site/`, so local commands run there:

```bash
cd site
npm install
npm run generate:data
npm run validate:data
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Open http://localhost:3000.

`npm run validate:data` first regenerates YAML from Markdown, then checks for
common governance and data problems:

- duplicate IDs
- invalid organization references
- invalid roadmap status or theme values
- release entries pointing at nonexistent roadmap items
- partner needs pointing at nonexistent roadmap items
- malformed URLs
- malformed `lastUpdated` dates

## Deployment

Deploy from the repository root using a prebuilt deployment. The local build
runs inside `site/`, where the app can read `../roadmap-source/`:

```bash
npx vercel build --prod --cwd site
npx vercel deploy --prebuilt --prod --cwd site
```

The Vercel config lives in `site/vercel.json` to keep the root directory focused
on the README, roadmap source, and site generator. For Git-based Vercel builds,
set the Vercel project Root Directory to `site`.

## Generated Pages

- `/` - overview, strategy, partner signals, highlights, organizations, releases
- `/roadmap` - roadmap board with lane, organization, theme, and text filters
- `/roadmap/[id]` - roadmap item detail pages
- `/releases` - real and planned release-oriented view
- `/organizations` - organization attribution

## Editing Boundary

For normal roadmap maintenance, edit `roadmap-source/` only.

Edit `site/` when changing layout, visual design, filters, routes, validation
logic, or deployment behavior.

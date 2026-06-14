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

- GitHub Pages site: https://alexchenic.github.io/cva6-roadmap-dev/
- Vercel preview / fallback site: https://cva6-roadmap-dev.vercel.app
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

## What Partners Usually Edit

Most updates should touch one Markdown file under `roadmap-source/input/`:

```text
roadmap-source/input/partner-needs/*.md    Partner expectations before commitment
roadmap-source/input/roadmap-items/*.md    Accepted roadmap items and feature plans
roadmap-source/input/releases/*.md         Real releases and planned release windows
roadmap-source/input/organizations/*.md    Organization names, websites, neutral descriptions, and logos
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

## Current Review Status

This repository is ready for OpenHW/CVA6 group review, wording review, and
workflow feedback. Future-looking items should not be treated as final OpenHW
delivery commitments until maintainers confirm scope, review lead, target
window, release linkage, and public evidence.

## Promotion Rule

Partner needs are welcome, but they are not automatically official roadmap
commitments.

A partner need becomes an official roadmap item only after maintainers agree on:

- maintainer contact or review lead
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
7. Review the generated site preview.
8. Merge only after review lead, status, target window, and evidence are clear.
9. GitHub Pages updates automatically after merge to `main`.

## Minimal Example: Add One Roadmap Item

Use this example when a maintainer-reviewed topic is ready to appear on the
public roadmap. If the topic is only a request or early discussion, create a
partner need instead.

1. Create a new Markdown file from the roadmap-item template:

```bash
cp roadmap-source/templates/roadmap-item.md \
  roadmap-source/input/roadmap-items/026-example-feature.md
```

2. Edit `roadmap-source/input/roadmap-items/026-example-feature.md`.

Replace the template frontmatter with stable, public data:

```yaml
id: example-feature
title: Example feature for CVA6
theme: Verification
status: Proposed
proposingOrgs:
  - openhw
owner: OpenHW CVA6 maintainers
targetWindow: Exploratory
targetRelease:
tags:
  - verification
  - example
lastUpdated: 2026-06-10
featured: false
showOnOrganizations: true
```

Then replace the Markdown sections:

```markdown
## Summary

One or two sentences describing the reviewed roadmap signal.

## Description

State what is in scope, what is not yet committed, and what evidence exists.

## User value

Explain why adopters, contributors, or maintainers should care.

## Links

- [Public issue, PR, spec, or repository](https://github.com/openhwgroup/cva6)
```

3. Use `showOnOrganizations` intentionally.

- `showOnOrganizations: true` means this item appears under the listed
  organizations on the Organizations page.
- `showOnOrganizations: false` is for release facts, baseline references, or
  historical context that should not look like an organization-owned feature
  plan.

4. Validate and preview:

```bash
cd site
npm run validate:data
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Open http://localhost:3000 and check the Roadmap, Release, and Organizations
pages before opening the pull request.

5. Open a pull request.

The PR should explain why the item belongs on the public roadmap, who should
review it, what evidence supports it, and whether the wording is a commitment,
a proposed direction, or an exploratory signal.

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

The preferred long-term public deployment is GitHub Pages, because roadmap
updates already move through GitHub pull requests and maintainer review.

### GitHub Pages

The workflow lives at `.github/workflows/deploy-github-pages.yml`.

On every push to `main`, GitHub Actions:

1. checks out the repository
2. installs dependencies under `site/`
3. regenerates roadmap YAML from Markdown
4. validates roadmap data
5. runs lint and TypeScript checks
6. builds a static Next.js export into `site/out`
7. publishes `site/out` through GitHub Pages

The GitHub Pages build sets:

```text
GITHUB_PAGES=true
GITHUB_PAGES_BASE_PATH=/cva6-roadmap-dev
NEXT_PUBLIC_BASE_PATH=/cva6-roadmap-dev
NEXT_PUBLIC_SITE_URL=https://alexchenic.github.io/cva6-roadmap-dev
```

This makes the static export work under the default GitHub Pages project URL:

```text
https://alexchenic.github.io/cva6-roadmap-dev/
```

In GitHub repository settings, Pages should use **GitHub Actions** as the source.
No branch-based `gh-pages` publishing is required.

If the site later moves to a formal custom domain such as
`https://roadmap.example.org`, remove the project base path by setting
`GITHUB_PAGES_BASE_PATH` to an empty value in the workflow and set
`NEXT_PUBLIC_SITE_URL` to the custom domain.

### Vercel Preview / Fallback

Vercel remains useful for quick previews and manual production checks. Deploy
from the repository root so the build can read both `site/` and
`roadmap-source/`:

```bash
npx vercel deploy . --prod --yes --local-config site/vercel.root.json
```

For Git-based Vercel builds, keep the project root at the repository root and
configure:

```text
Install Command: cd site && npm ci
Build Command:   cd site && npm run build
Output Directory: site/.next
Framework:       Next.js
```

Do not set the Vercel Root Directory to `site`, because the build would no
longer include `roadmap-source/`.

## Generated Pages

- `/` - concise portal overview and roadmap workflow
- `/roadmap` - roadmap board with lane, organization, theme, and text filters
- `/roadmap/[id]` - roadmap item detail pages
- `/releases` - real and planned release-oriented view
- `/organizations` - organization attribution

## Editing Boundary

For normal roadmap maintenance, edit `roadmap-source/` only.

Edit `site/` when changing layout, visual design, filters, routes, validation
logic, or deployment behavior.

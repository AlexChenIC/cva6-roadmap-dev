# Roadmap Source

This folder is the source of truth for the CVA6 roadmap portal.

The website reads these files at build time and turns them into the public pages.
Partners should propose changes here through pull requests. Maintainers decide
what is merged into the official roadmap.

## Folder Map

- `input/` - the normal editing area. Partners and maintainers add or update
  Markdown files here.
- `templates/` - copyable Markdown templates for new roadmap items, partner
  needs, releases, organizations, and meeting notes.
- `generated/` - YAML produced from `input/`. The website reads these files at
  build time. Do not hand-edit them.
- `strategy.yml` - organization-level roadmap framing and policy.
- `pillars.yml` - strategic themes used for filtering and grouping.
- `projects.yml` - project-level metadata.
- `updates/` - public changelog-style notes.
- `schemas/` - validation notes.

## How to propose a change

1. Copy the relevant template from `templates/`.
2. Put the new Markdown file in the matching `input/` folder.
3. For a partner request, start in `input/partner-needs/`.
4. For an accepted or reviewed public roadmap signal, use `input/roadmap-items/`.
5. Link public evidence such as issues, PRs, specs, meeting notes, or verification results.
6. Run `cd site && npm run validate:data` before asking for review.

`npm run validate:data` regenerates `generated/*.yml` and then validates
references, dates, IDs, URLs, release links, and organization IDs.

## Promotion rule

A partner need becomes an official roadmap item only when maintainers agree on:

- maintainer contact or review lead
- lifecycle status
- target window or release
- public evidence links
- scope and risk notes

This keeps the site open to partner input without turning every request into an
OpenHW delivery commitment.

Use `showOnOrganizations: false` on roadmap items that are release facts,
baseline references, or historical context. They will still appear in the
Roadmap and Release views, but the Organizations page will stay focused on
current or proposed feature directions.

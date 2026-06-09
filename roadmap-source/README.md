# Roadmap Source

This folder is the source of truth for the CVA6 roadmap portal.

The website reads these files at build time and turns them into the public pages.
Partners should propose changes here through pull requests. Maintainers decide
what is merged into the official roadmap.

## Files

- `strategy.yml` - organization-level roadmap framing and policy.
- `organizations.yml` - participating organizations shown across the site.
- `pillars.yml` - strategic themes used for filtering and grouping.
- `projects.yml` - project-level metadata.
- `roadmap-items.yml` - accepted roadmap items and feature-level plans.
- `releases.yml` - release windows and their included roadmap items.
- `partner-needs.yml` - partner expectations that are not yet official commitments.
- `updates/` - public changelog-style notes.
- `meeting-notes/` - monthly CVA6 roadmap meeting notes.

## How to propose a change

1. Open a pull request that edits only the relevant files in this folder.
2. For a partner request, start in `partner-needs.yml`.
3. For an accepted roadmap commitment, update `roadmap-items.yml`.
4. Link public evidence such as issues, PRs, specs, meeting notes, or verification results.
5. Run `cd site && npm run validate:data` before asking for review.

## Promotion rule

A partner need becomes an official roadmap item only when maintainers agree on:

- owner or responsible team
- lifecycle status
- target window or release
- public evidence links
- scope and risk notes

This keeps the site open to partner input without turning every request into an
OpenHW delivery commitment.

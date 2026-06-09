# Roadmap Input

This is the daily editing area for partners and maintainers.

Use Markdown files here instead of editing generated YAML directly. Each file has
YAML frontmatter for machine-readable fields and short Markdown sections for
human-readable context.

## Folders

- `roadmap-items/` - accepted public roadmap items.
- `partner-needs/` - partner requests that are not official commitments yet.
- `releases/` - real upstream releases and clearly marked planned examples.
- `organizations/` - organization names, websites, logos, and neutral public descriptions.
- `meeting-notes/` - reviewed weekly or monthly meeting summaries.

## Workflow

1. Copy a template from `../templates/`.
2. Put the new file in the matching folder.
3. Give the file a stable numeric prefix, for example `004-my-request.md`.
4. Fill in the frontmatter and Markdown sections.
5. Run:

```bash
cd ../../site
npm run validate:data
```

The script regenerates `../roadmap-source/generated/*.yml` and validates all
references.

## Editing Examples

- New partner request: copy `../templates/partner-need.md` into
  `partner-needs/`.
- Accepted roadmap item: copy `../templates/roadmap-item.md` into
  `roadmap-items/`.
- New real or planned release: copy `../templates/release.md` into `releases/`.
- New participating organization: copy `../templates/organization.md` into
  `organizations/`.
- Reviewed meeting summary: copy `../templates/meeting-note.md` into
  `meeting-notes/`.

## Rule

Edit files in `input/`. Do not hand-edit files in `generated/`.

# Schema Notes

The repository currently validates roadmap source files with
`site/scripts/validate-roadmap-source.mjs`. These notes document the expected
object families and are intentionally kept near the data.

Future work can replace the handwritten validator with JSON Schema or a stricter
typed parser if the roadmap source grows beyond the CVA6 pilot.

## Practical Field Notes

- `organizations.yml` supports `logo` and `tags`. Logos should point to files
  in `site/public/`, for example `/org-logos/openhw.svg`.
- `partner-needs.yml` supports `tags` so partner expectations can be grouped
  before they become accepted roadmap items.
- `roadmap-items.yml` is the accepted public roadmap layer. Its `targetRelease`
  must match a `version` in `releases.yml`.
- `releases.yml` supports `tagName`, `labels`, `highlights`, and `sourceUrl`.
  Use `labels` to distinguish `real-release` entries from `planned-example`
  entries.
- `includedRoadmapItems` must reference existing IDs from `roadmap-items.yml`.

# Schema Notes

The repository currently validates roadmap source files with
`site/scripts/validate-roadmap-source.mjs`. These notes document the expected
object families and are intentionally kept near the data.

Future work can replace the handwritten validator with JSON Schema or a stricter
typed parser if the roadmap source grows beyond the CVA6 pilot.

## Practical Field Notes

Daily edits should happen in `roadmap-source/input/*.md`. The generator writes
the YAML files in `roadmap-source/generated/`, and the website reads those
generated files.

- Organization input supports `logo` and `tags`. Logos should point to files in
  `site/public/`, for example `/openhw/openhw-horizontal.svg` or
  `/org-logos/lowrisc.svg`.
- Partner need input supports `tags` so partner expectations can be grouped
  before they become accepted roadmap items.
- Roadmap item input is the accepted public roadmap layer. Its `targetRelease`
  must match a `version` in the generated releases data.
- Release input supports `tagName`, `labels`, `highlights`, and `sourceUrl`.
  Use `labels` to distinguish `real-release` entries from `planned-example`
  entries.
- `includedRoadmapItems` must reference existing roadmap item IDs.

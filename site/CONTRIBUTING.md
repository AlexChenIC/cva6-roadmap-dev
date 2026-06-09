# Contributing to the CVA6 Roadmap

This repository maintains a public roadmap portal for the OpenHW CVA6 RISC-V core.
The site is intentionally source driven: roadmap content is edited as Markdown
files under `roadmap-source/input/`, generated into YAML under
`roadmap-source/generated/`, and rendered by the Next.js app.

## Ways to propose a change

Use a roadmap proposal issue when a topic needs discussion before a data change.
Use a pull request when the requested data update is already clear.

Start partner requests in `roadmap-source/input/partner-needs/`. Move content
into `roadmap-source/input/roadmap-items/` only after maintainers accept the
owner, scope, status, timing, and evidence.

Good proposals include:

- A concise feature or capability title.
- A short summary and clear user value.
- The proposed theme.
- The proposed lifecycle status or public lane.
- The proposing or owning organization.
- A named owner or responsible team.
- A target window or release, if known.
- Links to design notes, issues, specs, or implementation work.

## Editing roadmap source

Roadmap items are defined in `roadmap-source/input/roadmap-items/*.md`. Partner
expectations that are not yet official commitments are defined in
`roadmap-source/input/partner-needs/*.md`. The generator writes
`roadmap-source/generated/*.yml`, and the app reads those generated files at
build time through `lib/roadmap-source.ts`.

When adding or editing an item:

- Keep the `id` stable and URL-safe.
- Use one of the existing `Theme` values from `lib/types.ts`.
- Use one of the lifecycle statuses from `LifecycleStatus`.
- Include at least one `proposingOrgs` id from `roadmap-source/input/organizations/`.
- Include an `owner` value that names a responsible team or point of contact group.
- Keep `summary` to one or two sentences.
- Add a practical `userValue` line.
- Use ISO dates for `lastUpdated`, such as `2026-05-01`.
- Add links when useful, especially to public specs, issues, or repositories.

When adding or editing a partner need:

- Keep the `id` stable and URL-safe.
- Use a clear `status`: `candidate`, `under-review`, `accepted`, or `declined`.
- Include at least one `proposingOrgs` id.
- Link to related roadmap item IDs when they exist.
- Keep `requestedCapabilities` concrete enough for maintainers to review.
- Add public evidence or meeting notes when available.

## Lifecycle rules

The public board has four lanes. Lanes are derived from lifecycle status in
`lib/lanes.ts`.

- `Released` -> Released.
- `In Progress` and `Verification` -> Active Work.
- `Planned` -> Planned.
- `Proposed`, `Idea`, and `Deferred` -> Exploratory.

Use the most specific lifecycle status that reflects current commitment:

- `Released`: merged, verified, and available in a public CVA6 release or stable configuration.
- `In Progress`: active implementation with a named owner or organization.
- `Verification`: implementation exists and verification is the main remaining work.
- `Planned`: accepted direction with expected scope or timing, but not yet active execution.
- `Proposed`: community proposal that needs review, ownership, or scope refinement.
- `Idea`: exploratory direction without a concrete commitment.
- `Deferred`: valid topic intentionally pushed out of the active plan.

## Pull request checklist

Before opening a PR, run:

```bash
npm run validate:data
npm run lint
npx tsc --noEmit
```

For page or component changes, also run:

```bash
npm run build
```

The PR should explain what changed, why it belongs on the public roadmap, and which
organization or maintainer should review it.

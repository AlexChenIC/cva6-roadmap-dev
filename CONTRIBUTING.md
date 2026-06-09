# Contributing to the CVA6 Roadmap

This repository maintains a public roadmap portal for the OpenHW CVA6 RISC-V core.
The site is intentionally data driven: roadmap content lives in typed files under
`data/`, and the Next.js app renders that data into the board, catalog, organization
pages, and feature detail pages.

## Ways to propose a change

Use a roadmap proposal issue when a topic needs discussion before a data change.
Use a pull request when the requested data update is already clear.

Good proposals include:

- A concise feature or capability title.
- A short summary and clear user value.
- The proposed theme.
- The proposed lifecycle status or public lane.
- The proposing or owning organization.
- A target window or release, if known.
- Links to design notes, issues, specs, or implementation work.

## Editing roadmap data

Roadmap items are defined in `data/roadmap.ts` as `RoadmapItem` objects. The shared
type lives in `lib/types.ts`.

When adding or editing an item:

- Keep the `id` stable and URL-safe.
- Use one of the existing `Theme` values from `lib/types.ts`.
- Use one of the lifecycle statuses from `LifecycleStatus`.
- Include at least one `proposingOrgs` id from `data/organizations.ts`.
- Keep `summary` to one or two sentences.
- Add a practical `userValue` line.
- Use ISO dates for `lastUpdated`, such as `2026-05-01`.
- Add links when useful, especially to public specs, issues, or repositories.

## Lifecycle rules

The public board has four lanes. Lanes are derived from lifecycle status in
`lib/lanes.ts`.

- `Released` -> Available.
- `In Progress` and `Verification` -> In Progress.
- `Planned` -> Planned.
- `Proposed`, `Idea`, and `Deferred` -> Future Idea.

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
npm run lint
npx tsc --noEmit
```

For page or component changes, also run:

```bash
npm run build
```

The PR should explain what changed, why it belongs on the public roadmap, and which
organization or maintainer should review it.

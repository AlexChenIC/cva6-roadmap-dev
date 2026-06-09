# Build Queue — do top-to-bottom, one per cycle. Tick `[x]` when acceptance passes.

Working dir for all commands: `/Users/alexchen/1_workspace/4_openhw/8_roadmap_web/`

---

- [x] **T0 — Bootstrap repo & app**
  - `git init` (if not already a repo). Add `.gitignore` (node_modules, .next, .vercel, .env*).
  - Scaffold Next.js into the project root **without clobbering** `codex/`, `OPENHW-Logo with Foundation/`,
    `roadmap-design_reference_rules.md`. Use:
    `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --no-turbopack`
    If the CLI refuses to run in a non-empty dir, scaffold in a temp dir and copy the app files in.
  - **Accept:** `npm run dev` starts; default page loads at localhost:3000. Commit `chore: bootstrap next.js app`.

- [ ] **T1 — Design tokens, fonts, logos**
  - Copy the 3 logo SVGs into `public/openhw/` per SPEC §4.5. Add `app/icon.svg` (stacked).
  - Add brand tokens to global CSS / Tailwind theme (SPEC §4.1–4.2). Wire **Inter** via `next/font`.
  - Set base page bg `--surface-subtle`, ink text color, container width.
  - **Accept:** tokens usable as Tailwind classes or CSS vars; Inter renders. Commit `style: brand tokens + logos`.

- [ ] **T2 — Types & lane logic**
  - Create `lib/types.ts` (SPEC §5) and `lib/lanes.ts` (`statusToLane`, `LANES` metadata, `itemsByLane`).
  - **Accept:** `npx tsc --noEmit` passes. Commit `feat: core types + lane mapping`.

- [ ] **T3 — Seed data**
  - Create `data/organizations.ts`, `data/releases.ts`, `data/pillars.ts`, `data/roadmap.ts` (SPEC §6).
    Type out all ~18 roadmap items with real summaries, userValue, tags, dates.
  - **Accept:** data imports type-check; `npx tsc --noEmit` clean. Commit `feat: seed roadmap dataset`.

- [ ] **T4 — Layout: header + footer + nav**
  - `app/layout.tsx`: global Header (logo→openhw.org, "CVA6 Roadmap" wordmark, nav links, GitHub icon)
    and Footer (white logo on navy, "a project of the OpenHW Group", links, © year).
  - Active-link styling. Mobile nav (simple disclosure/menu).
  - **Accept:** header/footer on every route; logos load; responsive at 375px. Commit `feat: app shell`.

- [ ] **T5 — Shared components**
  - `components/`: `LanePill`, `OrgChip`, `ThemeTag`, `RoadmapCard` (SPEC §7.3), `SummaryBar`,
    `FilterBar` (search + multiselect + group-by, URL-synced), `SectionHeading`, `EmptyState`.
  - **Accept:** components render in isolation without errors; typed props. Commit `feat: ui components`.

- [ ] **T6 — Home page**
  - Build `/` per SPEC §7.1. All counts derived from data. Featured items from `featured:true`.
  - **Accept:** hero, lane strip (correct counts), pillars, highlights, org row, releases, CTA, footer.
    Commit `feat: home page`.

- [ ] **T7 — Roadmap page (core)**
  - Build `/roadmap` per SPEC §7.2 with client filtering, board (group-by Lane) + grouped views,
    URL query sync (`?lane=&org=&theme=&q=`), summary bar, empty state.
  - **Accept:** filters/search/group-by work; reload preserves state via URL; cards link to detail.
    Commit `feat: roadmap board + filters`.

- [ ] **T8 — Features catalog**
  - Build `/features` per SPEC §7.4 (search-first flat list reusing filter primitives).
  - **Accept:** search filters list; rows link to detail. Commit `feat: features catalog`.

- [ ] **T9 — Item detail**
  - Build `/features/[id]` with `generateStaticParams`. Layout per SPEC §7.5. Handle unknown id → 404.
  - **Accept:** every item id renders; meta panel + org chips + links correct. Commit `feat: item detail`.

- [ ] **T10 — Organizations page**
  - Build `/organizations` per SPEC §7.6: org cards with blurb, website, and their items (linked).
  - **Accept:** each org lists its items; counts correct. Commit `feat: organizations page`.

- [ ] **T11 — Contribute page + GitHub templates**
  - Build `/contribute` (SPEC §7.7). Add `CONTRIBUTING.md`,
    `.github/ISSUE_TEMPLATE/roadmap-item.yml`, `.github/PULL_REQUEST_TEMPLATE.md`.
  - **Accept:** page explains the data-driven model + lifecycle; templates valid YAML/MD.
    Commit `docs: contribute page + templates`.

- [ ] **T12 — Repo polish: README, license, SEO, 404**
  - `LICENSE` (Apache-2.0), `README.md` (SPEC §8), per-page `metadata`, `not-found.tsx`,
    `app/sitemap.ts` (optional). Replace default favicon with OpenHW mark.
  - **Accept:** README complete; metadata titles correct; 404 styled. Commit `docs: readme + license + seo`.

- [ ] **T13 — QA pass**
  - `npm run build` (zero errors), `npm run lint` (clean). Manual check responsive 375/768/1280,
    keyboard nav, contrast, empty states, broken-link scan.
  - **Accept:** clean build + lint; checklist in SPEC §9 satisfied. Commit `chore: qa fixes`.
    Record results in PROGRESS.md.

- [ ] **T14 — Create GitHub repo & push**
  - Create a **private** repo on the user's personal account:
    `gh repo create cva6-roadmap --private --source=. --remote=origin --description "Public roadmap for the OpenHW CVA6 RISC-V core"`
    then `git push -u origin main`. If `gh` is not authenticated, mark **BLOCKED** and tell the user to run
    `gh auth login` (or `! gh auth login`).
  - **Accept:** repo exists; main pushed. Commit/push clean.

- [ ] **T15 — Deploy to Vercel**
  - `npx vercel link` then `npx vercel --prod` (or `npx vercel deploy --prod`). Project name `cva6-roadmap`.
    If not authenticated, mark **BLOCKED** and tell the user to run `! npx vercel login`.
  - **Accept:** production deploy succeeds; capture the public URL. Put URL in PROGRESS.md and README.

- [ ] **T16 — Final report**
  - Append a completion summary to PROGRESS.md: live URL, repo URL, page list, anything deferred,
    and how the user adds a new roadmap item.

---
### Notes for tricky steps
- If `create-next-app` won't scaffold into the non-empty root: run it in `/tmp/cva6app`, then move
  everything except its `.git` into the project root, and merge `.gitignore`.
- Keep `codex/`, the logo source folder, and the reference `.md` tracked but excluded from the build
  (they're outside `app/` so Next ignores them automatically).
- Never delete or edit files in `OPENHW-Logo with Foundation/`.

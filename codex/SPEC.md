# CVA6 Roadmap Portal — Build Spec (source of truth)

## 1. What this is
A public, beautiful, low-maintenance **roadmap website** for **CVA6**, the OpenHW Group's
application-class RISC-V core. It shows the community four things:
1. **Available now** — capabilities CVA6 already has.
2. **In Progress (Committed)** — actively funded/owned work being built.
3. **Planned** — accepted work scheduled for a future window.
4. **Future Ideas** — community proposals not yet committed.

It also makes clear **which organization proposed/owns each item** (Thales, University of Bologna,
lowRISC, Capabilities, OpenHW Group, and more later), so the community understands *where CVA6 is going
and who is driving it*.

It is explicitly **not** Jira / a GitHub replacement / a CI dashboard / a verification platform.

## 2. Tech stack (fixed)
- **Next.js (latest, App Router) + TypeScript**, `app/` directory.
- **Tailwind CSS** for styling (v4 if the scaffolder installs it; otherwise v3 is fine).
- **lucide-react** for icons. **No** component megaframeworks.
- Content = typed modules in `/data`. **Statically rendered** (SSG). No DB, no runtime fetch, no auth.
- Client-side filtering/search only (`"use client"` islands where needed).
- Deploy target: **Vercel**.
- Node 20+. Package manager: npm (use whatever the scaffolder picks; be consistent).

## 3. Information architecture (MVP)
Top nav: **Home · Roadmap · Features · Organizations · Contribute**
(Releases shown as a section on Home + a strip on Roadmap; full Releases page is post-MVP.)

Routes:
- `/`                         Home
- `/roadmap`                  Status board + filters (the core page)
- `/features`                 Searchable flat catalog
- `/features/[id]`            Item / feature detail
- `/organizations`            Contributing orgs directory
- `/contribute`               How to propose a feature (links to GitHub)
- `not-found`                 Friendly 404

## 4. Design system

### 4.1 Brand tokens (from official OpenHW SVGs)
```
--openhw-green:       #18A13B   /* primary accent, CTAs, "Available" */
--openhw-green-dark:  #12812F
--openhw-navy:        #222E5B   /* dark sections, footer, headings on light */
--openhw-navy-deep:   #002E5F
--openhw-gray:        #747173
--ink:                #0F172A   /* body text (slate-900) */
--muted:              #64748B   /* slate-500 */
--surface:            #FFFFFF
--surface-subtle:     #F8FAFC   /* slate-50 page bg */
--border:             #E2E8F0   /* slate-200 */
```

### 4.2 Lane colors (the four public buckets)
```
available   → green   bg #ECFDF3  text #15803D  ring #18A13B   label "Available"
in-progress → blue    bg #EFF6FF  text #1D4ED8  ring #2563EB   label "In Progress"
planned     → violet  bg #F5F3FF  text #6D28D9  ring #7C3AED   label "Planned"
future      → slate   bg #F1F5F9  text #475569  ring #64748B   label "Future Idea"
```

### 4.3 Lifecycle status → lane mapping (single source: `lib/lanes.ts`)
```
"Released"      → available
"In Progress"   → in-progress
"Verification"  → in-progress
"Planned"       → planned
"Proposed"      → future
"Idea"          → future
"Deferred"      → future
```

### 4.4 Typography & feel
- Font: **Inter** via `next/font/google` (fallback system-ui). Headings tight tracking, semibold–bold.
- Layout: max content width ~1200px, generous whitespace, `rounded-xl` cards, `border` + subtle shadow
  on hover, never heavy. Light theme is primary. (Dark mode is an optional post-MVP polish item.)
- Tone: confident, clear, technical-but-welcoming. No marketing fluff.

### 4.5 Logo usage (copy these exact files into `public/openhw/`)
- Header (light bg): `OPENHW-Logo with Foundation/OpenHW Horizontal/RGB/SVG/OPENHW-landscape.svg`
  → save as `public/openhw/openhw-horizontal.svg`
- Footer (navy bg): `OPENHW-Logo with Foundation/OpenHW Horizontal/RGB/SVG/OPENHW-landscape-White.svg`
  → save as `public/openhw/openhw-horizontal-white.svg`
- Favicon/mark: `OPENHW-Logo with Foundation/OpenHW Stacked/RGB/SVG/OPENHW-Stacked-Color.svg`
  → save as `public/openhw/openhw-stacked.svg` (also use for `app/icon.svg`)
- Always pair "CVA6 Roadmap" wordmark next to the logo in the header. The OpenHW logo links to
  https://www.openhw.org. Footer line: "CVA6 Roadmap is a project of the OpenHW Group."

## 5. Data model (`lib/types.ts`)
```ts
export type Lane = "available" | "in-progress" | "planned" | "future";

export type LifecycleStatus =
  | "Released" | "In Progress" | "Verification"
  | "Planned" | "Proposed" | "Idea" | "Deferred";

export type Theme =
  | "Architecture & ISA"
  | "Security"
  | "Safety & Certification"
  | "Verification"
  | "Performance"
  | "Tooling & Ecosystem";

export interface Organization {
  id: string;            // slug, e.g. "thales"
  name: string;          // "Thales"
  shortName: string;     // chip label
  color: string;         // hex, used for the org chip accent
  website?: string;
  blurb?: string;        // one line: what they focus on in CVA6
}

export interface RoadmapItem {
  id: string;            // slug
  title: string;
  summary: string;       // 1–2 sentences (card text)
  description?: string;  // longer paragraph (detail page)
  theme: Theme;
  status: LifecycleStatus;
  proposingOrgs: string[];   // Organization ids
  owner?: string;            // person/team, optional
  targetWindow?: string;     // "2026 H1", "Available", "Exploratory"
  targetRelease?: string;    // Release.version, optional
  tags: string[];
  userValue?: string;        // why the community should care
  links?: { label: string; url: string }[];
  lastUpdated: string;       // ISO "2026-05-01"
  featured?: boolean;        // surfaced on Home
}

export interface Release {
  id: string;
  version: string;       // "v5.0.0"
  status: "released" | "planned";
  date?: string;         // ISO or "2026 H2"
  summary?: string;
}

export interface Pillar {
  id: string;
  title: string;         // matches a Theme
  description: string;
  icon: string;          // lucide icon name (e.g. "cpu", "shield", "badge-check")
}
```
`lib/lanes.ts` exports `statusToLane(status): Lane`, `LANES` (ordered metadata array with
labels/colors per §4.2), and helper `itemsByLane(items)`.

## 6. Seed content (`/data`) — USE THIS, it makes the site look real
> These items are realistic but **illustrative**. Add a visible note on Contribute/About that the
> dataset is a starting point seeded by the portal team and that real entries come from the orgs via PR.

### 6.1 `data/organizations.ts`
```ts
import type { Organization } from "@/lib/types";
export const organizations: Organization[] = [
  { id: "openhw", name: "OpenHW Group", shortName: "OpenHW", color: "#18A13B",
    website: "https://www.openhw.org",
    blurb: "Stewards CVA6: governance, verification, and stable releases." },
  { id: "thales", name: "Thales", shortName: "Thales", color: "#1D4ED8",
    website: "https://www.thalesgroup.com",
    blurb: "Safety-critical and certification-oriented use of CVA6." },
  { id: "unibo", name: "University of Bologna", shortName: "UniBo", color: "#A21CAF",
    website: "https://www.unibo.it",
    blurb: "PULP heritage: vectors, energy efficiency, microarchitecture research." },
  { id: "lowrisc", name: "lowRISC", shortName: "lowRISC", color: "#0E7490",
    website: "https://lowrisc.org",
    blurb: "Security, CHERI/capabilities, and open verification collateral." },
  { id: "capabilities", name: "Capabilities", shortName: "Capabilities", color: "#B45309",
    blurb: "Memory-safety and capability-hardware extensions for CVA6." },
];
```

### 6.2 `data/releases.ts`
```ts
import type { Release } from "@/lib/types";
export const releases: Release[] = [
  { id: "v4", version: "CVA6 4.x", status: "released", date: "2024",
    summary: "Stable RV64GC / RV32 core, Linux-capable, OpenHW-verified." },
  { id: "v5", version: "CVA6 5.x", status: "planned", date: "2026 H2",
    summary: "Hypervisor, expanded verification, profile alignment." },
];
```

### 6.3 `data/pillars.ts`
```ts
import type { Pillar } from "@/lib/types";
export const pillars: Pillar[] = [
  { id: "arch", title: "Architecture & ISA", icon: "cpu",
    description: "RISC-V ISA coverage, extensions, and profile alignment." },
  { id: "security", title: "Security", icon: "shield",
    description: "Memory safety, capabilities, and trusted execution." },
  { id: "safety", title: "Safety & Certification", icon: "badge-check",
    description: "Functional safety and certification-ready collateral." },
  { id: "verification", title: "Verification", icon: "check-check",
    description: "Open, reproducible verification of every capability." },
  { id: "performance", title: "Performance", icon: "gauge",
    description: "Microarchitecture, frequency, and efficiency gains." },
  { id: "ecosystem", title: "Tooling & Ecosystem", icon: "blocks",
    description: "Toolchains, SoC integration, and developer experience." },
];
```

### 6.4 `data/roadmap.ts` — seed RoadmapItem[] (create ~18 items spanning all lanes/themes/orgs)
Use these as the dataset (Codex: type them all out as `RoadmapItem` objects, `lastUpdated` in 2026).
Keep `id` slugs unique. Distribute across lanes so the board looks balanced.

**Available (status "Released"):**
- `rv64gc-core` — "RV64GC application core" — Architecture & ISA — OpenHW, UniBo — "Mature 6-stage, single-issue, in-order RV64GC core capable of booting Linux." featured.
- `rv32-config` — "RV32 configuration" — Architecture & ISA — OpenHW — embedded/32-bit profile.
- `sv39-mmu` — "Sv39 MMU & virtual memory" — Architecture & ISA — OpenHW, UniBo.
- `fpu-fd` — "IEEE FPU (F/D)" — Architecture & ISA — UniBo.
- `axi-subsystem` — "AXI memory subsystem & caches" — Performance — UniBo, OpenHW.
- `riscv-debug` — "RISC-V external debug" — Tooling & Ecosystem — OpenHW.
- `core-v-verif` — "core-v-verif verification environment" — Verification — OpenHW — "Open UVM-based verification flow with passing regression." featured.

**In Progress (status "In Progress" or "Verification"):**
- `hypervisor-h` — "Hypervisor extension (H)" — Architecture & ISA — Thales, OpenHW — targetWindow "2026 H2". featured.
- `cv-x-if` — "CV-X-IF coprocessor interface" — Tooling & Ecosystem — OpenHW, UniBo — "2026 H1".
- `vector-cvxif` — "Vector acceleration via CV-X-IF" — Performance — UniBo — "Verification".
- `formal-verif` — "Formal verification of control path" — Verification — OpenHW, lowRISC — "2026 H1". featured.
- `pmp-enhance` — "PMP / memory protection hardening" — Security — Thales, lowRISC.

**Planned (status "Planned"):**
- `rva23-profile` — "RVA23 profile alignment" — Architecture & ISA — OpenHW — "2026 H2". featured.
- `branch-predictor` — "Advanced branch prediction" — Performance — UniBo — "2027 H1".
- `iso26262-collateral` — "ISO 26262 safety collateral" — Safety & Certification — Thales — "2027". featured.
- `cache-coherency` — "Multi-core cache coherency" — Performance — OpenHW, UniBo — "2027".

**Future Ideas (status "Proposed" or "Idea"):**
- `cheri-capabilities` — "CHERI capabilities support" — Security — lowRISC, Capabilities — "Exploratory". featured.
- `rvv-native` — "Native RVV vector unit" — Performance — UniBo — "Exploratory".
- `tee-enclave` — "Trusted execution / enclave" — Security — Capabilities — "Exploratory".
- `ml-coupling` — "ML accelerator coupling" — Tooling & Ecosystem — Capabilities — "Exploratory".

For each item write a real `summary` (1–2 sentences), a `userValue` line, 2–4 `tags`,
and where natural a `links` entry to `https://github.com/openhwgroup/cva6`.

## 7. Page specs

### 7.1 Home `/`
- **Header** (global): OpenHW horizontal logo (links openhw.org) + "CVA6 Roadmap" wordmark, nav, GitHub link icon.
- **Hero**: H1 "Where CVA6 is going." Subhead explaining this is the public roadmap of the
  OpenHW CVA6 core. Two buttons: "Explore the roadmap" (→/roadmap), "Propose a feature" (→/contribute).
  Small clarifier line: "A public roadmap — not an issue tracker." 
- **Lane summary strip**: 4 cards (Available / In Progress / Planned / Future) each with live count
  (derived from data) and a one-line description, linking to `/roadmap?lane=...`.
- **Strategic pillars**: grid of the 6 `pillars` with icon + description.
- **Highlights**: featured items (`featured: true`) as RoadmapCards, grouped or mixed.
- **Contributing organizations**: row of org chips/logos with blurbs (→/organizations).
- **Releases**: compact two-card timeline from `data/releases`.
- **Contribute CTA**: full-width navy band, "Help shape CVA6", button →/contribute.
- **Footer** (global): OpenHW white logo, "a project of the OpenHW Group", links (GitHub, openhw.org, license), © year.

### 7.2 Roadmap `/roadmap` (core page, client island for filtering)
- **Summary bar**: total items, and count per lane.
- **Filter bar**: text search (title/summary/tags); multi-select filters for Organization, Theme,
  Lane/Status; a "Group by" toggle: **Lane** (default, 4-column board) | **Theme** | **Organization**.
  Filters reflect into URL query params (`?lane=&org=&theme=&q=`) and are shareable. "Clear all".
- **Board view (group by Lane)**: 4 columns in lane order (available→future), each a colored header
  with count, containing RoadmapCards. Responsive: columns stack on mobile.
- **Grouped view (Theme/Org)**: sections with headed groups, cards inside.
- **Empty state** when filters match nothing.
- Each card → `/features/[id]`.

### 7.3 RoadmapCard component
Shows: lane pill (color per §4.2), title, summary (clamped 2 lines), theme tag, org chips,
targetWindow, lastUpdated (relative or date). Whole card is a link; hover lifts border/shadow.

### 7.4 Features `/features`
Searchable flat catalog of the same items, denser layout (list/grid toggle optional). Same filter
primitives as roadmap but emphasis on search. Each row links to detail.

### 7.5 Item detail `/features/[id]` (generateStaticParams over all ids)
- Breadcrumb, title, lane pill + status, theme.
- Summary, full description, "Why it matters" (userValue).
- Meta panel: proposing organizations (chips → org), owner, target window, target release, tags, last updated.
- Related links (GitHub/spec). 
- "Propose a change / discuss" link →/contribute. Prev/next or back-to-roadmap.

### 7.6 Organizations `/organizations`
- Intro: who contributes to CVA6 and how attribution works.
- Card per org: name, blurb, website, and the count + list of items they propose/own (link each).
- A short note that more organizations are welcome (→/contribute).

### 7.7 Contribute `/contribute`
- Explains the model: roadmap = structured data in `/data/roadmap.ts`; propose via GitHub.
- Step list: open an issue using the "Roadmap item proposal" template, or open a PR adding a typed
  entry. Link to the repo, issue templates, CONTRIBUTING.md.
- Status lifecycle explainer (the 4 lanes + what each means; entry/exit in plain language).
- Note that this dataset is a seeded starting point.

## 8. Repo hygiene (Tasks 11–12 cover these)
- `LICENSE`: **Apache-2.0** (OpenHW's standard).
- `README.md`: what it is, screenshot/gif, live URL, "add a roadmap item" how-to, local dev (`npm i`,
  `npm run dev`), tech stack, license, "project of the OpenHW Group" + logo.
- `CONTRIBUTING.md`: how to propose/edit items (data file + lifecycle rules).
- `.github/ISSUE_TEMPLATE/roadmap-item.yml`: structured proposal form (title, summary, theme, org,
  proposed lane, links).
- `.github/PULL_REQUEST_TEMPLATE.md`: checklist for adding/editing a data entry.
- SEO: per-page `metadata` (title/description), `app/icon.svg`, OpenGraph (`opengraph-image` optional),
  `app/sitemap.ts` nice-to-have.

## 9. Acceptance for the whole MVP
- `npm run build` succeeds with no type errors; `npm run lint` clean.
- All 5 nav pages + detail pages render with seed data; counts are derived (not hardcoded).
- Filters/search/group-by work and survive reload via URL params.
- OpenHW logo correct in header (color) and footer (white); links to openhw.org.
- Looks polished and responsive at 375px, 768px, 1280px. Passes basic keyboard nav.
- Deployed to Vercel with a working public URL; URL recorded in PROGRESS.md and README.

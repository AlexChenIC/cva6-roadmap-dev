# Progress Log — CVA6 Roadmap Portal

Codex: append a dated entry after every task. Format:

```
## YYYY-MM-DD HH:MM — Tn <task name>
- Did: <summary>
- Files: <paths touched>
- Verify: <command run + result>
- Status: DONE | ⚠️ BLOCKED (<what you need>)
```

Architect reads this between cycles. Newest entries at the bottom.

---

## 2026-06-09 13:23 — T0 Bootstrap repo & app
- Did: Initialized git, scaffolded a Next.js App Router project with TypeScript, Tailwind, ESLint, and npm, then merged the scaffold into the existing project root without modifying the source logo folder, reference rules, or codex control files.
- Files: `.gitignore`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `app/*`, `eslint.config.mjs`, `next-env.d.ts`, `next.config.ts`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `public/*`, `tsconfig.json`, `codex/TASKS.md`, `codex/PROGRESS.md`
- Verify: `npm run dev` started on `http://localhost:3000`; browser check loaded the default Create Next App page with title `Create Next App`.
- Status: DONE

## 2026-06-09 13:27 — T1 Design tokens, fonts, logos
- Did: Copied the specified OpenHW SVG logo assets into `public/openhw/`, added `app/icon.svg`, exposed OpenHW brand tokens through CSS variables and Tailwind v4 `--color-*` theme variables, switched the app font wiring to Inter, and set the base page background and ink colors.
- Files: `app/globals.css`, `app/layout.tsx`, `app/icon.svg`, `public/openhw/openhw-horizontal.svg`, `public/openhw/openhw-horizontal-white.svg`, `public/openhw/openhw-stacked.svg`, `codex/TASKS.md`, `codex/PROGRESS.md`
- Verify: `npm run lint` passed; `npm run dev` started; browser check confirmed body background `rgb(248, 250, 252)`, body text `rgb(15, 23, 42)`, Inter font stack, OpenHW CSS tokens, and all four SVG assets returning HTTP 200.
- Status: DONE

## 2026-06-09 13:29 — T2 Types & lane logic
- Did: Added the shared roadmap data model types and the lifecycle-status-to-lane mapping helpers, including ordered lane metadata and an `itemsByLane` grouping helper.
- Files: `lib/types.ts`, `lib/lanes.ts`, `codex/TASKS.md`, `codex/PROGRESS.md`
- Verify: `npx tsc --noEmit` passed.
- Status: DONE

## 2026-06-09 13:32 — T3 Seed data
- Did: Added typed seed data modules for organizations, releases, strategic pillars, and 20 illustrative CVA6 roadmap items spanning all lanes, themes, and contributing organizations.
- Files: `data/organizations.ts`, `data/releases.ts`, `data/pillars.ts`, `data/roadmap.ts`, `codex/TASKS.md`, `codex/PROGRESS.md`
- Verify: `npx tsc --noEmit` passed.
- Status: DONE

## 2026-06-09 13:38 — T4 Layout: header + footer + nav
- Did: Added the global app shell with an OpenHW-linked header logo, CVA6 Roadmap wordmark, active primary navigation, GitHub icon link, responsive mobile disclosure menu, and a navy footer with the white OpenHW logo, project attribution, footer links, and current-year copyright.
- Files: `app/layout.tsx`, `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `package.json`, `package-lock.json`, `codex/TASKS.md`, `codex/PROGRESS.md`
- Verify: `npm run lint` passed; `npx tsc --noEmit` passed; `npm run dev` loaded `http://localhost:3000`; browser checks confirmed header/footer render, OpenHW logos load, Home active-link state works, and at 375px the desktop nav hides while the mobile menu opens with all nav links and no horizontal overflow.
- Status: DONE

# Codex Operating Protocol — CVA6 Roadmap Portal

You (Codex) are the implementer. I (the architect) maintain this `codex/` folder.
You poll these files ~every minute and do the actual work in the repo.

## START HERE — read in this order
1. `codex/INSTRUCTIONS.md`  ← this file (how to operate)
2. `codex/SPEC.md`          ← what to build (product, design system, data model, seed content)
3. `codex/TASKS.md`         ← the ordered build queue (do tasks top-to-bottom)
4. `codex/PROGRESS.md`      ← write your status here after every task

## How to work
- Execute `TASKS.md` **strictly in order**, one task per work cycle. Do not skip ahead.
- A task is "done" only when **all its acceptance criteria pass**. Run the listed verification command.
- After each task: tick its checkbox in `TASKS.md`, append a dated entry to `PROGRESS.md`
  (what you did, files touched, verification result, any blockers).
- If a task is ambiguous or blocked (e.g. missing auth, failing command you can't fix),
  STOP, write a `⚠️ BLOCKED` entry in `PROGRESS.md` describing exactly what you need, and wait.
  The architect will respond by editing these files.
- Commit after each meaningful task with a clear conventional-commit message
  (`feat:`, `chore:`, `docs:`, `style:`). Do not push until Task 14.
- Never invent secrets. If a command needs credentials you don't have, mark BLOCKED.

## Project root
Build the app in: `/Users/alexchen/1_workspace/4_openhw/8_roadmap_web/`
(The repo IS this folder. `codex/` and the two source folders below stay tracked but are not part of the Next.js build.)

## Source assets you may use (do not modify originals)
- Logos: `OPENHW-Logo with Foundation/` — copy the specific files named in SPEC.md into `public/openhw/`.
- Design rules: `roadmap-design_reference_rules.md` — background context only; SPEC.md is the source of truth.

## Non-negotiable guardrails
- This is a **public roadmap website**. NOT Jira, NOT a GitHub replacement, NOT a CI dashboard,
  NOT a verification platform. No auth, no DB, no write-back, no live API calls.
- All content comes from typed files in `/data`. The site is statically rendered.
- Keep dependencies minimal and mainstream. No experimental/unmaintained packages.
- Accessibility: semantic HTML, keyboard-navigable, WCAG AA contrast.
- If SPEC.md and the reference doc disagree, **SPEC.md wins**.

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

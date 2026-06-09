---
date: 2026-06-09
title: CVA6 roadmap meeting note - June 2026
status: reviewed
source: Maintainer summary
relatedRoadmapItems:
  - hypervisor-h
  - cv-x-if
  - safety-evaluation-evidence
  - cvxif-integration-guide
---
# CVA6 roadmap meeting note - June 2026

This file records meeting-level context for roadmap changes. Keep it concise and
link it from pull requests that update `roadmap-source/`.

## Decisions

- Treat `roadmap-source/` as the maintainer-reviewed source of truth.
- Keep partner expectations separate from accepted roadmap commitments.
- Use pull requests and preview deployments for roadmap review.

## Partner signals captured

- Hypervisor/MMU readiness needs should be tied to public release notes, MMU/PMP behavior, and open issue evidence before becoming public commitments.
- Safety-oriented users need evaluation evidence and requirements traceability, but the portal must not imply ISO 26262 certification scope.
- CV-X-IF extension work should be tracked as integration guidance and verification closure around public CV-X-IF issues rather than a generic accelerator roadmap promise.
- CHERI-related work should remain a research/scoping signal linked to lowRISC and Capabilities public CHERI-Mocha activity.

## Follow-up

- Confirm maintainers for each accepted roadmap item.
- Link future updates to issues, PRs, specs, or verification evidence.

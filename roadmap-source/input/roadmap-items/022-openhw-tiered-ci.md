---
id: openhw-tiered-ci
title: CVA6 Phase-1 tiered CI rollout
theme: Tooling & Ecosystem
status: In Progress
proposingOrgs:
  - openhw
owner: OpenHW CVA6 CI maintainers
targetWindow: Active CI rollout
tags:
  - CI
  - GitHub Actions
  - Tier-1
  - Tier-2
  - dashboard
  - Verilator
lastUpdated: 2026-06-11
featured: true
---
# CVA6 Phase-1 tiered CI rollout

## Summary

Active OpenHW work to introduce a Phase-1 GitHub CI structure for CVA6. The rollout adds a two-tier Verilator-based validation model for selected green configurations, plus a lightweight dashboard that makes recent Tier 1 / Tier 2 status easier for maintainers and contributors to inspect.

## Description

The first upstream implementation was merged through PR #3285. Its scope is intentionally limited and practical: Verilator-based GitHub CI for cv32a65x, cv32a60x, and cv64a6_imafdc_sv39_hpdcache_wb, which were selected as the initial Phase-1 green configurations.

The work separates CI into two operating layers. Tier 1 is the fast pull-request sanity layer: it runs representative smoke or directed tests so contributors get quick feedback before deeper review. Tier 2 is the broader Verilator regression layer for the same initial configuration set, intended for scheduled or manual validation when maintainers need stronger confidence than a PR smoke check can provide.

The rollout also adds shared setup infrastructure, dedicated Tier 1 / Tier 2 workflow files, a dashboard workflow, and dashboard scripts that collect CI run data and render a static HTML status page. As part of the same cleanup, the cv32a60x testlists were aligned with the configuration's real capabilities, avoiding unsupported atomic-extension coverage, supervisor-mode tests on an M-mode-only configuration, and trap-reporting assumptions that do not match TvalEn=0.

Follow-up PR #3343 updated the new workflows away from deprecated GitHub Actions versions, which is a useful signal that this CI path is no longer just a proposal: it is now active infrastructure that needs normal upstream maintenance.

## User value

For contributors, this gives faster and more predictable pull-request feedback. For maintainers, it separates quick confidence checks from broader regression evidence and reduces noise from tests that do not match a configuration's actual ISA or privilege capabilities. For partner discussions, the dashboard provides a more concrete way to talk about CI health, recent failures, and whether a feature is ready for deeper validation.

## Links

- [PR #3285 - Phase 1 tier workflows and tier dashboard](https://github.com/openhwgroup/cva6/pull/3285)
- [Tier dashboard demo](https://alexchenic.github.io/cva6/tier/)
- [PR #3343 - Update GitHub checkout action for new CI](https://github.com/openhwgroup/cva6/pull/3343)
- [OpenHW CORE-V CVA6 Platform project announcement](https://openhwfoundation.org/news/2023/11/07/openhw-group-announces-core-v-cva6-platform-project-for-risc-v-software-development-and-testing/)

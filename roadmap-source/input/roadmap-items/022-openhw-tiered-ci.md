---
id: openhw-tiered-ci
title: CVA6 CI maintenance and visibility
theme: Tooling & Ecosystem
status: In Progress
proposingOrgs:
  - openhw
owner: OpenHW CVA6 maintainers
targetWindow: Active CI rollout
tags:
  - CI
  - Tier-1
  - Tier-2
  - dashboard
  - Verilator
lastUpdated: 2026-06-09
featured: true
---
# CVA6 CI maintenance and visibility

## Summary

Active OpenHW work to maintain and optimize CVA6 CI through a two-layer GitHub CI model with faster pull-request checks, broader regression coverage, and a dashboard-oriented view of results.

## Description

The new tiered CI flow separates quick PR-facing checks from broader scheduled or manually triggered validation. The roadmap presents this as active maintainer work because the public CVA6 repository already contains merged CI/dashboard changes and follow-up maintenance activity.

## User value

Makes upstream validation easier to inspect, maintain, and discuss when contributors bring new CVA6 features or regression-sensitive changes.

## Links

- [PR #3285 - Phase 1 tier workflows and tier dashboard](https://github.com/openhwgroup/cva6/pull/3285)
- [PR #3343 - Update GitHub checkout action for new CI](https://github.com/openhwgroup/cva6/pull/3343)
- [OpenHW CORE-V CVA6 Platform project announcement](https://openhwfoundation.org/news/2023/11/07/openhw-group-announces-core-v-cva6-platform-project-for-risc-v-software-development-and-testing/)

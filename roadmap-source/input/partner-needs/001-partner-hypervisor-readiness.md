---
id: partner-hypervisor-readiness
title: Hypervisor/MMU readiness evidence
sourceType: meeting-synthesis
status: under-review
proposingOrgs:
  - thales
  - openhw
relatedRoadmapItems:
  - hypervisor-h
tags:
  - virtualization
  - isolation
  - RISC-V-H
  - MMU
  - PMP
targetWindow: Evidence review
owner: OpenHW CVA6 maintainers
---
# Hypervisor/MMU readiness evidence

## Summary

Industrial users need release-linked evidence that CVA6 Hypervisor extension support, MMU behavior, PMP behavior, and known limitations are tracked visibly before virtualization readiness is presented as a stable platform claim.

## Requested capabilities

- release baseline tied to CVA6 5.1.0 Hypervisor extension support
- MMU/PMP exception behavior evidence with public documentation links
- open issue tracking for H-extension, PMP, and page-fault corner cases
- regression notes that distinguish released functionality from platform-readiness evidence

## Public notes

Keep this as a partner signal until maintainers agree which issue closures, tests, and documentation are sufficient for a public readiness statement.

## Evidence

- [CVA6 5.1.0 release](https://github.com/openhwgroup/cva6/releases/tag/v5.1.0)
- [CVA6 MMU documentation](https://docs.openhwgroup.org/projects/cva6-user-manual/03_cva6_design/MMU.html)
- [Issue #3317 - H-extension mideleg reset behavior](https://github.com/openhwgroup/cva6/issues/3317)
- [Issue #3299 - PTW PMP access fault reporting](https://github.com/openhwgroup/cva6/issues/3299)
- [CVA6 issues list](https://github.com/openhwgroup/cva6/issues)

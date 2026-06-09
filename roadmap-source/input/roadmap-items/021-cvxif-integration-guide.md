---
id: cvxif-integration-guide
title: CV-X-IF custom extension integration guide
theme: Tooling & Ecosystem
status: Proposed
proposingOrgs:
  - unibo
  - capabilities
owner: OpenHW CV-X-IF maintainers
targetWindow: Candidate guidance
tags:
  - CV-X-IF
  - custom-instructions
  - coprocessor
  - verification
lastUpdated: 2026-06-09
---
# CV-X-IF custom extension integration guide

## Summary

Proposed guidance package for custom instructions and external coprocessors using CV-X-IF, grounded in public CVA6 releases and open integration issues.

## Description

The item keeps accelerator discussion at the integration-contract level: how to use the released CV-X-IF interface, what verification evidence is expected, and which corner cases need issue-driven closure before stronger platform claims are made.

## User value

Helps research and product teams integrate custom execution resources without turning every accelerator idea into a native CVA6 core feature.

## Links

- [CVA6 5.2.0 release](https://github.com/openhwgroup/cva6/releases/tag/v5.2.0)
- [CVA6 v5.3.0 release](https://github.com/openhwgroup/cva6/releases/tag/v5.3.0)
- [Issue #3279 - WFI, interrupt flush, and CV-X-IF instructions](https://github.com/openhwgroup/cva6/issues/3279)
- [Issue #3308 - CV-X-IF result.data and commit timing](https://github.com/openhwgroup/cva6/issues/3308)
- [Issue #2499 - Custom instruction guidance](https://github.com/openhwgroup/cva6/issues/2499)

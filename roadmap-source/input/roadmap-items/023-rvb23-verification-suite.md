---
id: rvb23-verification-suite
title: RVB23 verification-suite integration
theme: Verification
status: Planned
proposingOrgs:
  - openhw
owner: OpenHW CVA6 verification maintainers
targetWindow: Profile regression integration
tags:
  - RVB23
  - RVA23
  - Spike
  - regression
lastUpdated: 2026-06-09
featured: true
---
# RVB23 verification-suite integration

## Summary

Planned OpenHW work to integrate RVB23-oriented verification coverage into CVA6, with simulator and toolchain configuration kept clean enough to support extension-focused tests.

## Description

The public CVA6 issue and pull request around Spike-specific extension configuration provide an early implementation hook for RVA23/RVB23-style verification. This item records the planned integration direction without presenting a completed RVB23 qualification result.

## User value

Gives maintainers and partners a clear place to track profile-oriented verification coverage before it becomes release evidence.

## Links

- [Issue #3249 - Allow Spike-specific ISA/extension configuration in cva6.py](https://github.com/openhwgroup/cva6/issues/3249)
- [PR #3280 - Add Spike-specific extension option in cva6.py](https://github.com/openhwgroup/cva6/pull/3280)
- [CVA6 GitHub repository](https://github.com/openhwgroup/cva6)

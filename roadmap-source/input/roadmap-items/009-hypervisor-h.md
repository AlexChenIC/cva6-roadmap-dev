---
id: hypervisor-h
title: Hypervisor extension (H)
theme: Architecture & ISA
status: Released
proposingOrgs:
  - thales
owner: OpenHW CVA6 architecture reviewers
targetWindow: 2024-07
targetRelease: CVA6 5.1.0
tags:
  - hypervisor
  - virtualization
  - privilege
  - RISC-V-H
lastUpdated: 2024-07-11
featured: true
---
# Hypervisor extension (H)

## Summary

Released RISC-V Hypervisor extension support for CVA6, recorded from the real CVA6 5.1.0 upstream release.

## Description

Hypervisor support adds architectural state and privilege behavior needed to run virtualized guests. Partner needs now track validation, MMU/PMP evidence, and platform-readiness work on top of the released implementation.

## User value

Opens CVA6 to virtualized embedded and edge platforms with stronger software isolation.

## Links

- [CVA6 5.1.0 release](https://github.com/openhwgroup/cva6/releases/tag/v5.1.0)
- [Issue #3317 - H-extension mideleg reset behavior](https://github.com/openhwgroup/cva6/issues/3317)
- [Issue #3299 - PTW PMP access fault reporting](https://github.com/openhwgroup/cva6/issues/3299)
- [CVA6 MMU documentation](https://docs.openhwgroup.org/projects/cva6-user-manual/03_cva6_design/MMU.html)
- [CVA6 GitHub repository](https://github.com/openhwgroup/cva6)

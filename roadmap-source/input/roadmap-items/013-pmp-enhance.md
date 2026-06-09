---
id: pmp-enhance
title: PMP / memory protection hardening
theme: Security
status: In Progress
proposingOrgs:
  - thales
  - lowrisc
owner: Thales / lowRISC security reviewers
targetWindow: 2026 H2
tags:
  - PMP
  - memory-protection
  - security
  - privilege
lastUpdated: 2026-03-24
---
# PMP / memory protection hardening

## Summary

Hardening work around Physical Memory Protection configuration and edge cases. The effort focuses on robust isolation behavior for security-sensitive deployments.

## Description

The PMP hardening track reviews access checks, privilege interactions, and verification coverage so CVA6 behaves predictably under constrained memory policies.

## User value

Helps teams use CVA6 in systems where memory isolation is part of the threat model.

## Links

- [CVA6 GitHub repository](https://github.com/openhwgroup/cva6)

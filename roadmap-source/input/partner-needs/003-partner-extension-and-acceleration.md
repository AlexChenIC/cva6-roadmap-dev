---
id: partner-extension-and-acceleration
title: CV-X-IF integration and verification closure
sourceType: meeting-synthesis
status: candidate
proposingOrgs:
  - unibo
  - capabilities
relatedRoadmapItems:
  - cv-x-if
  - cvxif-integration-guide
tags:
  - CV-X-IF
  - acceleration
  - integration
  - custom-instructions
targetWindow: Exploratory
owner: OpenHW CV-X-IF maintainers
---
# CV-X-IF integration and verification closure

## Summary

Integrator teams need the released CV-X-IF interface to be accompanied by clear custom-instruction guidance, issue-driven corner-case closure, and verification expectations for external coprocessors.

## Requested capabilities

- custom instruction implementation guidance tied to CV-X-IF 1.0.0
- closure path for WFI, interrupt, commit, and result-channel corner cases
- Spike tandem and verification configuration guidance
- evidence links that separate released interface support from future accelerator ideas

## Public notes

This signal should drive documentation and verification clarity before any specific accelerator block is discussed as a CVA6 roadmap item.

## Evidence

- [CVA6 5.2.0 release](https://github.com/openhwgroup/cva6/releases/tag/v5.2.0)
- [CVA6 v5.3.0 release](https://github.com/openhwgroup/cva6/releases/tag/v5.3.0)
- [Issue #3279 - WFI, interrupt flush, and CV-X-IF instructions](https://github.com/openhwgroup/cva6/issues/3279)
- [Issue #3308 - CV-X-IF result.data and commit timing](https://github.com/openhwgroup/cva6/issues/3308)
- [Issue #2768 - Spike tandem CV-X-IF verification configuration](https://github.com/openhwgroup/cva6/issues/2768)
- [Issue #2499 - Custom instruction guidance](https://github.com/openhwgroup/cva6/issues/2499)

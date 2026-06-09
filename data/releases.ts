import type { Release } from "@/lib/types";

export const releases: Release[] = [
  {
    id: "v4",
    version: "CVA6 4.x",
    status: "released",
    releaseType: "stable",
    date: "2024",
    summary: "Stable RV64GC / RV32 core, Linux-capable, OpenHW-verified.",
    support: "Maintained through the upstream OpenHW CVA6 project.",
    includedRoadmapItems: [
      "rv64gc-core",
      "rv32-config",
      "sv39-mmu",
      "fpu-fd",
      "axi-subsystem",
      "riscv-debug",
      "core-v-verif",
    ],
    releaseNotesUrl: "https://github.com/openhwgroup/cva6/releases",
    verificationSummary: "Released capabilities are represented as the current stable baseline and open verification environment.",
  },
  {
    id: "v5",
    version: "CVA6 5.x",
    status: "planned",
    releaseType: "planned",
    date: "2026 H2",
    summary: "Hypervisor, expanded verification, profile alignment.",
    support: "Planned release line; support window to be confirmed by OpenHW maintainers.",
    includedRoadmapItems: ["hypervisor-h", "formal-verif", "rva23-profile"],
    releaseNotesUrl: "https://github.com/openhwgroup/cva6/releases",
    verificationSummary: "Expected to connect committed implementation work with expanded regression and formal verification evidence.",
  },
];

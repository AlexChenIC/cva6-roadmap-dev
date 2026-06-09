import type { Release } from "@/lib/types";

export const releases: Release[] = [
  {
    id: "v4",
    version: "CVA6 4.x",
    status: "released",
    date: "2024",
    summary: "Stable RV64GC / RV32 core, Linux-capable, OpenHW-verified.",
  },
  {
    id: "v5",
    version: "CVA6 5.x",
    status: "planned",
    date: "2026 H2",
    summary: "Hypervisor, expanded verification, profile alignment.",
  },
];

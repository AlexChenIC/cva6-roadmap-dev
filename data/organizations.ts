import type { Organization } from "@/lib/types";

export const organizations: Organization[] = [
  {
    id: "openhw",
    name: "OpenHW Group",
    shortName: "OpenHW",
    color: "#18A13B",
    website: "https://www.openhw.org",
    blurb: "Stewards CVA6: governance, verification, and stable releases.",
  },
  {
    id: "thales",
    name: "Thales",
    shortName: "Thales",
    color: "#1D4ED8",
    website: "https://www.thalesgroup.com",
    blurb: "Safety-critical and certification-oriented use of CVA6.",
  },
  {
    id: "unibo",
    name: "University of Bologna",
    shortName: "UniBo",
    color: "#A21CAF",
    website: "https://www.unibo.it",
    blurb: "PULP heritage: vectors, energy efficiency, microarchitecture research.",
  },
  {
    id: "lowrisc",
    name: "lowRISC",
    shortName: "lowRISC",
    color: "#0E7490",
    website: "https://lowrisc.org",
    blurb: "Security, CHERI/capabilities, and open verification collateral.",
  },
  {
    id: "capabilities",
    name: "Capabilities",
    shortName: "Capabilities",
    color: "#B45309",
    blurb: "Memory-safety and capability-hardware extensions for CVA6.",
  },
];

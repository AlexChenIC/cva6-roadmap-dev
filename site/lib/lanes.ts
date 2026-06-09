import type { Lane, LifecycleStatus, RoadmapItem } from "@/lib/types";

export interface LaneMeta {
  id: Lane;
  label: string;
  description: string;
  bgColor: string;
  textColor: string;
  ringColor: string;
}

export const LANES: readonly LaneMeta[] = [
  {
    id: "available",
    label: "Released",
    description: "In a public release or maintained baseline.",
    bgColor: "#ECFDF3",
    textColor: "#15803D",
    ringColor: "#18A13B",
  },
  {
    id: "in-progress",
    label: "Active Work",
    description: "Owned implementation, verification, or evidence work.",
    bgColor: "#EFF6FF",
    textColor: "#1D4ED8",
    ringColor: "#2563EB",
  },
  {
    id: "planned",
    label: "Planned",
    description: "Accepted direction for a future roadmap window.",
    bgColor: "#F5F3FF",
    textColor: "#6D28D9",
    ringColor: "#7C3AED",
  },
  {
    id: "future",
    label: "Exploratory",
    description: "Signals or proposals not yet accepted as commitments.",
    bgColor: "#F1F5F9",
    textColor: "#475569",
    ringColor: "#64748B",
  },
] as const;

export const LANE_BY_ID = LANES.reduce(
  (lanes, lane) => {
    lanes[lane.id] = lane;
    return lanes;
  },
  {} as Record<Lane, LaneMeta>,
);

export function statusToLane(status: LifecycleStatus): Lane {
  switch (status) {
    case "Released":
      return "available";
    case "In Progress":
    case "Verification":
      return "in-progress";
    case "Planned":
      return "planned";
    case "Proposed":
    case "Idea":
    case "Deferred":
      return "future";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export function itemsByLane<T extends Pick<RoadmapItem, "status">>(
  items: readonly T[],
): Record<Lane, T[]> {
  const grouped: Record<Lane, T[]> = {
    available: [],
    "in-progress": [],
    planned: [],
    future: [],
  };

  for (const item of items) {
    grouped[statusToLane(item.status)].push(item);
  }

  return grouped;
}

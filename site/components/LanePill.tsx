import type { Lane, LifecycleStatus } from "@/lib/types";
import { LANE_BY_ID, statusToLane } from "@/lib/lanes";

export interface LanePillProps {
  lane?: Lane;
  status?: LifecycleStatus;
  className?: string;
}

export function LanePill({ lane, status, className = "" }: LanePillProps) {
  const resolvedLane = lane ?? (status ? statusToLane(status) : "future");
  const meta = LANE_BY_ID[resolvedLane];

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-bold ${className}`}
      style={{
        backgroundColor: meta.bgColor,
        borderColor: meta.ringColor,
        color: meta.textColor,
      }}
    >
      {meta.label}
    </span>
  );
}

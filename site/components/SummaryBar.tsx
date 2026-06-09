import type { RoadmapItem } from "@/lib/types";
import { itemsByLane, LANES } from "@/lib/lanes";

export interface SummaryBarProps {
  items: readonly RoadmapItem[];
  className?: string;
}

export function SummaryBar({ items, className = "" }: SummaryBarProps) {
  const grouped = itemsByLane(items);

  return (
    <section
      className={`grid gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5 ${className}`}
      aria-label="Roadmap summary"
    >
      <div className="rounded-lg bg-openhw-navy p-4 text-white">
        <p className="text-xs font-bold uppercase tracking-normal text-slate-200">Total items</p>
        <p className="mt-2 text-3xl font-bold">{items.length}</p>
      </div>
      {LANES.map((lane) => (
        <div key={lane.id} className="rounded-lg border border-border bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-normal" style={{ color: lane.textColor }}>
            {lane.label}
          </p>
          <p className="mt-2 text-3xl font-bold text-openhw-navy">{grouped[lane.id].length}</p>
        </div>
      ))}
    </section>
  );
}

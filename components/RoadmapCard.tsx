import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LanePill } from "@/components/LanePill";
import { OrgChip } from "@/components/OrgChip";
import { ThemeTag } from "@/components/ThemeTag";
import type { Organization, RoadmapItem } from "@/lib/types";

const summaryClampStyle: CSSProperties = {
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export interface RoadmapCardProps {
  item: RoadmapItem;
  organizations: readonly Organization[];
  href?: string;
  className?: string;
}

export function RoadmapCard({
  item,
  organizations,
  href = `/features/${item.id}`,
  className = "",
}: RoadmapCardProps) {
  const orgById = new Map(organizations.map((org) => [org.id, org]));
  const updated = dateFormatter.format(new Date(item.lastUpdated));

  return (
    <Link
      href={href}
      className={`group block rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-openhw-green hover:shadow-md focus:outline-none focus:ring-2 focus:ring-openhw-green ${className}`}
    >
      <article className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <LanePill status={item.status} />
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-openhw-green"
            aria-hidden="true"
          />
        </div>

        <div>
          <h3 className="text-base font-bold leading-snug text-openhw-navy">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted" style={summaryClampStyle}>
            {item.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ThemeTag theme={item.theme} />
          {item.proposingOrgs.map((orgId) => (
            <OrgChip key={orgId} org={orgById.get(orgId) ?? { id: orgId }} />
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs font-semibold text-slate-500">
          {item.targetWindow ? <span>{item.targetWindow}</span> : null}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {updated}
          </span>
        </div>
      </article>
    </Link>
  );
}

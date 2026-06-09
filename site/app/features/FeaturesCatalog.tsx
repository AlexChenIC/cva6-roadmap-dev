"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { EmptyState, FilterBar, LanePill, OrgChip, SummaryBar, ThemeTag } from "@/components";
import { statusToLane } from "@/lib/lanes";
import type { Lane, Organization, RoadmapItem, Theme } from "@/lib/types";

interface FeaturesCatalogProps {
  items: readonly RoadmapItem[];
  organizations: readonly Organization[];
  themes: readonly Theme[];
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function readListParam(searchParams: Pick<URLSearchParams, "get">, key: string) {
  const value = searchParams.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}

function matchesSearch(item: RoadmapItem, query: string) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  const haystack = [item.title, item.summary, item.userValue ?? "", item.theme, item.status, ...item.tags]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

function filterItems(
  items: readonly RoadmapItem[],
  selectedLanes: readonly string[],
  selectedOrgs: readonly string[],
  selectedThemes: readonly string[],
  query: string,
) {
  return items.filter((item) => {
    const lane = statusToLane(item.status);
    const laneMatch = selectedLanes.length === 0 || selectedLanes.includes(lane);
    const orgMatch = selectedOrgs.length === 0 || item.proposingOrgs.some((orgId) => selectedOrgs.includes(orgId));
    const themeMatch = selectedThemes.length === 0 || selectedThemes.includes(item.theme);

    return laneMatch && orgMatch && themeMatch && matchesSearch(item, query);
  });
}

function FeatureRow({
  item,
  organizations,
}: {
  item: RoadmapItem;
  organizations: readonly Organization[];
}) {
  const orgById = new Map(organizations.map((org) => [org.id, org]));

  return (
    <Link
      href={`/features/${item.id}`}
      className="group block rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-openhw-green hover:shadow-md focus:outline-none focus:ring-2 focus:ring-openhw-green"
    >
      <article className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <LanePill status={item.status} />
            <ThemeTag theme={item.theme} />
            {item.targetWindow ? (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                {item.targetWindow}
              </span>
            ) : null}
          </div>

          <h2 className="mt-4 text-lg font-bold leading-snug text-openhw-navy">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.proposingOrgs.map((orgId) => (
              <OrgChip key={orgId} org={orgById.get(orgId) ?? { id: orgId }} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 lg:justify-end">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {dateFormatter.format(new Date(item.lastUpdated))}
          </span>
          <span className="inline-flex items-center gap-1.5 text-openhw-green">
            Detail
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export function FeaturesCatalog({ items, organizations, themes }: FeaturesCatalogProps) {
  const searchParams = useSearchParams();
  const selectedLanes = readListParam(searchParams, "lane") as Lane[];
  const selectedOrgs = readListParam(searchParams, "org");
  const selectedThemes = readListParam(searchParams, "theme") as Theme[];
  const query = searchParams.get("q") ?? "";

  const filteredItems = useMemo(
    () => filterItems(items, selectedLanes, selectedOrgs, selectedThemes, query),
    [items, query, selectedLanes, selectedOrgs, selectedThemes],
  );

  return (
    <section className="page-container grid gap-8 py-10">
      <FilterBar organizations={organizations} themes={themes} showGroupBy={false} />
      <SummaryBar items={filteredItems} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">Catalog results</p>
          <h2 className="mt-2 text-2xl font-bold text-openhw-navy">
            {filteredItems.length} {filteredItems.length === 1 ? "feature" : "features"}
          </h2>
        </div>
        <Link href="/roadmap" className="inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
          View board
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState
          title="No features match these filters"
          description="Try a broader search term, or clear a lane, organization, or theme filter."
        />
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <FeatureRow key={item.id} item={item} organizations={organizations} />
          ))}
        </div>
      )}
    </section>
  );
}

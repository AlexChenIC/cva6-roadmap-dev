"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { EmptyState, FilterBar, RoadmapCard, SummaryBar } from "@/components";
import { itemsByLane, LANE_BY_ID, LANES, statusToLane } from "@/lib/lanes";
import type { Lane, Organization, RoadmapItem, Theme } from "@/lib/types";

type GroupBy = "lane" | "theme" | "organization";

interface RoadmapExplorerProps {
  items: readonly RoadmapItem[];
  organizations: readonly Organization[];
  themes: readonly Theme[];
}

function readListParam(searchParams: Pick<URLSearchParams, "get">, key: string) {
  const value = searchParams.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}

function readGroupBy(searchParams: Pick<URLSearchParams, "get">): GroupBy {
  const value = searchParams.get("group");
  return value === "theme" || value === "organization" ? value : "lane";
}

function matchesSearch(item: RoadmapItem, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [item.title, item.summary, ...item.tags].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
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
    const orgMatch =
      selectedOrgs.length === 0 ||
      (item.showOnOrganizations !== false && item.proposingOrgs.some((orgId) => selectedOrgs.includes(orgId)));
    const themeMatch = selectedThemes.length === 0 || selectedThemes.includes(item.theme);

    return laneMatch && orgMatch && themeMatch && matchesSearch(item, query);
  });
}

function RoadmapBoard({ items, organizations }: { items: readonly RoadmapItem[]; organizations: readonly Organization[] }) {
  const grouped = itemsByLane(items);

  return (
    <div className="grid gap-5 xl:grid-cols-4">
      {LANES.map((lane) => (
        <section key={lane.id} className="rounded-xl border border-border bg-slate-50 p-4">
          <div className="mb-4 rounded-lg border bg-white p-4" style={{ borderColor: lane.ringColor }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-openhw-navy">{lane.label}</h2>
                <p className="mt-1 text-xs leading-5 text-muted">{lane.description}</p>
              </div>
              <span className="rounded-full px-3 py-1 text-sm font-bold" style={{ backgroundColor: lane.bgColor, color: lane.textColor }}>
                {grouped[lane.id].length}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {grouped[lane.id].length > 0 ? (
              grouped[lane.id].map((item) => (
                <RoadmapCard key={item.id} item={item} organizations={organizations} className="h-full" />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-white p-4 text-sm text-muted">
                No items match this lane.
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function ThemeGroups({
  items,
  organizations,
  themes,
}: {
  items: readonly RoadmapItem[];
  organizations: readonly Organization[];
  themes: readonly Theme[];
}) {
  return (
    <div className="grid gap-6">
      {themes.map((theme) => {
        const themeItems = items.filter((item) => item.theme === theme);

        if (themeItems.length === 0) {
          return null;
        }

        return (
          <section key={theme} className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-border pb-4">
              <h2 className="text-xl font-bold text-openhw-navy">{theme}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                {themeItems.length}
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {themeItems.map((item) => (
                <RoadmapCard key={item.id} item={item} organizations={organizations} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function OrganizationGroups({
  items,
  organizations,
}: {
  items: readonly RoadmapItem[];
  organizations: readonly Organization[];
}) {
  return (
    <div className="grid gap-6">
      {organizations.map((org) => {
        const orgItems = items.filter(
          (item) => item.showOnOrganizations !== false && item.proposingOrgs.includes(org.id),
        );

        if (orgItems.length === 0) {
          return null;
        }

        return (
          <section key={org.id} className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-openhw-navy">{org.name}</h2>
                {org.blurb ? <p className="mt-1 text-sm leading-6 text-muted">{org.blurb}</p> : null}
              </div>
              <span
                className="w-fit rounded-full border px-3 py-1 text-sm font-bold"
                style={{ borderColor: org.color, color: org.color }}
              >
                {orgItems.length} items
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {orgItems.map((item) => (
                <RoadmapCard key={`${org.id}-${item.id}`} item={item} organizations={organizations} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function RoadmapExplorer({ items, organizations, themes }: RoadmapExplorerProps) {
  const searchParams = useSearchParams();
  const selectedLanes = readListParam(searchParams, "lane") as Lane[];
  const selectedOrgs = readListParam(searchParams, "org");
  const selectedThemes = readListParam(searchParams, "theme") as Theme[];
  const query = searchParams.get("q") ?? "";
  const groupBy = readGroupBy(searchParams);

  const filteredItems = useMemo(
    () => filterItems(items, selectedLanes, selectedOrgs, selectedThemes, query),
    [items, query, selectedLanes, selectedOrgs, selectedThemes],
  );

  const activeLanes = selectedLanes.map((lane) => LANE_BY_ID[lane]?.label).filter(Boolean);
  const activeOrgs = selectedOrgs
    .map((orgId) => organizations.find((org) => org.id === orgId)?.shortName)
    .filter(Boolean);
  const activeSummary = [...activeLanes, ...activeOrgs, ...selectedThemes, query ? `Search: ${query}` : null].filter(Boolean);

  return (
    <section className="page-container grid gap-8 py-10">
      <FilterBar organizations={organizations} themes={themes} />
      <SummaryBar items={filteredItems} />

      {activeSummary.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {activeSummary.map((label) => (
            <span key={label} className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
              {label}
            </span>
          ))}
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <EmptyState
          title="No roadmap items match these filters"
          description="Try removing a lane, organization, theme, or search term to broaden the result set."
        />
      ) : groupBy === "theme" ? (
        <ThemeGroups items={filteredItems} organizations={organizations} themes={themes} />
      ) : groupBy === "organization" ? (
        <OrganizationGroups items={filteredItems} organizations={organizations} />
      ) : (
        <RoadmapBoard items={filteredItems} organizations={organizations} />
      )}
    </section>
  );
}

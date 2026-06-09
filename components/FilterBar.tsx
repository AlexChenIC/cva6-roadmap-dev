"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Lane, Organization, Theme } from "@/lib/types";
import { LANES, type LaneMeta } from "@/lib/lanes";

export type GroupBy = "lane" | "theme" | "organization";

export interface FilterBarProps {
  organizations: readonly Organization[];
  themes: readonly Theme[];
  lanes?: readonly LaneMeta[];
  className?: string;
}

const groupByOptions: { value: GroupBy; label: string }[] = [
  { value: "lane", label: "Lane" },
  { value: "theme", label: "Theme" },
  { value: "organization", label: "Organization" },
];

function readListParam(searchParams: Pick<URLSearchParams, "get">, key: string) {
  const value = searchParams.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}

function toggleValue(values: readonly string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

interface FilterGroupProps {
  label: string;
  options: readonly { id: string; label: string }[];
  selected: readonly string[];
  onToggle: (value: string) => void;
}

function FilterGroup({ label, options, selected, onToggle }: FilterGroupProps) {
  return (
    <details className="group rounded-lg border border-border bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm font-bold text-openhw-navy">
        <span>{label}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{selected.length}</span>
      </summary>
      <div className="grid gap-1 border-t border-border p-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.id)}
              onChange={() => onToggle(option.id)}
              className="h-4 w-4 rounded border-border accent-openhw-green"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

export function FilterBar({ organizations, themes, lanes = LANES, className = "" }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedLanes = readListParam(searchParams, "lane") as Lane[];
  const selectedOrgs = readListParam(searchParams, "org");
  const selectedThemes = readListParam(searchParams, "theme") as Theme[];
  const query = searchParams.get("q") ?? "";
  const groupBy = (searchParams.get("group") as GroupBy | null) ?? "lane";
  const activeFilterCount = selectedLanes.length + selectedOrgs.length + selectedThemes.length + (query ? 1 : 0);

  function replaceParams(updates: Record<string, string | readonly string[] | null>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (typeof value === "string") {
        params.set(key, value);
      } else if (value && value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    }

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  function clearAll() {
    replaceParams({ lane: null, org: null, theme: null, q: null, group: null });
  }

  return (
    <section className={`rounded-xl border border-border bg-surface p-4 shadow-sm ${className}`} aria-label="Filters">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" aria-hidden="true" />
          <span className="sr-only">Search roadmap items</span>
          <input
            type="search"
            value={query}
            onChange={(event) => replaceParams({ q: event.target.value })}
            placeholder="Search title, summary, or tags"
            className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-openhw-green focus:ring-2 focus:ring-openhw-green/20"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-slate-50 p-1" aria-label="Group by">
            {groupByOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => replaceParams({ group: option.value === "lane" ? null : option.value })}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  groupBy === option.value ? "bg-openhw-navy text-white shadow-sm" : "text-slate-600 hover:text-openhw-navy"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={clearAll}
            disabled={activeFilterCount === 0 && groupBy === "lane"}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-bold text-slate-700 transition hover:border-openhw-green hover:text-openhw-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Clear all
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <FilterGroup
          label="Lane"
          options={lanes.map((lane) => ({ id: lane.id, label: lane.label }))}
          selected={selectedLanes}
          onToggle={(value) => replaceParams({ lane: toggleValue(selectedLanes, value) })}
        />
        <FilterGroup
          label="Organization"
          options={organizations.map((org) => ({ id: org.id, label: org.shortName }))}
          selected={selectedOrgs}
          onToggle={(value) => replaceParams({ org: toggleValue(selectedOrgs, value) })}
        />
        <FilterGroup
          label="Theme"
          options={themes.map((theme) => ({ id: theme, label: theme }))}
          selected={selectedThemes}
          onToggle={(value) => replaceParams({ theme: toggleValue(selectedThemes, value) })}
        />
      </div>

      <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
        <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        Filters are reflected in the URL for sharing.
      </p>
    </section>
  );
}

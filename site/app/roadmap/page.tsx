import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components";
import { organizations } from "@/data/organizations";
import { pillars } from "@/data/pillars";
import { roadmapItems } from "@/data/roadmap";
import type { Theme } from "@/lib/types";
import { RoadmapExplorer } from "./RoadmapExplorer";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Browse, filter, and share the public CVA6 roadmap.",
};

const themes = pillars.map((pillar) => pillar.title) as Theme[];

export default function RoadmapPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            as="h1"
            eyebrow="Roadmap"
            title="Browse CVA6 work by lane, theme, or organization"
            description="Search reviewed CVA6 roadmap signals, filter by organizations and themes, and inspect each item for review lead, target window, release mapping, tags, and evidence links."
          />
        </div>
      </section>

      <Suspense
        fallback={
          <div className="page-container py-10">
            <div className="rounded-xl border border-border bg-surface p-6 text-sm font-semibold text-muted shadow-sm">
              Loading roadmap filters...
            </div>
          </div>
        }
      >
        <RoadmapExplorer items={roadmapItems} organizations={organizations} themes={themes} />
      </Suspense>
    </div>
  );
}

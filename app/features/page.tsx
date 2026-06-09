import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components";
import { organizations } from "@/data/organizations";
import { pillars } from "@/data/pillars";
import { roadmapItems } from "@/data/roadmap";
import type { Theme } from "@/lib/types";
import { FeaturesCatalog } from "./FeaturesCatalog";

export const metadata: Metadata = {
  title: "Features | CVA6 Roadmap",
  description: "Search the CVA6 roadmap feature catalog.",
};

const themes = pillars.map((pillar) => pillar.title) as Theme[];

export default function FeaturesPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            eyebrow="Features"
            title="Search the CVA6 feature catalog"
            description="A flat, search-first view of every seeded roadmap item, with the same lane, organization, and theme filters as the roadmap board."
          />
        </div>
      </section>

      <Suspense
        fallback={
          <div className="page-container py-10">
            <div className="rounded-xl border border-border bg-surface p-6 text-sm font-semibold text-muted shadow-sm">
              Loading feature filters...
            </div>
          </div>
        }
      >
        <FeaturesCatalog items={roadmapItems} organizations={organizations} themes={themes} />
      </Suspense>
    </div>
  );
}

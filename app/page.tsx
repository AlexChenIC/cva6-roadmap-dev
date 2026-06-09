import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  CheckCheck,
  Cpu,
  Gauge,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { OrgChip, RoadmapCard, SectionHeading } from "@/components";
import { organizations } from "@/data/organizations";
import { pillars } from "@/data/pillars";
import { releases } from "@/data/releases";
import { roadmapItems } from "@/data/roadmap";
import { itemsByLane, LANES } from "@/lib/lanes";

const pillarIconMap = {
  cpu: Cpu,
  shield: Shield,
  "badge-check": BadgeCheck,
  "check-check": CheckCheck,
  gauge: Gauge,
  blocks: Blocks,
};

export default function Home() {
  const itemsGroupedByLane = itemsByLane(roadmapItems);
  const featuredItems = roadmapItems.filter((item) => item.featured);
  const totalOrgCount = organizations.length;
  const plannedReleaseCount = releases.filter((release) => release.status === "planned").length;

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="page-container grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">
              OpenHW CVA6 public roadmap
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-openhw-navy sm:text-5xl lg:text-6xl">
              Where CVA6 is going.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Explore the public roadmap for the OpenHW CVA6 application-class RISC-V core, including
              available capabilities, committed work, planned milestones, and future ideas from the
              community.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/roadmap"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-openhw-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-openhw-green-dark"
              >
                Explore the roadmap
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contribute"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
              >
                Propose a feature
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              A public roadmap, not an issue tracker.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-slate-50 p-4 shadow-sm">
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-normal text-slate-500">Roadmap snapshot</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-3xl font-bold text-openhw-navy">{roadmapItems.length}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">Items</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-openhw-navy">{totalOrgCount}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">Orgs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-openhw-navy">{plannedReleaseCount}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">Planned release</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              {LANES.map((lane) => (
                <div key={lane.id} className="rounded-lg border border-border bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold" style={{ color: lane.textColor }}>
                        {lane.label}
                      </p>
                      <p className="mt-1 text-xs text-muted">{lane.description}</p>
                    </div>
                    <p className="text-2xl font-bold text-openhw-navy">{itemsGroupedByLane[lane.id].length}</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: lane.ringColor,
                        width: `${Math.max(12, (itemsGroupedByLane[lane.id].length / roadmapItems.length) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {LANES.map((lane) => (
            <Link
              key={lane.id}
              href={`/roadmap?lane=${lane.id}`}
              className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-openhw-green hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold" style={{ color: lane.textColor }}>
                    {lane.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">{lane.description}</p>
                </div>
                <p className="rounded-full px-3 py-1 text-lg font-bold" style={{ backgroundColor: lane.bgColor, color: lane.textColor }}>
                  {itemsGroupedByLane[lane.id].length}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
                View lane
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="page-container">
          <SectionHeading
            eyebrow="Strategic pillars"
            title="The technical themes behind the roadmap"
            description="Each item is tagged to the capability area it advances, making it easier to scan the roadmap by architecture, safety, verification, performance, security, and ecosystem needs."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillarIconMap[pillar.icon as keyof typeof pillarIconMap] ?? Blocks;

              return (
                <article key={pillar.id} className="rounded-xl border border-border bg-slate-50 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-openhw-green text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-openhw-navy">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-container py-14">
        <SectionHeading
          eyebrow="Highlights"
          title="Featured roadmap items"
          description="A quick look at representative work across released capabilities, committed engineering, planned milestones, and exploratory ideas."
          action={
            <Link href="/features" className="inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
              Browse all features
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredItems.map((item) => (
            <RoadmapCard key={item.id} item={item} organizations={organizations} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="page-container">
          <SectionHeading
            eyebrow="Contributors"
            title="Organizations shaping CVA6"
            description="Roadmap attribution is first-class: each item names the organizations proposing, owning, or stewarding the work."
            action={
              <Link href="/organizations" className="inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
                View organizations
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {organizations.map((org) => (
              <article key={org.id} className="rounded-xl border border-border bg-slate-50 p-5">
                <OrgChip org={org} href="/organizations" />
                <p className="mt-4 text-sm leading-6 text-muted">{org.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-14">
        <SectionHeading
          eyebrow="Releases"
          title="Release windows"
          description="A compact view of stable and planned CVA6 release lines connected to the public roadmap."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {releases.map((release) => (
            <article key={release.id} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">
                    {release.status === "released" ? "Released" : "Planned"}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-openhw-navy">{release.version}</h3>
                </div>
                {release.date ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                    {release.date}
                  </span>
                ) : null}
              </div>
              {release.summary ? <p className="mt-4 text-sm leading-6 text-muted">{release.summary}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-openhw-navy py-14 text-white">
        <div className="page-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-normal text-slate-200">Contribute</p>
            <h2 className="mt-2 text-3xl font-bold">Help shape CVA6</h2>
            <p className="mt-3 text-base leading-7 text-slate-200">
              Propose new roadmap items, clarify ownership, or help refine the seeded dataset through the
              project contribution flow.
            </p>
          </div>
          <Link
            href="/contribute"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-openhw-navy transition hover:bg-slate-100"
          >
            Propose a feature
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

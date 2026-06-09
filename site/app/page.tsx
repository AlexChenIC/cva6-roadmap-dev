import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  CheckCheck,
  Cpu,
  Gauge,
  Handshake,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { OrgChip, RoadmapCard, SectionHeading } from "@/components";
import { organizations } from "@/data/organizations";
import { partnerNeeds } from "@/data/partner-needs";
import { pillars } from "@/data/pillars";
import { projects } from "@/data/projects";
import { releases } from "@/data/releases";
import { roadmapItems } from "@/data/roadmap";
import { strategy } from "@/data/strategy";
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
  const roadmapItemById = new Map(roadmapItems.map((item) => [item.id, item]));
  const partnerSignals = partnerNeeds.slice(0, 3);

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
              {strategy.visionSummary} Explore available capabilities, committed work, planned milestones,
              partner signals, and future ideas from the community.
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
                href="/releases"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
              >
                View releases
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
          eyebrow="CVA6 context"
          title="One project, one reviewed source of truth"
          description="The first public scope is CVA6. Project metadata is shown here so readers can identify the upstream repository, maintainers, participating organizations, and next expected roadmap candidate without opening a separate project page."
        />
        <div className="mt-8 grid gap-5">
          {projects.map((project) => (
            <article key={project.id} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">{project.status}</p>
                  <h3 className="mt-2 text-2xl font-bold text-openhw-navy">{project.name}</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.participatingOrgs.map((orgId) => {
                      const org = organizations.find((candidate) => candidate.id === orgId);
                      return org ? <OrgChip key={org.id} org={org} href={`/organizations#${org.id}`} /> : null;
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:min-w-64">
                  <div className="rounded-lg border border-border bg-slate-50 p-4">
                    <p className="text-2xl font-bold text-openhw-navy">{roadmapItems.length}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">Items</p>
                  </div>
                  <div className="rounded-lg border border-border bg-slate-50 p-4">
                    <p className="text-2xl font-bold text-openhw-navy">{project.nextRelease}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">Next release</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="page-container">
          <SectionHeading
            eyebrow="Partner signals"
            title="Partner needs are tracked before they become commitments"
            description={strategy.sourcePolicy}
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {partnerSignals.map((need) => {
              const relatedItems = need.relatedRoadmapItems.flatMap((itemId) => {
                const item = roadmapItemById.get(itemId);
                return item ? [item] : [];
              });

              return (
                <article key={need.id} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-openhw-green">
                    <Handshake className="h-4 w-4" aria-hidden="true" />
                    {need.status.replace("-", " ")}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-openhw-navy">{need.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{need.summary}</p>
                  {need.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {need.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {need.proposingOrgs.map((orgId) => {
                      const org = organizations.find((candidate) => candidate.id === orgId);
                      return org ? <OrgChip key={org.id} org={org} href={`/organizations#${org.id}`} /> : null;
                    })}
                  </div>
                  {relatedItems.length > 0 ? (
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">
                        Related roadmap items
                      </p>
                      <div className="mt-2 grid gap-2">
                        {relatedItems.map((item) => (
                          <Link
                            key={item.id}
                            href={`/roadmap/${item.id}`}
                            className="text-sm font-bold text-openhw-navy hover:text-openhw-green"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
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
            <Link href="/roadmap" className="inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
              View roadmap board
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
          action={
            <Link href="/releases" className="inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
              View release plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
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
              {release.labels?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {release.labels.map((label) => (
                    <span key={label} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {label}
                    </span>
                  ))}
                </div>
              ) : null}
              {release.summary ? <p className="mt-4 text-sm leading-6 text-muted">{release.summary}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-openhw-navy py-14 text-white">
        <div className="page-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-normal text-slate-200">Maintenance model</p>
            <h2 className="mt-2 text-3xl font-bold">Reviewed source, public site</h2>
            <p className="mt-3 text-base leading-7 text-slate-200">
              Weekly or monthly updates should land in roadmap-source through pull requests. Maintainers review
              ownership, evidence, and scope before the public pages change.
            </p>
          </div>
          <Link
            href="https://github.com/AlexChenIC/cva6-roadmap-dev/tree/main/roadmap-source"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-openhw-navy transition hover:bg-slate-100"
          >
            View roadmap-source
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

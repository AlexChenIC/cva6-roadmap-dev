import { ArrowRight, ExternalLink, GitBranch, Layers3, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { OrgChip, SectionHeading, ThemeTag } from "@/components";
import { organizations } from "@/data/organizations";
import { projects } from "@/data/projects";
import { roadmapItems } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project-level view for the CVA6 roadmap protocol pilot.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            eyebrow="Projects"
            title="Project-level roadmap view"
            description="The first public protocol scope is CVA6. This page keeps the project layer explicit so the same structure can grow to more OpenHW projects later."
          />
        </div>
      </section>

      <section className="page-container grid gap-6 py-10">
        {projects.map((project) => {
          const orgs = organizations.filter((org) => project.participatingOrgs.includes(org.id));
          const activeItems = roadmapItems.filter((item) => item.status !== "Released");

          return (
            <article key={project.id} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-normal text-openhw-green">
                    <Layers3 className="h-4 w-4" aria-hidden="true" />
                    {project.status}
                  </div>
                  <h2 className="mt-3 text-3xl font-bold text-openhw-navy">{project.name}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.repositoryUrl}
                      className="inline-flex h-10 items-center gap-2 rounded-lg bg-openhw-green px-3 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
                      rel="noreferrer"
                    >
                      Repository
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                    {project.docsUrl ? (
                      <a
                        href={project.docsUrl}
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
                        rel="noreferrer"
                      >
                        Documentation
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    <Link
                      href="/roadmap"
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
                    >
                      Roadmap board
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-slate-50 p-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <Users className="h-4 w-4 text-openhw-green" aria-hidden="true" />
                        Participating organizations
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {orgs.map((org) => (
                          <OrgChip key={org.id} org={org} href={`/organizations#${org.id}`} />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-slate-50 p-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <GitBranch className="h-4 w-4 text-openhw-green" aria-hidden="true" />
                        Project metadata
                      </div>
                      <dl className="mt-4 grid gap-3 text-sm">
                        <div>
                          <dt className="font-bold text-openhw-navy">Owner</dt>
                          <dd className="mt-1 text-slate-700">{project.owner}</dd>
                        </div>
                        <div>
                          <dt className="font-bold text-openhw-navy">Default branch</dt>
                          <dd className="mt-1 text-slate-700">{project.defaultBranch}</dd>
                        </div>
                        <div>
                          <dt className="font-bold text-openhw-navy">Next release</dt>
                          <dd className="mt-1 text-slate-700">{project.nextRelease ?? "To be confirmed"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                <aside className="rounded-xl border border-border bg-slate-50 p-5">
                  <h3 className="text-lg font-bold text-openhw-navy">Roadmap snapshot</h3>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-white p-4">
                      <p className="text-3xl font-bold text-openhw-navy">{roadmapItems.length}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">Total items</p>
                    </div>
                    <div className="rounded-lg border border-border bg-white p-4">
                      <p className="text-3xl font-bold text-openhw-navy">{activeItems.length}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">Active/future</p>
                    </div>
                  </div>

                  <h4 className="mt-6 text-sm font-bold uppercase tracking-normal text-slate-500">Strategic pillars</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.strategicPillars.map((pillar) => (
                      <ThemeTag key={pillar} theme={pillar} />
                    ))}
                  </div>
                </aside>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

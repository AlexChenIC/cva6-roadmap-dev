import { ArrowRight, Code2, ExternalLink, GitPullRequest, Globe2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LanePill, OrganizationLogo, SectionHeading, ThemeTag } from "@/components";
import { organizations } from "@/data/organizations";
import { roadmapItems } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Organizations",
  description: "Organizations contributing to the public CVA6 roadmap.",
};

export default function OrganizationsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            eyebrow="Organizations"
            title="Who is shaping CVA6"
            description="CVA6 roadmap work can come from partner organizations, research groups, and individual contributors. Accepted items keep attribution visible as the project evolves."
          />
        </div>
      </section>

      <section className="page-container grid gap-6 py-10">
        {organizations.map((org) => {
          const items = roadmapItems.filter((item) => item.proposingOrgs.includes(org.id));

          return (
            <article
              key={org.id}
              id={org.id}
              className="scroll-mt-24 rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
                <div>
                  <div className="flex items-center gap-3">
                    {org.website ? (
                      <a
                        href={org.website}
                        className="rounded-xl focus:outline-none focus:ring-2 focus:ring-openhw-green"
                        aria-label={`${org.name} website`}
                        rel="noreferrer"
                      >
                        <OrganizationLogo org={org} size="lg" decorative priority />
                      </a>
                    ) : (
                      <OrganizationLogo org={org} size="lg" decorative priority />
                    )}
                    <div>
                      {org.website ? (
                        <a href={org.website} className="group inline-flex items-center gap-2" rel="noreferrer">
                          <h2 className="text-2xl font-bold text-openhw-navy transition group-hover:text-openhw-green">
                            {org.name}
                          </h2>
                          <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:text-openhw-green" />
                        </a>
                      ) : (
                        <h2 className="text-2xl font-bold text-openhw-navy">{org.name}</h2>
                      )}
                      <p className="mt-1 text-sm font-bold text-slate-500">{items.length} roadmap feature items</p>
                    </div>
                  </div>

                  {org.blurb ? <p className="mt-5 text-base leading-7 text-slate-700">{org.blurb}</p> : null}

                  {org.tags && org.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {org.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    {org.website ? (
                      <a
                        href={org.website}
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
                        rel="noreferrer"
                      >
                        <Globe2 className="h-4 w-4" aria-hidden="true" />
                        Website
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                    <Link
                      href={`/roadmap?org=${org.id}`}
                      className="inline-flex h-10 items-center gap-2 rounded-lg bg-openhw-green px-3 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
                    >
                      Roadmap items
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <section className="rounded-xl border border-border bg-slate-50 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-normal text-slate-500">Roadmap feature items</h3>
                    <span
                      className="rounded-full border bg-white px-3 py-1 text-sm font-bold"
                      style={{ borderColor: org.color, color: org.color }}
                    >
                      {items.length}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/roadmap/${item.id}`}
                        className="group rounded-lg border border-border bg-white p-4 transition hover:border-openhw-green hover:shadow-sm"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h4 className="font-bold text-openhw-navy">{item.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-muted">{item.summary}</p>
                          </div>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-openhw-green"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <LanePill status={item.status} />
                          <ThemeTag theme={item.theme} />
                          {item.targetWindow ? (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                              {item.targetWindow}
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </article>
          );
        })}
      </section>

      <section className="page-container pb-10">
        <article className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-openhw-green bg-green-50 text-openhw-green">
                  <GitPullRequest className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-normal text-slate-500">Contribution category</p>
                  <h2 className="text-2xl font-bold text-openhw-navy">Community & research contributors</h2>
                </div>
              </div>
              <p className="mt-5 text-base leading-7 text-slate-700">
                Not every CVA6 feature starts inside a listed organization. Individual contributors, research teams, and
                prototype owners can bring implemented work or early proposals into CVA6 discussion; accepted work is
                then represented as roadmap feature items with appropriate attribution.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/roadmap"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-openhw-green px-3 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
                >
                  Browse roadmap
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="https://github.com/openhwgroup/cva6"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
                  rel="noreferrer"
                >
                  CVA6 GitHub
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-slate-50 p-4">
              <h3 className="text-sm font-bold uppercase tracking-normal text-slate-500">How these features enter</h3>
              <div className="mt-4 grid gap-3">
                {[
                  {
                    title: "Prototype or proposal",
                    text: "A contributor or research group brings working code, a feature idea, or integration evidence.",
                  },
                  {
                    title: "CVA6 discussion",
                    text: "Maintainers and partners review fit, verification expectations, and upstream ownership.",
                  },
                  {
                    title: "Roadmap feature item",
                    text: "Accepted work appears on the public roadmap alongside organization-led feature items.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 rounded-lg bg-white p-3">
                    <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-openhw-green" aria-hidden="true" />
                    <div>
                      <h4 className="text-sm font-bold text-openhw-navy">{item.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

import { ArrowRight, CalendarDays, ExternalLink, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LanePill, SectionHeading, ThemeTag } from "@/components";
import { releases } from "@/data/releases";
import { roadmapItems } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Releases",
  description: "Release-oriented view of CVA6 roadmap items and planned windows.",
};

export default function ReleasesPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            eyebrow="Releases"
            title="Roadmap items by release window"
            description="Connect public roadmap commitments to stable and planned CVA6 release lines, including included features and verification notes."
          />
        </div>
      </section>

      <section className="page-container grid gap-6 py-10">
        {releases.map((release) => {
          const includedItems = roadmapItems.filter((item) => release.includedRoadmapItems?.includes(item.id));

          return (
            <article key={release.id} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
                <aside className="rounded-xl border border-border bg-slate-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">
                    {release.status === "released" ? "Released" : "Planned"}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-openhw-navy">{release.version}</h2>
                  {release.date ? (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700">
                      <CalendarDays className="h-4 w-4 text-openhw-green" aria-hidden="true" />
                      {release.date}
                    </p>
                  ) : null}
                  {release.labels?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {release.labels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {release.summary ? <p className="mt-4 text-sm leading-6 text-slate-700">{release.summary}</p> : null}

                  <dl className="mt-6 grid gap-4 text-sm">
                    {release.tagName ? (
                      <div>
                        <dt className="font-bold text-openhw-navy">Git tag</dt>
                        <dd className="mt-1 leading-6 text-slate-700">{release.tagName}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-bold text-openhw-navy">Support</dt>
                      <dd className="mt-1 leading-6 text-slate-700">{release.support ?? "To be confirmed"}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-openhw-navy">Verification</dt>
                      <dd className="mt-1 leading-6 text-slate-700">
                        {release.verificationSummary ?? "Verification scope to be confirmed."}
                      </dd>
                    </div>
                  </dl>

                  {release.releaseNotesUrl || release.sourceUrl ? (
                    <a
                      href={release.releaseNotesUrl ?? release.sourceUrl}
                      className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
                      rel="noreferrer"
                    >
                      Source release
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </aside>

                <div className="min-w-0">
                  {release.highlights?.length ? (
                    <div className="rounded-xl border border-border bg-slate-50 p-5">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-openhw-green" aria-hidden="true" />
                        Release highlights
                      </div>
                      <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                        {release.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-openhw-green" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-slate-500">
                    <PackageCheck className="h-4 w-4 text-openhw-green" aria-hidden="true" />
                    Connected roadmap items
                  </div>

                  <div className="mt-4 grid gap-3">
                    {includedItems.length > 0 ? (
                      includedItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/roadmap/${item.id}`}
                          className="group rounded-xl border border-border bg-slate-50 p-4 transition hover:border-openhw-green hover:shadow-sm"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <h3 className="font-bold text-openhw-navy">{item.title}</h3>
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
                            {item.owner ? (
                              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-700">
                                Owner: {item.owner}
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-border bg-slate-50 p-5 text-sm leading-6 text-muted">
                        No local roadmap item is connected to this upstream release yet.
                      </div>
                    )}
                  </div>

                  <div className="mt-6 rounded-xl border border-openhw-green bg-surface p-5">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-openhw-green">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Release policy note
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      This page is a public planning view. Final release scope, support policy, and verification
                      evidence should be confirmed by OpenHW maintainers before being treated as a commitment.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

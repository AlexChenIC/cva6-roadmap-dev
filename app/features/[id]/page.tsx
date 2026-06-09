import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MessageSquare,
  Package,
  Tags,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanePill, OrgChip, ThemeTag } from "@/components";
import { organizations } from "@/data/organizations";
import { roadmapItems } from "@/data/roadmap";
import type { Organization, RoadmapItem } from "@/lib/types";

interface FeatureDetailPageProps {
  params: Promise<{ id: string }>;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function findItem(id: string) {
  return roadmapItems.find((item) => item.id === id);
}

function organizationFor(id: string): Organization | { id: string } {
  return organizations.find((org) => org.id === id) ?? { id };
}

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-openhw-green" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
          <div className="mt-2 text-sm font-semibold leading-6 text-openhw-navy">{children}</div>
        </div>
      </div>
    </div>
  );
}

function FeaturePager({ item }: { item: RoadmapItem }) {
  const index = roadmapItems.findIndex((candidate) => candidate.id === item.id);
  const previous = index > 0 ? roadmapItems[index - 1] : undefined;
  const next = index >= 0 && index < roadmapItems.length - 1 ? roadmapItems[index + 1] : undefined;

  return (
    <nav className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2" aria-label="Feature navigation">
      {previous ? (
        <Link
          href={`/features/${previous.id}`}
          className="group rounded-xl border border-border bg-surface p-4 transition hover:border-openhw-green hover:shadow-sm"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-normal text-slate-500">
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" aria-hidden="true" />
            Previous
          </span>
          <span className="mt-2 block text-sm font-bold text-openhw-navy">{previous.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/features/${next.id}`}
          className="group rounded-xl border border-border bg-surface p-4 text-left transition hover:border-openhw-green hover:shadow-sm sm:text-right"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-normal text-slate-500">
            Next
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
          <span className="mt-2 block text-sm font-bold text-openhw-navy">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}

export function generateStaticParams() {
  return roadmapItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: FeatureDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = findItem(id);

  if (!item) {
    return {
      title: "Feature not found | CVA6 Roadmap",
    };
  }

  return {
    title: `${item.title} | CVA6 Roadmap`,
    description: item.summary,
  };
}

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const { id } = await params;
  const item = findItem(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-background">
      <article className="page-container grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="min-w-0">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-openhw-green">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/features" className="hover:text-openhw-green">
              Features
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-openhw-navy">{item.title}</span>
          </nav>

          <header className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <LanePill status={item.status} />
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                {item.status}
              </span>
              <ThemeTag theme={item.theme} />
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-openhw-navy sm:text-5xl">{item.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{item.summary}</p>
          </header>

          <div className="mt-8 grid gap-8">
            <section className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-openhw-navy">What it covers</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{item.description ?? item.summary}</p>
            </section>

            {item.userValue ? (
              <section className="rounded-xl border border-openhw-green bg-surface p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-openhw-navy">Why it matters</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">{item.userValue}</p>
              </section>
            ) : null}

            {item.links && item.links.length > 0 ? (
              <section className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-openhw-navy">Related links</h2>
                <div className="mt-5 grid gap-3">
                  {item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
                      rel="noreferrer"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-xl bg-openhw-navy p-6 text-white sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Propose a change or discuss this item</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Roadmap entries are maintained as typed data so the community can propose updates through the
                    contribution flow.
                  </p>
                </div>
                <Link
                  href="/contribute"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-openhw-navy transition hover:bg-slate-100"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Contribute
                </Link>
              </div>
            </section>

            <FeaturePager item={item} />
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-openhw-navy">Feature metadata</h2>

          <div className="mt-4">
            <MetaRow icon={Users} label="Proposing organizations">
              <div className="flex flex-wrap gap-2">
                {item.proposingOrgs.map((orgId) => (
                  <OrgChip key={orgId} org={organizationFor(orgId)} href={`/organizations#${orgId}`} />
                ))}
              </div>
            </MetaRow>

            {item.owner ? (
              <MetaRow icon={Users} label="Owner">
                {item.owner}
              </MetaRow>
            ) : null}

            <MetaRow icon={Target} label="Target window">
              {item.targetWindow ?? "Not assigned"}
            </MetaRow>

            <MetaRow icon={Package} label="Target release">
              {item.targetRelease ?? "Not assigned"}
            </MetaRow>

            <MetaRow icon={Tags} label="Tags">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </MetaRow>

            <MetaRow icon={CalendarDays} label="Last updated">
              {dateFormatter.format(new Date(item.lastUpdated))}
            </MetaRow>
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              href="/roadmap"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to roadmap
            </Link>
            <Link
              href="/features"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-openhw-green px-4 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
            >
              Browse all features
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </article>
    </div>
  );
}

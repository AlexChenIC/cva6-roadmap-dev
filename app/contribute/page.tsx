import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  FilePlus2,
  GitBranch,
  GitPullRequest,
  Lightbulb,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components";
import { LANES } from "@/lib/lanes";

export const metadata: Metadata = {
  title: "Contribute",
  description: "How to propose or edit CVA6 roadmap items.",
};

const roadmapRepoUrl = "https://github.com/AlexChenIC/cva6-roadmap-dev";
const issueTemplateUrl = `${roadmapRepoUrl}/issues/new?template=roadmap-item.yml`;
const contributingUrl = `${roadmapRepoUrl}/blob/main/CONTRIBUTING.md`;

const steps = [
  {
    title: "Open a roadmap proposal issue",
    description:
      "Use the structured issue form for a new capability, lifecycle change, or ownership clarification.",
    icon: FilePlus2,
    href: issueTemplateUrl,
    label: "Open issue template",
  },
  {
    title: "Or send a typed data PR",
    description:
      "Add or edit a RoadmapItem in data/roadmap.ts, keeping theme, status, organizations, tags, and dates complete.",
    icon: GitPullRequest,
    href: `${roadmapRepoUrl}/compare`,
    label: "Start a pull request",
  },
  {
    title: "Review the contribution rules",
    description:
      "Check the lifecycle rules and data fields before submitting so maintainers can review the proposal quickly.",
    icon: ListChecks,
    href: contributingUrl,
    label: "Read CONTRIBUTING",
  },
];

const lifecycleNotes = [
  {
    lane: "available",
    statuses: "Released",
    entry: "Merged, verified, and available in a public CVA6 release or stable upstream configuration.",
    exit: "Moves only if the roadmap corrects historical attribution or release information.",
  },
  {
    lane: "in-progress",
    statuses: "In Progress, Verification",
    entry: "Named owner, active work, or active verification with a credible target window.",
    exit: "Moves to Available after release, or Planned/Future if ownership or commitment changes.",
  },
  {
    lane: "planned",
    statuses: "Planned",
    entry: "Accepted direction with an expected window, but not yet active enough to call committed work.",
    exit: "Moves to In Progress once execution starts, or Future if the plan is deferred.",
  },
  {
    lane: "future",
    statuses: "Proposed, Idea, Deferred",
    entry: "Useful proposal, exploratory idea, or deferred work that still belongs in public discussion.",
    exit: "Moves to Planned or In Progress when scope, ownership, and timing become clear.",
  },
];

export default function ContributePage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            eyebrow="Contribute"
            title="Help keep the CVA6 roadmap accurate"
            description="The roadmap is structured data in data/roadmap.ts. Community updates come through issues and pull requests, then the portal renders the accepted data automatically."
            action={
              <a
                href={roadmapRepoUrl}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-openhw-green px-4 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
                rel="noreferrer"
              >
                Roadmap repository
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            }
          />
        </div>
      </section>

      <section className="page-container grid gap-10 py-10">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-openhw-navy">
                <GitBranch className="h-4 w-4 text-openhw-green" aria-hidden="true" />
                Data driven by design
              </div>
              <h2 className="mt-4 text-2xl font-bold text-openhw-navy">One source of truth</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                A roadmap entry is a typed object with a title, summary, lifecycle status, theme, proposing
                organizations, owner, tags, target window, and evidence links. Updating that data is enough for
                the public portal to refresh its board, catalog, organization pages, release pages, and detail pages.
              </p>
              <p className="mt-4 rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm font-semibold text-openhw-navy [overflow-wrap:anywhere]">
                {`Repository URL: ${roadmapRepoUrl}`}
              </p>
            </div>
            <Link
              href="/features"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
            >
              Browse current data
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <section>
          <SectionHeading
            eyebrow="Workflow"
            title="Two ways to propose a change"
            description="Use an issue when the proposal needs discussion. Use a pull request when the data update is already clear."
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-openhw-green text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-openhw-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
                  <a
                    href={step.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-openhw-green"
                    rel="noreferrer"
                  >
                    {step.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <SectionHeading
            eyebrow="Status lifecycle"
            title="How status maps to public lanes"
            description="Every item keeps a specific lifecycle status. The public board groups those statuses into four lanes so readers can scan commitment and maturity quickly."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {lifecycleNotes.map((note) => {
              const lane = LANES.find((candidate) => candidate.id === note.lane);

              if (!lane) {
                return null;
              }

              return (
                <article key={lane.id} className="rounded-xl border border-border bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-openhw-navy">{lane.label}</h3>
                      <p className="mt-1 text-sm font-semibold" style={{ color: lane.textColor }}>
                        {note.statuses}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-sm font-bold"
                      style={{ backgroundColor: lane.bgColor, color: lane.textColor }}
                    >
                      {lane.description}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                    <p>
                      <CheckCircle2 className="mr-2 inline h-4 w-4 text-openhw-green" aria-hidden="true" />
                      Entry: {note.entry}
                    </p>
                    <p>
                      <CircleDot className="mr-2 inline h-4 w-4 text-slate-500" aria-hidden="true" />
                      Exit: {note.exit}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-openhw-green">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
              Seeded starting point
            </div>
            <h2 className="mt-3 text-2xl font-bold text-openhw-navy">A starting point, not the final word</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              The current dataset is seeded by the portal team so the site is useful from day one. Real ownership,
              dates, and scope should be refined by the organizations doing the work through public review.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-openhw-green">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Review expectations
            </div>
            <h2 className="mt-3 text-2xl font-bold text-openhw-navy">Keep proposals concrete</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              A strong roadmap proposal names the capability, user value, theme, expected lifecycle status,
              proposing organization, responsible owner, target window when known, and at least one useful evidence
              link or discussion thread.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}

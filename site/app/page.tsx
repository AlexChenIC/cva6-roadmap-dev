import {
  ArrowRight,
  CircleCheck,
  FileText,
  GitPullRequest,
  Map,
  MessageSquareText,
  Package,
  RefreshCw,
  Users,
} from "lucide-react";
import Link from "next/link";

const entryPoints = [
  {
    href: "/roadmap",
    title: "Roadmap",
    description:
      "Review maintainer-curated roadmap items by status, theme, owner, organization, and target window.",
    icon: Map,
    cta: "Open roadmap",
  },
  {
    href: "/releases",
    title: "Release",
    description:
      "Understand real upstream CVA6 releases and clearly marked example planning windows for future releases.",
    icon: Package,
    cta: "View releases",
  },
  {
    href: "/organizations",
    title: "Organizations",
    description:
      "See the organizations currently represented in the roadmap data and the work attributed to them.",
    icon: Users,
    cta: "View organizations",
  },
];

const roadmapFlow = [
  {
    title: "Bring needs to the CVA6 meeting",
    description: "Partners and maintainers raise target use cases, feature needs, and release context.",
    icon: MessageSquareText,
  },
  {
    title: "Capture consensus in Markdown",
    description: "Accepted direction is written into the shared roadmap-source Markdown files.",
    icon: FileText,
  },
  {
    title: "Review through Pull Request",
    description: "Maintainers check wording, attribution, release links, and data consistency before merge.",
    icon: GitPullRequest,
  },
  {
    title: "Publish the updated portal",
    description: "After approval, the generated site refreshes Roadmap, Release, and Organizations pages.",
    icon: RefreshCw,
  },
];

export default function Home() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="page-container py-16 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">
              OpenHW CVA6 public roadmap
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-openhw-navy sm:text-5xl lg:text-6xl">
              CVA6 Roadmap Portal
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              A maintainer-reviewed public portal for CVA6 roadmap direction, release context, and
              participating organizations.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              This site is a curated public view of selected roadmap topics. It is not a complete CVA6
              feature inventory, issue tracker, or delivery guarantee.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/roadmap"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-openhw-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-openhw-green-dark"
              >
                Open roadmap
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
          </div>
        </div>
      </section>

      <section className="page-container py-12 lg:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {entryPoints.map((entry) => {
            const Icon = entry.icon;

            return (
              <Link
                key={entry.href}
                href={entry.href}
                className="group flex min-h-64 flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-openhw-green hover:shadow-md focus:outline-none focus:ring-2 focus:ring-openhw-green"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-openhw-green text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-openhw-navy">{entry.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{entry.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
                  {entry.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-12 lg:py-16">
        <div className="page-container">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">Roadmap workflow</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-openhw-navy sm:text-3xl">
                From meeting signal to published roadmap
              </h2>
            </div>
            <p className="text-base leading-7 text-muted">
              The portal is not edited by hand. Roadmap changes move through a maintainer-reviewed path so
              public pages reflect agreed CVA6 direction rather than unreviewed notes.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {roadmapFlow.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === roadmapFlow.length - 1;

              return (
                <article
                  key={step.title}
                  className="relative rounded-lg border border-border bg-white p-5 shadow-sm"
                >
                  {!isLast ? (
                    <div
                      className="pointer-events-none absolute -right-3 top-8 z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-openhw-green shadow-sm lg:flex"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  ) : null}
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-lg bg-openhw-green text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-openhw-navy">
                      {index + 1}
                    </span>
                    {isLast ? (
                      <CircleCheck className="h-5 w-5 text-openhw-green" aria-hidden="true" />
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-base font-bold leading-6 text-openhw-navy">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

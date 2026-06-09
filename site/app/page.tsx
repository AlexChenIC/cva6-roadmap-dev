import {
  ArrowRight,
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
    title: "CVA6 meeting",
    description: "Partners bring needs, target use cases, and candidate roadmap topics.",
    icon: MessageSquareText,
  },
  {
    title: "Markdown source",
    description: "Agreed direction is captured in shared roadmap-source files.",
    icon: FileText,
  },
  {
    title: "Pull Request review",
    description: "Maintainers review scope, attribution, release links, and wording.",
    icon: GitPullRequest,
  },
  {
    title: "Portal update",
    description: "Merged changes regenerate the public Roadmap, Release, and Organizations pages.",
    icon: RefreshCw,
  },
];

function flowArrowClassName(index: number) {
  if (index === 0) {
    return "lg:[clip-path:polygon(0_0,calc(100%_-_28px)_0,100%_50%,calc(100%_-_28px)_100%,0_100%)]";
  }

  if (index === roadmapFlow.length - 1) {
    return "lg:[clip-path:polygon(28px_0,100%_0,100%_100%,28px_100%,0_50%)]";
  }

  return "lg:[clip-path:polygon(28px_0,calc(100%_-_28px)_0,100%_50%,calc(100%_-_28px)_100%,28px_100%,0_50%)]";
}

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
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">Roadmap workflow</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-openhw-navy sm:text-3xl">
              From CVA6 discussion to published roadmap
            </h2>
          </div>

          <ol className="mt-8 grid gap-3 lg:grid-cols-4 lg:gap-0">
            {roadmapFlow.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === roadmapFlow.length - 1;
              const itemTone = [
                "bg-[#EEF8F1] text-openhw-navy",
                "bg-[#F3F7FA] text-openhw-navy",
                "bg-[#EEF4FF] text-openhw-navy",
                "bg-openhw-green text-white",
              ][index];
              const labelTone = isLast ? "bg-white/20 text-white" : "bg-white/80 text-slate-600";
              const iconTone = isLast ? "bg-white text-openhw-green" : "bg-openhw-green text-white";
              const bodyTone = isLast ? "text-white/85" : "text-muted";

              return (
                <li
                  key={step.title}
                  className={[
                    "relative min-h-44 rounded-lg p-5 transition lg:min-h-48 lg:rounded-none lg:py-6 lg:pl-9 lg:pr-12",
                    "drop-shadow-sm",
                    index > 0 ? "lg:-ml-7 lg:pl-14" : "",
                    itemTone,
                    flowArrowClassName(index),
                  ].join(" ")}
                  style={{ zIndex: roadmapFlow.length - index }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-normal ${labelTone}`}>
                      Step {index + 1}
                    </span>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconTone}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-6">{step.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${bodyTone}`}>{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}

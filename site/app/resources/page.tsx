import { Activity, ArrowUpRight, BookOpenText, MessageSquareText } from "lucide-react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components";

export const metadata: Metadata = {
  title: "Resources",
  description: "Key external CVA6 resources for CI status, discussion, and documentation.",
};

const resources = [
  {
    title: "CVA6 CI status",
    eyebrow: "CI visibility",
    description:
      "Open the public CVA6 CI status dashboard for a quick view of current upstream CI health and workflow results.",
    href: "https://openhwgroup.github.io/cva6/",
    cta: "Open CI status",
    icon: Activity,
  },
  {
    title: "CVA6 Mattermost channel",
    eyebrow: "Discussion channel",
    description:
      "Go to the OpenHW Mattermost channel used for CVA6 technical discussion, weekly coordination, and meeting context.",
    href: "https://mattermost.openhwgroup.org/all-users/channels/twg--cores--cva6",
    cta: "Open Mattermost",
    icon: MessageSquareText,
  },
  {
    title: "CVA6 user manual",
    eyebrow: "Documentation",
    description:
      "Read the CVA6 documentation for architecture, configuration, requirements, and user-facing project guidance.",
    href: "https://docs.openhwgroup.org/projects/cva6-user-manual/",
    cta: "Open documentation",
    icon: BookOpenText,
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            as="h1"
            eyebrow="Resources"
            title="Key CVA6 links"
            description="A compact reference page for the external CVA6 places people commonly need while reviewing roadmap work."
          />
        </div>
      </section>

      <section className="page-container py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <a
                key={resource.href}
                href={resource.href}
                className="group flex min-h-72 flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-openhw-green hover:shadow-md focus:outline-none focus:ring-2 focus:ring-openhw-green"
                rel="noreferrer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-openhw-green text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-openhw-green"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 text-sm font-bold uppercase tracking-normal text-openhw-green">{resource.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold text-openhw-navy">{resource.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{resource.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-openhw-green">
                  {resource.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

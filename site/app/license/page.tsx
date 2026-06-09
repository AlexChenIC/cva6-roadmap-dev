import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components";

export const metadata: Metadata = {
  title: "License",
  description: "License information for the CVA6 Roadmap portal.",
};

export default function LicensePage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface py-12">
        <div className="page-container">
          <SectionHeading
            eyebrow="License"
            title="Apache License 2.0"
            description="The CVA6 Roadmap portal source is prepared under the Apache License 2.0, matching the intended open-source publication model."
          />
        </div>
      </section>

      <section className="page-container py-10">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            See the repository `LICENSE` file for the complete Apache License 2.0 text.
          </p>
          <Link
            href="https://github.com/AlexChenIC/cva6-roadmap-dev/tree/main/roadmap-source"
            className="mt-6 inline-flex h-11 items-center rounded-lg bg-openhw-green px-4 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
          >
            View roadmap-source
          </Link>
        </div>
      </section>
    </div>
  );
}

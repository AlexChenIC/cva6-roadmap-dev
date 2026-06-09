import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background">
      <section className="page-container flex min-h-[60vh] items-center py-16">
        <div className="max-w-2xl rounded-xl border border-border bg-surface p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-openhw-green text-white">
            <Compass className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-normal text-openhw-green">404</p>
          <h1 className="mt-2 text-4xl font-bold text-openhw-navy">Roadmap page not found</h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            The page may have moved, or the roadmap item id may not exist in the current public dataset.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/roadmap"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-openhw-green px-4 text-sm font-bold text-white transition hover:bg-openhw-green-dark"
            >
              Back to roadmap
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/features"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-4 text-sm font-bold text-openhw-navy transition hover:border-openhw-green hover:text-openhw-green"
            >
              Browse features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

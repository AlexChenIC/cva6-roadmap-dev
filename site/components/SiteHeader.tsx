"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/projects", label: "Projects" },
  { href: "/features", label: "Features" },
  { href: "/releases", label: "Releases" },
  { href: "/organizations", label: "Organizations" },
  { href: "/contribute", label: "Contribute" },
];

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A10.95 10.95 0 0 1 12 5.49c.98.01 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.64 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="page-container flex min-h-16 items-center justify-between gap-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <a
            href="https://www.openhw.org"
            className="flex shrink-0 items-center"
            aria-label="OpenHW Group"
            rel="noreferrer"
          >
            <Image
              src="/openhw/openhw-horizontal.svg"
              alt="OpenHW Group"
              width={148}
              height={42}
              priority
              className="h-9 w-auto"
            />
          </a>
          <Link
            href="/"
            className="min-w-0 border-l border-border pl-4 text-base font-bold leading-tight text-openhw-navy sm:text-lg"
          >
            CVA6 Roadmap
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-openhw-green text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-openhw-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/openhwgroup/cva6"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-openhw-navy"
            aria-label="Open CVA6 on GitHub"
            rel="noreferrer"
          >
            <GitHubMark className="h-5 w-5" />
          </a>
        </nav>

        <button
          type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-openhw-navy shadow-sm transition hover:border-openhw-green lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-surface lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="page-container grid gap-1 py-3">
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-openhw-green text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-openhw-navy"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="https://github.com/openhwgroup/cva6"
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-openhw-navy"
              rel="noreferrer"
            >
              <GitHubMark className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

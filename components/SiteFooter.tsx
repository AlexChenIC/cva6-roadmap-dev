import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "https://www.openhw.org", label: "OpenHW Group" },
  { href: "https://github.com/openhwgroup/cva6", label: "CVA6 GitHub" },
  { href: "/contribute", label: "Contribute" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-openhw-navy text-white">
      <div className="page-container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-2xl">
          <a
            href="https://www.openhw.org"
            className="inline-flex items-center"
            aria-label="OpenHW Group"
            rel="noreferrer"
          >
            <Image
              src="/openhw/openhw-horizontal-white.svg"
              alt="OpenHW Group"
              width={170}
              height={48}
              className="h-11 w-auto"
            />
          </a>
          <p className="mt-5 text-sm leading-6 text-slate-200">
            CVA6 Roadmap is a project of the OpenHW Group.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm md:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            {footerLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.href} href={link.href} className="text-slate-200 hover:text-white">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="text-slate-200 hover:text-white" rel="noreferrer">
                  {link.label}
                </a>
              ),
            )}
          </nav>
          <p className="text-slate-300">&copy; {year} OpenHW Group</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Organization } from "@/lib/types";

export interface OrgChipProps {
  org: Organization | { id: string; shortName?: string; name?: string; color?: string; logo?: string };
  href?: string;
  className?: string;
}

export function OrgChip({ org, href, className = "" }: OrgChipProps) {
  const label = org.shortName ?? org.name ?? org.id;
  const color = org.color ?? "#64748B";
  const chip = (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-xs font-bold text-slate-700 ${className}`}
      style={{ borderColor: color }}
    >
      {org.logo ? (
        <Image
          src={org.logo}
          alt=""
          width={18}
          height={18}
          className="h-4 w-4 rounded-full"
          aria-hidden="true"
          loading="eager"
          unoptimized
        />
      ) : (
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      )}
      {label}
    </span>
  );

  if (!href) {
    return chip;
  }

  return (
    <Link href={href} className="inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-openhw-green">
      {chip}
    </Link>
  );
}

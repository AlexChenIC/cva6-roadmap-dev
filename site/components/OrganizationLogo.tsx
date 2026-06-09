import Image from "next/image";
import type { Organization } from "@/lib/types";

type LogoShape = "wide" | "square" | "seal";
type LogoSize = "chip" | "md" | "lg";

type LogoOrganization = Pick<Organization, "id" | "name" | "shortName" | "color" | "logo">;

const logoRegistry: Record<
  string,
  {
    shape: LogoShape;
    backgroundClassName?: string;
    paddingClassName?: string;
  }
> = {
  openhw: {
    shape: "wide",
    backgroundClassName: "bg-white",
    paddingClassName: "p-1",
  },
  thales: {
    shape: "wide",
    backgroundClassName: "bg-white",
    paddingClassName: "p-1.5",
  },
  unibo: {
    shape: "seal",
    backgroundClassName: "bg-white",
    paddingClassName: "p-1",
  },
  lowrisc: {
    shape: "wide",
    backgroundClassName: "bg-white",
    paddingClassName: "p-1",
  },
  capabilities: {
    shape: "seal",
    backgroundClassName: "bg-white",
    paddingClassName: "p-1",
  },
};

const sizeByShape: Record<LogoSize, Record<LogoShape, string>> = {
  chip: {
    wide: "h-5 w-12 rounded-md",
    square: "h-5 w-5 rounded-md",
    seal: "h-5 w-5 rounded-md",
  },
  md: {
    wide: "h-12 w-28 rounded-xl",
    square: "h-12 w-12 rounded-xl",
    seal: "h-12 w-12 rounded-xl",
  },
  lg: {
    wide: "h-16 w-36 rounded-xl",
    square: "h-16 w-16 rounded-xl",
    seal: "h-16 w-16 rounded-xl",
  },
};

export interface OrganizationLogoProps {
  org: LogoOrganization | { id: string; shortName?: string; name?: string; color?: string; logo?: string };
  size?: LogoSize;
  decorative?: boolean;
  className?: string;
  priority?: boolean;
}

function fallbackLabel(org: OrganizationLogoProps["org"]) {
  const label = org.shortName ?? org.name ?? org.id;
  return label.slice(0, 2).toUpperCase();
}

export function OrganizationLogo({
  org,
  size = "md",
  decorative = false,
  className = "",
  priority = false,
}: OrganizationLogoProps) {
  const label = org.shortName ?? org.name ?? org.id;
  const color = org.color ?? "#64748B";
  const registryEntry = logoRegistry[org.id] ?? { shape: "square" as const };
  const shape = registryEntry.shape;
  const boxClassName = [
    "inline-flex shrink-0 items-center justify-center overflow-hidden border border-border",
    sizeByShape[size][shape],
    registryEntry.backgroundClassName ?? "bg-white",
    registryEntry.paddingClassName ?? "p-1",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!org.logo) {
    return (
      <span
        className={`${boxClassName} text-xs font-bold text-white`}
        style={{ backgroundColor: color }}
        aria-hidden={decorative ? "true" : undefined}
        aria-label={decorative ? undefined : `${label} logo`}
      >
        {fallbackLabel(org)}
      </span>
    );
  }

  return (
    <span className={boxClassName}>
      <Image
        src={org.logo}
        alt={decorative ? "" : `${label} logo`}
        width={180}
        height={96}
        className="h-full w-full object-contain"
        aria-hidden={decorative ? "true" : undefined}
        {...(priority ? { priority: true } : { loading: "lazy" as const })}
        unoptimized
      />
    </span>
  );
}

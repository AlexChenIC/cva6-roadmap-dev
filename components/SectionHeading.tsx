import type { ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, action, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-normal text-openhw-green">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold leading-tight text-openhw-navy sm:text-3xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

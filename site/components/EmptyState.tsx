import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`rounded-xl border border-dashed border-border bg-surface p-8 text-center ${className}`}>
      <h3 className="text-lg font-bold text-openhw-navy">{title}</h3>
      {description ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

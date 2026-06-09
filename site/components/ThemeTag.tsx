import { Tag } from "lucide-react";
import type { Theme } from "@/lib/types";

export interface ThemeTagProps {
  theme: Theme;
  className?: string;
}

export function ThemeTag({ theme, className = "" }: ThemeTagProps) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 ${className}`}
    >
      <Tag className="h-3.5 w-3.5" aria-hidden="true" />
      {theme}
    </span>
  );
}

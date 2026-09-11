import { METHODOLOGY } from "@/lib/green-score.config";

export function DraftBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-status-yellow" />
      {METHODOLOGY.label}
    </span>
  );
}

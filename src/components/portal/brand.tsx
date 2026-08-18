import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function AcrobatMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <circle cx="16" cy="6.5" r="2.6" fill="currentColor" stroke="none" />
        <path d="M16 10v7" />
        <path d="M6 12c4.5 4 15.5 4 20 0" />
        <path d="M16 17l-5 8" />
        <path d="M16 17l5 8" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-warning" />
    </span>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-xl" aria-label="CircEsteem home">
      <AcrobatMark className={compact ? "size-9" : "size-10"} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-primary">CircEsteem</span>
        {!compact && (
          <span className="text-[11px] font-medium text-muted-foreground">Youth circus arts</span>
        )}
      </span>
    </Link>
  );
}

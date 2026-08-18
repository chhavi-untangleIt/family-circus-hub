import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { MobileBottomNav } from "./MobileBottomNav";
import { ComplianceAlert } from "./AlertBanner";
import { cn } from "@/lib/utils";

export function PortalLayout({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ComplianceAlert />
      <main className={cn("mx-auto px-4 pb-28 pt-6 lg:px-6 lg:pb-16 lg:pt-10", wide ? "max-w-7xl" : "max-w-6xl")}>
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-7 grid grid-cols-[minmax(0,1fr)] items-end gap-4 sm:flex sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-action">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-base text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-surface confetti-dots flex flex-col items-center gap-3 px-6 py-14 text-center">
      {icon && <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary">{icon}</div>}
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="grid gap-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card-surface animate-pulse p-6">
          <div className="h-4 w-1/3 rounded-full bg-muted" />
          <div className="mt-3 h-3 w-2/3 rounded-full bg-muted" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function ProgressStepper({
  steps,
  current,
  onStepClick,
}: {
  steps: string[];
  current: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <ol className="mb-8 flex items-center gap-2 overflow-x-auto pb-1" aria-label="Progress">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const Tag = onStepClick && done ? "button" : "div";
        return (
          <li key={step} className="flex min-w-0 flex-1 items-center gap-2">
            <Tag
              {...(onStepClick && done ? { type: "button" as const, onClick: () => onStepClick(i) } : {})}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
                active && "border-action bg-accent-soft text-action",
                done && "border-success/30 bg-success-soft text-success",
                !active && !done && "border-border bg-card text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full text-xs",
                  active ? "bg-action text-action-foreground" : done ? "bg-success text-success-foreground" : "bg-muted",
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="truncate">{step}</span>
            </Tag>
            {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

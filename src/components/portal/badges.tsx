import { Check, CircleAlert, Clock, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Program, ReleaseFormStatus } from "@/lib/portal-types";

export function StatusPill({
  tone = "neutral",
  icon,
  children,
  className,
}: {
  tone?: "neutral" | "success" | "warning" | "danger" | "info" | "accent";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground border-border",
    success: "bg-success-soft text-success border-success/25",
    warning: "bg-warning-soft text-warning-foreground border-warning/40",
    danger: "bg-destructive-soft text-destructive border-destructive/30",
    info: "bg-secondary text-primary border-primary/15",
    accent: "bg-accent-soft text-accent border-accent/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function ReleaseStatusBadge({ status }: { status: ReleaseFormStatus }) {
  return status === "signed" ? (
    <StatusPill tone="success" icon={<Check className="size-3.5" aria-hidden="true" />}>
      Release signed
    </StatusPill>
  ) : (
    <StatusPill tone="danger" icon={<CircleAlert className="size-3.5" aria-hidden="true" />}>
      Action needed
    </StatusPill>
  );
}

export function ProgramStatusBadge({ program }: { program: Program }) {
  if (program.availableSpots <= 0) {
    return (
      <StatusPill tone="warning" icon={<Clock className="size-3.5" aria-hidden="true" />}>
        Waitlist
      </StatusPill>
    );
  }
  if (program.availableSpots <= 4) {
    return (
      <StatusPill tone="accent" icon={<Users className="size-3.5" aria-hidden="true" />}>
        Almost full
      </StatusPill>
    );
  }
  return (
    <StatusPill tone="success" icon={<Sparkles className="size-3.5" aria-hidden="true" />}>
      Open
    </StatusPill>
  );
}

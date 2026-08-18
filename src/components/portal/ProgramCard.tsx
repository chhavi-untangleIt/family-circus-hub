import { CalendarDays, CircleDollarSign, Clock, MapPin, Users } from "lucide-react";
import { ProgramStatusBadge, StatusPill } from "./badges";
import { Button } from "@/components/ui/button";
import { formatCurrency, gradeLabel } from "@/lib/portal-data";
import type { Child, Program } from "@/lib/portal-types";
import type { EligibilityResult } from "@/lib/portal-store";

export function ProgramCard({
  program,
  child,
  eligibility,
  onEnroll,
}: {
  program: Program;
  child?: Child | undefined;
  eligibility?: EligibilityResult | undefined;
  onEnroll: () => void;
}) {
  const blocked = eligibility && !eligibility.ok;
  const full = program.availableSpots <= 0;

  return (
    <article className="card-surface card-hover flex flex-col overflow-hidden">
      <div className="confetti-dots bg-gradient-hero px-5 py-5 text-primary-foreground">
        <div className="flex flex-wrap items-center gap-2">
          <ProgramStatusBadge program={program} />
          {program.isFreeProgram && <StatusPill tone="success">Free</StatusPill>}
          {program.financialAidEligible && <StatusPill tone="info">Financial aid eligible</StatusPill>}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold">{program.name}</h3>
        <p className="mt-1.5 text-sm text-primary-foreground/85">{program.description}</p>
      </div>

      <dl className="grid gap-2.5 px-5 py-4 text-sm sm:grid-cols-2">
        <Detail icon={<Clock className="size-4" />} label="Schedule" value={program.schedule} />
        <Detail icon={<MapPin className="size-4" />} label="Location" value={program.location} />
        <Detail
          icon={<CalendarDays className="size-4" />}
          label="Dates"
          value={`${program.startDate} → ${program.endDate}`}
        />
        <Detail
          icon={<Users className="size-4" />}
          label="Eligibility"
          value={`Ages ${program.minAge}–${program.maxAge} · ${gradeLabel(program.minGrade)}–${gradeLabel(program.maxGrade)}`}
        />
        <Detail
          icon={<CircleDollarSign className="size-4" />}
          label="Tuition"
          value={program.isFreeProgram ? "Free · no processing fee" : formatCurrency(program.price)}
        />
        <Detail
          icon={<Users className="size-4" />}
          label="Availability"
          value={full ? "Waitlist only" : `${program.availableSpots} spots remaining`}
        />
      </dl>

      <div className="mt-auto flex flex-col gap-2 border-t border-border bg-secondary/60 px-5 py-4">
        {blocked && (
          <p className="text-sm font-medium text-destructive" role="note">
            {eligibility.message}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold text-primary">
            {program.isFreeProgram ? "$0" : formatCurrency(program.price)}
          </p>
          <Button
            variant={full ? "outline" : "action"}
            onClick={onEnroll}
            className="min-h-11"
            aria-label={child ? `Enroll ${child.firstName} in ${program.name}` : `Enroll in ${program.name}`}
          >
            {full ? "Join Waitlist" : child ? `Enroll ${child.firstName}` : "Select a child to enroll"}
          </Button>
        </div>
      </div>
    </article>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="mt-0.5 text-action" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium text-primary">{value}</dd>
      </div>
    </div>
  );
}

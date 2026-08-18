import { Link } from "@tanstack/react-router";
import { CakeSlice, GraduationCap, Pencil } from "lucide-react";
import { ReleaseStatusBadge } from "./badges";
import { Button } from "@/components/ui/button";
import { ageFromBirthdate, gradeLabel } from "@/lib/portal-data";
import type { Child } from "@/lib/portal-types";

export function ChildCard({ child, onEdit }: { child: Child; onEdit: (child: Child) => void }) {
  const age = ageFromBirthdate(child.birthdate);
  const initials = `${child.firstName[0] ?? ""}${child.lastName[0] ?? ""}`;

  return (
    <article className="card-surface card-hover flex flex-col gap-4 p-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-hero font-display text-base font-bold text-primary-foreground">
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-primary">
            {child.firstName} {child.lastName}
          </h3>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CakeSlice className="size-3.5" aria-hidden="true" /> Age {age}
            </span>
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="size-3.5" aria-hidden="true" /> {gradeLabel(child.grade)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary px-3 py-2.5">
        <span className="text-sm font-medium text-primary">General Release</span>
        <ReleaseStatusBadge status={child.releaseFormStatus} />
      </div>

      <div className="flex flex-wrap gap-2">
        {child.releaseFormStatus === "signed" ? (
          <>
            <Button asChild variant="outline" size="sm" className="min-h-11 flex-1">
              <Link to="/children/$id" params={{ id: child.id }}>
                View Profile
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="min-h-11" onClick={() => onEdit(child)}>
              <Pencil aria-hidden="true" /> Edit
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="action" size="sm" className="min-h-11 flex-1">
              <Link to="/release-form" search={{ child: child.id }}>
                Complete Release Form
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="min-h-11" onClick={() => onEdit(child)}>
              <Pencil aria-hidden="true" /> Edit
            </Button>
          </>
        )}
      </div>
    </article>
  );
}

import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { usePortal } from "@/lib/portal-store";
import { Button } from "@/components/ui/button";

export function ComplianceAlert() {
  const { childrenNeedingRelease } = usePortal();
  const count = childrenNeedingRelease.length;
  if (count === 0) return null;

  return (
    <div role="status" className="sticky top-[68px] z-30 border-b border-warning/40 bg-warning-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-start gap-3 px-4 py-3 sm:flex sm:items-center sm:justify-between lg:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-warning-foreground" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-warning-foreground">
              Action required · {count} {count === 1 ? "child requires" : "children require"} action
            </p>
            <p className="text-sm text-warning-foreground/85">
              One or more children need a General Release Form completed before enrollment.
            </p>
          </div>
        </div>
        <Button asChild variant="action" size="sm" className="col-span-2 h-11 w-full sm:w-auto">
          <Link to="/release-form">Complete Form</Link>
        </Button>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CalendarDays, Mail } from "lucide-react";
import { EmptyState, PageHeader, PortalLayout } from "@/components/portal/PortalLayout";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import { formatCurrency } from "@/lib/portal-data";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Enrollment Confirmed — CircEsteem" },
      {
        name: "description",
        content: "Your CircEsteem enrollment is confirmed. Review your programs, schedule, and what to bring.",
      },
      { property: "og:title", content: "Enrollment Confirmed — CircEsteem" },
      { property: "og:description", content: "See you under the big top!" },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { lastOrder, parent } = usePortal();

  if (!lastOrder) {
    return (
      <PortalLayout>
        <EmptyState
          title="No recent enrollment"
          description="Once you complete checkout, your confirmation details will appear here."
          action={
            <Button asChild variant="action" className="mt-2">
              <Link to="/programs">Browse Programs</Link>
            </Button>
          }
        />
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="size-16 animate-in zoom-in text-success" aria-hidden="true" />
        <PageHeader
          eyebrow="Confirmation"
          title="You're all set!"
          subtitle={`Thanks, ${parent.firstName}. A receipt and program details are on their way to ${parent.email}.`}
        />
      </div>

      <section className="card-surface p-6">
        <h2 className="font-display text-xl font-bold text-primary">Enrollment summary</h2>
        <ul className="mt-4 grid gap-3">
          {lastOrder.lines.map((line) => (
            <li
              key={line.item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-secondary px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-primary">{line.program.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {line.child.firstName} · {line.program.schedule} · {line.program.location}
                </p>
              </div>
              <p className="font-display text-lg font-bold text-primary">{formatCurrency(line.total)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <span className="font-display text-lg font-bold text-primary">Total paid</span>
          <span className="font-display text-3xl font-bold text-action">{formatCurrency(lastOrder.total)}</span>
        </div>
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card-surface p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <CalendarDays className="size-5 text-action" aria-hidden="true" /> What's next
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <li>Arrive 10 minutes early on the first day for check-in.</li>
            <li>Wear fitted athletic clothing and bring a water bottle.</li>
            <li>Hair tied back; no jewelry for aerial and acrobatics.</li>
          </ul>
        </div>
        <div className="card-surface p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <Mail className="size-5 text-action" aria-hidden="true" /> Questions?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Email programs@circesteem.org and our team will get back to you within one business day.
          </p>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="action">
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/programs">Enroll another child</Link>
        </Button>
      </div>
    </PortalLayout>
  );
}

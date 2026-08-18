import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarHeart, ClipboardCheck, HandCoins, Users } from "lucide-react";
import { PageHeader, PortalLayout } from "@/components/portal/PortalLayout";
import { StatusPill } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import { formatCurrency } from "@/lib/portal-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — CircEsteem" },
      {
        name: "description",
        content: "Your CircEsteem family hub: manage children, forms, financial aid, and upcoming enrollments.",
      },
      { property: "og:title", content: "Parent Dashboard — CircEsteem" },
      { property: "og:description", content: "Manage your family, forms, and circus program enrollments." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { parent, children, enrollments, programs, aid } = usePortal();
  const signed = children.filter((c) => c.releaseFormStatus === "signed").length;

  const cards = [
    {
      Icon: CalendarHeart,
      title: "Explore Programs",
      body: "Browse current circus programs and enroll your children.",
      cta: "View Programs",
      to: "/programs" as const,
    },
    {
      Icon: Users,
      title: "Manage Children",
      body: "Add or update your children's information.",
      cta: "Manage Children",
      to: "/children" as const,
    },
    {
      Icon: HandCoins,
      title: "Financial Aid",
      body:
        aid.status === "approved"
          ? `Approved: ${formatCurrency(aid.approvedAmountPerProgram)} off eligible programs.`
          : "Apply for financial assistance or view application status.",
      cta: "View Financial Aid",
      to: "/financial-aid" as const,
    },
    {
      Icon: ClipboardCheck,
      title: "General Release Forms",
      body: `${signed} of ${children.length} children completed`,
      cta: "Review Forms",
      to: "/release-form" as const,
    },
  ];

  return (
    <PortalLayout wide>
      <PageHeader
        eyebrow="Family hub"
        title={`Welcome back, ${parent.firstName}!`}
        subtitle="Manage your family, explore programs, and keep your children's enrollment information up to date."
        actions={
          <Button asChild variant="action">
            <Link to="/programs">Enroll a child</Link>
          </Button>
        }
      />

      <section aria-label="Quick actions" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ Icon, title, body, cta, to }) => (
          <article key={title} className="card-surface card-hover flex flex-col gap-3 p-5">
            <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-action">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-bold text-primary">{title}</h2>
            <p className="text-sm text-muted-foreground">{body}</p>
            <Button asChild variant="outline" className="mt-auto min-h-11 w-full">
              <Link to={to}>{cta}</Link>
            </Button>
          </article>
        ))}
      </section>

      <section className="mt-10" aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="mb-4 font-display text-2xl font-bold text-primary">
          Upcoming enrollment & activity
        </h2>
        {enrollments.length === 0 ? (
          <div className="card-surface p-8 text-center text-muted-foreground">
            No enrollments yet — explore programs to get started.
          </div>
        ) : (
          <ul className="grid gap-3">
            {enrollments.map((e) => {
              const child = children.find((c) => c.id === e.childId);
              const program = programs.find((p) => p.id === e.programId);
              if (!child || !program) return null;
              return (
                <li key={e.id} className="card-surface card-hover grid gap-3 p-5 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-primary">
                      {child.firstName} {child.lastName}
                    </h3>
                    <p className="truncate text-sm font-medium text-primary/80">{program.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {program.schedule} · {program.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <StatusPill tone={e.status === "enrolled" ? "success" : "warning"}>
                      {e.status === "enrolled" ? "Enrolled" : "Pending"}
                    </StatusPill>
                    <StatusPill tone={e.paymentStatus === "paid" ? "info" : "accent"}>
                      {e.paymentStatus === "paid" ? `Paid ${formatCurrency(e.total)}` : "Payment due"}
                    </StatusPill>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </PortalLayout>
  );
}

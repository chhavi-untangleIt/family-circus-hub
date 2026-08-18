import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Pencil } from "lucide-react";
import { PageHeader, PortalLayout, EmptyState } from "@/components/portal/PortalLayout";
import { ReleaseStatusBadge, StatusPill } from "@/components/portal/badges";
import { ChildFormDialog } from "@/components/portal/ChildFormDialog";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import { ageFromBirthdate, gradeLabel } from "@/lib/portal-data";

export const Route = createFileRoute("/children/$id")({
  head: () => ({
    meta: [
      { title: "Child Profile — CircEsteem" },
      { name: "description", content: "Review a child's circus profile, safety notes, and release form status." },
      { property: "og:title", content: "Child Profile — CircEsteem" },
      { property: "og:description", content: "Safety notes, pickup contacts, and enrollment history." },
    ],
  }),
  component: ChildDetail,
});

function ChildDetail() {
  const { id } = useParams({ from: "/children/$id" });
  const { children, enrollments, programs } = usePortal();
  const child = children.find((c) => c.id === id);
  const [open, setOpen] = useState(false);

  if (!child) {
    return (
      <PortalLayout>
        <EmptyState
          title="We couldn't find that child"
          description="This profile may have been removed. Head back to your children list to continue."
          action={
            <Button asChild variant="action" className="mt-2">
              <Link to="/children">Back to children</Link>
            </Button>
          }
        />
      </PortalLayout>
    );
  }

  const childEnrollments = enrollments.filter((e) => e.childId === child.id);

  return (
    <PortalLayout>
      <Link
        to="/children"
        className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All children
      </Link>

      <PageHeader
        eyebrow="Child profile"
        title={`${child.firstName} ${child.lastName}`}
        subtitle={`Age ${ageFromBirthdate(child.birthdate)} · ${gradeLabel(child.grade)} · Born ${child.birthdate}`}
        actions={
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pencil aria-hidden="true" /> Edit profile
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card-surface p-5 lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-primary">Safety information</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Allergies</dt>
              <dd className="mt-1 text-sm text-primary">{child.allergies || "None on file"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Special instructions
              </dt>
              <dd className="mt-1 text-sm text-primary">{child.specialInstructions || "None on file"}</dd>
            </div>
          </dl>

          <h3 className="mt-6 text-base font-bold text-primary">Authorized pickup contacts</h3>
          {child.authorizedPickupContacts.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No pickup contacts added yet.</p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {child.authorizedPickupContacts.map((c) => (
                <li
                  key={c.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-secondary px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-primary">{c.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {c.relationship} · {c.phone}
                    </p>
                  </div>
                  <StatusPill tone={c.authorized ? "success" : "neutral"}>
                    {c.authorized ? "Authorized" : "Not authorized"}
                  </StatusPill>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="grid gap-4">
          <div className="card-surface p-5">
            <h2 className="font-display text-lg font-bold text-primary">General Release</h2>
            <div className="mt-3">
              <ReleaseStatusBadge status={child.releaseFormStatus} />
            </div>
            {child.releaseFormStatus === "signed" ? (
              <p className="mt-3 text-sm text-muted-foreground">Signed on {child.releaseSignedOn}.</p>
            ) : (
              <Button asChild variant="action" className="mt-4 w-full">
                <Link to="/release-form" search={{ child: child.id }}>
                  Complete Release Form
                </Link>
              </Button>
            )}
          </div>

          <div className="card-surface p-5">
            <h2 className="font-display text-lg font-bold text-primary">Enrollments</h2>
            {childEnrollments.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Not enrolled in any programs yet.</p>
            ) : (
              <ul className="mt-3 grid gap-2 text-sm">
                {childEnrollments.map((e) => {
                  const program = programs.find((p) => p.id === e.programId);
                  return (
                    <li key={e.id} className="rounded-xl bg-secondary px-3 py-2.5">
                      <p className="font-semibold text-primary">{program?.name}</p>
                      <p className="text-muted-foreground">{program?.schedule}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <ChildFormDialog open={open} onOpenChange={setOpen} child={child} />
    </PortalLayout>
  );
}

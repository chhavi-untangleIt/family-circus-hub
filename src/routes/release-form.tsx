import { useEffect, useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, PenLine } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PortalLayout, EmptyState } from "@/components/portal/PortalLayout";
import { ReleaseStatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/release-form")({
  validateSearch: (search: Record<string, unknown>): { child?: string } =>
    typeof search["child"] === "string" ? { child: search["child"] as string } : {},
  head: () => ({
    meta: [
      { title: "General Release Form — CircEsteem" },
      {
        name: "description",
        content: "Sign the CircEsteem general release form so your child is cleared to participate in programs.",
      },
      { property: "og:title", content: "General Release Form — CircEsteem" },
      { property: "og:description", content: "Required consent and acknowledgements before enrollment." },
    ],
  }),
  component: ReleaseFormPage,
});

const acknowledgements = [
  "I understand circus arts involve physical activity and inherent risk of injury, and I consent to my child's participation.",
  "I authorize CircEsteem staff to seek emergency medical care for my child if I cannot be reached.",
  "I grant permission for photos and video of my child to be used in CircEsteem's nonprofit communications.",
];

function ReleaseFormPage() {
  const { children, parent, signRelease } = usePortal();
  const search = useSearch({ from: "/release-form" });
  const [selectedId, setSelectedId] = useState(search.child ?? children[0]?.id ?? "");
  const [checks, setChecks] = useState<boolean[]>(acknowledgements.map(() => false));
  const [signature, setSignature] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [justSigned, setJustSigned] = useState<string | null>(null);

  useEffect(() => {
    if (search.child) setSelectedId(search.child);
  }, [search.child]);

  const child = children.find((c) => c.id === selectedId);
  const today = new Date().toISOString().slice(0, 10);

  const reset = () => {
    setChecks(acknowledgements.map(() => false));
    setSignature("");
    setErrors([]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!child) return;
    const next: string[] = [];
    if (checks.some((c) => !c)) next.push("All acknowledgements must be checked.");
    if (signature.trim().length < 3) next.push("A digital signature is required.");
    setErrors(next);
    if (next.length) {
      toast.warning("Please complete all required acknowledgements.");
      return;
    }
    signRelease(child.id);
    setJustSigned(child.id);
    reset();
    toast.success("General Release Form submitted.");
  };

  if (children.length === 0) {
    return (
      <PortalLayout>
        <EmptyState
          title="Add a child first"
          description="Release forms are signed per child. Add your first child to continue."
          action={
            <Button asChild variant="action" className="mt-2">
              <Link to="/children">Add Your First Child</Link>
            </Button>
          }
        />
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <PageHeader
        eyebrow="Required paperwork"
        title="General Release Form"
        subtitle="A completed release form is required before your child can participate in CircEsteem programs."
      />

      <div
        role="tablist"
        aria-label="Select a child"
        className="mb-6 flex flex-wrap gap-2"
      >
        {children.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={c.id === selectedId}
            onClick={() => {
              setSelectedId(c.id);
              setJustSigned(null);
              reset();
            }}
            className={cn(
              "flex min-h-11 items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors",
              c.id === selectedId
                ? "border-action bg-accent-soft text-action"
                : "border-border bg-card text-primary hover:bg-secondary",
            )}
          >
            {c.firstName}
            <span className="text-xs font-medium text-muted-foreground">
              · {c.releaseFormStatus === "signed" ? "Signed" : "Action needed"}
            </span>
          </button>
        ))}
      </div>

      {child && child.releaseFormStatus === "signed" ? (
        <div className="card-surface flex flex-col items-center gap-3 border-success/30 bg-success-soft px-6 py-12 text-center">
          <CheckCircle2 className="size-12 animate-in zoom-in text-success" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-primary">
            {justSigned === child.id ? "Release Form Completed" : "Release on file"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {child.firstName} is now cleared for enrollment. Signed {child.releaseSignedOn}.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Button asChild variant="action">
              <Link to="/programs">Browse programs</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard">Back to dashboard</Link>
            </Button>
          </div>
        </div>
      ) : (
        child && (
          <form onSubmit={submit} className="grid gap-4 lg:grid-cols-3" noValidate>
            <div className="card-surface grid gap-5 p-6 lg:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-primary">
                  Release for {child.firstName} {child.lastName}
                </h2>
                <ReleaseStatusBadge status={child.releaseFormStatus} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="guardian">Parent/Guardian Name</Label>
                  <Input id="guardian" defaultValue={`${parent.firstName} ${parent.lastName}`} readOnly />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="childname">Child Name</Label>
                  <Input id="childname" value={`${child.firstName} ${child.lastName}`} readOnly />
                </div>
              </div>

              <fieldset className="grid gap-3">
                <legend className="mb-1 text-sm font-bold text-primary">Required acknowledgements</legend>
                {acknowledgements.map((text, i) => (
                  <label key={text} className="flex items-start gap-3 rounded-xl bg-secondary p-3 text-sm text-primary">
                    <Checkbox
                      checked={checks[i] === true}
                      onCheckedChange={(v) =>
                        setChecks((prev) => prev.map((c, idx) => (idx === i ? v === true : c)))
                      }
                      aria-label={text}
                      className="mt-0.5"
                    />
                    <span>{text}</span>
                  </label>
                ))}
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="signature">
                    Digital signature <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signature"
                    placeholder="Type your full legal name"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    aria-invalid={errors.length > 0 && signature.trim().length < 3}
                    aria-describedby="signature-help"
                    className="font-display text-lg"
                  />
                  <p id="signature-help" className="text-xs text-muted-foreground">
                    Typing your name acts as your legal signature.
                  </p>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signdate">Date</Label>
                  <Input id="signdate" value={today} readOnly />
                </div>
              </div>

              {errors.length > 0 && (
                <ul role="alert" className="grid gap-1 rounded-xl bg-destructive-soft p-3 text-sm text-destructive">
                  {errors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="card-surface h-fit p-6">
              <h2 className="font-display text-lg font-bold text-primary">Why this matters</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Illinois youth programs require a signed release before a child steps onto the mat. It takes about a
                minute and covers every CircEsteem program this season.
              </p>
              <Button type="submit" variant="action" className="mt-5 w-full">
                <PenLine aria-hidden="true" /> Sign & Submit Release
              </Button>
            </aside>
          </form>
        )
      )}
    </PortalLayout>
  );
}

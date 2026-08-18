import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HandCoins, HeartHandshake } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PortalLayout } from "@/components/portal/PortalLayout";
import { StatusPill } from "@/components/portal/badges";
import { FileUploader } from "@/components/portal/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortal } from "@/lib/portal-store";
import { formatCurrency, incomeBrackets } from "@/lib/portal-data";

export const Route = createFileRoute("/financial-aid")({
  head: () => ({
    meta: [
      { title: "Financial Aid — CircEsteem" },
      {
        name: "description",
        content:
          "Apply for CircEsteem financial assistance so cost never keeps a child out of circus arts programming.",
      },
      { property: "og:title", content: "Financial Aid — CircEsteem" },
      { property: "og:description", content: "Sliding-scale tuition assistance for CircEsteem families." },
    ],
  }),
  component: FinancialAidPage,
});

function FinancialAidPage() {
  const { aid, submitAid, children } = usePortal();
  const [form, setForm] = useState({
    householdIncome: aid.householdIncome,
    householdSize: String(aid.householdSize),
    childrenParticipating: String(aid.childrenParticipating || children.length),
    requestedAmount: String(aid.requestedAmount),
    explanation: aid.explanation,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const statusTone =
    aid.status === "approved" ? "success" : aid.status === "submitted" ? "warning" : aid.status === "denied" ? "danger" : "neutral";
  const statusLabel =
    aid.status === "approved"
      ? "Approved"
      : aid.status === "submitted"
        ? "Under review"
        : aid.status === "denied"
          ? "Not approved"
          : "Not started";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: string[] = [];
    if (!form.householdIncome) next.push("Select a household income range.");
    if (Number(form.householdSize) < 1) next.push("Household size must be at least 1.");
    if (Number(form.childrenParticipating) < 1) next.push("At least one child must be participating.");
    const requested = Number(form.requestedAmount);
    if (!Number.isFinite(requested) || requested <= 0 || requested > 500) {
      next.push("Requested amount per program must be between $1 and $500.");
    }
    if (form.explanation.trim().length < 20) next.push("Please share at least a sentence about your situation.");
    if (form.explanation.length > 1000) next.push("Explanation must be under 1000 characters.");
    setErrors(next);
    if (next.length) {
      toast.warning("Please review the highlighted fields.");
      return;
    }
    submitAid({
      householdIncome: form.householdIncome,
      householdSize: Number(form.householdSize),
      childrenParticipating: Number(form.childrenParticipating),
      requestedAmount: requested,
      explanation: form.explanation.trim(),
      status: "submitted",
      submittedOn: new Date().toISOString().slice(0, 10),
    });
    toast.success("Financial aid application submitted. We'll respond within 5 business days.");
  };

  return (
    <PortalLayout>
      <PageHeader
        eyebrow="Tuition assistance"
        title="Financial Aid"
        subtitle="CircEsteem never turns a child away for cost. Share a little about your household and we'll do the rest."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={submit} className="card-surface grid gap-5 p-6" noValidate>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-primary">Application</h2>
            <StatusPill tone={statusTone}>{statusLabel}</StatusPill>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="fa-income">Household income range</Label>
              <Select
                value={form.householdIncome}
                onValueChange={(v) => setForm({ ...form, householdIncome: v })}
              >
                <SelectTrigger id="fa-income">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeBrackets.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="fa-size">Household size</Label>
              <Input
                id="fa-size"
                type="number"
                min={1}
                max={20}
                value={form.householdSize}
                onChange={(e) => setForm({ ...form, householdSize: e.target.value })}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="fa-children">Children participating</Label>
              <Input
                id="fa-children"
                type="number"
                min={1}
                max={10}
                value={form.childrenParticipating}
                onChange={(e) => setForm({ ...form, childrenParticipating: e.target.value })}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="fa-amount">Requested aid per program (USD)</Label>
              <Input
                id="fa-amount"
                type="number"
                min={1}
                max={500}
                value={form.requestedAmount}
                onChange={(e) => setForm({ ...form, requestedAmount: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="fa-explanation">Tell us about your situation</Label>
            <Textarea
              id="fa-explanation"
              rows={5}
              maxLength={1000}
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              placeholder="Anything that helps us understand your family's needs."
            />
            <p className="text-xs text-muted-foreground">{form.explanation.length}/1000 characters</p>
          </div>

          <div className="grid gap-4">
            <h3 className="text-base font-bold text-primary">Supporting documents</h3>
            <FileUploader label="Proof of income" />
            <FileUploader label="Proof of residency" />
          </div>

          {errors.length > 0 && (
            <ul role="alert" className="grid gap-1 rounded-xl bg-destructive-soft p-4 text-sm text-destructive">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <Button type="submit" variant="action" className="justify-self-start">
            <HandCoins aria-hidden="true" /> Submit Application
          </Button>
        </form>

        <aside className="grid h-fit gap-4">
          {aid.status === "approved" && (
            <div className="card-surface border-success/30 bg-success-soft p-5">
              <h2 className="font-display text-lg font-bold text-primary">You're approved</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatCurrency(aid.approvedAmountPerProgram)} is automatically applied to each eligible program in your
                cart. A {formatCurrency(25)} processing fee applies per aided program.
              </p>
              <Button asChild variant="action" className="mt-4 w-full">
                <Link to="/programs">Enroll with aid</Link>
              </Button>
            </div>
          )}

          <div className="card-surface p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
              <HeartHandshake className="size-5 text-action" aria-hidden="true" /> How aid works
            </h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>Applications are reviewed within 5 business days.</li>
              <li>Awards apply per program, per child, for the full season.</li>
              <li>Free programs like HomeWork CircusWork never carry a fee.</li>
              <li>Your information is confidential and used only for award decisions.</li>
            </ul>
          </div>
        </aside>
      </div>
    </PortalLayout>
  );
}

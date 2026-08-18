import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, PageHeader, PortalLayout, ProgressStepper } from "@/components/portal/PortalLayout";
import { CreditSelector, MobileOrderDrawer, OrderSummary } from "@/components/portal/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePortal } from "@/lib/portal-store";
import { formatCurrency } from "@/lib/portal-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — CircEsteem" },
      {
        name: "description",
        content: "Confirm your circus enrollments, review contact details, and complete secure payment.",
      },
      { property: "og:title", content: "Checkout — CircEsteem" },
      { property: "og:description", content: "A clear three-step checkout for CircEsteem families." },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Review", "Contact", "Payment"];

function CheckoutPage() {
  const { pricedLines, totals, parent, updateParent, completeCheckout } = usePortal();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [agree, setAgree] = useState(false);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  if (pricedLines.length === 0) {
    return (
      <PortalLayout>
        <PageHeader eyebrow="Enrollment" title="Checkout" />
        <EmptyState
          icon={<ShoppingCart className="size-6" aria-hidden="true" />}
          title="Nothing to check out yet"
          description="Add a program to your cart and we'll walk you through payment."
          action={
            <Button asChild variant="action" className="mt-2">
              <Link to="/programs">Browse Programs</Link>
            </Button>
          }
        />
      </PortalLayout>
    );
  }

  const validateContact = () => {
    const next: string[] = [];
    if (!parent.email.includes("@")) next.push("A valid email address is required.");
    if (parent.phone.trim().length < 7) next.push("A phone number is required.");
    setErrors(next);
    return next.length === 0;
  };

  const validatePayment = () => {
    const next: string[] = [];
    const free = totals.total === 0;
    if (!free) {
      if (card.name.trim().length < 3) next.push("Name on card is required.");
      if (card.number.replace(/\D/g, "").length < 15) next.push("Enter a valid card number.");
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) next.push("Expiry must be in MM/YY format.");
      if (card.cvc.replace(/\D/g, "").length < 3) next.push("Enter a valid security code.");
    }
    if (!agree) next.push("You must accept the enrollment and refund policy.");
    setErrors(next);
    return next.length === 0;
  };

  const submit = async () => {
    if (!validatePayment()) {
      toast.warning("Please fix the highlighted fields.");
      return;
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1100));
    completeCheckout();
    setProcessing(false);
    toast.success("Enrollment confirmed!");
    navigate({ to: "/confirmation" });
  };

  const primary = (
    <Button
      variant="action"
      className="w-full"
      disabled={processing}
      onClick={() => {
        if (step === 0) setStep(1);
        else if (step === 1) {
          if (validateContact()) setStep(2);
          else toast.warning("Please complete your contact details.");
        } else void submit();
      }}
    >
      {step === 2
        ? processing
          ? "Processing…"
          : `Pay ${formatCurrency(totals.total)}`
        : "Continue"}
    </Button>
  );

  return (
    <PortalLayout>
      <PageHeader eyebrow="Secure checkout" title="Checkout" />
      <ProgressStepper steps={steps} current={step} onStepClick={setStep} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-4">
          {step === 0 && (
            <>
              <CreditSelector />
              <section className="card-surface p-5">
                <h2 className="font-display text-xl font-bold text-primary">Review your enrollments</h2>
                <ul className="mt-4 grid gap-3">
                  {pricedLines.map((line) => (
                    <li
                      key={line.item.id}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-secondary px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-primary">{line.program.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {line.child.firstName} · {line.program.schedule}
                        </p>
                      </div>
                      <p className="font-display text-lg font-bold text-primary">{formatCurrency(line.total)}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {step === 1 && (
            <section className="card-surface grid gap-4 p-5">
              <h2 className="font-display text-xl font-bold text-primary">Contact & emergency details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="co-first" label="First name" value={parent.firstName} onChange={(v) => updateParent({ firstName: v })} />
                <Field id="co-last" label="Last name" value={parent.lastName} onChange={(v) => updateParent({ lastName: v })} />
                <Field id="co-email" label="Email" type="email" value={parent.email} onChange={(v) => updateParent({ email: v })} />
                <Field id="co-phone" label="Phone" type="tel" value={parent.phone} onChange={(v) => updateParent({ phone: v })} />
                <Field id="co-address" label="Address" value={parent.address} onChange={(v) => updateParent({ address: v })} />
                <Field id="co-city" label="City" value={parent.city} onChange={(v) => updateParent({ city: v })} />
                <Field id="co-state" label="State" value={parent.state} onChange={(v) => updateParent({ state: v })} />
                <Field id="co-zip" label="ZIP code" value={parent.zip} onChange={(v) => updateParent({ zip: v })} />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="card-surface grid gap-4 p-5">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-primary">
                <CreditCard className="size-5 text-action" aria-hidden="true" /> Payment
              </h2>
              {totals.total === 0 ? (
                <p className="rounded-xl bg-success-soft p-4 text-sm text-success">
                  Your balance is {formatCurrency(0)} — no payment information needed. Just confirm below.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="pay-name" label="Name on card" value={card.name} onChange={(v) => setCard({ ...card, name: v })} />
                  <Field
                    id="pay-number"
                    label="Card number"
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    value={card.number}
                    onChange={(v) => setCard({ ...card, number: v })}
                  />
                  <Field
                    id="pay-expiry"
                    label="Expiry (MM/YY)"
                    placeholder="09/29"
                    value={card.expiry}
                    onChange={(v) => setCard({ ...card, expiry: v })}
                  />
                  <Field
                    id="pay-cvc"
                    label="Security code"
                    placeholder="123"
                    inputMode="numeric"
                    value={card.cvc}
                    onChange={(v) => setCard({ ...card, cvc: v })}
                  />
                </div>
              )}

              <label className="flex items-start gap-3 rounded-xl bg-secondary p-3 text-sm text-primary">
                <Checkbox
                  checked={agree}
                  onCheckedChange={(v) => setAgree(v === true)}
                  aria-label="Accept the enrollment and refund policy"
                  className="mt-0.5"
                />
                <span>
                  I agree to CircEsteem's enrollment and refund policy, and confirm all child information is accurate.
                </span>
              </label>

              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-4 text-success" aria-hidden="true" /> This is a demo checkout — no real card is
                charged.
              </p>
            </section>
          )}

          {errors.length > 0 && (
            <ul role="alert" className="grid gap-1 rounded-xl bg-destructive-soft p-4 text-sm text-destructive">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <div className="min-w-52 flex-1 lg:hidden">{primary}</div>
          </div>
        </div>

        <OrderSummary action={primary} />
      </div>

      <MobileOrderDrawer action={primary} />
    </PortalLayout>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text" | "tel";
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder ?? ""}
        inputMode={inputMode ?? "text"}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

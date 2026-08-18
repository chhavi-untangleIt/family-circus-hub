import { useState } from "react";
import { ChevronUp, ShieldCheck } from "lucide-react";
import { usePortal } from "@/lib/portal-store";
import { formatCurrency } from "@/lib/portal-data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CreditSelector() {
  const { credit, toggleCredit } = usePortal();
  if (credit.amount <= 0) return null;
  return (
    <div className="card-surface flex flex-wrap items-center justify-between gap-4 border-success/30 bg-success-soft p-5">
      <div className="min-w-0">
        <h3 className="font-display text-lg font-bold text-primary">Household Credit Available</h3>
        <p className="text-sm text-muted-foreground">
          You have a {formatCurrency(credit.amount)} credit from a previous cancellation. Expires {credit.expirationDate}.
        </p>
      </div>
      <label className="flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-primary">
        <Switch
          checked={credit.applied}
          onCheckedChange={(v) => {
            toggleCredit(v);
            if (v) toast.success("Household credit applied.");
          }}
          aria-label={`Apply ${formatCurrency(credit.amount)} household credit`}
        />
        Apply {formatCurrency(credit.amount)} Credit
      </label>
    </div>
  );
}

function Rows() {
  const { totals } = usePortal();
  return (
    <dl className="grid gap-2.5 text-sm">
      <Row label="Subtotal" value={formatCurrency(totals.subtotal)} />
      <Row label="Financial Aid" value={`-${formatCurrency(totals.financialAid)}`} tone="success" />
      <Row label="Processing Fees" value={formatCurrency(totals.processingFees)} />
      <Row label="Household Credits" value={`-${formatCurrency(totals.creditApplied)}`} tone="success" />
      <div className="my-1 h-px bg-border" />
      <div className="flex items-baseline justify-between">
        <dt className="font-display text-base font-bold text-primary">Total Due</dt>
        <dd
          key={totals.total}
          className="animate-in fade-in slide-in-from-bottom-1 font-display text-3xl font-bold text-action"
        >
          {formatCurrency(totals.total)}
        </dd>
      </div>
    </dl>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: "success" | undefined }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-semibold", tone === "success" ? "text-success" : "text-primary")}>{value}</dd>
    </div>
  );
}

export function OrderSummary({ action }: { action?: React.ReactNode }) {
  return (
    <aside className="card-surface hidden p-6 lg:sticky lg:top-28 lg:block" aria-label="Order summary">
      <h2 className="mb-4 font-display text-xl font-bold text-primary">Order Summary</h2>
      <Rows />
      {action && <div className="mt-5 grid gap-2">{action}</div>}
      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-success" aria-hidden="true" /> Prices update instantly — no hidden fees at
        checkout.
      </p>
    </aside>
  );
}

export function MobileOrderDrawer({ action }: { action?: React.ReactNode }) {
  const { totals } = usePortal();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-card px-4 pb-3 pt-3 shadow-lift lg:hidden">
      {open && (
        <div className="mb-3 animate-in slide-in-from-bottom-2">
          <Rows />
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex min-h-11 items-center gap-2 text-left"
        >
          <ChevronUp className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
          <span>
            <span className="block text-xs text-muted-foreground">Total due</span>
            <span className="font-display text-xl font-bold text-action">{formatCurrency(totals.total)}</span>
          </span>
        </button>
        {action}
      </div>
    </div>
  );
}

export { Rows as OrderSummaryRows };
export function SummaryActionButton(props: React.ComponentProps<typeof Button>) {
  return <Button variant="action" className="min-h-11" {...props} />;
}

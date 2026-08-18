import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PortalLayout, EmptyState } from "@/components/portal/PortalLayout";
import { CreditSelector, MobileOrderDrawer, OrderSummary } from "@/components/portal/OrderSummary";
import { StatusPill } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import { formatCurrency } from "@/lib/portal-data";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — CircEsteem" },
      {
        name: "description",
        content: "Review your circus program selections, financial aid savings, and household credits before checkout.",
      },
      { property: "og:title", content: "Your Cart — CircEsteem" },
      { property: "og:description", content: "Transparent pricing for every CircEsteem enrollment." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { pricedLines, removeFromCart } = usePortal();
  const navigate = useNavigate();

  const checkoutButton = (
    <Button variant="action" className="w-full" onClick={() => navigate({ to: "/checkout" })}>
      Proceed to Checkout
    </Button>
  );

  if (pricedLines.length === 0) {
    return (
      <PortalLayout>
        <PageHeader eyebrow="Enrollment" title="Your Cart" />
        <EmptyState
          icon={<ShoppingCart className="size-6" aria-hidden="true" />}
          title="Your cart is empty"
          description="Browse our Fall 2026 circus programs and add an enrollment to get started."
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
      <PageHeader
        eyebrow="Enrollment"
        title="Your Cart"
        subtitle="Every discount is applied automatically — what you see here is exactly what you'll pay."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-4">
          <CreditSelector />

          <ul className="grid gap-4">
            {pricedLines.map((line) => (
              <li key={line.item.id} className="card-surface grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill tone="info">
                      {line.child.firstName} {line.child.lastName}
                    </StatusPill>
                    {line.program.isFreeProgram && <StatusPill tone="success">Free program</StatusPill>}
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold text-primary">{line.program.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {line.program.schedule} · {line.program.location}
                  </p>
                  <dl className="mt-3 grid gap-1 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Tuition</dt>
                      <dd className="font-semibold text-primary">{formatCurrency(line.tuition)}</dd>
                    </div>
                    {line.financialAid > 0 && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Financial aid</dt>
                        <dd className="font-semibold text-success">-{formatCurrency(line.financialAid)}</dd>
                      </div>
                    )}
                    {line.processingFee > 0 && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Processing fee</dt>
                        <dd className="font-semibold text-primary">{formatCurrency(line.processingFee)}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
                  <p className="font-display text-2xl font-bold text-action">{formatCurrency(line.total)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="min-h-11 min-w-11"
                    aria-label={`Remove ${line.program.name} for ${line.child.firstName}`}
                    onClick={() => {
                      removeFromCart(line.item.id);
                      toast.success("Removed from cart.");
                    }}
                  >
                    <Trash2 className="text-destructive" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="justify-self-start">
            <Link to="/programs">Continue browsing programs</Link>
          </Button>
        </div>

        <OrderSummary action={checkoutButton} />
      </div>

      <MobileOrderDrawer action={checkoutButton} />
    </PortalLayout>
  );
}

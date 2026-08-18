import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Wordmark } from "./brand";
import { usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/programs", label: "Our Current Programs" },
  { to: "/release-form", label: "General Release Form", flagged: true },
  { to: "/financial-aid", label: "Apply for Financial Aid" },
  { to: "/children", label: "Add Children" },
  { to: "/account", label: "My Account" },
] as const;

export function Navbar() {
  const { cart, childrenNeedingRelease } = usePortal();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const needsRelease = childrenNeedingRelease.length > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between lg:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Wordmark />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary",
                  pathname === l.to && "bg-secondary text-primary",
                )}
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  {l.label}
                  {"flagged" in l && l.flagged && needsRelease && (
                    <>
                      <span className="size-2 rounded-full bg-destructive" aria-hidden="true" />
                      <span className="sr-only">Action required</span>
                    </>
                  )}
                </span>
                {pathname === l.to && (
                  <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-action" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cart.length} items`}
            className="relative grid size-11 place-items-center rounded-xl border border-border bg-card text-primary transition-colors hover:bg-secondary"
          >
            <ShoppingCart className="size-5" aria-hidden="true" />
            {cart.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid min-w-5 animate-in zoom-in place-items-center rounded-full bg-action px-1.5 text-xs font-bold text-action-foreground">
                {cart.length}
              </span>
            )}
          </Link>
          <Button asChild variant="action" className="hidden lg:inline-flex">
            <Link to="/dashboard">My Dashboard</Link>
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-border text-primary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-xl text-muted-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            {[{ to: "/dashboard", label: "Dashboard" }, ...links].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-medium text-primary hover:bg-secondary"
                activeProps={{ className: "bg-secondary" }}
              >
                {l.label}
                {"flagged" in l && l.flagged && needsRelease && (
                  <span className="size-2 rounded-full bg-destructive" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

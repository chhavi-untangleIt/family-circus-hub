import { Link } from "@tanstack/react-router";
import { CalendarHeart, Home, ShoppingCart, User, Users } from "lucide-react";
import { usePortal } from "@/lib/portal-store";

const items = [
  { to: "/dashboard", label: "Home", Icon: Home },
  { to: "/programs", label: "Programs", Icon: CalendarHeart },
  { to: "/children", label: "Children", Icon: Users },
  { to: "/cart", label: "Cart", Icon: ShoppingCart },
  { to: "/account", label: "Account", Icon: User },
] as const;

export function MobileBottomNav() {
  const { cart } = usePortal();
  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium text-muted-foreground"
              activeProps={{ className: "text-action" }}
            >
              <span className="relative">
                <Icon className="size-5" aria-hidden="true" />
                {to === "/cart" && cart.length > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid min-w-4 place-items-center rounded-full bg-action px-1 text-[10px] font-bold text-action-foreground">
                    {cart.length}
                  </span>
                )}
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

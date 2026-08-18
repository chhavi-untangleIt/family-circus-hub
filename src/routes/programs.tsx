import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, PortalLayout, EmptyState } from "@/components/portal/PortalLayout";
import { ProgramCard } from "@/components/portal/ProgramCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Circus Programs — CircEsteem" },
      {
        name: "description",
        content:
          "Browse CircEsteem's after school circus programs, aerial intensives, and free HomeWork CircusWork sessions.",
      },
      { property: "og:title", content: "Circus Programs — CircEsteem" },
      { property: "og:description", content: "Find the right circus program for each child in your family." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const { programs, children, checkEligibility, addToCart } = usePortal();
  const navigate = useNavigate();
  const [childId, setChildId] = useState(children[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [price, setPrice] = useState("all");

  const locations = useMemo(() => Array.from(new Set(programs.map((p) => p.location))), [programs]);
  const child = children.find((c) => c.id === childId);

  const filtered = programs.filter((p) => {
    const matchesQuery =
      !query ||
      `${p.name} ${p.description} ${p.location}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesLocation = location === "all" || p.location === location;
    const matchesPrice =
      price === "all" ||
      (price === "free" && p.isFreeProgram) ||
      (price === "aid" && p.financialAidEligible) ||
      (price === "open" && p.availableSpots > 0);
    return matchesQuery && matchesLocation && matchesPrice;
  });

  const handleEnroll = (programId: string) => {
    if (!child) {
      toast.warning("Add a child to your household first.");
      navigate({ to: "/children" });
      return;
    }
    const result = checkEligibility(child.id, programId);
    if (!result.ok) {
      toast.error(result.message);
      if (result.reason === "release") navigate({ to: "/release-form", search: { child: child.id } });
      return;
    }
    addToCart(child.id, programId);
    toast.success(`${child.firstName} added to your cart.`, {
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  return (
    <PortalLayout wide>
      <PageHeader
        eyebrow="Fall 2026 season"
        title="Circus Programs"
        subtitle="Select a child to see personalized eligibility, then add programs to your cart."
      />

      <section className="card-surface mb-6 grid gap-4 p-5" aria-label="Program filters">
        {children.length > 0 && (
          <div className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Enrolling for
            </span>
            <div className="flex flex-wrap gap-2">
              {children.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChildId(c.id)}
                  aria-pressed={c.id === childId}
                  className={cn(
                    "min-h-11 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors",
                    c.id === childId
                      ? "border-action bg-accent-soft text-action"
                      : "border-border bg-card text-primary hover:bg-secondary",
                  )}
                >
                  {c.firstName}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="grid gap-1.5">
            <Label htmlFor="program-search" className="sr-only">
              Search programs
            </Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="program-search"
                placeholder="Search programs, locations, skills…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="filter-location" className="sr-only">
              Filter by location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="filter-location" className="min-w-44">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="filter-price" className="sr-only">
              Filter by cost
            </Label>
            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger id="filter-price" className="min-w-44">
                <SelectValue placeholder="Cost" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All programs</SelectItem>
                <SelectItem value="free">Free programs</SelectItem>
                <SelectItem value="aid">Financial aid eligible</SelectItem>
                <SelectItem value="open">Spots available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<SlidersHorizontal className="size-6" aria-hidden="true" />}
          title="No programs match these filters"
          description="Try clearing your search or choosing a different location."
          action={
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                setQuery("");
                setLocation("all");
                setPrice("all");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              child={child}
              eligibility={child ? checkEligibility(child.id, program.id) : undefined}
              onEnroll={() => handleEnroll(program.id)}
            />
          ))}
        </div>
      )}
    </PortalLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, HeartHandshake, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { MobileBottomNav } from "@/components/portal/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/portal/badges";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CircEsteem — Youth Circus Arts Family Portal" },
      {
        name: "description",
        content:
          "CircEsteem unites youth from diverse backgrounds through circus arts. Enroll your children, complete forms, and apply for financial aid.",
      },
      { property: "og:title", content: "CircEsteem — Youth Circus Arts Family Portal" },
      {
        property: "og:description",
        content: "Enroll your children in circus programs, complete release forms, and apply for financial aid.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-28 lg:pb-0">
        <section className="confetti-dots bg-gradient-hero">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-6 lg:py-24">
            <div className="min-w-0">
              <StatusPill tone="warning" icon={<Star className="size-3.5" aria-hidden="true" />}>
                Fall 2026 registration is open
              </StatusPill>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl">
                Where every child finds their balance.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-primary-foreground/85">
                CircEsteem unites youth from diverse racial, cultural, and economic backgrounds through circus arts.
                Manage your family, complete required forms, and enroll — all in one place.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="action" size="lg">
                  <Link to="/onboarding">
                    Create a family account <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="hero" size="lg">
                  <Link to="/programs">Browse programs</Link>
                </Button>
              </div>
              <p className="mt-5 text-sm text-primary-foreground/75">
                Already a CircEsteem family?{" "}
                <Link to="/login" className="font-semibold underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  Icon: Sparkles,
                  title: "Programs for every age",
                  body: "After school residencies, free homework clubs, aerial intensives, and beginner classes.",
                },
                {
                  Icon: HandHeart,
                  title: "Sliding-scale tuition",
                  body: "Financial assistance keeps circus within reach for every household.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Safety first",
                  body: "Release forms, allergy notes, and authorized pickup contacts kept up to date.",
                },
                {
                  Icon: HeartHandshake,
                  title: "A real community",
                  body: "Volunteer alongside coaches, families, and youth performers all season.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="card-surface card-hover p-5">
                  <Icon className="size-6 text-action" aria-hidden="true" />
                  <h2 className="mt-3 text-base font-bold text-primary">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-primary">How enrollment works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Add your children", "Store birthdates, grades, allergies, and pickup contacts."],
              ["Complete release forms", "One signature per child clears them for every program."],
              ["Find the right program", "We filter by age, grade, and availability automatically."],
              ["Apply for aid", "Upload documentation and see your adjusted price up front."],
              ["Review your cart", "Multiple children and programs in one transparent checkout."],
              ["Pay securely", "Encrypted payment processing and instant confirmation."],
            ].map(([title, body], i) => (
              <li key={title} className="card-surface p-5">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft font-display font-bold text-action">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-primary">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button asChild variant="action" size="lg">
              <Link to="/dashboard">Go to my dashboard</Link>
            </Button>
          </div>
        </section>

        <footer className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground lg:px-6">
            <p className="font-display text-base font-bold text-primary">CircEsteem</p>
            <p>A 501(c)(3) nonprofit youth circus arts organization. Chicago, Illinois.</p>
          </div>
        </footer>
      </main>
      <MobileBottomNav />
    </div>
  );
}

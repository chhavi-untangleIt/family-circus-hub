import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { EmptyState, PageHeader, PortalLayout } from "@/components/portal/PortalLayout";
import { ChildCard } from "@/components/portal/ChildCard";
import { ChildFormDialog } from "@/components/portal/ChildFormDialog";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import type { Child } from "@/lib/portal-types";

export const Route = createFileRoute("/children/")({
  head: () => ({
    meta: [
      { title: "Your Children — CircEsteem" },
      {
        name: "description",
        content: "Add and update your children's profiles, allergies, and authorized pickup contacts.",
      },
      { property: "og:title", content: "Your Children — CircEsteem" },
      { property: "og:description", content: "Keep your children's information current for enrollment and safety." },
    ],
  }),
  component: ChildrenPage,
});

function ChildrenPage() {
  const { children } = usePortal();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Child | null>(null);

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (child: Child) => {
    setEditing(child);
    setOpen(true);
  };

  return (
    <PortalLayout>
      <PageHeader
        eyebrow="Household"
        title="Your Children"
        subtitle="Keep your children's information up to date for enrollment and safety."
        actions={
          <Button variant="action" onClick={openAdd}>
            <Plus aria-hidden="true" /> Add Child
          </Button>
        }
      />

      {children.length === 0 ? (
        <EmptyState
          icon={<Users className="size-6" aria-hidden="true" />}
          title="You haven't added any children yet."
          description="Add your first child to unlock program enrollment, release forms, and financial aid."
          action={
            <Button variant="action" className="mt-2" onClick={openAdd}>
              Add Your First Child
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} onEdit={openEdit} />
          ))}
        </div>
      )}

      <ChildFormDialog open={open} onOpenChange={setOpen} child={editing} />
    </PortalLayout>
  );
}

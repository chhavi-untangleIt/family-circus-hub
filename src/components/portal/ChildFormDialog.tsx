import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortal } from "@/lib/portal-store";
import { gradeLabel } from "@/lib/portal-data";
import type { Child, PickupContact } from "@/lib/portal-types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child?: Child | null;
}

const emptyForm = {
  firstName: "",
  lastName: "",
  birthdate: "",
  grade: "",
  allergies: "",
  specialInstructions: "",
};

export function ChildFormDialog({ open, onOpenChange, child }: Props) {
  const { addChild, updateChild } = usePortal();
  const [form, setForm] = useState(emptyForm);
  const [contacts, setContacts] = useState<PickupContact[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    if (child) {
      setForm({
        firstName: child.firstName,
        lastName: child.lastName,
        birthdate: child.birthdate,
        grade: String(child.grade),
        allergies: child.allergies,
        specialInstructions: child.specialInstructions,
      });
      setContacts(child.authorizedPickupContacts);
    } else {
      setForm(emptyForm);
      setContacts([]);
    }
    setErrors({});
  }, [open, child]);

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next["firstName"] = "First name is required.";
    if (!form.lastName.trim()) next["lastName"] = "Last name is required.";
    if (!form.birthdate) next["birthdate"] = "Birthdate is required.";
    if (form.grade === "") next["grade"] = "Grade is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Unable to save child. Please check the required fields.");
      return;
    }
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      birthdate: form.birthdate,
      grade: Number(form.grade),
      allergies: form.allergies,
      specialInstructions: form.specialInstructions,
      authorizedPickupContacts: contacts,
    };
    if (child) {
      updateChild(child.id, payload);
      toast.success(`${payload.firstName}'s profile was updated.`);
    } else {
      addChild(payload);
      toast.success(`${payload.firstName} was added successfully.`);
    }
    onOpenChange(false);
  };

  const addContact = () =>
    setContacts((c) => [
      ...c,
      { id: `pc_${Math.random().toString(36).slice(2, 8)}`, name: "", relationship: "", phone: "", authorized: true },
    ]);

  const updateContact = (id: string, patch: Partial<PickupContact>) =>
    setContacts((c) => c.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">
            {child ? `Edit ${child.firstName}` : "Add a child"}
          </DialogTitle>
          <DialogDescription>
            This information helps our coaches keep every young performer safe.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label="First Name" required error={errors["firstName"]}>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                aria-invalid={!!errors["firstName"]}
                aria-describedby={errors["firstName"] ? "firstName-error" : undefined}
              />
            </Field>
            <Field id="lastName" label="Last Name" required error={errors["lastName"]}>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                aria-invalid={!!errors["lastName"]}
                aria-describedby={errors["lastName"] ? "lastName-error" : undefined}
              />
            </Field>
            <Field id="birthdate" label="Birthdate" required error={errors["birthdate"]}>
              <Input
                id="birthdate"
                type="date"
                value={form.birthdate}
                onChange={(e) => set("birthdate", e.target.value)}
                aria-invalid={!!errors["birthdate"]}
              />
            </Field>
            <Field id="grade" label="Grade" required error={errors["grade"]}>
              <Select value={form.grade} onValueChange={(v) => set("grade", v)}>
                <SelectTrigger id="grade" className="h-11">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }).map((_, g) => (
                    <SelectItem key={g} value={String(g)}>
                      {gradeLabel(g)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field id="allergies" label="Allergies">
            <Textarea
              id="allergies"
              rows={3}
              placeholder="List any allergies and how we should respond."
              value={form.allergies}
              onChange={(e) => set("allergies", e.target.value)}
            />
          </Field>

          <Field id="specialInstructions" label="Special Instructions">
            <Textarea
              id="specialInstructions"
              rows={3}
              placeholder="Anything our coaches should know."
              value={form.specialInstructions}
              onChange={(e) => set("specialInstructions", e.target.value)}
            />
          </Field>

          <fieldset className="rounded-2xl border border-border p-4">
            <legend className="px-1 text-sm font-bold text-primary">Authorized Pickup Contacts</legend>
            {contacts.length === 0 && (
              <p className="text-sm text-muted-foreground">No pickup contacts added yet.</p>
            )}
            <div className="grid gap-4">
              {contacts.map((c, i) => (
                <div key={c.id} className="grid gap-3 rounded-xl bg-secondary p-3 sm:grid-cols-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor={`c-name-${c.id}`} className="text-xs">
                      Name
                    </Label>
                    <Input
                      id={`c-name-${c.id}`}
                      value={c.name}
                      onChange={(e) => updateContact(c.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`c-rel-${c.id}`} className="text-xs">
                      Relationship
                    </Label>
                    <Input
                      id={`c-rel-${c.id}`}
                      value={c.relationship}
                      onChange={(e) => updateContact(c.id, { relationship: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`c-phone-${c.id}`} className="text-xs">
                      Phone
                    </Label>
                    <Input
                      id={`c-phone-${c.id}`}
                      value={c.phone}
                      onChange={(e) => updateContact(c.id, { phone: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:col-span-3">
                    <label className="flex items-center gap-2 text-sm text-primary">
                      <Checkbox
                        checked={c.authorized}
                        onCheckedChange={(v) => updateContact(c.id, { authorized: v === true })}
                      />
                      Authorized for pickup
                    </label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="min-h-11 text-destructive"
                      onClick={() => setContacts((prev) => prev.filter((x) => x.id !== c.id))}
                    >
                      <Trash2 aria-hidden="true" /> Remove contact {i + 1}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-4 min-h-11" onClick={addContact}>
              <Plus aria-hidden="true" /> Add Authorized Pickup Contact
            </Button>
          </fieldset>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="action">
              {child ? "Save changes" : "Add child"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-primary">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

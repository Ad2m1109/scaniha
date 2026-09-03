"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/types";

interface CustomerFormProps {
  onAdd: (customer: Customer) => void;
}

const initialForm = { name: "", email: "", phone: "" };

export function CustomerForm({ onAdd }: CustomerFormProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    onAdd({
      id: `customer-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || "Not provided",
      points: 0,
      visits: 0,
      tier: "Bronze",
      lastVisit: "Never",
      joinedAt: new Date().toISOString().slice(0, 10),
    });
    setForm(initialForm);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" className="h-10 gap-2 rounded-xl bg-purple px-4 text-xs font-bold text-white shadow-[0_8px_18px_#7C3AED2E] hover:bg-purple-dark" />}>
        <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        Add customer
      </DialogTrigger>
      <DialogContent className="glass-card max-w-md border-line bg-surface-solid p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-ink">Add a new customer</DialogTitle>
          <DialogDescription className="text-sm text-muted">Create a member profile for the loyalty program.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="customer-name" className="text-xs font-bold text-ink">Full name</Label>
            <Input id="customer-name" value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="e.g. Jordan Lee" required className="h-10 rounded-xl bg-surface-soft" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-email" className="text-xs font-bold text-ink">Email address</Label>
            <Input id="customer-email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="jordan@example.com" required className="h-10 rounded-xl bg-surface-soft" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-phone" className="text-xs font-bold text-ink">Phone number <span className="font-normal text-muted">(optional)</span></Label>
            <Input id="customer-phone" type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+1 415 555 0107" className="h-10 rounded-xl bg-surface-soft" />
          </div>
          <DialogFooter className="mt-6 -mx-6 -mb-6 rounded-b-2xl border-line bg-surface-soft px-6 py-4">
            <Button type="button" variant="outline" className="rounded-xl border-line" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-purple text-white hover:bg-purple-dark">Create customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

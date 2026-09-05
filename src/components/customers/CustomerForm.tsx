"use client";

import { useState } from "react";
import { Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppDataContext";
import type { Customer } from "@/types";

const empty = { name: "", email: "", phone: "" };

export function CustomerForm({ customer, trigger }: { customer?: Customer; trigger?: React.ReactElement }) {
  const { addCustomer, updateCustomer } = useAppData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  function changeOpen(next: boolean) { if (next) setForm(customer ? { name: customer.name, email: customer.email, phone: customer.phone } : empty); setOpen(next); }
  function submit(event: React.FormEvent) { event.preventDefault(); if (!form.name.trim() || !form.phone.trim()) return; if (customer) updateCustomer({ ...customer, ...form }); else addCustomer(form); setOpen(false); }
  return <Dialog open={open} onOpenChange={changeOpen}><DialogTrigger render={trigger ?? <Button type="button" className="h-10 gap-2 bg-purple text-white" />}>{customer ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{customer ? "Edit customer" : "Add customer"}</DialogTrigger><DialogContent className="glass-card max-w-md border-line bg-surface-solid p-6"><DialogHeader><DialogTitle>{customer ? "Edit customer" : "Add a new customer"}</DialogTitle><DialogDescription>Create a profile and unique loyalty QR code.</DialogDescription></DialogHeader><form className="space-y-4" onSubmit={submit}><div className="space-y-2"><Label htmlFor="customer-name">Full name</Label><Input id="customer-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="customer-email">Email address</Label><Input id="customer-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="customer-phone">Phone number</Label><Input id="customer-phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div><DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" className="bg-purple text-white">Save customer</Button></DialogFooter></form></DialogContent></Dialog>;
}

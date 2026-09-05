"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/context/AppDataContext";

function BusinessInfoEditor() {
  const data = useAppData();
  const [form, setForm] = useState(data.business);
  function field(name: keyof typeof form, value: string) { setForm((current) => ({ ...current, [name]: value })); }
  function submit(event: React.FormEvent) { event.preventDefault(); data.updateBusiness(form); }
  return <Card className="glass-card max-w-4xl border-0 ring-0"><CardHeader><CardTitle className="card-title">Business information</CardTitle><p className="text-xs text-muted">Used across your menu, QR pages, and loyalty cards.</p></CardHeader><CardContent><form onSubmit={submit} className="space-y-6"><div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="business-name">Business name</Label><Input id="business-name" required value={form.name} onChange={(e) => field("name", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="business-phone">Phone</Label><Input id="business-phone" value={form.phone} onChange={(e) => field("phone", e.target.value)} /></div><div className="space-y-2 md:col-span-2"><Label htmlFor="business-address">Address</Label><Input id="business-address" value={form.address} onChange={(e) => field("address", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="business-logo">Logo URL</Label><Input id="business-logo" type="url" placeholder="https://..." value={form.logo} onChange={(e) => field("logo", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="business-tagline">Tagline</Label><Input id="business-tagline" value={form.tagline} onChange={(e) => field("tagline", e.target.value)} /></div></div><div className="space-y-2"><Label htmlFor="business-description">Description</Label><Textarea id="business-description" rows={4} value={form.description} onChange={(e) => field("description", e.target.value)} /></div><div><h3 className="text-xs font-bold text-ink">Social links</h3><div className="mt-3 grid gap-4 md:grid-cols-3"><div className="space-y-2"><Label htmlFor="facebook">Facebook</Label><Input id="facebook" placeholder="Page URL" value={form.facebook} onChange={(e) => field("facebook", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="instagram">Instagram</Label><Input id="instagram" placeholder="@username" value={form.instagram} onChange={(e) => field("instagram", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="whatsapp">WhatsApp</Label><Input id="whatsapp" placeholder="Phone number" value={form.whatsapp} onChange={(e) => field("whatsapp", e.target.value)} /></div></div></div><Button type="submit" className="gap-2 bg-purple text-white"><Save className="h-4 w-4" /> Save changes</Button></form></CardContent></Card>;
}

export function BusinessInfoForm() {
  const data = useAppData();
  if (!data.ready) return <Card className="glass-card h-96 animate-pulse border-0 ring-0" />;
  return <BusinessInfoEditor key={JSON.stringify(data.business)} />;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, Save } from "lucide-react";
import { MenuPreview, menuTemplates } from "@/components/menu/MenuPreview";
import { ProductForm } from "@/components/menu/ProductForm";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppDataContext";
import { cn } from "@/lib/utils";
import type { MenuSettings } from "@/types";

function MenuGeneratorEditor() {
  const data = useAppData();
  const [settings, setSettings] = useState<MenuSettings>(data.menuSettings);
  const [businessName, setBusinessName] = useState(data.business.name);

  function save() {
    data.updateMenuSettings(settings);
    if (businessName.trim() && businessName !== data.business.name) data.updateBusiness({ ...data.business, name: businessName.trim() });
  }

  return <div className="mx-auto max-w-[1280px] space-y-6">
    <PageIntro eyebrow="Menu generator" title="Create a menu that feels like yours." description="Choose a template, add your details, and preview every change before publishing." action={<Button variant="outline" render={<Link href="/dashboard/menu" />} className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to menu</Button>} />
    <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
      <div className="space-y-5">
        <Card className="glass-card border-0 ring-0"><CardContent className="p-5"><h2 className="card-title">1. Choose a template</h2><div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">{menuTemplates.map((template) => <button key={template.id} type="button" onClick={() => setSettings({ ...settings, template: template.id })} className={cn("flex items-center gap-3 rounded-xl border p-3 text-left transition", settings.template === template.id ? "border-purple bg-purple-soft" : "border-line bg-surface-soft hover:border-line-strong")}><span className={cn("h-9 w-9 rounded-lg", template.swatch)} /><span className="min-w-0 flex-1"><span className="block text-xs font-bold text-ink">{template.name}</span><span className="block text-[11px] text-muted">{template.description}</span></span>{settings.template === template.id ? <Check className="h-4 w-4 text-purple" /> : null}</button>)}</div></CardContent></Card>
        <Card className="glass-card border-0 ring-0"><CardContent className="space-y-4 p-5"><h2 className="card-title">2. Menu information</h2><div className="space-y-2"><Label htmlFor="generator-name">Business name</Label><Input id="generator-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="generator-tagline">Menu tagline</Label><Input id="generator-tagline" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} /></div><div className="grid grid-cols-[100px_1fr] gap-3"><div className="space-y-2"><Label htmlFor="generator-currency">Currency</Label><Input id="generator-currency" value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value.slice(0, 4) })} /></div><div className="space-y-2"><Label htmlFor="generator-hero">Cover image URL</Label><Input id="generator-hero" type="url" placeholder="https://..." value={settings.heroImage} onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })} /></div></div><div className="flex flex-wrap gap-2"><ProductForm /><Button type="button" onClick={save} className="gap-2 bg-purple text-white"><Save className="h-4 w-4" /> Save & publish</Button></div></CardContent></Card>
      </div>
      <Card className="glass-card min-w-0 overflow-hidden border-0 p-0 ring-0"><div className="flex items-center justify-between border-b border-line px-5 py-4"><div><h2 className="card-title">Live preview</h2><p className="mt-1 text-xs text-muted">Mobile menu preview</p></div><Button variant="outline" size="sm" render={<Link href={`/public/menu/${data.business.id}`} target="_blank" />} className="gap-2"><ExternalLink className="h-3.5 w-3.5" /> Open</Button></div><div className="mx-auto max-w-2xl p-4 sm:p-6"><div className="overflow-hidden rounded-[24px] border-8 border-slate-800 bg-white shadow-xl"><div className="mx-auto my-2 h-1 w-14 rounded-full bg-slate-700" /><div className="max-h-[720px] overflow-y-auto"><MenuPreview business={{ ...data.business, name: businessName || data.business.name }} categories={data.categories} products={data.products} settings={settings} compact /></div></div></div></Card>
    </div>
  </div>;
}

export default function MenuGeneratorPage() {
  const data = useAppData();
  if (!data.ready) return <div className="py-20 text-center text-sm text-muted">Loading menu builder…</div>;
  return <MenuGeneratorEditor />;
}

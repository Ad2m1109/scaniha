"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, FileDown, Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { MenuPreview, menuTemplates } from "@/components/menu/MenuPreview";
import { ProductForm } from "@/components/menu/ProductForm";
import { PageIntro } from "@/components/shared/PageIntro";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppDataContext";
import { cn } from "@/lib/utils";
import type { MenuSettings } from "@/types";
import { applyMenuPreset, menuDesignPresets } from "@/lib/menu-settings";

const designOptions = {
  layout: [["grid", "Grid"], ["list", "List"], ["compact", "Compact"]],
  headerStyle: [["centered", "Centered"], ["split", "Split"], ["cover", "Cover"]],
  cardStyle: [["elevated", "Elevated"], ["outline", "Outline"], ["minimal", "Minimal"]],
  fontFamily: [["modern", "Modern"], ["classic", "Classic"], ["rounded", "Rounded"]],
  borderRadius: [["none", "Square"], ["soft", "Soft"], ["rounded", "Rounded"]],
  categoryStyle: [["plain", "Plain"], ["underline", "Underline"], ["filled", "Filled"]],
} as const;

function ChoiceGroup({ label, value, options, onChange }: { label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label>{label}</Label><div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-soft p-1">{options.map(([id, name]) => <button key={id} type="button" onClick={() => onChange(id)} className={cn("rounded-lg px-2 py-2 text-[11px] font-semibold transition", value === id ? "bg-surface-solid text-purple shadow-sm" : "text-muted hover:text-ink")}>{name}</button>)}</div></div>;
}

function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-soft px-3 py-2"><span className="text-xs font-semibold text-ink">{label}</span><span className="flex items-center gap-2"><span className="font-mono text-[10px] uppercase text-muted">{value}</span><input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0" /></span></label>;
}

function MenuGeneratorEditor() {
  const data = useAppData();
  const [settings, setSettings] = useState<MenuSettings>(data.menuSettings);
  const [businessName, setBusinessName] = useState(data.business.name);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  async function save() {
    const business = { ...data.business, name: businessName.trim() || data.business.name };
    data.updateMenuSettings(settings);
    if (business.name !== data.business.name) data.updateBusiness(business);
    setGeneratingPdf(true);
    try {
      const saveResponse = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business, menuSettings: settings, categories: data.categories, products: data.products,
          customers: data.customers, rewards: data.rewards, loyalty: data.loyalty,
          visits: data.visits, redemptions: data.redemptions, menuViews: data.menuViews,
        }),
      });
      if (!saveResponse.ok) throw new Error("Failed to publish menu settings");
      const res = await fetch("/api/menu-pdf", { method: "POST" });
      if (res.ok) {
        const { pdfUrl } = await res.json();
        data.updateBusiness({ ...data.business, menuPdfUrl: pdfUrl, name: businessName.trim() || data.business.name });
        toast.success("Menu saved & PDF generated");
      } else {
        toast.error("Failed to generate PDF");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to publish menu");
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Menu generator"
        title="Create a menu that feels like yours."
        description="Start with a template, then customize every part of the layout, type, colors, and content."
        action={
          <Button variant="outline" render={<Link href="/dashboard/menu" />} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to menu
          </Button>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="space-y-5">
          <Card className="glass-card border-0 ring-0">
            <CardContent className="p-5">
              <h2 className="card-title">1. Choose a template</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                {menuTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSettings(applyMenuPreset(settings, template.id))}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3 text-left transition",
                      settings.template === template.id ? "border-purple bg-purple-soft" : "border-line bg-surface-soft hover:border-line-strong"
                    )}
                  >
                    <span className={cn("h-9 w-9 rounded-lg", template.swatch)} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-ink">{template.name}</span>
                      <span className="block text-[11px] text-muted">{template.description}</span>
                    </span>
                    {settings.template === template.id ? <Check className="h-4 w-4 text-purple" /> : null}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 ring-0">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3"><div><h2 className="card-title">2. Layout & design</h2><p className="mt-1 text-[11px] text-muted">Shape the menu beyond its starting template.</p></div><Button type="button" variant="ghost" size="sm" onClick={() => setSettings(applyMenuPreset(settings, settings.template))} className="gap-1.5 text-[11px]"><RotateCcw className="h-3.5 w-3.5" /> Reset</Button></div>
              <ChoiceGroup label="Menu layout" value={settings.layout} options={designOptions.layout} onChange={(layout) => setSettings({ ...settings, layout: layout as MenuSettings["layout"] })} />
              <ChoiceGroup label="Header" value={settings.headerStyle} options={designOptions.headerStyle} onChange={(headerStyle) => setSettings({ ...settings, headerStyle: headerStyle as MenuSettings["headerStyle"] })} />
              <ChoiceGroup label="Item cards" value={settings.cardStyle} options={designOptions.cardStyle} onChange={(cardStyle) => setSettings({ ...settings, cardStyle: cardStyle as MenuSettings["cardStyle"] })} />
              <ChoiceGroup label="Typography" value={settings.fontFamily} options={designOptions.fontFamily} onChange={(fontFamily) => setSettings({ ...settings, fontFamily: fontFamily as MenuSettings["fontFamily"] })} />
              <ChoiceGroup label="Corners" value={settings.borderRadius} options={designOptions.borderRadius} onChange={(borderRadius) => setSettings({ ...settings, borderRadius: borderRadius as MenuSettings["borderRadius"] })} />
              <ChoiceGroup label="Category headings" value={settings.categoryStyle} options={designOptions.categoryStyle} onChange={(categoryStyle) => setSettings({ ...settings, categoryStyle: categoryStyle as MenuSettings["categoryStyle"] })} />
            </CardContent>
          </Card>

          <Card className="glass-card border-0 ring-0">
            <CardContent className="space-y-3 p-5">
              <div><h2 className="card-title">3. Colors</h2><p className="mt-1 text-[11px] text-muted">Use any brand palette. Changes appear instantly.</p></div>
              {([['background', 'Background'], ['surface', 'Cards'], ['text', 'Text'], ['muted', 'Muted text'], ['accent', 'Accent']] as const).map(([key, label]) => <ColorControl key={key} label={label} value={settings.colors[key]} onChange={(value) => setSettings({ ...settings, colors: { ...settings.colors, [key]: value } })} />)}
              <Button type="button" variant="outline" size="sm" onClick={() => setSettings({ ...settings, colors: { ...menuDesignPresets[settings.template].colors } })} className="w-full gap-2"><RotateCcw className="h-3.5 w-3.5" /> Restore template colors</Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 ring-0">
            <CardContent className="space-y-4 p-5">
              <h2 className="card-title">4. Content & publishing</h2>
              <div className="space-y-2">
                <Label htmlFor="generator-name">Business name</Label>
                <Input id="generator-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="generator-tagline">Menu tagline</Label>
                <Input id="generator-tagline" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-3">
                <div className="space-y-2">
                  <Label htmlFor="generator-currency">Currency</Label>
                  <Input id="generator-currency" value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value.slice(0, 4) })} />
                </div>
              </div>
              <ImageUpload
                value={settings.heroImage}
                onChange={(url) => setSettings({ ...settings, heroImage: url })}
                folder="menu"
                label="Cover image"
              />
              <div className="space-y-2">
                {([['showImages', 'Show product images'], ['showDescriptions', 'Show descriptions'], ['showContactInfo', 'Show contact footer']] as const).map(([key, label]) => <label key={key} className="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-surface-soft p-3 text-xs font-semibold text-ink"><span>{label}</span><input type="checkbox" checked={settings[key]} onChange={(event) => setSettings({ ...settings, [key]: event.target.checked })} className="h-4 w-4 accent-purple" /></label>)}
              </div>
              <div className="flex flex-wrap gap-2">
                <ProductForm />
                <Button type="button" onClick={save} disabled={generatingPdf} className="gap-2 bg-purple text-white">
                  {generatingPdf ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Generating PDF…</>
                  ) : (
                    <><Save className="h-4 w-4" /> Save & publish</>
                  )}
                </Button>
              </div>
              {data.business.menuPdfUrl && (
                <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success-soft p-3 text-[11px] font-semibold text-success">
                  <FileDown className="h-4 w-4" />
                  PDF menu ready in Google Drive
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card min-w-0 overflow-hidden border-0 p-0 ring-0">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="card-title">Live preview</h2>
              <p className="mt-1 text-xs text-muted">Mobile menu preview</p>
            </div>
            <Button variant="outline" size="sm" render={<Link href={`/public/menu/${data.business.id}`} target="_blank" />} className="gap-2">
              <ExternalLink className="h-3.5 w-3.5" /> Open
            </Button>
          </div>
          <div className="mx-auto max-w-2xl p-4 sm:p-6">
            <div className="overflow-hidden rounded-[24px] border-8 border-slate-800 bg-white shadow-xl">
              <div className="mx-auto my-2 h-1 w-14 rounded-full bg-slate-700" />
              <div className="max-h-[720px] overflow-y-auto">
                <MenuPreview
                  business={{ ...data.business, name: businessName || data.business.name }}
                  categories={data.categories}
                  products={data.products}
                  settings={settings}
                  compact
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function MenuGeneratorPage() {
  const data = useAppData();
  if (!data.ready) return <div className="py-20 text-center text-sm text-muted">Loading menu builder…</div>;
  return <MenuGeneratorEditor />;
}

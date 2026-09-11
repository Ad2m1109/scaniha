"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { MenuPreview } from "@/components/menu/MenuPreview";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import type { MenuSettings } from "@/types";
import { MenuGeneratorPanel } from "@/components/menu/generator/MenuGeneratorPanel";

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
          business,
          menuSettings: settings,
          categories: data.categories,
          products: data.products,
          customers: data.customers,
          rewards: data.rewards,
          loyalty: data.loyalty,
          visits: data.visits,
          redemptions: data.redemptions,
          menuViews: data.menuViews,
        }),
      });
      if (!saveResponse.ok) throw new Error("Failed to publish menu settings");
      const res = await fetch("/api/menu-pdf", { method: "POST" });
      if (res.ok) {
        const { pdfUrl } = await res.json();
        data.updateBusiness({
          ...data.business,
          menuPdfUrl: pdfUrl,
          name: businessName.trim() || data.business.name,
        });
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
    <div className="mx-auto max-w-[1280px] space-y-4">
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
      <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <MenuGeneratorPanel
          settings={settings}
          businessName={businessName}
          pdfReady={!!data.business.menuPdfUrl}
          generatingPdf={generatingPdf}
          onSettingsChange={setSettings}
          onBusinessNameChange={setBusinessName}
          onSave={save}
        />

        <Card className="glass-card flex min-w-0 flex-col overflow-hidden border-0 p-0 ring-0">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="card-title">Live preview</h2>
              <p className="mt-1 text-xs text-muted">A4 menu preview</p>
            </div>
            <Button variant="outline" size="sm" render={<Link href={`/public/menu/${data.business.id}`} target="_blank" />} className="gap-2">
              <ExternalLink className="h-3.5 w-3.5" /> Open
            </Button>
          </div>
          <div className="flex flex-1 items-start justify-center overflow-auto p-5">
            <div className="w-[420px] shrink-0 overflow-hidden rounded-sm bg-white shadow-lg" style={{ aspectRatio: "210 / 297" }}>
              <div className="h-full overflow-y-auto">
                <MenuPreview
                  business={{ ...data.business, name: businessName || data.business.name }}
                  categories={data.categories}
                  products={data.products}
                  settings={settings}
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

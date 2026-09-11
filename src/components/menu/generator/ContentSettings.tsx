"use client";

import { FileDown, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { ProductForm } from "@/components/menu/ProductForm";
import type { MenuSettings } from "@/types";

interface ContentSettingsProps {
  settings: MenuSettings;
  businessName: string;
  pdfReady: boolean;
  generatingPdf: boolean;
  onSettingsChange: (settings: MenuSettings) => void;
  onBusinessNameChange: (name: string) => void;
  onSave: () => void;
}

const toggleFields = [
  ["showImages", "Show product images"],
  ["showDescriptions", "Show descriptions"],
  ["showContactInfo", "Show contact footer"],
] as const;

export function ContentSettings({
  settings,
  businessName,
  pdfReady,
  generatingPdf,
  onSettingsChange,
  onBusinessNameChange,
  onSave,
}: ContentSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="generator-name">Business name</Label>
        <Input
          id="generator-name"
          value={businessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="generator-tagline">Menu tagline</Label>
        <Input
          id="generator-tagline"
          value={settings.tagline}
          onChange={(e) => onSettingsChange({ ...settings, tagline: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-[100px_1fr] gap-3">
        <div className="space-y-2">
          <Label htmlFor="generator-currency">Currency</Label>
          <Input
            id="generator-currency"
            value={settings.currency}
            onChange={(e) => onSettingsChange({ ...settings, currency: e.target.value.slice(0, 4) })}
          />
        </div>
      </div>
      <ImageUpload
        value={settings.heroImage}
        onChange={(url) => onSettingsChange({ ...settings, heroImage: url })}
        folder="menu"
        label="Cover image"
      />
      <div className="space-y-2">
        {toggleFields.map(([key, label]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-surface-soft p-3 text-xs font-semibold text-ink"
          >
            <span>{label}</span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(event) => onSettingsChange({ ...settings, [key]: event.target.checked })}
              className="h-4 w-4 accent-purple"
            />
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <ProductForm />
        <Button
          type="button"
          onClick={onSave}
          disabled={generatingPdf}
          className="gap-2 bg-purple text-white"
        >
          {generatingPdf ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating PDF…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save & publish
            </>
          )}
        </Button>
      </div>
      {pdfReady && (
        <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success-soft p-3 text-[11px] font-semibold text-success">
          <FileDown className="h-4 w-4" />
          PDF menu ready in Google Drive
        </div>
      )}
    </div>
  );
}

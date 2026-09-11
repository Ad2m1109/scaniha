"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceGroup } from "./ChoiceGroup";
import { applyMenuPreset } from "@/lib/menu-settings";
import type { MenuSettings } from "@/types";

const designOptions = {
  layout: [["grid", "Grid"], ["list", "List"], ["compact", "Compact"]],
  headerStyle: [["centered", "Centered"], ["split", "Split"], ["cover", "Cover"]],
  cardStyle: [["elevated", "Elevated"], ["outline", "Outline"], ["minimal", "Minimal"]],
  fontFamily: [["modern", "Modern"], ["classic", "Classic"], ["rounded", "Rounded"]],
  borderRadius: [["none", "Square"], ["soft", "Soft"], ["rounded", "Rounded"]],
  categoryStyle: [["plain", "Plain"], ["underline", "Underline"], ["filled", "Filled"]],
} as const;

interface DesignSettingsProps {
  settings: MenuSettings;
  onChange: (settings: MenuSettings) => void;
}

export function DesignSettings({ settings, onChange }: DesignSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] text-muted">Shape the menu beyond its starting template.</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(applyMenuPreset(settings, settings.template))}
          className="gap-1.5 text-[11px]"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
      </div>
      <ChoiceGroup
        label="Menu layout"
        value={settings.layout}
        options={designOptions.layout}
        onChange={(layout) => onChange({ ...settings, layout: layout as MenuSettings["layout"] })}
      />
      <ChoiceGroup
        label="Header"
        value={settings.headerStyle}
        options={designOptions.headerStyle}
        onChange={(headerStyle) => onChange({ ...settings, headerStyle: headerStyle as MenuSettings["headerStyle"] })}
      />
      <ChoiceGroup
        label="Item cards"
        value={settings.cardStyle}
        options={designOptions.cardStyle}
        onChange={(cardStyle) => onChange({ ...settings, cardStyle: cardStyle as MenuSettings["cardStyle"] })}
      />
      <ChoiceGroup
        label="Typography"
        value={settings.fontFamily}
        options={designOptions.fontFamily}
        onChange={(fontFamily) => onChange({ ...settings, fontFamily: fontFamily as MenuSettings["fontFamily"] })}
      />
      <ChoiceGroup
        label="Corners"
        value={settings.borderRadius}
        options={designOptions.borderRadius}
        onChange={(borderRadius) => onChange({ ...settings, borderRadius: borderRadius as MenuSettings["borderRadius"] })}
      />
      <ChoiceGroup
        label="Category headings"
        value={settings.categoryStyle}
        options={designOptions.categoryStyle}
        onChange={(categoryStyle) => onChange({ ...settings, categoryStyle: categoryStyle as MenuSettings["categoryStyle"] })}
      />
    </div>
  );
}

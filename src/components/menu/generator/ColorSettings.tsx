"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorControl } from "./ColorControl";
import { menuDesignPresets } from "@/lib/menu-settings";
import type { MenuSettings } from "@/types";

const colorFields = [
  ["background", "Background"],
  ["surface", "Cards"],
  ["text", "Text"],
  ["muted", "Muted text"],
  ["accent", "Accent"],
] as const;

interface ColorSettingsProps {
  settings: MenuSettings;
  onChange: (settings: MenuSettings) => void;
}

export function ColorSettings({ settings, onChange }: ColorSettingsProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted">Use any brand palette. Changes appear instantly.</p>
      {colorFields.map(([key, label]) => (
        <ColorControl
          key={key}
          label={label}
          value={settings.colors[key]}
          onChange={(value) =>
            onChange({ ...settings, colors: { ...settings.colors, [key]: value } })
          }
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          onChange({ ...settings, colors: { ...menuDesignPresets[settings.template].colors } })
        }
        className="w-full gap-2"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Restore template colors
      </Button>
    </div>
  );
}

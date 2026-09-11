"use client";

import { useState } from "react";
import { Palette, Paintbrush, Settings2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { applyMenuPreset } from "@/lib/menu-settings";
import type { MenuSettings } from "@/types";
import { TemplatePicker } from "./TemplatePicker";
import { DesignSettings } from "./DesignSettings";
import { ColorSettings } from "./ColorSettings";
import { ContentSettings } from "./ContentSettings";

type TabId = "template" | "design" | "colors" | "content";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "template", label: "Template", icon: Paintbrush },
  { id: "design", label: "Design", icon: Settings2 },
  { id: "colors", label: "Colors", icon: Palette },
  { id: "content", label: "Content", icon: FileText },
];

const tabClass = "flex flex-1 items-center justify-center gap-1.5 px-2 py-3 text-[11px] font-semibold transition";

interface MenuGeneratorPanelProps {
  settings: MenuSettings;
  businessName: string;
  pdfReady: boolean;
  generatingPdf: boolean;
  onSettingsChange: (settings: MenuSettings) => void;
  onBusinessNameChange: (name: string) => void;
  onSave: () => void;
}

export function MenuGeneratorPanel({
  settings,
  businessName,
  pdfReady,
  generatingPdf,
  onSettingsChange,
  onBusinessNameChange,
  onSave,
}: MenuGeneratorPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("template");

  return (
    <Card className="glass-card border-0 ring-0">
      <div className="flex border-b border-line">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                tabClass,
                activeTab === tab.id
                  ? "border-b-2 border-purple text-purple"
                  : "text-muted hover:text-ink"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <CardContent className="p-5">
        {activeTab === "template" && (
          <TemplatePicker
            selected={settings.template}
            onSelect={(template) => onSettingsChange(applyMenuPreset(settings, template))}
          />
        )}
        {activeTab === "design" && (
          <DesignSettings settings={settings} onChange={onSettingsChange} />
        )}
        {activeTab === "colors" && (
          <ColorSettings settings={settings} onChange={onSettingsChange} />
        )}
        {activeTab === "content" && (
          <ContentSettings
            settings={settings}
            businessName={businessName}
            pdfReady={pdfReady}
            generatingPdf={generatingPdf}
            onSettingsChange={onSettingsChange}
            onBusinessNameChange={onBusinessNameChange}
            onSave={onSave}
          />
        )}
      </CardContent>
    </Card>
  );
}

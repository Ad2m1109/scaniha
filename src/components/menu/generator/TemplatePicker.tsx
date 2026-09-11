"use client";

import { Check } from "lucide-react";
import { menuTemplates } from "@/components/menu/MenuPreview";
import { cn } from "@/lib/utils";
import type { MenuSettings } from "@/types";

interface TemplatePickerProps {
  selected: MenuSettings["template"];
  onSelect: (template: MenuSettings["template"]) => void;
}

export function TemplatePicker({ selected, onSelect }: TemplatePickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted">Pick a starting point. You can customize everything after.</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {menuTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3 text-left transition",
              selected === template.id
                ? "border-purple bg-purple-soft"
                : "border-line bg-surface-soft hover:border-line-strong"
            )}
          >
            <span className={cn("h-9 w-9 rounded-lg", template.swatch)} />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-ink">{template.name}</span>
              <span className="block text-[11px] text-muted">{template.description}</span>
            </span>
            {selected === template.id ? (
              <Check className="h-4 w-4 text-purple" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ChoiceGroupProps {
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
}

export function ChoiceGroup({ label, value, options, onChange }: ChoiceGroupProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-soft p-1">
        {options.map(([id, name]) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-lg px-2 py-2 text-[11px] font-semibold transition",
              value === id
                ? "bg-surface-solid text-purple shadow-sm"
                : "text-muted hover:text-ink"
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

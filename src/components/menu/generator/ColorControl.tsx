interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-soft px-3 py-2">
      <span className="text-xs font-semibold text-ink">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase text-muted">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
      </span>
    </label>
  );
}

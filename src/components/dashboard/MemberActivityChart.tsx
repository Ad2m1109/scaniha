"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useAppData } from "@/context/AppDataContext";
import { analyticsSeries } from "@/lib/analytics";
import type { ChartRange } from "@/types";

const config = { views: { label: "Menu views", color: "var(--purple)" }, visits: { label: "Visits", color: "var(--success)" } } satisfies ChartConfig;

export function MemberActivityChart({ defaultRange = "7D" }: { defaultRange?: ChartRange }) {
  const data = useAppData(); const [range, setRange] = useState<ChartRange>(defaultRange); const series = useMemo(() => analyticsSeries(data, range), [data, range]);
  return <Card className="glass-card min-w-0 border-0 p-0 ring-0"><CardHeader className="gap-3 p-5 pb-0 sm:p-6 sm:pb-0"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><CardTitle className="card-title">Menu & loyalty activity</CardTitle><CardDescription className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>Views and customer visits over time</CardDescription></div><div className="flex shrink-0 items-center gap-1 rounded-xl border border-line bg-surface-soft p-1">{(["7D", "30D", "90D"] as ChartRange[]).map((option) => <Button key={option} variant="ghost" size="sm" className="range-button h-7 px-2.5 text-[11px] font-bold" data-active={range === option} onClick={() => setRange(option)}>{option}</Button>)}</div></div></CardHeader><CardContent className="p-5 pt-4 sm:p-6"><ChartContainer config={config} className="h-[250px] w-full"><AreaChart data={series} margin={{ top: 12, right: 5, left: -25, bottom: 0 }}><defs><linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--purple)" stopOpacity={0.25} /><stop offset="100%" stopColor="var(--purple)" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="3 7" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--faint)", fontSize: 10 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "var(--faint)", fontSize: 10 }} /><ChartTooltip content={<ChartTooltipContent indicator="line" />} /><Legend verticalAlign="top" align="right" content={<ChartLegendContent className="justify-end pb-3 text-[11px]" />} /><Area type="monotone" dataKey="views" stroke="var(--purple)" strokeWidth={2.5} fill="url(#viewsFill)" /><Area type="monotone" dataKey="visits" stroke="var(--success)" strokeWidth={2} fill="transparent" /></AreaChart></ChartContainer></CardContent></Card>;
}

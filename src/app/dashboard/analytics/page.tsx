"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Coins, Eye, Footprints, Gift, QrCode, Users } from "lucide-react";
import { MemberActivityChart } from "@/components/dashboard/MemberActivityChart";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import { analyticsTotals } from "@/lib/analytics";
import { formatNumber } from "@/lib/formatters";
import type { ChartRange } from "@/types";

export default function AnalyticsPage() {
  const data = useAppData(); const [range, setRange] = useState<ChartRange>("30D"); const totals = useMemo(() => analyticsTotals(data, range), [data, range]);
  const stats: { label: string; value: number; icon: LucideIcon; style: string }[] = [
    { label: "Menu views", value: totals.menuViews, icon: Eye, style: "bg-purple-soft text-purple" }, { label: "QR scans", value: totals.qrScans, icon: QrCode, style: "bg-secondary text-foreground" }, { label: "New customers", value: totals.customers, icon: Users, style: "bg-purple-soft text-purple" }, { label: "Visits", value: totals.visits, icon: Footprints, style: "bg-success-soft text-success" }, { label: "Points issued", value: totals.pointsIssued, icon: Coins, style: "bg-gold-soft text-accent-foreground" }, { label: "Points redeemed", value: totals.pointsRedeemed, icon: Coins, style: "bg-secondary text-foreground" }, { label: "Rewards redeemed", value: totals.rewardsRedeemed, icon: Gift, style: "bg-gold-soft text-accent-foreground" },
  ];
  return <div className="mx-auto max-w-[1280px] space-y-6"><PageIntro eyebrow="Performance" title="Know what’s working at the counter." description="Measure menu discovery and loyalty activity using real actions in this workspace." action={<div className="flex rounded-xl border border-line bg-surface-soft p-1">{(["7D", "30D", "90D"] as ChartRange[]).map((item) => <Button key={item} variant="ghost" size="sm" className="range-button h-8" data-active={range === item} onClick={() => setRange(item)}>{item}</Button>)}</div>} /><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label} className="glass-card border-0 ring-0"><CardContent className="flex items-center gap-4 p-5"><span className={`grid h-10 w-10 place-items-center rounded-xl ${stat.style}`}><Icon className="h-4 w-4" /></span><div><p className="metric-value text-xl">{formatNumber(stat.value)}</p><p className="mt-1 text-xs text-muted">{stat.label}</p></div></CardContent></Card>; })}</section><MemberActivityChart key={range} defaultRange={range} /></div>;
}

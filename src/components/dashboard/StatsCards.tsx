"use client";

import type { LucideIcon } from "lucide-react";
import { Coins, Eye, Footprints, Gift, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import { formatNumber } from "@/lib/formatters";

export function StatsCards() {
  const data = useAppData();
  const cards: { label: string; value: number; icon: LucideIcon; style: string }[] = [
    { label: "Menu views", value: data.menuViews.length, icon: Eye, style: "bg-purple-soft text-purple" },
    { label: "Customers", value: data.customers.length, icon: Users, style: "bg-secondary text-foreground" },
    { label: "Visits", value: data.visits.length, icon: Footprints, style: "bg-success-soft text-success" },
    { label: "Points", value: data.customers.reduce((sum, item) => sum + item.points, 0), icon: Coins, style: "bg-gold-soft text-accent-foreground" },
    { label: "Rewards redeemed", value: data.redemptions.length, icon: Gift, style: "bg-purple-soft text-purple" },
  ];
  return <section aria-label="Program metrics" className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label} className="glass-card stat-card hover-lift min-w-0 border-0 p-0 ring-0"><CardContent className="flex min-h-[140px] flex-col p-5"><span className={`grid h-9 w-9 place-items-center rounded-xl ${card.style}`}><Icon className="h-[18px] w-[18px]" /></span><div className="mt-auto"><p className="metric-value">{formatNumber(card.value)}</p><p className="mt-2 text-xs font-medium" style={{ color: 'var(--muted)' }}>{card.label}</p></div></CardContent></Card>; })}</section>;
}

import type { LucideIcon } from "lucide-react";
import { Coins, Footprints, Gift, Repeat2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/data/dashboard";
import { formatNumber, formatPercent } from "@/lib/formatters";

interface StatCard {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  iconClassName: string;
  accentClassName: string;
}

const statCards: StatCard[] = [
  {
    label: "Total visits",
    value: formatNumber(dashboardStats.totalVisits),
    delta: "+8.2%",
    icon: Footprints,
    iconClassName: "bg-purple-soft text-purple",
    accentClassName: "bg-purple",
  },
  {
    label: "Points issued",
    value: formatNumber(dashboardStats.totalPoints),
    delta: "+15.4%",
    icon: Coins,
    iconClassName: "bg-gold-soft text-amber-700",
    accentClassName: "bg-gold",
  },
  {
    label: "Rewards redeemed",
    value: formatNumber(dashboardStats.rewardsGiven),
    delta: "+5.1%",
    icon: Gift,
    iconClassName: "bg-indigo-100 text-indigo-700",
    accentClassName: "bg-indigo-400",
  },
  {
    label: "Repeat rate",
    value: formatPercent(dashboardStats.repeatRate),
    delta: "+3.6%",
    icon: Repeat2,
    iconClassName: "bg-emerald-100 text-emerald-700",
    accentClassName: "bg-emerald-500",
  },
];

export function StatsCards() {
  return (
    <section aria-label="Program metrics" className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="glass-card stat-card hover-lift min-w-0 border-0 p-0 ring-0">
            <CardContent className="flex min-h-[150px] flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${stat.iconClassName}`}>
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {stat.delta}
                </span>
              </div>
              <div className="mt-auto">
                <p className="metric-value">{stat.value}</p>
                <p className="mt-2 text-xs font-medium text-muted">{stat.label}</p>
              </div>
              <span className={`stat-accent mt-4 block h-1 w-2/3 rounded-full ${stat.accentClassName}`} />
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

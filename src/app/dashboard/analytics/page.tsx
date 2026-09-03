"use client";

import { BarChart3, Coffee, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PageIntro } from "@/components/shared/PageIntro";

const stats = [
  {
    title: "Total revenue",
    value: "DA 124,500",
    change: "+15%",
    icon: TrendingUp,
    iconClassName: "bg-gold-soft text-amber-700",
    accentClassName: "bg-gold",
  },
  {
    title: "New members",
    value: "48",
    change: "+8%",
    icon: Users,
    iconClassName: "bg-purple-soft text-purple",
    accentClassName: "bg-purple",
  },
  {
    title: "Total orders",
    value: "342",
    change: "+12%",
    icon: Coffee,
    iconClassName: "bg-gold-soft text-amber-700",
    accentClassName: "bg-gold",
  },
  {
    title: "Conversion rate",
    value: "24%",
    change: "+3%",
    icon: BarChart3,
    iconClassName: "bg-success-soft text-success",
    accentClassName: "bg-success",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Performance"
        title="Know what's working at the counter."
        description="Track revenue, member growth, and order volume across your cafe."
      />

      <section aria-label="Performance metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass-card min-w-0 border-0 p-0 ring-0">
              <CardContent className="flex min-h-[150px] flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl ${stat.iconClassName}`}>
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-auto">
                  <p className="metric-value">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium text-muted">{stat.title}</p>
                </div>
                <span className={`stat-accent mt-4 block h-1 w-2/3 rounded-full ${stat.accentClassName}`} />
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

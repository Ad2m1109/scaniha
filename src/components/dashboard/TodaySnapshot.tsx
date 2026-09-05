"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Repeat2, TicketCheck, UserPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppData } from "@/context/AppDataContext";
import { formatNumber } from "@/lib/formatters";

export function TodaySnapshot() {
  const { customers, redemptions, visits } = useAppData();
  const [now] = useState(() => Date.now());

  const snapshotItems = useMemo(() => {
    const today = new Date(now).toISOString().slice(0, 10);
    const todayRedemptions = redemptions.filter((r) => r.createdAt.startsWith(today));
    const todayCustomers = customers.filter((c) => c.joinedAt === today);

    const sevenDaysAgo = new Date(now - 7 * 86_400_000).toISOString();
    const recentVisitors = new Set(
      visits.filter((v) => v.createdAt >= sevenDaysAgo).map((v) => v.customerId)
    );
    const returningRate = customers.length > 0
      ? Math.round((recentVisitors.size / customers.length) * 100)
      : 0;

    return [
      {
        label: "New members",
        description: "Joined the program today",
        value: formatNumber(todayCustomers.length),
        icon: UserPlus,
        iconClassName: "bg-purple-soft text-purple",
      },
      {
        label: "Rewards claimed",
        description: "Redeemed today",
        value: formatNumber(todayRedemptions.length),
        icon: TicketCheck,
        iconClassName: "bg-gold-soft text-accent-foreground",
      },
      {
        label: "Returning guests",
        description: "Came back within 7 days",
        value: `${returningRate}%`,
        icon: Repeat2,
        iconClassName: "bg-success-soft text-success",
      },
    ];
  }, [now, customers, redemptions, visits]);

  return (
    <Card className="glass-card min-w-0 border-0 p-0 ring-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
        <div>
          <CardTitle className="card-title">Today&apos;s snapshot</CardTitle>
          <p className="mt-1 text-xs text-muted">A quick pulse from the floor</p>
        </div>
        <Badge className="h-auto rounded-full border-0 bg-success-soft px-2.5 py-1 text-[10px] font-bold text-success">Live</Badge>
      </CardHeader>
      <CardContent className="p-5 pt-4 sm:p-6 sm:pt-4">
        <div>
          {snapshotItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                {index > 0 ? <Separator className="bg-line" /> : null}
                <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${item.iconClassName}`}>
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold" style={{ color: 'var(--ink)' }}>{item.label}</p>
                    <p className="mt-0.5 truncate text-[11px]" style={{ color: 'var(--muted)' }}>{item.description}</p>
                  </div>
                  <span className="numeric text-base font-bold" style={{ color: 'var(--ink)' }}>{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Button variant="outline" type="button" className="mt-5 flex w-full items-center justify-between rounded-xl border-line bg-surface-soft px-3.5 text-xs font-bold text-purple-dark hover:border-line-strong hover:bg-purple-wash">
          View activity
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-purple" strokeWidth={1.8} />
        </Button>
      </CardContent>
    </Card>
  );
}

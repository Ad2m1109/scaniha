"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { activitySeries } from "@/lib/data/dashboard";
import { formatNumber } from "@/lib/formatters";
import type { ChartRange } from "@/types";

const chartConfig = {
  visits: {
    label: "Visits",
    color: "var(--purple)",
  },
  rewards: {
    label: "Reward actions",
    color: "var(--gold)",
  },
} satisfies ChartConfig;

const rangeOptions: ChartRange[] = ["7D", "30D", "90D"];

const rangeCaptions: Record<ChartRange, string> = {
  "7D": "12.8% more activity than the previous period",
  "30D": "18.6% more activity than the previous period",
  "90D": "24.1% more activity than the previous period",
};

const rangeTotals: Record<ChartRange, number> = {
  "7D": 3421,
  "30D": 14806,
  "90D": 42530,
};

export function MemberActivityChart() {
  const [range, setRange] = useState<ChartRange>("7D");
  const data = useMemo(() => activitySeries[range], [range]);
  const totalVisits = rangeTotals[range];

  return (
    <Card className="glass-card min-w-0 border-0 p-0 ring-0">
      <CardHeader className="gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <CardTitle className="card-title">Member activity</CardTitle>
            <CardDescription className="mt-1 text-xs text-muted">Visits and reward actions across your member base</CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-line bg-surface-soft p-1" role="group" aria-label="Activity date range">
            {rangeOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                size="sm"
                type="button"
                className="range-button h-7 rounded-lg px-2.5 text-[11px] font-bold"
                data-active={range === option}
                aria-pressed={range === option}
                onClick={() => setRange(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-4 sm:p-6 sm:pt-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-2">
            <p className="metric-value text-[26px]">{formatNumber(totalVisits)}</p>
            <span className="mb-0.5 text-xs font-semibold text-muted">visits</span>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="mt-3 h-[235px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 4, left: -18, bottom: 2 }}>
            <defs>
              <linearGradient id="memberVisitsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--purple)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--purple)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="memberRewardsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.16} />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="3 7" />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--faint)", fontSize: 10 }} tickMargin={8} />
            <YAxis hide domain={["dataMin - 80", "dataMax + 80"]} />
            <ChartTooltip
              cursor={{ stroke: "var(--line-strong)", strokeDasharray: "4 4" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Legend
              verticalAlign="top"
              align="right"
              content={<ChartLegendContent className="hidden justify-end pb-2 pt-0 text-[11px] text-muted sm:flex" />}
            />
            <Area type="monotone" dataKey="visits" stroke="var(--purple)" strokeWidth={2.5} fill="url(#memberVisitsFill)" activeDot={{ r: 4, fill: "var(--purple)", stroke: "var(--surface-solid)", strokeWidth: 2 }} />
            <Area type="monotone" dataKey="rewards" stroke="var(--gold)" strokeWidth={1.8} strokeDasharray="4 4" fill="url(#memberRewardsFill)" activeDot={{ r: 3, fill: "var(--gold)", stroke: "var(--surface-solid)", strokeWidth: 2 }} />
          </AreaChart>
        </ChartContainer>
        <p className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
          <span aria-hidden="true">↗</span>
          {rangeCaptions[range]}
        </p>
      </CardContent>
    </Card>
  );
}

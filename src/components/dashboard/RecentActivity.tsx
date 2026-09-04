"use client";

import Link from "next/link";
import { Coins, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";

export function RecentActivity() {
  const data = useAppData();
  const activity = [...data.visits.map((item) => ({ ...item, kind: "visit" as const })), ...data.redemptions.map((item) => ({ ...item, kind: "reward" as const }))].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  return <Card className="glass-card min-w-0 border-0 p-0 ring-0"><CardHeader className="flex flex-row items-center justify-between"><div><p className="eyebrow">Live feed</p><CardTitle className="mt-1.5">Recent activity</CardTitle></div><Badge className="border-0 bg-success-soft text-success">Live</Badge></CardHeader><CardContent className="space-y-1">{activity.map((item) => { const customer = data.customers.find((entry) => entry.id === item.customerId); const reward = item.kind === "reward" ? data.rewards.find((entry) => entry.id === item.rewardId) : null; const points = item.kind === "visit" ? item.pointsEarned : -item.pointsSpent; const Icon = item.kind === "visit" ? Coins : Gift; return <Link href={`/dashboard/customers/${item.customerId}`} key={item.id} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-purple-wash"><span className={`grid h-9 w-9 place-items-center rounded-lg ${item.kind === "visit" ? "bg-success-soft text-success" : "bg-gold-soft text-accent-foreground"}`}><Icon className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-ink">{customer?.name ?? "Customer"}</p><p className="truncate text-[11px] text-muted">{item.kind === "visit" ? "Visit recorded" : `Redeemed ${reward?.name ?? "reward"}`}</p></div><div className="text-right"><p className={`text-xs font-bold ${points > 0 ? "text-success" : "text-destructive"}`}>{points > 0 ? "+" : ""}{points} pts</p>                <p className="mt-0.5 text-[10px] text-muted">{new Date(item.createdAt).toLocaleDateString()}</p></div></Link>; })}{!activity.length ? <p className="py-10 text-center text-xs text-muted">Activity will appear after the first visit.</p> : null}</CardContent></Card>;
}

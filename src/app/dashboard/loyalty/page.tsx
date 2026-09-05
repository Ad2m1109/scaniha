"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift, Save, Users } from "lucide-react";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppDataContext";

function LoyaltyEditor() {
  const data = useAppData();
  const [pointsPerVisit, setPointsPerVisit] = useState(String(data.loyalty.pointsPerVisit));
  const [welcomeBonus, setWelcomeBonus] = useState(String(data.loyalty.welcomeBonus));
  const history = [...data.visits.map((item) => ({ id: item.id, date: item.createdAt, customerId: item.customerId, label: "Visit", points: item.pointsEarned })), ...data.redemptions.map((item) => ({ id: item.id, date: item.createdAt, customerId: item.customerId, label: "Reward redeemed", points: -item.pointsSpent }))].sort((a, b) => b.date.localeCompare(a.date));
  return <div className="mx-auto max-w-[1280px] space-y-6"><PageIntro eyebrow="Loyalty program" title="Turn visits into rewards." description="Configure how customers earn points and review loyalty activity." action={<Button variant={data.loyalty.enabled ? "outline" : "default"} onClick={() => data.updateLoyalty({ ...data.loyalty, enabled: !data.loyalty.enabled })}>{data.loyalty.enabled ? "Disable loyalty" : "Enable loyalty"}</Button>} /><div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]"><Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title">Earning rules</CardTitle><p className="text-xs text-muted">These settings apply to every new visit.</p></CardHeader><CardContent className="space-y-5"><div className={`rounded-xl border p-4 ${data.loyalty.enabled ? "border-success/30 bg-success-soft" : "border-line bg-surface-soft"}`}><p className="text-xs font-bold text-ink">Program {data.loyalty.enabled ? "active" : "paused"}</p><p className="mt-1 text-[11px] text-muted">{data.loyalty.enabled ? "Customers are earning and redeeming points." : "Visits can’t earn points while paused."}</p></div><div className="space-y-2"><Label htmlFor="points-per-visit">Points per visit</Label><Input id="points-per-visit" type="number" min="1" value={pointsPerVisit} onChange={(e) => setPointsPerVisit(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="welcome-bonus">New customer bonus</Label><Input id="welcome-bonus" type="number" min="0" value={welcomeBonus} onChange={(e) => setWelcomeBonus(e.target.value)} /></div><Button className="w-full gap-2 bg-purple text-white" onClick={() => data.updateLoyalty({ ...data.loyalty, pointsPerVisit: Math.max(1, Number(pointsPerVisit)), welcomeBonus: Math.max(0, Number(welcomeBonus)) })}><Save className="h-4 w-4" /> Save settings</Button></CardContent></Card><Card className="glass-card border-0 ring-0"><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle className="card-title">Loyalty history</CardTitle><p className="mt-1 text-xs text-muted">Visits and redemptions across all customers.</p></div><Button variant="outline" size="sm" render={<Link href="/dashboard/rewards" />} className="gap-2"><Gift className="h-3.5 w-3.5" /> Rewards</Button></CardHeader><CardContent>{history.slice(0, 20).map((item) => { const customer = data.customers.find((entry) => entry.id === item.customerId); return <Link key={item.id} href={`/dashboard/customers/${item.customerId}`} className="flex items-center gap-3 border-b border-line py-3 last:border-0"><span className="grid h-9 w-9 place-items-center rounded-lg bg-purple-soft text-purple"><Users className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-xs font-bold text-ink">{customer?.name ?? "Deleted customer"}</p><p className="text-[11px] text-muted">{item.label} · {new Date(item.date).toLocaleString()}</p></div><span className={`text-xs font-bold ${item.points > 0 ? "text-success" : "text-destructive"}`}>{item.points > 0 ? "+" : ""}{item.points} pts</span></Link>; })}{!history.length ? <p className="py-10 text-center text-xs text-muted">No loyalty history yet.</p> : null}</CardContent></Card></div></div>;
}

export default function LoyaltyPage() {
  const data = useAppData();
  if (!data.ready) return <div className="py-20 text-center text-sm text-muted">Loading loyalty settings…</div>;
  return <LoyaltyEditor />;
}

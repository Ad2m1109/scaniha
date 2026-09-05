"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarCheck, Gift, Mail, Phone, QrCode, Trash2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import { formatNumber } from "@/lib/formatters";

export function CustomerProfile({ customerId }: { customerId: string }) {
  const router = useRouter();
  const data = useAppData();
  const customer = data.customers.find((item) => item.id === customerId);
  if (!data.ready) return <div className="py-20 text-center text-sm text-muted">Loading customer…</div>;
  if (!customer) return <div className="mx-auto max-w-xl py-20 text-center"><h1 className="page-title">Customer not found</h1><Button render={<Link href="/dashboard/customers" />} className="mt-5">Back to customers</Button></div>;

  const history = [
    ...data.visits.filter((item) => item.customerId === customer.id).map((item) => ({ id: item.id, date: item.createdAt, label: "Visit recorded", points: item.pointsEarned })),
    ...data.redemptions.filter((item) => item.customerId === customer.id).map((item) => ({ id: item.id, date: item.createdAt, label: `Redeemed ${data.rewards.find((reward) => reward.id === item.rewardId)?.name ?? "reward"}`, points: -item.pointsSpent })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return <div className="mx-auto max-w-[1280px] space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><Button variant="ghost" render={<Link href="/dashboard/customers" />} className="gap-2"><ArrowLeft className="h-4 w-4" /> Customers</Button><div className="flex gap-2"><CustomerForm customer={customer} /><Button variant="outline" className="gap-2 text-destructive" onClick={() => { if (window.confirm(`Delete ${customer.name}?`)) { data.deleteCustomer(customer.id); router.push("/dashboard/customers"); } }}><Trash2 className="h-4 w-4" /> Delete</Button></div></div>
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_340px]">
      <Card className="glass-card border-0 ring-0"><CardContent className="p-6"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><div className="flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-full bg-purple-soft text-lg font-bold text-purple">{customer.name.split(" ").map((part) => part[0]).join("")}</div><div><h1 className="page-title text-2xl">{customer.name}</h1><Badge className="mt-1 border-0 bg-gold-soft text-accent-foreground">{customer.tier} member</Badge></div></div><div className="mt-6 space-y-2 text-sm text-muted"><p className="flex items-center gap-2"><Mail className="h-4 w-4 text-faint" />{customer.email || "No email"}</p><p className="flex items-center gap-2"><Phone className="h-4 w-4 text-faint" />{customer.phone}</p></div></div><Button onClick={() => data.recordVisit(customer.id)} className="gap-2 bg-purple text-white"><CalendarCheck className="h-4 w-4" /> Record visit (+{data.loyalty.pointsPerVisit})</Button></div><div className="mt-7 grid grid-cols-3 gap-3 border-t border-line pt-5"><div><p className="metric-value">{formatNumber(customer.points)}</p><p className="mt-1 text-xs text-muted">Points</p></div><div><p className="metric-value">{customer.visits}</p><p className="mt-1 text-xs text-muted">Visits</p></div><div><p className="metric-value">{data.redemptions.filter((item) => item.customerId === customer.id).length}</p><p className="mt-1 text-xs text-muted">Rewards</p></div></div></CardContent></Card>
      <Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title flex items-center gap-2"><QrCode className="h-4 w-4 text-purple" /> Customer QR</CardTitle></CardHeader><CardContent className="flex flex-col items-center pb-6"><div className="rounded-xl border border-line bg-white p-4"><QRCodeSVG value={customer.qrCode} size={150} /></div><code className="mt-3 text-xs font-bold text-muted">{customer.qrCode}</code></CardContent></Card>
    </section>
    <section className="grid gap-5 lg:grid-cols-2"><Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title">Available rewards</CardTitle></CardHeader><CardContent className="space-y-2">{data.rewards.filter((reward) => reward.status === "active").map((reward) => <div key={reward.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface-soft p-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-soft text-accent-foreground"><Gift className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-xs font-bold text-ink">{reward.name}</p><p className="text-[11px] text-muted">{reward.pointsRequired} points</p></div><Button size="sm" variant="outline" disabled={customer.points < reward.pointsRequired} onClick={() => data.redeemReward(customer.id, reward.id)}>Redeem</Button></div>)}</CardContent></Card><Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title">Loyalty history</CardTitle></CardHeader><CardContent className="space-y-1">{history.slice(0, 12).map((item) => <div key={item.id} className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-0"><div><p className="text-xs font-bold text-ink">{item.label}</p><p className="mt-0.5 text-[10px] text-muted">{new Date(item.date).toLocaleString()}</p></div><span className={`text-xs font-bold ${item.points > 0 ? "text-success" : "text-destructive"}`}>{item.points > 0 ? "+" : ""}{item.points} pts</span></div>)}{!history.length ? <p className="py-8 text-center text-xs text-muted">No loyalty activity yet.</p> : null}</CardContent></Card></section>
  </div>;
}

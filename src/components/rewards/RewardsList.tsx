"use client";

import { Gift, Trash2 } from "lucide-react";
import { RewardForm } from "@/components/rewards/RewardForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";

export function RewardsList() {
  const { rewards, deleteReward, saveReward } = useAppData();
  if (!rewards.length) return <div className="glass-card rounded-2xl p-12 text-center"><Gift className="mx-auto h-7 w-7 text-faint" /><p className="mt-3 font-bold text-ink">No rewards yet</p><p className="mt-1 text-xs text-muted">Create the first reward for your members.</p></div>;
  return <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{rewards.map((reward) => <Card key={reward.id} className="glass-card overflow-hidden border-0 p-0 ring-0">{reward.image ? <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url(${reward.image})` }} /> : null}<CardContent className="flex min-h-[200px] flex-col p-6"><div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-soft text-accent-foreground"><Gift className="h-5 w-5" /></span><button onClick={() => saveReward({ ...reward, status: reward.status === "active" ? "paused" : "active" })}><Badge className={reward.status === "active" ? "border-0 bg-success-soft text-success" : "border-0 bg-secondary text-muted"}>{reward.status}</Badge></button></div><h2 className="card-title mt-5">{reward.name}</h2><p className="mt-1 line-clamp-2 text-xs text-muted">{reward.description}</p><div className="mt-auto flex items-end justify-between gap-3 pt-5"><div><p className="metric-value text-xl">{reward.pointsRequired} <span className="text-xs text-muted">pts</span></p><p className="mt-1 text-[10px] text-muted">{reward.redemptions} redeemed</p></div><div className="flex gap-1"><RewardForm reward={reward} trigger={<Button variant="outline" size="sm">Edit</Button>} /><Button variant="outline" size="icon-sm" onClick={() => { if (window.confirm(`Delete ${reward.name}?`)) deleteReward(reward.id); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button></div></div></CardContent></Card>)}</section>;
}

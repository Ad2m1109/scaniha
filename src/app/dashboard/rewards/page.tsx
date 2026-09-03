"use client";

import { ArrowRight, Gift, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageIntro } from "@/components/shared/PageIntro";

const rewards = [
  { id: 1, name: "Café Gratuit", points: 100, claimed: 45 },
  { id: 2, name: "Croissant Offert", points: 75, claimed: 32 },
  { id: 3, name: "Remise 10%", points: 200, claimed: 18 },
];

export default function RewardsPage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Rewards catalog"
        title="Rewards worth coming back for."
        description="Design the perks your regulars actually look forward to redeeming."
        action={
          <Button
            type="button"
            className="h-10 gap-2 rounded-xl bg-purple px-4 text-xs font-bold text-white shadow-[0_8px_18px_#7C3AED2E] hover:bg-purple-dark"
          >
            <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            Add reward
          </Button>
        }
      />

      <section aria-label="Rewards" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rewards.map((reward) => (
          <Card key={reward.id} className="glass-card min-w-0 border-0 p-0 ring-0">
            <CardContent className="flex min-h-[190px] flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-soft text-amber-700">
                  <Gift aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <Badge className="h-auto rounded-full border-0 bg-purple-soft px-2.5 py-1 text-[10px] font-bold text-purple-dark">
                  {reward.claimed} claimed
                </Badge>
              </div>
              <h2 className="card-title mt-5">{reward.name}</h2>
              <p className="mt-1 text-xs font-medium text-muted">Points required</p>
              <div className="mt-auto flex items-end justify-between pt-5">
                <p className="metric-value">
                  {reward.points} <span className="text-base font-semibold text-faint">pts</span>
                </p>
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-faint" strokeWidth={1.8} />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

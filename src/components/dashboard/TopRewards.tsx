import type { LucideIcon } from "lucide-react";
import { ArrowRight, Coffee, Croissant, CupSoda } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rewards } from "@/lib/data/rewards";
import { formatPoints } from "@/lib/formatters";

interface RewardIcon {
  icon: LucideIcon;
  iconClassName: string;
}

const rewardIcons: Record<string, RewardIcon> = {
  "free-latte": { icon: CupSoda, iconClassName: "bg-gold-soft text-amber-700" },
  "pastry-pair": { icon: Croissant, iconClassName: "bg-purple-soft text-purple" },
  "coffee-flight": { icon: Coffee, iconClassName: "bg-indigo-100 text-indigo-700" },
};

export function TopRewards() {
  return (
    <Card className="glass-card min-w-0 border-0 p-0 ring-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
        <div>
          <p className="eyebrow text-amber-600 dark:text-amber-300">Keep them coming back</p>
          <CardTitle className="mt-1.5">Top rewards</CardTitle>
        </div>
        <Button variant="link" type="button" className="h-auto gap-1 p-0 text-[11px] font-bold text-purple-dark dark:text-purple-300">
          Manage <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2.5 p-5 pt-4 sm:p-6 sm:pt-5">
        {rewards.slice(0, 3).map((reward) => {
          const rewardIcon = rewardIcons[reward.id];
          const Icon = rewardIcon.icon;
          return (
            <div key={reward.id} className="hover-lift flex items-center gap-3 rounded-xl border border-line bg-surface-soft px-3 py-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${rewardIcon.iconClassName}`}>
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-ink">{reward.name}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted">{reward.description}</p>
              </div>
              <Badge className="h-auto shrink-0 rounded-full border-0 bg-gold-soft px-2.5 py-1 text-[10px] font-bold text-amber-700">{formatPoints(reward.pointsRequired)}</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

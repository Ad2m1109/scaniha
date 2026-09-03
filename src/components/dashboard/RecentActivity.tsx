import { Coins, Gift, MapPin, type LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities } from "@/lib/data/dashboard";
import { formatPoints, formatRelativeTime } from "@/lib/formatters";
import type { ActivityType } from "@/types";

const activityIcons = {
  member: Coins,
  reward: Gift,
  visit: MapPin,
} satisfies Record<ActivityType, LucideIcon>;

const activityStyles: Record<ActivityType, string> = {
  member: "bg-purple-soft text-purple",
  reward: "bg-gold-soft text-amber-700",
  visit: "bg-emerald-100 text-emerald-700",
};

export function RecentActivity() {
  return (
    <Card className="glass-card min-w-0 border-0 p-0 ring-0">
      <CardHeader className="flex flex-row items-center justify-between gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
        <div>
          <p className="eyebrow">Live feed</p>
          <CardTitle className="mt-1.5">Recent activity</CardTitle>
        </div>
        <Badge variant="secondary" className="rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-bold text-success">Live</Badge>
      </CardHeader>
      <CardContent className="space-y-1 p-5 pt-4 sm:p-6 sm:pt-4">
        {recentActivities.map((activity) => {
          const Icon = activityIcons[activity.type];
          const initials = activity.customerName.split(" ").map((part) => part[0]).join("");
          return (
            <div key={activity.id} className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-purple-wash">
              <Avatar size="sm" className="h-8 w-8 bg-purple-soft text-purple">
                <AvatarFallback className="bg-transparent text-[10px] font-bold text-purple">{initials}</AvatarFallback>
              </Avatar>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${activityStyles[activity.type]}`}>
                <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-ink">{activity.customerName}</p>
                <p className="truncate text-[11px] text-muted">{activity.action}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`numeric text-[11px] font-bold ${activity.points < 0 ? "text-amber-700" : "text-success"}`}>{activity.points > 0 ? "+" : ""}{formatPoints(activity.points)}</p>
                <p className="mt-0.5 text-[10px] text-faint">{formatRelativeTime(activity.minutesAgo)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

import type { AppState, ChartRange } from "@/types";

export const rangeDays: Record<ChartRange, number> = { "7D": 7, "30D": 30, "90D": 90 };

export function since(range: ChartRange) {
  return Date.now() - rangeDays[range] * 86_400_000;
}

export function analyticsTotals(data: AppState, range: ChartRange) {
  const start = since(range);
  const views = data.menuViews.filter((item) => new Date(item.createdAt).getTime() >= start);
  const visits = data.visits.filter((item) => new Date(item.createdAt).getTime() >= start);
  const redemptions = data.redemptions.filter((item) => new Date(item.createdAt).getTime() >= start);
  const customers = data.customers.filter((item) => new Date(item.joinedAt).getTime() >= start);
  return {
    menuViews: views.length,
    qrScans: views.filter((item) => item.source === "qr").length,
    customers: customers.length,
    visits: visits.length,
    pointsIssued: visits.reduce((sum, item) => sum + item.pointsEarned, 0),
    pointsRedeemed: redemptions.reduce((sum, item) => sum + item.pointsSpent, 0),
    rewardsRedeemed: redemptions.length,
  };
}

export function analyticsSeries(data: AppState, range: ChartRange) {
  const days = rangeDays[range];
  const bucketSize = range === "7D" ? 1 : range === "30D" ? 5 : 15;
  const buckets = Math.ceil(days / bucketSize);
  return Array.from({ length: buckets }, (_, index) => {
    const end = Date.now() - (buckets - index - 1) * bucketSize * 86_400_000;
    const start = end - bucketSize * 86_400_000;
    const inBucket = (date: string) => { const time = new Date(date).getTime(); return time >= start && time < end; };
    return {
      label: new Date(start).toLocaleDateString("en", { month: "short", day: "numeric" }),
      views: data.menuViews.filter((item) => inBucket(item.createdAt)).length,
      visits: data.visits.filter((item) => inBucket(item.createdAt)).length,
      rewards: data.redemptions.filter((item) => inBucket(item.createdAt)).length,
    };
  });
}

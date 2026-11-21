import type { Activity, ActivityPoint, Stats } from "@/types";

export const dashboardStats: Stats = {
  totalCustomers: 1284,
  totalVisits: 3421,
  totalPoints: 42530,
  rewardsGiven: 892,
  repeatRate: 0.684,
  memberGrowth: 0.128,
};

export const recentActivities: Activity[] = [
  {
    id: "activity-1",
    customerName: "Ahmed Benali",
    action: "claimed a free latte",
    type: "reward",
    points: -250,
    minutesAgo: 2,
  },
  {
    id: "activity-2",
    customerName: "Sarah Khelil",
    action: "earned points on a morning order",
    type: "member",
    points: 50,
    minutesAgo: 15,
  },
  {
    id: "activity-3",
    customerName: "Karim Boudia",
    action: "visited Northstar Coffee",
    type: "visit",
    points: 10,
    minutesAgo: 60,
  },
  {
    id: "activity-4",
    customerName: "Leila Mansouri",
    action: "unlocked $5 off their order",
    type: "reward",
    points: -250,
    minutesAgo: 120,
  },
];

export const activitySeries: Record<"7D" | "30D" | "90D", ActivityPoint[]> = {
  "7D": [
    { label: "Mon", visits: 340, rewards: 70 },
    { label: "Tue", visits: 386, rewards: 82 },
    { label: "Wed", visits: 372, rewards: 78 },
    { label: "Thu", visits: 448, rewards: 96 },
    { label: "Fri", visits: 472, rewards: 112 },
    { label: "Sat", visits: 520, rewards: 128 },
    { label: "Sun", visits: 584, rewards: 144 },
  ],
  "30D": [
    { label: "Wk 1", visits: 2180, rewards: 462 },
    { label: "Wk 2", visits: 2440, rewards: 510 },
    { label: "Wk 3", visits: 2710, rewards: 574 },
    { label: "Wk 4", visits: 3120, rewards: 648 },
    { label: "Wk 5", visits: 3421, rewards: 692 },
  ],
  "90D": [
    { label: "Apr", visits: 8740, rewards: 1640 },
    { label: "May", visits: 10180, rewards: 2080 },
    { label: "Jun", visits: 11890, rewards: 2460 },
    { label: "Jul", visits: 14520, rewards: 2880 },
    { label: "Aug", visits: 16780, rewards: 3340 },
    { label: "Sep", visits: 19040, rewards: 3820 },
  ],
};

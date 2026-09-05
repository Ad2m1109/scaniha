import { business } from "@/lib/data/business";
import { customers } from "@/lib/data/customers";
import { categories, products } from "@/lib/data/menu";
import { rewards } from "@/lib/data/rewards";
import type { AppState } from "@/types";

const now = Date.now();

export const seedState: AppState = {
  business,
  categories,
  products,
  customers,
  rewards,
  loyalty: { enabled: true, pointsPerVisit: 50, welcomeBonus: 100 },
  menuSettings: {
    template: "lavender",
    currency: "DA",
    heroImage: "",
    tagline: business.tagline,
  },
  visits: [
    { id: "visit-1", customerId: "maya-kim", pointsEarned: 50, createdAt: new Date(now - 25 * 60_000).toISOString() },
    { id: "visit-2", customerId: "ahmed-benali", pointsEarned: 50, createdAt: new Date(now - 4 * 60 * 60_000).toISOString() },
    { id: "visit-3", customerId: "sarah-khelil", pointsEarned: 50, createdAt: new Date(now - 28 * 60 * 60_000).toISOString() },
  ],
  redemptions: [
    { id: "redemption-1", customerId: "ahmed-benali", rewardId: "free-latte", pointsSpent: 250, createdAt: new Date(now - 2 * 60 * 60_000).toISOString() },
  ],
  menuViews: Array.from({ length: 18 }, (_, index) => ({
    id: `view-${index + 1}`,
    source: index % 3 === 0 ? "qr" as const : "menu" as const,
    createdAt: new Date(now - index * 9 * 60 * 60_000).toISOString(),
  })),
};

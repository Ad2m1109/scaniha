import { business } from "@/lib/data/business";
import { customers } from "@/lib/data/customers";
import { categories, products } from "@/lib/data/menu";
import { rewards } from "@/lib/data/rewards";
import type { AppState } from "@/types";

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
    tagline: "",
  },
  visits: [],
  redemptions: [],
  menuViews: [],
};

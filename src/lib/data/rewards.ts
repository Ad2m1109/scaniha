import type { Reward } from "@/types";

export const rewards: Reward[] = [
  {
    id: "free-latte",
    name: "Free item",
    description: "Most popular this week",
    image: "",
    pointsRequired: 250,
    redemptions: 238,
    status: "active",
  },
  {
    id: "pastry-pair",
    name: "Pair deal",
    description: "Bring a friend",
    image: "",
    pointsRequired: 400,
    redemptions: 174,
    status: "active",
  },
  {
    id: "coffee-flight",
    name: "Taste test",
    description: "Try something new",
    image: "",
    pointsRequired: 650,
    redemptions: 96,
    status: "active",
  },
  {
    id: "brunch-for-two",
    name: "VIP experience",
    description: "Exclusive member perk",
    image: "",
    pointsRequired: 900,
    redemptions: 42,
    status: "paused",
  },
];

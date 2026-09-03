import type { Reward } from "@/types";

export const rewards: Reward[] = [
  {
    id: "free-latte",
    name: "Free latte",
    description: "Most popular this week",
    image: "",
    pointsRequired: 250,
    redemptions: 238,
    status: "active",
  },
  {
    id: "pastry-pair",
    name: "Pastry pair",
    description: "Sweeten the next visit",
    image: "",
    pointsRequired: 400,
    redemptions: 174,
    status: "active",
  },
  {
    id: "coffee-flight",
    name: "Coffee flight",
    description: "Try something new",
    image: "",
    pointsRequired: 650,
    redemptions: 96,
    status: "active",
  },
  {
    id: "brunch-for-two",
    name: "Brunch for two",
    description: "A weekend table for two",
    image: "",
    pointsRequired: 900,
    redemptions: 42,
    status: "paused",
  },
];

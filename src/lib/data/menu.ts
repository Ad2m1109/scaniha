import type { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "coffee",
    name: "Coffee",
    description: "Espresso-led drinks and slow pours.",
    sortOrder: 1,
  },
  {
    id: "pastries",
    name: "Pastries",
    description: "Fresh bakes for the morning rush.",
    sortOrder: 2,
  },
  {
    id: "seasonal",
    name: "Seasonal",
    description: "Limited pours and rotating favorites.",
    sortOrder: 3,
  },
];

export const products: Product[] = [
  { id: "flat-white", categoryId: "coffee", name: "Flat white", description: "Double espresso with silky steamed milk.", price: 5.5, available: true },
  { id: "cappuccino", categoryId: "coffee", name: "Cappuccino", description: "Rich espresso, foam, and a little cocoa.", price: 5, available: true },
  { id: "cold-brew", categoryId: "coffee", name: "Cold brew", description: "Slow-steeped for a smooth finish.", price: 5.75, available: true },
  { id: "matcha-latte", categoryId: "seasonal", name: "Matcha latte", description: "Ceremonial matcha with oat milk.", price: 6.25, available: true },
  { id: "citrus-tonic", categoryId: "seasonal", name: "Citrus tonic", description: "Bright espresso, citrus, and sparkling water.", price: 6, available: true },
  { id: "butter-croissant", categoryId: "pastries", name: "Butter croissant", description: "Flaky, layered, and baked each morning.", price: 4.25, available: true },
  { id: "pastry-pair", categoryId: "pastries", name: "Pastry pair", description: "Two daily pastries to share.", price: 7.5, available: true },
  { id: "banana-bread", categoryId: "pastries", name: "Banana bread", description: "Warm slice with toasted walnuts.", price: 4.75, available: false },
];

import type { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "popular",
    name: "Popular",
    description: "Customer favorites.",
    sortOrder: 1,
  },
  {
    id: "specials",
    name: "Specials",
    description: "Limited offers and seasonal picks.",
    sortOrder: 2,
  },
  {
    id: "extras",
    name: "Extras",
    description: "Add-ons and sides.",
    sortOrder: 3,
  },
];

export const products: Product[] = [
  { id: "item-1", categoryId: "popular", name: "Signature item", description: "Our most popular pick.", price: 5.5, image: "", available: true, sortOrder: 1 },
  { id: "item-2", categoryId: "popular", name: "Classic favorite", description: "A timeless choice.", price: 5, image: "", available: true, sortOrder: 2 },
  { id: "item-3", categoryId: "popular", name: "House special", description: "Made fresh every day.", price: 5.75, image: "", available: true, sortOrder: 3 },
  { id: "item-4", categoryId: "specials", name: "Seasonal pick", description: "Available for a limited time.", price: 6.25, image: "", available: true, sortOrder: 1 },
  { id: "item-5", categoryId: "specials", name: "Daily deal", description: "Today's best offer.", price: 6, image: "", available: true, sortOrder: 2 },
  { id: "item-6", categoryId: "extras", name: "Side order", description: "Perfect complement to any purchase.", price: 4.25, image: "", available: true, sortOrder: 1 },
  { id: "item-7", categoryId: "extras", name: "Add-on extra", description: "Upgrade your order.", price: 7.5, image: "", available: true, sortOrder: 2 },
  { id: "item-8", categoryId: "extras", name: "Value bundle", description: "Two items to share.", price: 4.75, image: "", available: false, sortOrder: 3 },
];

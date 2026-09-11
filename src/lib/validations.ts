import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().max(500).default(""),
  image: z.string().default(""),
  sortOrder: z.number().int().min(0),
});

export const productSchema = z.object({
  id: z.string().min(1),
  categoryId: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().max(500).default(""),
  price: z.number().min(0),
  image: z.string().default(""),
  available: z.boolean().default(true),
  sortOrder: z.number().int().min(0),
});

export const customerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  email: z.string().email().or(z.literal("")).default(""),
  phone: z.string().max(20).default(""),
  image: z.string().default(""),
  points: z.preprocess((v) => (v == null ? 0 : v), z.number().int().min(0).default(0)),
  visits: z.preprocess((v) => (v == null ? 0 : v), z.number().int().min(0).default(0)),
  tier: z.preprocess(
    (v) => (["Gold", "Silver", "Bronze"].includes(v as string) ? v : "Bronze"),
    z.enum(["Gold", "Silver", "Bronze"]).default("Bronze")
  ),
  lastVisit: z.string().default("Never"),
  joinedAt: z.string().default(""),
  qrCode: z.string().default(""),
});

export const rewardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().max(500).default(""),
  image: z.string().default(""),
  pointsRequired: z.number().int().min(1),
  redemptions: z.number().int().min(0).default(0),
  status: z.enum(["active", "paused"]).default("active"),
});

export const loyaltyConfigSchema = z.object({
  enabled: z.boolean().default(true),
  pointsPerVisit: z.number().int().min(1).max(1000).default(50),
  welcomeBonus: z.number().int().min(0).max(10000).default(100),
});

export const visitRecordSchema = z.object({
  id: z.string().min(1),
  customerId: z.string().min(1),
  pointsEarned: z.number().int().min(0),
  createdAt: z.string().min(1),
});

export const redemptionRecordSchema = z.object({
  id: z.string().min(1),
  customerId: z.string().min(1),
  rewardId: z.string().min(1),
  pointsSpent: z.number().int().min(0),
  createdAt: z.string().min(1),
});

export const menuViewRecordSchema = z.object({
  id: z.string().min(1),
  source: z.enum(["menu", "qr"]),
  createdAt: z.string().min(1),
});

export const menuColorsSchema = z.object({
  background: z.string().default("#ffffff"),
  surface: z.string().default("#f8f9fa"),
  text: z.string().default("#1a1a2e"),
  muted: z.string().default("#6c757d"),
  accent: z.string().default("#7c3aed"),
});

export const menuSettingsSchema = z.object({
  template: z.enum(["noir", "lavender", "sunset", "botanical", "mono"]).default("lavender"),
  currency: z.string().max(10).default("DA"),
  heroImage: z.string().default(""),
  tagline: z.string().max(200).default(""),
  layout: z.enum(["grid", "list", "compact"]).default("grid"),
  headerStyle: z.enum(["centered", "split", "cover"]).default("centered"),
  cardStyle: z.enum(["elevated", "outline", "minimal"]).default("elevated"),
  fontFamily: z.enum(["modern", "classic", "rounded"]).default("modern"),
  borderRadius: z.enum(["none", "soft", "rounded"]).default("soft"),
  categoryStyle: z.enum(["plain", "underline", "filled"]).default("plain"),
  colors: menuColorsSchema.default({}),
  showImages: z.boolean().default(true),
  showDescriptions: z.boolean().default(true),
  showContactInfo: z.boolean().default(true),
});

export const businessProfileSchema = z.object({
  id: z.string().default(""),
  name: z.string().max(200).default(""),
  tagline: z.string().max(200).default(""),
  location: z.string().max(200).default(""),
  ownerName: z.string().max(100).default(""),
  memberCount: z.number().int().min(0).default(0),
  activeMembers: z.number().int().min(0).default(0),
  memberGoal: z.number().int().min(0).default(100),
  createdAt: z.string().default(""),
  phone: z.string().default(""),
  address: z.string().max(300).default(""),
  description: z.string().max(1000).default(""),
  logo: z.string().default(""),
  facebook: z.string().default(""),
  instagram: z.string().default(""),
  whatsapp: z.string().max(20).default(""),
  menuPdfUrl: z.string().default(""),
});

export const dataPostSchema = z.object({
  business: businessProfileSchema,
  menuSettings: menuSettingsSchema.default({}),
  categories: z.array(categorySchema).default([]),
  products: z.array(productSchema).default([]),
  customers: z.array(customerSchema).default([]),
  rewards: z.array(rewardSchema).default([]),
  loyalty: loyaltyConfigSchema.default({ enabled: true, pointsPerVisit: 50, welcomeBonus: 100 }),
  visits: z.array(visitRecordSchema).default([]),
  redemptions: z.array(redemptionRecordSchema).default([]),
  menuViews: z.array(menuViewRecordSchema).default([]),
});

export const archivePostSchema = z.object({
  imageUrl: z.string().url().or(z.string().min(1)),
  category: z.enum(["products", "rewards", "profile", "menu", "customers"]),
});

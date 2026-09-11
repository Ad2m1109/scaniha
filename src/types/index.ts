export type ThemeMode = "light" | "dark";
export type ChartRange = "7D" | "30D" | "90D";
export type ActivityType = "member" | "reward" | "visit";
export type RewardStatus = "active" | "paused";
export type CustomerTier = "Gold" | "Silver" | "Bronze";

export interface Business {
  id: string;
  name: string;
  tagline: string;
  location: string;
  ownerName: string;
  memberCount: number;
  activeMembers: number;
  memberGoal: number;
  createdAt: string;
  phone?: string;
  address?: string;
  description?: string;
  logo?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  sortOrder: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  points: number;
  visits: number;
  tier: CustomerTier;
  lastVisit: string;
  joinedAt: string;
  qrCode: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  pointsRequired: number;
  redemptions: number;
  status: RewardStatus;
}

export interface LoyaltyConfig {
  enabled: boolean;
  pointsPerVisit: number;
  welcomeBonus: number;
}

export interface VisitRecord {
  id: string;
  customerId: string;
  pointsEarned: number;
  createdAt: string;
}

export interface RedemptionRecord {
  id: string;
  customerId: string;
  rewardId: string;
  pointsSpent: number;
  createdAt: string;
}

export interface MenuViewRecord {
  id: string;
  source: "menu" | "qr";
  createdAt: string;
}

export type MenuTemplateId = "noir" | "lavender" | "sunset" | "botanical" | "mono";
export type MenuLayout = "grid" | "list" | "compact";
export type MenuHeaderStyle = "centered" | "split" | "cover";
export type MenuCardStyle = "elevated" | "outline" | "minimal";
export type MenuFontFamily = "modern" | "classic" | "rounded";
export type MenuBorderRadius = "none" | "soft" | "rounded";
export type MenuCategoryStyle = "plain" | "underline" | "filled";

export interface MenuColors {
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
}

export interface MenuSettings {
  template: MenuTemplateId;
  currency: string;
  heroImage: string;
  tagline: string;
  layout: MenuLayout;
  headerStyle: MenuHeaderStyle;
  cardStyle: MenuCardStyle;
  fontFamily: MenuFontFamily;
  borderRadius: MenuBorderRadius;
  categoryStyle: MenuCategoryStyle;
  colors: MenuColors;
  showImages: boolean;
  showDescriptions: boolean;
  showContactInfo: boolean;
}

export interface MetricPoint extends ActivityPoint {
  views: number;
  customers: number;
}

export interface BusinessProfile extends Business {
  phone: string;
  address: string;
  description: string;
  logo: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  menuPdfUrl: string;
}

export interface AppState {
  business: BusinessProfile;
  categories: Category[];
  products: Product[];
  customers: Customer[];
  rewards: Reward[];
  loyalty: LoyaltyConfig;
  menuSettings: MenuSettings;
  visits: VisitRecord[];
  redemptions: RedemptionRecord[];
  menuViews: MenuViewRecord[];
}

export interface Activity {
  id: string;
  customerName: string;
  action: string;
  type: ActivityType;
  points: number;
  minutesAgo: number;
}

export interface Stats {
  totalCustomers: number;
  totalVisits: number;
  totalPoints: number;
  rewardsGiven: number;
  repeatRate: number;
  memberGrowth: number;
}

export interface ActivityPoint {
  label: string;
  visits: number;
  rewards: number;
}

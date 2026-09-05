import fs from "fs";
import path from "path";
import type { BusinessProfile, Category, MenuSettings, Product } from "@/types";

// Stored under .data/snapshots/{businessId}.json
const snapshotDir = path.join(process.cwd(), ".data", "snapshots");

function ensureDir() {
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true });
  }
}

// ─── Public shape (only customer-safe fields) ─────────────────────────────────
export interface PublicSnapshot {
  businessId: string;
  publishedAt: string;
  business: {
    name: string;
    logo: string;
    phone: string;
    address: string;
    description: string;
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  style: {
    template: string;
    currency: string;
    heroImage: string;
    tagline: string;
  };
  categories: Category[];
  products: Product[];
}

function snapshotPath(businessId: string): string {
  // Sanitise to prevent path traversal
  const safe = businessId.replace(/[^a-zA-Z0-9-_]/g, "");
  return path.join(snapshotDir, `${safe}.json`);
}

export function readSnapshot(businessId: string): PublicSnapshot | null {
  try {
    ensureDir();
    const file = snapshotPath(businessId);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf-8")) as PublicSnapshot;
  } catch {
    return null;
  }
}

export function writeSnapshot(
  businessId: string,
  business: BusinessProfile,
  settings: MenuSettings,
  categories: Category[],
  products: Product[]
): void {
  ensureDir();
  const snapshot: PublicSnapshot = {
    businessId,
    publishedAt: new Date().toISOString(),
    business: {
      name:        business.name        ?? "",
      logo:        business.logo        ?? "",
      phone:       business.phone       ?? "",
      address:     business.address     ?? "",
      description: business.description ?? "",
      facebook:    business.facebook    ?? "",
      instagram:   business.instagram   ?? "",
      whatsapp:    business.whatsapp    ?? "",
    },
    style: {
      template:   settings.template   ?? "lavender",
      currency:   settings.currency   ?? "DA",
      heroImage:  settings.heroImage  ?? "",
      tagline:    settings.tagline    ?? "",
    },
    categories,
    products,
  };
  fs.writeFileSync(snapshotPath(businessId), JSON.stringify(snapshot), "utf-8");
}

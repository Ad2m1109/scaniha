import fs from "fs";
import path from "path";
import type { BusinessProfile, Category, MenuSettings, Product } from "@/types";

// Stored under .data/snapshots/{businessId}.json
const snapshotDir = path.join(process.cwd(), ".data", "snapshots");

async function ensureDir() {
  if (!fs.existsSync(snapshotDir)) {
    await fs.promises.mkdir(snapshotDir, { recursive: true });
  }
}

// ─── Public shape (only customer-safe fields) ─────────────────────────────────
export interface PublicSnapshot {
  businessId: string;
  publishedAt: string;
  business: {
    name: string;
    ownerName: string;
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
  } & Partial<MenuSettings>;
  menuPdfUrl: string;
  categories: Category[];
  products: Product[];
}

function snapshotPath(businessId: string): string {
  // Sanitise to prevent path traversal
  const safe = businessId.replace(/[^a-zA-Z0-9-_]/g, "");
  return path.join(snapshotDir, `${safe}.json`);
}

export async function readSnapshot(businessId: string): Promise<PublicSnapshot | null> {
  try {
    await ensureDir();
    const file = snapshotPath(businessId);
    if (!fs.existsSync(file)) return null;
    const content = await fs.promises.readFile(file, "utf-8");
    return JSON.parse(content) as PublicSnapshot;
  } catch {
    return null;
  }
}

export async function writeSnapshot(
  businessId: string,
  business: BusinessProfile,
  settings: MenuSettings,
  categories: Category[],
  products: Product[]
): Promise<void> {
  await ensureDir();
  const snapshot: PublicSnapshot = {
    businessId,
    publishedAt: new Date().toISOString(),
    business: {
      name:        business.name        ?? "",
      ownerName:   business.ownerName   ?? "",
      logo:        business.logo        ?? "",
      phone:       business.phone       ?? "",
      address:     business.address     ?? "",
      description: business.description ?? "",
      facebook:    business.facebook    ?? "",
      instagram:   business.instagram   ?? "",
      whatsapp:    business.whatsapp    ?? "",
    },
    style: { ...settings },
    menuPdfUrl: business.menuPdfUrl ?? "",
    categories,
    products,
  };
  const file = snapshotPath(businessId);
  const tmpFile = `${file}.tmp`;
  await fs.promises.writeFile(tmpFile, JSON.stringify(snapshot), "utf-8");
  await fs.promises.rename(tmpFile, file);
}

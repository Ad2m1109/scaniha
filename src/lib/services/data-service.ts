import { getOwnerMapping, saveOwnerMapping } from "@/lib/server/db";
import {
  createSpreadsheet,
  loadFromGoogleSheets,
  saveToGoogleSheets,
  ensureSheetsExist,
} from "@/lib/google/sheets";
import { ensureBusinessFolder, moveFileToFolder } from "@/lib/google/drive";
import { writeSnapshot, readSnapshot } from "@/lib/server/snapshots";
import type {
  BusinessProfile,
  Category,
  Product,
  Customer,
  Reward,
  LoyaltyConfig,
  VisitRecord,
  RedemptionRecord,
  MenuViewRecord,
  MenuSettings,
} from "@/types";

export interface DataServiceResult {
  success: boolean;
  error?: string;
  businessId?: string;
}

export async function loadBusinessData(
  googleSub: string,
  accessToken: string,
  businessId: string
): Promise<{
  business: Partial<BusinessProfile>;
  settings: Partial<MenuSettings>;
  categories: Category[];
  products: Product[];
  customers: Customer[];
  rewards: Reward[];
  loyalty: LoyaltyConfig;
  visits: VisitRecord[];
  redemptions: RedemptionRecord[];
  menuViews: MenuViewRecord[];
  businessId: string;
} | null> {
  const mapping = await getOwnerMapping(googleSub);

  // Try Google Sheets first
  if (mapping?.spreadsheetId) {
    try {
      await ensureSheetsExist(accessToken, mapping.spreadsheetId);
      const data = await loadFromGoogleSheets(accessToken, mapping.spreadsheetId);
      if (data) {
        return { ...data, businessId };
      }
    } catch (e) {
      console.error("Failed to load from Google Sheets:", e);
    }
  }

  // Fallback: read from local snapshot file (for new users after onboarding)
  if (businessId) {
    const snapshot = await readSnapshot(businessId);
    if (snapshot) {
      return {
        business: snapshot.business,
        settings: snapshot.style,
        categories: snapshot.categories,
        products: snapshot.products,
        customers: [],
        rewards: [],
        loyalty: { enabled: true, pointsPerVisit: 50, welcomeBonus: 100 },
        visits: [],
        redemptions: [],
        menuViews: [],
        businessId,
      };
    }
  }

  return null;
}

export async function saveBusinessData(
  googleSub: string,
  accessToken: string,
  businessId: string,
  data: {
    business: BusinessProfile;
    menuSettings: MenuSettings;
    categories: Category[];
    products: Product[];
    customers: Customer[];
    rewards: Reward[];
    loyalty: LoyaltyConfig;
    visits: VisitRecord[];
    redemptions: RedemptionRecord[];
    menuViews: MenuViewRecord[];
  }
): Promise<DataServiceResult> {
  let mapping = await getOwnerMapping(googleSub);

  if (!mapping) {
    mapping = { sub: googleSub, businessId };
  }

  // Enforce stable, server-assigned businessId
  data.business.id = mapping.businessId;

  if (!mapping.spreadsheetId) {
    const spreadsheetId = await createSpreadsheet(
      accessToken,
      data.business.name || "My Business"
    );
    mapping.spreadsheetId = spreadsheetId;
    await saveOwnerMapping(mapping);

    // Move spreadsheet into scaniha_data/{businessId}/ folder
    try {
      const bizFolderId = await ensureBusinessFolder(accessToken, mapping.businessId);
      await moveFileToFolder(accessToken, spreadsheetId, bizFolderId);
    } catch (e) {
      console.error("Failed to move spreadsheet to scaniha_data folder:", e);
      // Non-fatal — spreadsheet works from root too
    }
  }

  // Ensure all sheets exist before writing
  await ensureSheetsExist(accessToken, mapping.spreadsheetId);

  // Persist to Google Sheets
  await saveToGoogleSheets(
    accessToken,
    mapping.spreadsheetId,
    data.business,
    data.menuSettings,
    data.categories,
    data.products,
    data.customers,
    data.rewards,
    data.loyalty,
    data.visits,
    data.redemptions,
    data.menuViews
  );

  // Write public snapshot
  await writeSnapshot(
    mapping.businessId,
    data.business,
    data.menuSettings,
    data.categories,
    data.products
  );

  return { success: true, businessId: mapping.businessId };
}

import { google } from "googleapis";
import type {
  BusinessProfile,
  Category,
  Product,
  MenuSettings,
  Customer,
  Reward,
  LoyaltyConfig,
  VisitRecord,
  RedemptionRecord,
  MenuViewRecord,
} from "@/types";

export function getSheetsClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.sheets({ version: "v4", auth: oauth2Client });
}

// ─── Spreadsheet creation ─────────────────────────────────────────────────────
export async function createSpreadsheet(
  accessToken: string,
  businessName: string
): Promise<string> {
  const sheets = getSheetsClient(accessToken);
  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: `Scaniha - ${businessName}` },
      sheets: [
        { properties: { title: "business" } },
        { properties: { title: "categories" } },
        { properties: { title: "products" } },
        { properties: { title: "customers" } },
        { properties: { title: "rewards" } },
        { properties: { title: "loyalty" } },
        { properties: { title: "visits" } },
        { properties: { title: "redemptions" } },
        { properties: { title: "menuViews" } },
      ],
    },
  });
  return response.data.spreadsheetId!;
}

// ─── Ensure sheets exist (for legacy spreadsheets) ───────────────────────────
const REQUIRED_SHEETS = [
  "business", "categories", "products",
  "customers", "rewards", "loyalty",
  "visits", "redemptions", "menuViews",
];

export async function ensureSheetsExist(
  accessToken: string,
  spreadsheetId: string
): Promise<void> {
  const sheets = getSheetsClient(accessToken);

  // Get existing sheet names
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const existing = new Set(
    (meta.data.sheets ?? []).map((s) => s.properties?.title).filter(Boolean)
  );

  // Find missing sheets
  const missing = REQUIRED_SHEETS.filter((name) => !existing.has(name));
  if (missing.length === 0) return;

  // Add missing sheets
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: missing.map((title) => ({
        addSheet: { properties: { title } },
      })),
    },
  });
}

// ─── Column order constants ───────────────────────────────────────────────────
const BUSINESS_HEADERS = [
  "id", "name", "ownerName", "logo", "phone", "address", "description",
  "facebook", "instagram", "whatsapp",
  "template", "currency", "heroImage", "tagline", "menuPdfUrl",
];

const CATEGORY_HEADERS = ["id", "name", "description", "sortOrder"];

const PRODUCT_HEADERS = [
  "id", "name", "description", "price", "image",
  "categoryId", "available", "sortOrder",
];

const CUSTOMER_HEADERS = [
  "id", "name", "email", "phone", "points", "visits",
  "tier", "lastVisit", "joinedAt", "qrCode",
];

const REWARD_HEADERS = [
  "id", "name", "description", "image", "pointsRequired",
  "redemptions", "status",
];

const LOYALTY_HEADERS = ["enabled", "pointsPerVisit", "welcomeBonus"];

const VISIT_HEADERS = ["id", "customerId", "pointsEarned", "createdAt"];

const REDEMPTION_HEADERS = ["id", "customerId", "rewardId", "pointsSpent", "createdAt"];

const MENU_VIEW_HEADERS = ["id", "source", "createdAt"];

// ─── Serialisers ──────────────────────────────────────────────────────────────
function businessToRow(b: BusinessProfile, s: MenuSettings): string[] {
  return [
    b.id,
    b.name,
    b.ownerName ?? "",
    b.logo ?? "",
    b.phone ?? "",
    b.address ?? "",
    b.description ?? "",
    b.facebook ?? "",
    b.instagram ?? "",
    b.whatsapp ?? "",
    s.template ?? "",
    s.currency ?? "",
    s.heroImage ?? "",
    s.tagline ?? "",
    b.menuPdfUrl ?? "",
  ];
}

function categoryToRow(c: Category): string[] {
  return [c.id, c.name, c.description ?? "", String(c.sortOrder)];
}

function productToRow(p: Product): string[] {
  return [
    p.id, p.name, p.description ?? "", String(p.price),
    p.image ?? "", p.categoryId, String(p.available), String(p.sortOrder),
  ];
}

function customerToRow(c: Customer): string[] {
  return [
    c.id, c.name, c.email, c.phone, String(c.points), String(c.visits),
    c.tier, c.lastVisit, c.joinedAt, c.qrCode,
  ];
}

function rewardToRow(r: Reward): string[] {
  return [
    r.id, r.name, r.description ?? "", r.image ?? "",
    String(r.pointsRequired), String(r.redemptions), r.status,
  ];
}

function loyaltyToRow(l: LoyaltyConfig): string[] {
  return [String(l.enabled), String(l.pointsPerVisit), String(l.welcomeBonus)];
}

function visitToRow(v: VisitRecord): string[] {
  return [v.id, v.customerId, String(v.pointsEarned), v.createdAt];
}

function redemptionToRow(r: RedemptionRecord): string[] {
  return [r.id, r.customerId, r.rewardId, String(r.pointsSpent), r.createdAt];
}

function menuViewToRow(m: MenuViewRecord): string[] {
  return [m.id, m.source, m.createdAt];
}

// ─── Deserialisers ────────────────────────────────────────────────────────────
function rowToBusiness(row: string[]): Partial<BusinessProfile> {
  return {
    id:          row[0],
    name:        row[1],
    ownerName:   row[2] || "",
    logo:        row[3],
    phone:       row[4],
    address:     row[5],
    description: row[6],
    facebook:    row[7],
    instagram:   row[8],
    whatsapp:    row[9],
    menuPdfUrl:  row[14] || "",
  };
}

function rowToSettings(row: string[]): Partial<MenuSettings> {
  return {
    template:   (row[10] as MenuSettings["template"]) || undefined,
    currency:   row[11] || "DA",
    heroImage:  row[12] || "",
    tagline:    row[13] || "",
  };
}

function rowToCategory(row: string[]): Category {
  return {
    id:          row[0],
    name:        row[1],
    description: row[2],
    sortOrder:   parseInt(row[3] || "0", 10),
  };
}

function rowToProduct(row: string[]): Product {
  return {
    id:          row[0],
    name:        row[1],
    description: row[2],
    price:       parseFloat(row[3] || "0"),
    image:       row[4],
    categoryId:  row[5],
    available:   row[6] === "true",
    sortOrder:   parseInt(row[7] || "0", 10),
  };
}

function rowToCustomer(row: string[]): Customer {
  return {
    id:        row[0],
    name:      row[1],
    email:     row[2],
    phone:     row[3],
    points:    parseInt(row[4] || "0", 10),
    visits:    parseInt(row[5] || "0", 10),
    tier:      (row[6] as Customer["tier"]) || "Bronze",
    lastVisit: row[7] || "Never",
    joinedAt:  row[8] || new Date().toISOString().slice(0, 10),
    qrCode:    row[9] || "",
  };
}

function rowToReward(row: string[]): Reward {
  return {
    id:             row[0],
    name:           row[1],
    description:    row[2],
    image:          row[3],
    pointsRequired: parseInt(row[4] || "100", 10),
    redemptions:    parseInt(row[5] || "0", 10),
    status:         (row[6] as Reward["status"]) || "active",
  };
}

function rowToLoyalty(row: string[]): LoyaltyConfig {
  return {
    enabled:        row[0] === "true",
    pointsPerVisit: parseInt(row[1] || "50", 10),
    welcomeBonus:   parseInt(row[2] || "100", 10),
  };
}

function rowToVisit(row: string[]): VisitRecord {
  return {
    id:           row[0],
    customerId:   row[1],
    pointsEarned: parseInt(row[2] || "0", 10),
    createdAt:    row[3],
  };
}

function rowToRedemption(row: string[]): RedemptionRecord {
  return {
    id:         row[0],
    customerId: row[1],
    rewardId:   row[2],
    pointsSpent: parseInt(row[3] || "0", 10),
    createdAt:  row[4],
  };
}

function rowToMenuView(row: string[]): MenuViewRecord {
  return {
    id:        row[0],
    source:    (row[1] as MenuViewRecord["source"]) || "menu",
    createdAt: row[2],
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function saveToGoogleSheets(
  accessToken: string,
  spreadsheetId: string,
  business: BusinessProfile,
  settings: MenuSettings,
  categories: Category[],
  products: Product[],
  customers: Customer[],
  rewards: Reward[],
  loyalty: LoyaltyConfig,
  visits: VisitRecord[],
  redemptions: RedemptionRecord[],
  menuViews: MenuViewRecord[]
): Promise<void> {
  const sheets = getSheetsClient(accessToken);

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "RAW",
      data: [
        {
          range: "business!A1",
          values: [BUSINESS_HEADERS, businessToRow(business, settings)],
        },
        {
          range: "categories!A1",
          values: [CATEGORY_HEADERS, ...categories.map(categoryToRow)],
        },
        {
          range: "products!A1",
          values: [PRODUCT_HEADERS, ...products.map(productToRow)],
        },
        {
          range: "customers!A1",
          values: [CUSTOMER_HEADERS, ...customers.map(customerToRow)],
        },
        {
          range: "rewards!A1",
          values: [REWARD_HEADERS, ...rewards.map(rewardToRow)],
        },
        {
          range: "loyalty!A1",
          values: [LOYALTY_HEADERS, loyaltyToRow(loyalty)],
        },
        {
          range: "visits!A1",
          values: [VISIT_HEADERS, ...visits.map(visitToRow)],
        },
        {
          range: "redemptions!A1",
          values: [REDEMPTION_HEADERS, ...redemptions.map(redemptionToRow)],
        },
        {
          range: "menuViews!A1",
          values: [MENU_VIEW_HEADERS, ...menuViews.map(menuViewToRow)],
        },
      ],
    },
  });
}

export interface RemoteData {
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
}

export async function loadFromGoogleSheets(
  accessToken: string,
  spreadsheetId: string
): Promise<RemoteData | null> {
  const sheets = getSheetsClient(accessToken);
  try {
    const res = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: [
        "business!A2:Z2",
        "categories!A2:Z",
        "products!A2:Z",
        "customers!A2:Z",
        "rewards!A2:Z",
        "loyalty!A2:Z2",
        "visits!A2:Z",
        "redemptions!A2:Z",
        "menuViews!A2:Z",
      ],
    });

    const vr = res.data.valueRanges;
    if (!vr || vr.length < 9) return null;

    const bRow       = (vr[0].values?.[0] ?? []) as string[];
    const catRows    = (vr[1].values       ?? []) as string[][];
    const prodRows   = (vr[2].values       ?? []) as string[][];
    const custRows   = (vr[3].values       ?? []) as string[][];
    const rewardRows = (vr[4].values       ?? []) as string[][];
    const loyaltyRow = (vr[5].values?.[0]  ?? []) as string[];
    const visitRows  = (vr[6].values       ?? []) as string[][];
    const redempRows = (vr[7].values       ?? []) as string[][];
    const viewRows   = (vr[8].values       ?? []) as string[][];

    // Use default loyalty if sheet is empty
    const defaultLoyalty: LoyaltyConfig = { enabled: true, pointsPerVisit: 50, welcomeBonus: 100 };

    return {
      business:   rowToBusiness(bRow),
      settings:   rowToSettings(bRow),
      categories: catRows.filter((r) => r[0]).map(rowToCategory),
      products:   prodRows.filter((r) => r[0]).map(rowToProduct),
      customers:  custRows.filter((r) => r[0]).map(rowToCustomer),
      rewards:    rewardRows.filter((r) => r[0]).map(rowToReward),
      loyalty:    loyaltyRow.length >= 3 ? rowToLoyalty(loyaltyRow) : defaultLoyalty,
      visits:     visitRows.filter((r) => r[0]).map(rowToVisit),
      redemptions: redempRows.filter((r) => r[0]).map(rowToRedemption),
      menuViews:  viewRows.filter((r) => r[0]).map(rowToMenuView),
    };
  } catch (err) {
    console.error("[sheets] loadFromGoogleSheets error:", err);
    return null;
  }
}

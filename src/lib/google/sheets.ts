import { google } from "googleapis";
import type { BusinessProfile, Category, Product, MenuSettings } from "@/types";

export function getSheetsClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.sheets({ version: "v4", auth: oauth2Client });
}

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
      ],
    },
  });
  return response.data.spreadsheetId!;
}

// ─── Column order constants ───────────────────────────────────────────────────
const BUSINESS_HEADERS = [
  "id", "name", "logo", "phone", "address", "description",
  "facebook", "instagram", "whatsapp",
  "template", "currency", "heroImage", "tagline",
];

const CATEGORY_HEADERS = ["id", "name", "description", "sortOrder"];

const PRODUCT_HEADERS = [
  "id", "name", "description", "price", "image",
  "categoryId", "available", "sortOrder",
];

// ─── Serialisers ──────────────────────────────────────────────────────────────
function businessToRow(b: BusinessProfile, s: MenuSettings): string[] {
  return [
    b.id,
    b.name,
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

// ─── Deserialisers ────────────────────────────────────────────────────────────
function rowToBusiness(row: string[]): Partial<BusinessProfile> {
  return {
    id:          row[0],
    name:        row[1],
    logo:        row[2],
    phone:       row[3],
    address:     row[4],
    description: row[5],
    facebook:    row[6],
    instagram:   row[7],
    whatsapp:    row[8],
  };
}

function rowToSettings(row: string[]): Partial<MenuSettings> {
  return {
    template:   (row[9] as MenuSettings["template"]) || undefined,
    currency:   row[10] || "DA",
    heroImage:  row[11] || "",
    tagline:    row[12] || "",
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

// ─── Public API ───────────────────────────────────────────────────────────────
export async function saveToGoogleSheets(
  accessToken: string,
  spreadsheetId: string,
  business: BusinessProfile,
  settings: MenuSettings,
  categories: Category[],
  products: Product[]
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
      ],
    },
  });
}

export interface RemoteData {
  business: Partial<BusinessProfile>;
  settings: Partial<MenuSettings>;
  categories: Category[];
  products: Product[];
}

export async function loadFromGoogleSheets(
  accessToken: string,
  spreadsheetId: string
): Promise<RemoteData | null> {
  const sheets = getSheetsClient(accessToken);
  try {
    const res = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: ["business!A2:Z2", "categories!A2:Z", "products!A2:Z"],
    });

    const vr = res.data.valueRanges;
    if (!vr || vr.length < 3) return null;

    const bRow    = (vr[0].values?.[0] ?? []) as string[];
    const catRows = (vr[1].values       ?? []) as string[][];
    const prodRows = (vr[2].values      ?? []) as string[][];

    return {
      business:   rowToBusiness(bRow),
      settings:   rowToSettings(bRow),
      categories: catRows.filter((r) => r[0]).map(rowToCategory),
      products:   prodRows.filter((r) => r[0]).map(rowToProduct),
    };
  } catch (err) {
    console.error("[sheets] loadFromGoogleSheets error:", err);
    return null;
  }
}

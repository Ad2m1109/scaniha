import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getOwnerMapping, saveOwnerMapping } from "@/lib/server/db";
import {
  createSpreadsheet,
  loadFromGoogleSheets,
  saveToGoogleSheets,
} from "@/lib/google/sheets";
import { writeSnapshot } from "@/lib/server/snapshots";

// ─── GET /api/data ────────────────────────────────────────────────────────────
// Returns remote data for the authenticated owner.
// Always includes `businessId` so the client can build correct QR URLs even
// before the first save.
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken) {
    return NextResponse.json({ notFound: true });
  }

  const sub = token.googleSub as string;
  const mapping = getOwnerMapping(sub);

  // Always expose the stable businessId so client can set business.id correctly
  const businessId = mapping?.businessId ?? (token.businessId as string);

  if (!mapping?.spreadsheetId) {
    return NextResponse.json({ notFound: true, businessId });
  }

  const data = await loadFromGoogleSheets(
    token.accessToken as string,
    mapping.spreadsheetId
  );

  if (!data) {
    return NextResponse.json({ notFound: true, businessId });
  }

  return NextResponse.json({ ...data, businessId });
}

// ─── POST /api/data ───────────────────────────────────────────────────────────
// Saves to Google Sheets, then writes the public snapshot.
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { business, menuSettings, categories, products } = await req.json();

  const sub = token.googleSub as string;
  let mapping = getOwnerMapping(sub);

  if (!mapping) {
    mapping = { sub, businessId: token.businessId as string };
  }

  // Enforce stable, server-assigned businessId — never trust the client value
  business.id = mapping.businessId;

  if (!mapping.spreadsheetId) {
    const spreadsheetId = await createSpreadsheet(
      token.accessToken as string,
      business.name || "My Business"
    );
    mapping.spreadsheetId = spreadsheetId;
    saveOwnerMapping(mapping);
  }

  // 1. Persist to Google Sheets
  await saveToGoogleSheets(
    token.accessToken as string,
    mapping.spreadsheetId,
    business,
    menuSettings,
    categories,
    products
  );

  // 2. Write public snapshot — runs after Sheets save succeeds
  writeSnapshot(mapping.businessId, business, menuSettings, categories, products);

  return NextResponse.json({ success: true, businessId: mapping.businessId });
}

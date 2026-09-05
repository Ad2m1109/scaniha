import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getOwnerMapping, saveOwnerMapping } from "@/lib/server/db";
import {
  createSpreadsheet,
  loadFromGoogleSheets,
  saveToGoogleSheets,
  ensureSheetsExist,
} from "@/lib/google/sheets";
import { writeSnapshot } from "@/lib/server/snapshots";

// ─── GET /api/data ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken) {
    return NextResponse.json({ notFound: true });
  }

  const sub = token.googleSub as string;
  const mapping = getOwnerMapping(sub);
  const businessId = mapping?.businessId ?? (token.businessId as string);

  if (!mapping?.spreadsheetId) {
    return NextResponse.json({ notFound: true, businessId });
  }

  // Ensure all sheets exist before reading
  await ensureSheetsExist(token.accessToken as string, mapping.spreadsheetId);

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
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    business,
    menuSettings,
    categories,
    products,
    customers,
    rewards,
    loyalty,
    visits,
    redemptions,
    menuViews,
  } = body;

  const sub = token.googleSub as string;
  let mapping = getOwnerMapping(sub);

  if (!mapping) {
    mapping = { sub, businessId: token.businessId as string };
  }

  // Enforce stable, server-assigned businessId
  business.id = mapping.businessId;

  if (!mapping.spreadsheetId) {
    const spreadsheetId = await createSpreadsheet(
      token.accessToken as string,
      business.name || "My Business"
    );
    mapping.spreadsheetId = spreadsheetId;
    saveOwnerMapping(mapping);
  }

  // Ensure all sheets exist before writing
  await ensureSheetsExist(token.accessToken as string, mapping.spreadsheetId);

  // Persist to Google Sheets
  await saveToGoogleSheets(
    token.accessToken as string,
    mapping.spreadsheetId,
    business,
    menuSettings,
    categories,
    products,
    customers || [],
    rewards || [],
    loyalty || { enabled: true, pointsPerVisit: 50, welcomeBonus: 100 },
    visits || [],
    redemptions || [],
    menuViews || []
  );

  // Write public snapshot
  writeSnapshot(mapping.businessId, business, menuSettings, categories, products);

  return NextResponse.json({ success: true, businessId: mapping.businessId });
}

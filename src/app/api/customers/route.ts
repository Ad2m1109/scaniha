import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getOwnerMapping } from "@/lib/server/db";
import { loadFromGoogleSheets } from "@/lib/google/sheets";

// ─── GET /api/customers ──────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sub = token.googleSub as string;
  const mapping = await getOwnerMapping(sub);

  if (!mapping?.spreadsheetId) {
    return NextResponse.json({ customers: [] });
  }

  try {
    const data = await loadFromGoogleSheets(
      token.accessToken as string,
      mapping.spreadsheetId
    );
    return NextResponse.json({ customers: data?.customers ?? [] });
  } catch (e) {
    console.error("[customers] GET error:", e);
    return NextResponse.json({ error: "Failed to load customers" }, { status: 500 });
  }
}

// ─── DELETE /api/customers ───────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("id");

  if (!customerId) {
    return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
  }

  // Archive the customer's profile image if it exists
  const sub = token.googleSub as string;
  const mapping = await getOwnerMapping(sub);

  if (mapping?.spreadsheetId) {
    try {
      const data = await loadFromGoogleSheets(
        token.accessToken as string,
        mapping.spreadsheetId
      );
      const customer = data?.customers.find((c) => c.id === customerId);
      if (customer?.image) {
        const { archiveImage } = await import("@/lib/google/drive");
        await archiveImage(
          token.accessToken as string,
          customer.image,
          token.businessId as string,
          "customers"
        );
      }
    } catch (e) {
      console.error("[customers] Failed to archive image:", e);
    }
  }

  return NextResponse.json({ deleted: customerId });
}

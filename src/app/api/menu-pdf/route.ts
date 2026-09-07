import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getOwnerMapping } from "@/lib/server/db";
import { loadFromGoogleSheets } from "@/lib/google/sheets";
import { generateMenuPdf } from "@/lib/pdf";
import { uploadPdfVersioned } from "@/lib/google/drive";
import type { MenuTemplateId } from "@/types";
import { normalizeMenuSettings } from "@/lib/menu-settings";

/**
 * POST /api/menu-pdf
 * Generates a PDF of the menu and uploads it to Google Drive.
 * Returns the Drive URL of the PDF.
 */
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sub = token.googleSub as string;
  const mapping = await getOwnerMapping(sub);

  if (!mapping?.spreadsheetId) {
    return NextResponse.json({ error: "No spreadsheet found" }, { status: 404 });
  }

  // Load current menu data from Google Sheets
  const data = await loadFromGoogleSheets(
    token.accessToken as string,
    mapping.spreadsheetId
  );

  if (!data) {
    return NextResponse.json({ error: "Failed to load menu data" }, { status: 500 });
  }

  // Generate PDF
  const pdfBuffer = generateMenuPdf(
    {
      id: mapping.businessId,
      name: (data.business.name as string) || "My Business",
      logo: (data.business.logo as string) || "",
      phone: (data.business.phone as string) || "",
      address: (data.business.address as string) || "",
      description: (data.business.description as string) || "",
      tagline: (data.settings.tagline as string) || "",
      location: "",
      ownerName: "",
      memberCount: 0,
      activeMembers: 0,
      memberGoal: 0,
      createdAt: "",
      facebook: "",
      instagram: "",
      whatsapp: "",
      menuPdfUrl: "",
    },
    data.categories,
    data.products,
    normalizeMenuSettings({
      template: (data.settings.template as MenuTemplateId) || "lavender",
      currency: (data.settings.currency as string) || "DA",
      heroImage: (data.settings.heroImage as string) || "",
      tagline: (data.settings.tagline as string) || "",
      ...data.settings,
    })
  );

  // Upload PDF with versioning (keeps last 3, uses menu/pdfs/ subfolder)
  const pdfUrl = await uploadPdfVersioned(
    token.accessToken as string,
    mapping.businessId,
    pdfBuffer
  );

  return NextResponse.json({ pdfUrl });
}

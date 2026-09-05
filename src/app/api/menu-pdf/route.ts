import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getOwnerMapping } from "@/lib/server/db";
import { loadFromGoogleSheets } from "@/lib/google/sheets";
import { generateMenuPdf } from "@/lib/pdf";
import { getDriveClient, ensureFolder, ROOT_FOLDER_NAME } from "@/lib/google/drive";
import { Readable } from "stream";
import type { MenuTemplateId } from "@/types";

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
  const mapping = getOwnerMapping(sub);

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
    {
      template: (data.settings.template as MenuTemplateId) || "lavender",
      currency: (data.settings.currency as string) || "DA",
      heroImage: (data.settings.heroImage as string) || "",
      tagline: (data.settings.tagline as string) || "",
    }
  );

  // Upload PDF to Google Drive under scaniha_data/{businessId}/menu/
  const drive = getDriveClient(token.accessToken as string);

  // Build folder hierarchy
  const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
  const bizId = await ensureFolder(drive, mapping.businessId, rootId);
  const menuFolderId = await ensureFolder(drive, "menu", bizId);

  // Delete old PDF if it exists
  const oldUrl = (data.business.menuPdfUrl as string) || "";
  if (oldUrl) {
    const oldFileId = extractFileId(oldUrl);
    if (oldFileId) {
      try {
        await drive.files.delete({ fileId: oldFileId });
      } catch {
        // Ignore - file may already be deleted
      }
    }
  }

  // Upload the new PDF
  const fileName = `menu-${Date.now()}.pdf`;
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [menuFolderId],
    },
    media: {
      mimeType: "application/pdf",
      body: new Readable({
        read() {
          this.push(pdfBuffer);
          this.push(null);
        },
      }),
    },
    fields: "id, webViewLink",
  });

  const fileId = response.data.id;

  // Make the PDF publicly viewable
  if (fileId) {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  }

  const pdfUrl = `https://drive.google.com/file/d/${fileId}/view`;

  return NextResponse.json({ pdfUrl });
}

function extractFileId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

import jsPDF from "jspdf";
import type { BusinessProfile, Category, Product, MenuSettings } from "@/types";

/**
 * Generate a styled PDF menu from menu data.
 * Returns the PDF as a Buffer for upload.
 */
export function generateMenuPdf(
  business: BusinessProfile,
  categories: Category[],
  products: Product[],
  settings: MenuSettings
): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors based on template
  const colors = getTemplateColors(settings.template);

  // ── Header ──────────────────────────────────────────────────────────────
  doc.setFillColor(colors.bg.r, colors.bg.g, colors.bg.b);
  doc.rect(0, 0, pageWidth, 60, "F");

  // Business name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
  doc.text(business.name, pageWidth / 2, 30, { align: "center" });

  // Tagline or description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
  const tagline = settings.tagline || business.description || "";
  if (tagline) {
    doc.text(tagline, pageWidth / 2, 40, { align: "center", maxWidth: contentWidth });
  }

  // Address
  if (business.address) {
    doc.setFontSize(9);
    doc.text(business.address, pageWidth / 2, 50, { align: "center" });
  }

  y = 70;

  // ── Categories & Products ───────────────────────────────────────────────
  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
  const available = products.filter((p) => p.available);

  for (const category of sortedCategories) {
    const items = available
      .filter((p) => p.categoryId === category.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    if (!items.length) continue;

    // Check if we need a new page
    if (y > 250) {
      doc.addPage();
      y = margin;
    }

    // Category header
    doc.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
    doc.roundedRect(margin, y, contentWidth, 10, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(category.name, margin + 5, y + 7);

    y += 16;

    // Category description
    if (category.description) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
      doc.text(category.description, margin, y);
      y += 6;
    }

    // Products
    for (const product of items) {
      // Check if we need a new page
      if (y > 270) {
        doc.addPage();
        y = margin;
      }

      // Product name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(colors.text.r, colors.text.g, colors.text.b);
      doc.text(product.name, margin, y);

      // Price (right-aligned)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(colors.accent.r, colors.accent.g, colors.accent.b);
      const priceText = `${settings.currency} ${product.price.toFixed(2)}`;
      doc.text(priceText, pageWidth - margin, y, { align: "right" });

      y += 5;

      // Description
      if (product.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
        const lines = doc.splitTextToSize(product.description, contentWidth - 10);
        doc.text(lines, margin, y);
        y += lines.length * 4;
      }

      // Separator line
      y += 2;
      doc.setDrawColor(colors.line.r, colors.line.g, colors.line.b);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    }

    y += 4;
  }

  // ── Footer ──────────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(colors.muted.r, colors.muted.g, colors.muted.b);
    doc.text(
      `Powered by Perkly`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Return as Buffer
  const pdfOutput = doc.output("arraybuffer");
  return Buffer.from(pdfOutput);
}

function getTemplateColors(template: string) {
  const presets: Record<string, { bg: RGB; accent: RGB; text: RGB; muted: RGB; line: RGB }> = {
    lavender: {
      bg: { r: 246, g: 248, b: 252 },
      accent: { r: 37, g: 99, b: 235 },
      text: { r: 30, g: 41, b: 59 },
      muted: { r: 100, g: 116, b: 139 },
      line: { r: 226, g: 232, b: 240 },
    },
    botanical: {
      bg: { r: 242, g: 247, b: 241 },
      accent: { r: 63, g: 111, b: 80 },
      text: { r: 36, g: 53, b: 42 },
      muted: { r: 101, g: 116, b: 105 },
      line: { r: 209, g: 223, b: 215 },
    },
    sunset: {
      bg: { r: 255, g: 247, b: 237 },
      accent: { r: 230, g: 99, b: 69 },
      text: { r: 69, g: 47, b: 42 },
      muted: { r: 128, g: 108, b: 100 },
      line: { r: 245, g: 228, b: 218 },
    },
    noir: {
      bg: { r: 245, g: 242, b: 235 },
      accent: { r: 41, g: 40, b: 36 },
      text: { r: 41, g: 40, b: 36 },
      muted: { r: 116, g: 111, b: 101 },
      line: { r: 220, g: 215, b: 205 },
    },
    mono: {
      bg: { r: 255, g: 255, b: 255 },
      accent: { r: 17, g: 17, b: 17 },
      text: { r: 0, g: 0, b: 0 },
      muted: { r: 115, g: 115, b: 115 },
      line: { r: 229, g: 229, b: 229 },
    },
  };

  return presets[template] ?? presets.lavender;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

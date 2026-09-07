import { Readable } from "stream";
import { google } from "googleapis";

export const ROOT_FOLDER_NAME = "scaniha_data";
const MAX_VERSIONS_TO_KEEP = 3;

export function getDriveClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.drive({ version: "v3", auth: oauth2Client });
}

/**
 * Get a date-based subfolder name in YYYY-MM format.
 */
function getDateSubfolder(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

/**
 * Upload an image file to Google Drive under:
 *   scaniha_data/{businessId}/{folder}/            (profile, menu)
 *   scaniha_data/{businessId}/{folder}/{YYYY-MM}/  (products, rewards)
 * Returns the public view link.
 */
export async function uploadImage(
  accessToken: string,
  file: File,
  businessId: string,
  folder: "products" | "rewards" | "profile" | "menu" | "customers"
): Promise<string> {
  const drive = getDriveClient(accessToken);

  // Build folder hierarchy
  const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
  const bizId = await ensureFolder(drive, businessId, rootId);
  const subFolderId = await ensureFolder(drive, folder, bizId);

  // Add date subfolder for high-volume folders
  const useDateSubfolder = folder === "products" || folder === "rewards";
  const targetFolderId = useDateSubfolder
    ? await ensureFolder(drive, getDateSubfolder(), subFolderId)
    : subFolderId;

  // Determine MIME type
  const mimeType = file.type || "image/jpeg";
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${folder}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Convert File to Buffer for upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [targetFolderId],
    },
    media: {
      mimeType,
      body: new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      }),
    },
    fields: "id, webContentLink, webViewLink",
  });

  const fileId = response.data.id;

  // Make the file publicly readable so images render in the menu
  if (fileId) {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  }

  // Return a direct link that works for <img src="">
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Delete an image from Google Drive by its file ID extracted from URL.
 */
export async function deleteImage(
  accessToken: string,
  imageUrl: string
): Promise<void> {
  const fileId = extractFileId(imageUrl);
  if (!fileId) return;

  const drive = getDriveClient(accessToken);
  try {
    await drive.files.delete({ fileId });
  } catch {
    // File may already be deleted — ignore
  }
}

/**
 * Move a file to an archive folder under the same business.
 * Creates: scaniha_data/{businessId}/archive/{category}/
 */
export async function archiveImage(
  accessToken: string,
  imageUrl: string,
  businessId: string,
  category: "products" | "rewards" | "profile" | "menu" | "customers"
): Promise<void> {
  const fileId = extractFileId(imageUrl);
  if (!fileId) return;

  const drive = getDriveClient(accessToken);

  try {
    // Create archive folder hierarchy
    const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
    const bizId = await ensureFolder(drive, businessId, rootId);
    const archiveId = await ensureFolder(drive, "archive", bizId);
    const categoryArchiveId = await ensureFolder(drive, category, archiveId);

    // Move file by updating its parents
    await drive.files.update({
      fileId,
      addParents: categoryArchiveId,
      removeParents: (await drive.files.get({ fileId, fields: "parents" })).data.parents?.join(","),
    });
  } catch {
    // Fallback: if move fails, just delete
    try {
      await drive.files.delete({ fileId });
    } catch {
      // Ignore
    }
  }
}

/**
 * List all files in a folder (non-recursive).
 */
async function listFilesInFolder(
  drive: ReturnType<typeof getDriveClient>,
  folderId: string
): Promise<Array<{ id: string; name: string; createdTime?: string | null }>> {
  const files: Array<{ id: string; name: string; createdTime?: string | null }> = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false and mimeType!='application/vnd.google-apps.folder'`,
      fields: "nextPageToken, files(id, name, createdTime)",
      spaces: "drive",
      orderBy: "createdTime desc",
      pageToken,
    });
    files.push(
      ...(res.data.files ?? [])
        .filter((f): f is { id: string; name: string; createdTime?: string | null } => !!f.id && !!f.name)
    );
    pageToken = res.data.nextPageToken ?? undefined;
  } while (pageToken);

  return files;
}

/**
 * Upload a PDF to the menu/pdfs/ folder, keeping up to MAX_VERSIONS_TO_KEEP.
 * Deletes the oldest versions beyond the limit.
 * Returns the new PDF's public URL.
 */
export async function uploadPdfVersioned(
  accessToken: string,
  businessId: string,
  pdfBuffer: Buffer
): Promise<string> {
  const drive = getDriveClient(accessToken);

  // Build: scaniha_data/{businessId}/menu/pdfs/
  const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
  const bizId = await ensureFolder(drive, businessId, rootId);
  const menuId = await ensureFolder(drive, "menu", bizId);
  const pdfsId = await ensureFolder(drive, "pdfs", menuId);

  // Upload new PDF
  const fileName = `menu-${Date.now()}.pdf`;
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [pdfsId],
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
    fields: "id",
  });

  const fileId = response.data.id;

  // Make publicly viewable
  if (fileId) {
    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
    });
  }

  // Prune old versions beyond the limit
  const allPdfs = await listFilesInFolder(drive, pdfsId);
  const sorted = allPdfs
    .filter((f) => f.name.endsWith(".pdf"))
    .sort((a, b) => (b.createdTime ?? "").localeCompare(a.createdTime ?? ""));

  // Delete excess versions (keep newest MAX_VERSIONS_TO_KEEP)
  for (const old of sorted.slice(MAX_VERSIONS_TO_KEEP)) {
    try {
      await drive.files.delete({ fileId: old.id });
    } catch {
      // Ignore
    }
  }

  return `https://drive.google.com/file/d/${fileId}/view`;
}

/**
 * Move a file to a target folder on Google Drive.
 */
export async function moveFileToFolder(
  accessToken: string,
  fileId: string,
  targetFolderId: string
): Promise<void> {
  const drive = getDriveClient(accessToken);
  const currentParents = (await drive.files.get({ fileId, fields: "parents" })).data.parents?.join(",") ?? "";
  await drive.files.update({
    fileId,
    addParents: targetFolderId,
    removeParents: currentParents,
  });
}

/**
 * Ensure the scaniha_data/{businessId}/ folder hierarchy exists.
 * Returns the business folder ID.
 */
export async function ensureBusinessFolder(
  accessToken: string,
  businessId: string
): Promise<string> {
  const drive = getDriveClient(accessToken);
  const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
  return ensureFolder(drive, businessId, rootId);
}

/**
 * Initialize the full Drive folder structure for a business.
 * Creates: scaniha_data/{businessId}/{products,rewards,profile,menu,customers,archive}
 * Also creates sub-folders: menu/covers, menu/pdfs, archive sub-folders.
 * Safe to call multiple times (idempotent).
 */
export async function initializeDrive(
  accessToken: string,
  businessId: string
): Promise<void> {
  const drive = getDriveClient(accessToken);
  const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
  const bizId = await ensureFolder(drive, businessId, rootId);

  // Create all top-level folders in parallel
  await Promise.all([
    ensureFolder(drive, "products", bizId),
    ensureFolder(drive, "rewards", bizId),
    ensureFolder(drive, "profile", bizId),
    ensureFolder(drive, "customers", bizId),
  ]);

  // Create menu sub-folders
  const menuId = await ensureFolder(drive, "menu", bizId);
  await Promise.all([
    ensureFolder(drive, "covers", menuId),
    ensureFolder(drive, "pdfs", menuId),
  ]);

  // Create archive sub-folders
  const archiveId = await ensureFolder(drive, "archive", bizId);
  await Promise.all([
    ensureFolder(drive, "products", archiveId),
    ensureFolder(drive, "rewards", archiveId),
    ensureFolder(drive, "profile", archiveId),
    ensureFolder(drive, "menu", archiveId),
    ensureFolder(drive, "customers", archiveId),
  ]);
}

/**
 * Extract a Google Drive file ID from various URL formats.
 */
export function extractFileId(url: string): string | null {
  if (!url) return null;
  // Format: https://drive.google.com/uc?export=view&id=FILE_ID
  const ucMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) return ucMatch[1];
  // Format: https://drive.google.com/file/d/FILE_ID/...
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  return null;
}

/**
 * Ensure a folder exists on Drive. Returns its ID.
 * Exported so other modules (menu-pdf route) can reuse it.
 */
export async function ensureFolder(
  drive: ReturnType<typeof getDriveClient>,
  name: string,
  parentId?: string
): Promise<string> {
  const queryParts = [
    `name='${name}'`,
    "mimeType='application/vnd.google-apps.folder'",
    "trashed=false",
  ];
  if (parentId) {
    queryParts.push(`'${parentId}' in parents`);
  }

  const existing = await drive.files.list({
    q: queryParts.join(" and "),
    fields: "files(id)",
    spaces: "drive",
  });

  if (existing.data.files?.length) {
    return existing.data.files[0].id!;
  }

  const created = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    },
    fields: "id",
  });

  return created.data.id!;
}

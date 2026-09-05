import { Readable } from "stream";
import { google } from "googleapis";

export const ROOT_FOLDER_NAME = "scaniha_data";

export function getDriveClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.drive({ version: "v3", auth: oauth2Client });
}

/**
 * Upload an image file to Google Drive under:
 *   scaniha_data/{businessId}/{folder}/
 * Returns the public view link.
 */
export async function uploadImage(
  accessToken: string,
  file: File,
  businessId: string,
  folder: "products" | "rewards" | "profile" | "menu"
): Promise<string> {
  const drive = getDriveClient(accessToken);

  // Build folder hierarchy: scaniha_data → {businessId} → {folder}
  const rootId = await ensureFolder(drive, ROOT_FOLDER_NAME);
  const bizId = await ensureFolder(drive, businessId, rootId);
  const subFolderId = await ensureFolder(drive, folder, bizId);

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
      parents: [subFolderId],
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

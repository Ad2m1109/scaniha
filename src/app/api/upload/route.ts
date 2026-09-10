import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { uploadImage } from "@/lib/google/drive";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const VALID_FOLDERS = ["products", "rewards", "profile", "menu", "customers"] as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_PREFIXES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { windowMs: 60_000, maxRequests: 30, keyPrefix: "upload" });
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isValidMime = ALLOWED_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix));
    if (!isValidMime) {
      return NextResponse.json({ error: "File must be an image (png, jpeg, webp, gif, svg)" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    if (!VALID_FOLDERS.includes(folder as typeof VALID_FOLDERS[number])) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const url = await uploadImage(
      token.accessToken as string,
      file,
      token.businessId as string,
      folder as typeof VALID_FOLDERS[number]
    );

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload] Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

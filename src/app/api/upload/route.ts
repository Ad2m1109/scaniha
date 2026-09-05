import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { uploadImage } from "@/lib/google/drive";

export async function POST(req: NextRequest) {
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

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const validFolders = ["products", "rewards", "profile", "menu"] as const;
    if (!validFolders.includes(folder as typeof validFolders[number])) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const url = await uploadImage(
      token.accessToken as string,
      file,
      token.businessId as string,
      folder as "products" | "rewards" | "profile" | "menu"
    );

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload] Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

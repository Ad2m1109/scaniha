import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getDriveClient, extractFileId } from "@/lib/google/drive";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  const fileId = extractFileId(url);
  if (!fileId) {
    return NextResponse.json({ error: "Invalid Drive URL" }, { status: 400 });
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const drive = getDriveClient(token.accessToken as string);

    const res = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    const contentType = res.headers["content-type"] || "image/jpeg";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(res.data as unknown as ReadableStream, {
      headers,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const code = (err as { code?: number })?.code;
    if (code === 404) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    console.error("[/api/image] Error:", message);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
